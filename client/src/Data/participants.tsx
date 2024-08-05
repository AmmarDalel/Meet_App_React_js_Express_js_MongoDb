// participants.ts
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { SocketContext } from "../Context/SocketIo";

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
    console.log('data from get articipants : ', data)
    // Assurez-vous que data est du bon type ici
    return data;
  } catch (error) {
    console.error('Error fetching participants:', error);
    throw error; // Re-lancer l'erreur pour la gérer ailleurs si nécessaire
  }
};

/*
// Hook pour utiliser fetchParticipants dans un composant React
export const useParticipants = () => {
  const roomId = useSelector((state: RootState) => state.user.callId);
  const [participants, setParticipants] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { peers} = useContext(SocketContext);

  useEffect(() => {
    console.log('peers from participants : ', peers)
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
    console.log('participants from participants : ', participants)

  }, [ peers]);

  return { participants, loading, error };
};
*/

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

  useEffect(() => {
    console.log('peers from participants : ', peers)
    if (roomId) {
      fetchParticipants(roomId)
        .then((data) => {
            console.log('hello')
          setParticipants(data);
          setLoading(false);
        })
        .catch((error) => {
          setError('Failed to fetch participants');
          setLoading(false);
        });
    }
    console.log('participants from participants : ', participants)

  }, [ peers]);
    return <SocketContext.Provider value={{participants}}>{children}</SocketContext.Provider> ;

}