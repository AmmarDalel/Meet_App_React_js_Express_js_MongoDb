import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useContext } from 'react';
import { SocketContext } from '../../Context/SocketIo';


function Header() {

    const {timeElapsed}=useContext(SocketContext) ;
    const formatTime = (timeInSeconds:any) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
      
        return [
          hours.toString().padStart(2, '0'),
          minutes.toString().padStart(2, '0'),
          seconds.toString().padStart(2, '0')
        ].join(':');
      };
      
    
  return (

    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" sx={{ flexGrow: 1 , backgroundColor:'#17202E' ,border: '2px solid #26303f'
}}>
      <Toolbar sx={{display:'flex', justifyContent:'end' }}>
       <Box  sx={{  backgroundColor:'#26303f' , width:'10%' , height:'35px' , borderRadius: '7px', display:'flex', alignItems:'center', padding:'7px',
}} >
            <RadioButtonCheckedIcon sx={{ mr: 1  }} />
            
            <p style={{fontSize:'14px'}}>{formatTime(timeElapsed)}</p>
       </Box>
       
        
      </Toolbar>
    </AppBar>
  </Box>

  )
}

export default Header