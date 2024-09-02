import React from 'react'
import  { AppsIcon, TabHeaderButton, UserIcon } from './TabHeader';
import PersonIcon from '@mui/icons-material/Person';

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
          <TabHeaderButton  icon={participantsbutton ? <PersonIcon/> : <UserIcon/> } event={participantsHandler}title='Participants'   color={participantsbutton ? '#2d8cff' : 'transparent'}  textcolor={participantsbutton ? 'white' : '#9ca3af'} />
          <TabHeaderButton icon={<AppsIcon/>} event={appsHandler} title='Apps'   color={participantsbutton ? 'transparent' : '#2d8cff'} textcolor={participantsbutton ? '#9ca3af' : 'white'}/>
        </div>
      </div>
    )
  }
export default TabHeader