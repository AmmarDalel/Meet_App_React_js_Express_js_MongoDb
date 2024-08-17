import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useState, useContext, useEffect, useRef } from 'react';
import { SocketContext } from '../../../Context/SocketIo';

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function InputSlider() {
  const { peers } = useContext(SocketContext);
  const [value, setValue] = useState(30);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRefs = useRef<Map<string, GainNode>>(new Map());

  useEffect(() => {
    audioContextRef.current = new AudioContext();

    Object.entries(peers).forEach(([peerId, peerStream]) => {
      if (peerStream instanceof MediaStream) {
        const gainNode = audioContextRef.current!.createGain();
        const source = audioContextRef.current!.createMediaStreamSource(peerStream);
        source.connect(gainNode);
        gainNode.connect(audioContextRef.current!.destination);
        gainNode.gain.value = value / 100;
        gainNodeRefs.current.set(peerId, gainNode);
      }
    });

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [peers, value]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handleVolumeChange = (event: any, newValue: number) => {
    setValue(newValue);
    gainNodeRefs.current.forEach((gainNode) => {
      gainNode.gain.value = newValue / 100;
    });
  };

  return (
    <div style={{ width: '100%', paddingLeft: '10px', paddingRight: '20px' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          {value > 0 ? <VolumeUp /> : <VolumeOffIcon />}
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            onChangeCommitted={handleVolumeChange}
            aria-labelledby="input-slider"
          />
        </Grid>
      </Grid>
    </div>
  );
}
