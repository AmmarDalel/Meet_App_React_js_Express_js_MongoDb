import './Sidebar.css';
import  { AppsIcon, Button, UserIcon } from './TabHeader';
import './Form.css' ;
import { useContext, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import VideocamIcon from '@mui/icons-material/Videocam';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import image from '../../assets/avatar/image.png'
import { ParticipantsContext, ParticipantsProvider } from '../../Data/participants';
import { RootState } from '../../Redux/Store';
import { useSelector } from 'react-redux';

function RightSidebar({children}:{children:any}) {
  var [participantsbutton , setParticipantsbutton]=useState(false) ;

  return(
   participantsbutton? <ParticipantsProvider><Participants setParticipants={setParticipantsbutton} participantsbutton={participantsbutton}/> </ParticipantsProvider>
   : <Apps  children={children} setParticipants={setParticipantsbutton} participantsbutton={participantsbutton}/> 
                     
  )
 
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));


  function BadgeAvatars() {
  return (
    <Stack direction="row" spacing={2}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <Avatar alt="Remy Sharp" src={image} />
      </StyledBadge>
     
    </Stack>
  );
}




function TabHeader({participantsbutton , setParticipants}:any){

  const participantsHandler=()=>{
    setParticipants(true);
  }
  const appsHandler=()=>{

    setParticipants(false);
  }
  return (
    <div className='tabheadercontainer'>
      <div className='componentbuttoncontainer'>

        <Button  icon={participantsbutton ? <PersonIcon/> : <UserIcon/> } event={participantsHandler}title='Participants'   color={participantsbutton ? '#2d8cff' : 'transparent'}  textcolor={participantsbutton ? 'white' : '#9ca3af'} />
        <Button icon={<AppsIcon/>} event={appsHandler} title='Apps'   color={participantsbutton ? 'transparent' : '#2d8cff'} textcolor={participantsbutton ? '#9ca3af' : 'white'}/>

      </div>
    </div>
  )
}






export function Apps({children , participantsbutton , setParticipants}:{children:any , participantsbutton :any , setParticipants : any}){
  const roomId=useSelector((state:RootState)=>state.user.callId);

  return (
    <div className='sidebarcontainer'>
{      roomId ? <TabHeader participantsbutton={participantsbutton}  setParticipants ={setParticipants}/> :<></>
}      <div className='titlecontainer'>
            <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.6176 0.246615C5.52021 0.249454 5.42775 0.290081 5.35979 0.359897L0.484791 5.2349C0.414492 5.30522 0.375 5.40059 0.375 5.50003C0.375 5.59947 0.414492 5.69484 0.484791 5.76517L5.35979 10.6402C5.39435 10.6762 5.43573 10.7049 5.48153 10.7247C5.52733 10.7445 5.57662 10.7549 5.62651 10.7554C5.6764 10.7559 5.72589 10.7465 5.77208 10.7276C5.81827 10.7088 5.86023 10.6809 5.89551 10.6456C5.93079 10.6103 5.95867 10.5684 5.97753 10.5222C5.99639 10.476 6.00584 10.4265 6.00534 10.3766C6.00483 10.3267 5.99437 10.2774 5.97458 10.2316C5.95479 10.1858 5.92605 10.1444 5.89006 10.1099L1.2802 5.50003L5.89006 0.89017C5.94416 0.837481 5.9811 0.769688 5.99603 0.695661C6.01097 0.621635 6.0032 0.544824 5.97376 0.475282C5.94432 0.40574 5.89457 0.346706 5.83102 0.305907C5.76747 0.265107 5.69309 0.244441 5.6176 0.246615Z" fill="#6B7280"/>
            </svg>
            <p>Registration Form</p>
        </div>
        <header className='formheader'>
                <h2>Building your immersive portfolio using virtual words</h2>
                <h4>​In this interactive event, we will talk about how virtual worlds can be the next medium to deliver immersive portfolio for designers, photographer, & story tellers.</h4>
           </header>

           {children}
    </div>
  )
}

function Participants({ participantsbutton , setParticipants}:{ participantsbutton :any , setParticipants : any}){
  //const { participants} = useParticipants();
  try{
    const {participants} = useContext(ParticipantsContext);

    return (
      <div className='sidebarcontainer'>
        <TabHeader participantsbutton={participantsbutton}  setParticipants ={setParticipants}/>
       <div className='participantslist'>
       {participants.map((participant:any, index:any) => (
            // Affichage des détails du participant avec le composant Participant
            <Participant key={index} name={participant.name} />
          ))}
       </div>
      </div>
    )

  }



  catch(error){
    console.log(error)
  }


 
}

function Participant({name}:{name:string}){

  return( 
    
    <div className='participantcontainer'>
        <div id='content'>
          <BadgeAvatars/>
          <p className='participantname'>{name}</p>
          <div className='participantcontroll'>
          <KeyboardVoiceIcon />
          <VideocamIcon/>

          </div>
        </div>
    </div>
  )
}

export default RightSidebar