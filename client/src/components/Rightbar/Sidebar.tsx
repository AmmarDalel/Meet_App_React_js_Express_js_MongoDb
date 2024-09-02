import './Sidebar.css';
import './Form.css' ;
import { useContext, useEffect, useState } from 'react';
import { ParticipantsContext, ParticipantsProvider } from '../../Data/participants';
import  Button  from '@mui/material/Button';
import { Box } from '@mui/system';
import { SocketContext } from '../../Context/SocketIo';
import TabHeader from './TabHeader2';
import Participant from './Participant';
import Apps from './Apps';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';


function RightSidebar({children}:{children:any}) {
  const onlineparticipants = useSelector((state: RootState) => state.participants.online);

  var [participantsbutton , setParticipantsbutton]=useState(false) ;
  useEffect(()=>{
    console.log('onlineparticipants : ', onlineparticipants) ;
  },[onlineparticipants])
  return(
   participantsbutton? <ParticipantsProvider><Participants setParticipants={setParticipantsbutton} participantsbutton={participantsbutton} onlineparticipants={onlineparticipants}/> </ParticipantsProvider>
   : <Apps  children={children} setParticipants={setParticipantsbutton} participantsbutton={participantsbutton}/> 
                     
  )
 
}


function Participants({ participantsbutton , setParticipants , onlineparticipants}:{ participantsbutton :any , setParticipants : any , onlineparticipants:string[]}){
  try{
    const { userId} = useContext(ParticipantsContext);
    const {userleavethecall , stream} = useContext(SocketContext);
    const [ParticipantList ,setParticipantList]=useState<string[]>([]); 
    const [VideoTracks, setVideoTracks] = useState(false) ;
    const [AudioTracks, setAudioTracks] = useState(false) ;
    const [hostvideoTracks, setHostVideoTracks] = useState(false) ;
    const [hostaudioTracks, setHostAudioTracks] = useState(false) ;
   
    useEffect(()=>{
      try{
        stream.getVideoTracks().forEach((track: { enabled: boolean | ((prevState: boolean) => boolean); }) => {setHostVideoTracks(track.enabled)} )
      }
      catch(error){
        setHostVideoTracks(false) ;
        console.log(error) ;
      }
      try{
        stream.getAudioTracks().forEach((track: { enabled: boolean | ((prevState: boolean) => boolean); }) => {setHostAudioTracks(track.enabled)} ) 
      }
      catch(error){
        setHostAudioTracks(false) ;
        console.log(error) ;
      }
    } , [stream])

    useEffect(()=>{
      setParticipantList(onlineparticipants) ;
      console.log('participants from sidebar : ', onlineparticipants)
    }, [onlineparticipants])

    useEffect(()=>{
      console.log('user leave the call : ' , userleavethecall)    ;

    }, [userleavethecall])

    return (
      <div className='sidebarcontainer'>
        <TabHeader participantsbutton={participantsbutton}  setParticipants ={setParticipants}/>
       <div className='participantslist'>
        {ParticipantList.map((participant:any, index:any) => (
              <>
                {participant.id == userId  ? <Participant key={index} name={participant.fullName}  color='#44b700' avatar={participant.avatar} audioTracks={hostaudioTracks} videoTracks={hostvideoTracks}/>
                  :<Participant key={index} name={participant.fullName}  color='#44b700' audioTracks={AudioTracks}  avatar={participant.avatar} videoTracks={VideoTracks} />
                }
              </>
            ))}
            {userleavethecall && <Participant name={userleavethecall.fullName} color='red'  avatar={userleavethecall.avatar} videoTracks={false} audioTracks={false}   />
          }
       </div>
      <Box sx={{ display:'flex' , justifyContent:'end' , paddingRight:'4%', marginTop:'10%'}}>
        <Button  variant="outlined"   sx={{
            fontSize: '12px',
            borderRadius: '8px',
            width: 'max-content',
            height:'30px',
            textTransform: 'none', 
            paddingLeft:'20px'
          }}
          >Invite</Button>
      </Box>

      </div>
    )

  }

  catch(error){
    console.log(error)
  }
}


export default RightSidebar