import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { useState } from 'react';

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function InputSlider() {
  const [value, setValue] = useState(30);
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };



  return (
    <div style={{width:'100%' ,paddingLeft:'10px', paddingRight:'20px'}}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <VolumeUp />
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
    
      </Grid>
    </div>
  );
}
