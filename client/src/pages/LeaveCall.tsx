import React from 'react'
import './LeaveCall.css' ;
import { Button } from '@mui/material';
import { fontWeight } from '@mui/system';

function LeaveCall() {
  return (
    <div className='leavecallcontainer'>
    <div >
        <h1 style={{ fontWeight: '600' }}>You have left the meeting</h1>
            <div className='container2'>
      <Button  variant="outlined"   sx={{
          fontSize: '12px',
          borderRadius: '8px',
          width: '182px',
          height:'50px',
          textTransform: 'none', // Remove uppercase

        }}
        
        >Rejoined the meeting</Button>
      <Button variant="contained" sx={{
          fontSize: '12px',
          borderRadius: '8px',
          width: '182px',
          height:'50px',
          textTransform: 'none', // Remove uppercase

        }} >Return to the home screen</Button>
    </div>
        </div>
    </div>
  )
}

export default LeaveCall