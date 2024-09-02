import React from 'react'

import VideocamIcon from '@mui/icons-material/Videocam';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicOffIcon from '@mui/icons-material/MicOff';

const StyledBadge = styled(Badge)(({ theme , color }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: color,
      color: color,
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
  
    function BadgeAvatars({ badgeColor , avatar , name}:{ badgeColor:any , avatar:string , name:string}) {
    return (
      <Stack direction="row" spacing={2}>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot" 
          color={badgeColor}
        >
          <Avatar alt={name} src={avatar} />
        </StyledBadge>
       
      </Stack>
    );
  }
  
function Participant({name , color, audioTracks , videoTracks , avatar}:{name:string , color:string , audioTracks:boolean , videoTracks : boolean  , avatar:string}){

    return( 
      <div className='participantcontainer'>
          <div id='content'>
            <BadgeAvatars badgeColor={color} avatar={avatar} name={name}/>
            <p className='participantname'>{name}</p>
            <div className='participantcontroll'>
              {audioTracks ? <KeyboardVoiceIcon /> :<MicOffIcon/>}
              {videoTracks ? <VideocamIcon/> : <VideocamOffIcon/>}
            </div>
          </div>
      </div>
    )
  }

export default Participant