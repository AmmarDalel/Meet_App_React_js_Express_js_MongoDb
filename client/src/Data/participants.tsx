// participants.ts
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { SocketContext } from "../Context/SocketIo";
import { PeerState } from "../Context/peerReducer";
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';

// Fonction pour obtenir les participants depuis l'API
export const fetchParticipants = async (roomId: string) => {
  try {
    const response = await fetch('http://localhost:5000/api/room/participants/getParticipantsInRoom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ roomId: roomId }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching participants:', error);
    throw error;
  }
};


export const ParticipantsContext=createContext<null | any>(null) ;


interface ParticipantsProviderProps {
    children: ReactNode; // Typing children as ReactNode
}

export const ParticipantsProvider: React.FC<ParticipantsProviderProps> =({children})=>{
const roomId = useSelector((state: RootState) => state.user.callId);
  const [participants, setParticipants] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { peers} = useContext(SocketContext);
  const [videoTracks, setVideoTracks] = useState(false) ;
  const [audioTracks, setAudioTracks] = useState(false) ;
  const [HostvideoTracks, setHostVideoTracks] = useState(false) ;
  const [HostaudioTracks, setHostAudioTracks] = useState(false) ;
  const cookies = new Cookies();
  const  usertoken=cookies.get('user') ;
  const  userdata = jwtDecode(usertoken.token); // decode your token here
  const  userId = String(userdata.userid);

  useEffect(() => {
    if (roomId) {
      fetchParticipants(roomId)
        .then((data) => {
          setParticipants(data);
          setLoading(false);
        })
        .catch((error) => {
          setError('Failed to fetch participants');
          setLoading(false);
        });
    }
  
    if(peers){
      Object.values(peers as PeerState).map((peer , index) => {
        const stream=peer.stream ;
        try{
          
          stream.getVideoTracks().forEach(track => {setVideoTracks(track.enabled); console.log(track.enabled)} )

        }
        catch(error){
          console.log(error) ;
        }
        try{
          stream.getAudioTracks().forEach(track => {setAudioTracks(track.enabled) ; console.log(track.enabled)} )
        }
        catch(error){
          console.log(error) ;
        }
      }
      )
    }
   
  }, [peers]);

    return <ParticipantsContext.Provider value={{participants , videoTracks , audioTracks , HostaudioTracks , HostvideoTracks , userId}}>{children}</ParticipantsContext.Provider> ;

}