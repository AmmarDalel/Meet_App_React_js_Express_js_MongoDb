import { useRef, createContext, ReactNode, useContext, useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../Redux/Store";
import { peerReducer } from "./peerReducer";
import { addPeerAction, removePeerAction } from "./peerActions";
import { CallContext } from "./CallContext";
import { setparticipants } from "../Redux/features/user";

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
    const videoRef = useRef<HTMLVideoElement>(null);

    const enterRoom = ({ roomId }: { roomId: string }) => {
        navigate(`/call/${roomId}`);
    };

    const removePeer = (peerId: string) => {
        peerDispatch(removePeerAction(peerId));
    };

    const getUsers = ({ participants }: { participants: string[] }) => {
        setParticipants(participants);
        dispatch(setparticipants(participants));
        console.log({ participants });
    };

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    const leaveCallHandler = () => {
        setCallEnded(true);
        if (connectionRef.current) {
            connectionRef.current.destroy();
            removePeer(me) ;
        }
        navigate(`/call/${roomId}/leavecall`) ;
        window.location.reload();

    };

    useEffect(() => {
        ws.on("room-create", enterRoom);

        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then((stream) => {
                setStream(stream);
            })
            .catch((error) => {
                console.log(error);
            });

        ws.on("get-users", getUsers);

        return () => {
            ws.off("room-create", enterRoom);
            ws.off("get-users", getUsers);
        };
    }, [ws]);

    useEffect(() => {
        if (!me || !stream) return;

        ws.on('user-joined', (peerId: any) => {
            const call = me.call(peerId, stream);
            call.on("stream", (peerStream: any) => {
                peerDispatch(addPeerAction(peerId, peerStream));
            });
        });

        me.on("call", (call: any) => {
            call.answer(stream);
            call.on("stream", (peerStream: any) => peerDispatch(addPeerAction(call.peer, peerStream)));
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

   // console.log('peers : ', peers);

    return (
        <SocketContext.Provider value={{ leaveCall: leaveCallHandler,callEnded ,stream, peers, timeElapsed }}>
            {children}
        </SocketContext.Provider>
    );
};
