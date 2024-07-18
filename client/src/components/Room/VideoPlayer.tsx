import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { CallContext } from "../../Context/CallContext";
import "./VideoPlayer.css";

export function VideoPlayer() {
  const [users, setUsers] = useState<string[]>([]);
  const isInRoom = useSelector((state: RootState) => state.user.isInRoom);
  const roomId = useSelector((state: RootState) => state.user.callId);
  const videoGrid = useRef<HTMLDivElement>(null);
  const { ws, myId } = useContext(CallContext);
  const peerConnections = useRef<Map<string, RTCPeerConnection>>(new Map());

  useEffect(() => {
    if (isInRoom && roomId) {
      // Créer et ajouter le flux vidéo local
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
        const video = document.createElement("video");
        video.srcObject = stream;
        video.addEventListener("loadedmetadata", () => {
          video.play();
        });
        if (videoGrid.current) {
          videoGrid.current.append(video);
        }

        // Envoyer un signal pour rejoindre la salle
        ws.emit("join-room", roomId, myId);

        // Ajouter des écouteurs d'événements pour les connexions et déconnexions
        ws.on("user-connected", (userId: string) => {
          setUsers(prevUsers => [...prevUsers, userId]);

          // Créer une connexion pour chaque nouvel utilisateur
          const peerConnection = new RTCPeerConnection();
          peerConnections.current.set(userId, peerConnection);

          // Ajouter le flux local à la connexion
          stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

          peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
              ws.emit("signal", { roomId, userId, signal: event.candidate });
            }
          };

          peerConnection.ontrack = (event) => {
            const existingVideo = document.getElementById(userId) as HTMLVideoElement;
            if (existingVideo) {
              existingVideo.srcObject = event.streams[0];
            } else {
              const video = document.createElement("video");
              video.id = userId;
              video.srcObject = event.streams[0];
              video.autoplay = true;
              video.controls = true;
              if (videoGrid.current) {
                videoGrid.current.append(video);
              }
            }
          };

          // Envoyer une offre pour établir une connexion
          peerConnection.createOffer().then((offer) => {
            return peerConnection.setLocalDescription(offer);
          }).then(() => {
            ws.emit("signal", { roomId, userId, signal: peerConnection.localDescription });
          });
        });

        ws.on("user-disconnected", (userId: string) => {
          setUsers(prevUsers => prevUsers.filter(id => id !== userId));

          // Fermer la connexion pour l'utilisateur déconnecté
          const peerConnection = peerConnections.current.get(userId);
          if (peerConnection) {
            peerConnection.close();
            peerConnections.current.delete(userId);
          }

          // Supprimer la vidéo de l'utilisateur déconnecté
          const videoElement = document.getElementById(userId);
          if (videoElement) {
            videoElement.remove();
          }
        });

        ws.on("signal", (data: { userId: string; signal: RTCSessionDescriptionInit | RTCIceCandidate }) => {
          const peerConnection = peerConnections.current.get(data.userId);
          if (peerConnection) {
            if (data.signal.type === "offer") {
              peerConnection.setRemoteDescription(new RTCSessionDescription(data.signal)).then(() => {
                return peerConnection.createAnswer();
              }).then((answer) => {
                return peerConnection.setLocalDescription(answer);
              }).then(() => {
                ws.emit("signal", { roomId, userId: myId, signal: peerConnection.localDescription });
              });
            } else if (data.signal.type === "answer") {
              peerConnection.setRemoteDescription(new RTCSessionDescription(data.signal));
            } else if (data.signal.candidate) {
              peerConnection.addIceCandidate(new RTCIceCandidate(data.signal));
            }
          }
        });
      });
    }
  }, [isInRoom, roomId, ws, myId]);

  return <div ref={videoGrid} className="videoplayer" />;
}
