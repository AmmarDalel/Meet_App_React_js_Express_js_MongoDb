import './RoomContainer.css';
import ControllBar from './ControllBar/ControllBar';
import { VideoPlayer } from '../VideoPlayer';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../Context/SocketIo';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { PeerState } from '../../Context/peerReducer';
import Header from './Header';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';

export function EmptyRoomContainer() {
  return (
    <div className='RoomContainer'>
    </div>
  )
}

export function RoomContainer() {
  const { me, callEnded, stream, peers,screenSharingId , streamSharing , screenSharingIdotheruser} = useContext(SocketContext);
  const [participants, setParticipants] = useState(false);
  const [callEndedState, setCallEndedState] = useState(false);
  const leaveCall = useSelector((state: RootState) => state.user.leavecall);
  const [showLeaveMessage, setShowLeaveMessage] = useState(false);
  const [fadeMessage, setFadeMessage] = useState(false);

  useEffect(() => {
    // Vérifiez si `peers` a des valeurs
    setParticipants(Object.values(peers).length > 0);
  }, [peers]);

  useEffect(() => {
    setCallEndedState(callEnded);
  }, [callEnded]);

  useEffect(() => {
    if (leaveCall) {
      setShowLeaveMessage(true);
      setFadeMessage(true);
      const timer = setTimeout(() => {
        setFadeMessage(false);
        const hideTimer = setTimeout(() => {
          setShowLeaveMessage(false);
        }, 2000); // Le temps de transition CSS
        return () => clearTimeout(hideTimer);
      }, 1000); // Affiche le message pendant 2 secondes avant de commencer à disparaître
      return () => clearTimeout(timer);
    }
  }, [leaveCall]);

  var screenSharingVideo = screenSharingId === me.id ? stream : peers[screenSharingId]?.stream;
  //console.log(peers)
  if (screenSharingIdotheruser) {
    Object.values(peers as PeerState).forEach((peer) => {
    
            screenSharingVideo = peer.stream;
        
    });
}

var bigstreamvideoplayer ;
useEffect(()=>{
  console.log('screenSharingIdotheruser : ', screenSharingIdotheruser) ;

}, [screenSharingIdotheruser])
if(screenSharingIdotheruser){
  bigstreamvideoplayer = screenSharingVideo  ;

}
else{ 
  bigstreamvideoplayer =streamSharing  ;}



  return (
    <>
      
      { screenSharingVideo &&
        <Box sx={{ flexGrow: 1 , backgroundColor: '#101826' , display:'flex'  , flexDirection:'column' , justifyContent:'spacebetween' , border:' 1px solid #26303f', flex:'1' ,  padding:'0'
        }}>
          <Header/>
         <Box sx={{ flexGrow: 1  , display:'flex'  , flexDirection:'row' , justifyContent:'center' 
        }}>
        <Box sx={{ flexGrow: 1   ,  display:'flex'  , flexDirection:'row'   , width:'100%' }}>
          <Box sx={{ width:'100%', height:'100%' , position:'relative' , alignItems:'center'  , display:'flex'}}>
              <Grid height={400} sx={{ flex:'1' }} >
                <VideoPlayer stream={bigstreamvideoplayer}></VideoPlayer>
              </Grid>
            </Box>
          
        
        </Box>
        <Box sx={{  display:'flex'  , flexDirection:'column'  , justifyContent:'end'  , rowGap:'10px' }}>
            <Grid height={100}  sx={{  border:' 1px solid #26303f' }}>
                  <VideoPlayer stream={stream}></VideoPlayer>
            </Grid>
       
            
          {Object.values(peers as PeerState).map((peer , index) => (
            // Ensure each iteration returns a valid React element
            <Grid key={index}  height={100}  sx={{  border:' 1px solid #26303f' }} >
              {peer.stream && <VideoPlayer stream={peer.stream} />}             </Grid>
          ))}
        </Box>
        
        </Box>
        
        <ControllBar/>

       </Box>}
       {
       ! screenSharingVideo &&
       <Box sx={{ flexGrow: 1 , backgroundColor: '#101826' , display:'flex'  , flexDirection:'column' , border:' 1px solid #26303f'  
       }}>
         <Header/>
       <Grid
          container
          sx={{
            '--Grid-borderWidth': '1px',
            borderTop: 'var(--Grid-borderWidth) solid',
            borderLeft: 'var(--Grid-borderWidth) solid',
            borderColor: 'transparent',
            '& > div': {
              borderRight: 'var(--Grid-borderWidth) solid',
              borderBottom: 'var(--Grid-borderWidth) solid',
              borderColor: 'transparent',
            },
            
            height:'100%'
            
          }}
        >
        
      
        <Box sx={{  width:'100%', height:'100%' , display:'flex'  , flexDirection:'row' , padding:'0' , justifyContent:'center' , alignItems:'center'}}>
            <Grid height={432}  >
                  <VideoPlayer stream={stream}></VideoPlayer>
            </Grid>
       
            
          {Object.values(peers as PeerState).map((peer , index) => (
            // Ensure each iteration returns a valid React element
            
            <Grid key={index}  height={432}  >
                  {peer.stream && <VideoPlayer stream={peer.stream} />} 
            </Grid>
          ))}
        </Box>
      
    
        { showLeaveMessage && 
        <Box sx={{border:'2px solid red' , textAlign:'center', width:'max-content' 
            ,pl:'20px' , pr:'20px' , ml:'auto' , mr:'auto' , fontSize:'10px' ,   opacity: fadeMessage ? 1 : 0, 
            transition: 'opacity 2s ease' , zIndex:'1999' }}>
          <p>User leaved the call </p>
        </Box>}
        </Grid>
     

        <ControllBar/>

        </Box>
        }
   
    </>
    

   

  )
}
