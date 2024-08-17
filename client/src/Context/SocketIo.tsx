import { useRef, createContext, ReactNode, useContext, useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../Redux/Store";
import { peerReducer } from "./peerReducer";
import { addPeerAction, removePeerAction, updatePeerAudioAction, updatePeerVideoAction } from "./peerActions";
import { CallContext } from "./CallContext";
import { setLeavecall, setparticipants } from "../Redux/features/user";

export const SocketContext = createContext<null | any>(null);

interface CallProviderProps {
    children: ReactNode;
}

export const RoomProvider: React.FC<CallProviderProps> = ({ children }) => {
    const { ws, me } = useContext(CallContext);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [participants, setParticipants] = useState<string[]>([]);
    const leaveCall = useSelector((state: RootState) => state.user.leavecall);
    const roomId = useSelector((state: RootState) => state.user.callId);
    const [peers, peerDispatch] = useReducer(peerReducer, {});
    const [timeElapsed, setTimeElapsed] = useState<number>(0);
    const connectionRef = useRef<any>(null);
    const [callEnded, setCallEnded] = useState(false);
    const [screenSharingId, setScreenSharingId] = useState<string>("");
    const [streamSharing, setStreamSharing] = useState<MediaStream | null>(null);
    const [screenSharingIdOtherUser, setScreenSharingIdOtherUser] = useState<string>("");
    const [userleavethecall, setUserleavethecall] = useState<any>();

    const enterRoom = ({ roomId }: { roomId: string }) => {
        navigate(`/call/${roomId}`);
    };

    const removePeer = (peerId: string) => {
        peerDispatch(removePeerAction(peerId));
    };

    const getUsers = ({ participants }: { participants: string[] }) => {
        setParticipants(participants);
        dispatch(setparticipants(participants));

    };

    const leaveCallHandler = async() => {
        setCallEnded(true);
        if (connectionRef.current) {
            connectionRef.current.destroy();
            removePeer(me.id);
        }
        await ws.emit('user-leaved',{roomId, peerId:me.id, duration:timeElapsed}) ;
        navigate(`/call/${roomId}/leavecall`);
        window.location.reload();
    };

    useEffect(() => {
        if (!ws || !me) return;
        ws.on("room-create", enterRoom);
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then((stream) => {
                setStream(stream);
            })
            .catch((error) => {
                console.error(error);
            });
        ws.on("get-users", getUsers);
        return () => {
            ws.off("room-create", enterRoom);
            ws.off("get-users", getUsers);
        };
    }, [ws, me]);

    /*useEffect(() => {
        if (stream) {
            stream.getAudioTracks().forEach(track => track.enabled = false);
        }
    }, [stream]);*/

    useEffect(() => {
        if (!me || !stream || !ws) {
            return;
        }

        ws.on('user-joined', (peerId: any) => {
            const call = me.call(peerId, stream);
            if (call) {
                call.on("stream", async(peerStream: any) => {
                    peerDispatch(addPeerAction(peerId, peerStream));
                });
            } else {
                console.error('Call object is null or undefined');
            }
        });

        me.on("call", (call: any) => {
            if (call) {
                call.answer(stream);
                call.on("stream", (peerStream: any) => {
                    peerDispatch(addPeerAction(call.peer, peerStream));
                });
            } else {
                console.error('Call object is null or undefined');
            }
        });

        return () => {
            ws.off('user-joined');
            me.off("call");
        };
    }, [me, stream, ws]);

    useEffect(() => {
        let timerId: NodeJS.Timeout;
        if (stream) {
            timerId = setInterval(() => {
                setTimeElapsed(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(timerId);
    }, [stream]);

    useEffect(()=>{
        ws.on('user-disconnected',({peerId , participant}:any)=>{
            peerDispatch(removePeerAction(peerId));
            dispatch(setLeavecall(true)) ;
            setUserleavethecall(participant) ; 
        })
    }, [peers])

    const VoiceControl =async () => {
        if (stream) {
            const audioTracks = stream.getAudioTracks();
            if (audioTracks.length > 0) {
                const enabled=!audioTracks[0].enabled ;
                audioTracks.forEach(track => track.enabled = enabled);
                await ws.emit('toggle-audio', { peerId: me.id, enabled });
                peerDispatch(updatePeerAudioAction(me.id, enabled));
            }
        }
    };

    const CamControl = async () => {
        if (stream) {
            const videoTracks = stream.getVideoTracks();
            if (videoTracks.length > 0) {
                const enabled = !videoTracks[0].enabled;
                videoTracks.forEach(track => track.enabled = enabled);
                await ws.emit('toggle-video', { peerId: me.id, enabled });
                peerDispatch(updatePeerVideoAction(me.id, enabled));
            }
        }
    };

    const switchStream =  (stream: MediaStream) => {
        setStreamSharing(stream);
        if (screenSharingId) {
            setScreenSharingId("");
             ws.emit('stop-sharing', roomId);
             ws.on('user-stopp', () => {
                setScreenSharingIdOtherUser("");
            });
          
        } else {
            setScreenSharingId(me?.id);
        }

        if (me && me.connections) {
            Object.values(me.connections).forEach((connections: any) => {
                connections.forEach((connection: any) => {
                    const videoTrack = stream.getTracks().find((track) => track.kind === "video");
                    if (videoTrack) {
                        connection.peerConnection.getSenders().forEach((sender: RTCRtpSender) => {
                            if (sender.track && sender.track.kind === "video") {
                                sender.replaceTrack(videoTrack).catch((err: any) => console.error(err));
                            }
                        });
                    }
                });
            });
        } else {
            console.log('error');
        }
    };

    const Screensharing = async () => {
        if (screenSharingId) {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            switchStream(stream);
        } else {
            const stream = await navigator.mediaDevices.getDisplayMedia({});
            switchStream(stream);
        }
    };



    return (
        <SocketContext.Provider value={{ leaveCall: leaveCallHandler, callEnded, stream, peers, timeElapsed, VoiceControl, CamControl, Screensharing, screenSharingId, me, streamSharing, screenSharingIdOtherUser , userleavethecall }}>
            {children}
        </SocketContext.Provider>
    );
};
