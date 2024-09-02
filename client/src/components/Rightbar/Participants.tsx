import React, { useContext, useEffect, useState } from 'react';
import { ParticipantsContext } from '../../Data/participants';
import { SocketContext } from '../../Context/SocketIo';
import TabHeader from './TabHeader2';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import Participant from './Participant';

function Participants({ participantsbutton, setParticipants }: { participantsbutton: any; setParticipants: any }) {
  const { participants, userId } = useContext(ParticipantsContext);
  const { userleavethecall, stream } = useContext(SocketContext);
  const [ParticipantList, setParticipantList] = useState<string[]>([]);
  const [VideoTracks, setVideoTracks] = useState(false);
  const [AudioTracks, setAudioTracks] = useState(false);
  const [hostvideoTracks, setHostVideoTracks] = useState(false);
  const [hostaudioTracks, setHostAudioTracks] = useState(false);

  useEffect(() => {
    try {
      stream.getVideoTracks().forEach((track) => setHostVideoTracks(track.enabled));
    } catch (error) {
      setHostVideoTracks(false);
      console.log(error);
    }
    try {
      stream.getAudioTracks().forEach((track) => setHostAudioTracks(track.enabled));
    } catch (error) {
      setHostAudioTracks(false);
      console.log(error);
    }
  }, [stream]);

  useEffect(() => {
    setParticipantList(participants);
    console.log('Participants from sidebar:', participants);
  }, [participants]);

  useEffect(() => {
    console.log('User left the call:', userleavethecall);
  }, [userleavethecall]);

  return (
    <div className="sidebarcontainer">
      <TabHeader participantsbutton={participantsbutton} setParticipants={setParticipants} />
      <div className="participantslist">
        {ParticipantList.map((participant: any, index: any) => (
          <React.Fragment key={index}>
            {participant.id === userId ? (
              <Participant
                name={participant.fullName}
                color="#44b700"
                avatar={participant.avatar}
                audioTracks={hostaudioTracks}
                videoTracks={hostvideoTracks}
              />
            ) : (
              <Participant
                name={participant.fullName}
                color="#44b700"
                avatar={participant.avatar}
                audioTracks={AudioTracks}
                videoTracks={VideoTracks}
              />
            )}
          </React.Fragment>
        ))}
        {userleavethecall && (
          <Participant
            name={userleavethecall.fullName}
            color="red"
            avatar={userleavethecall.avatar}
            videoTracks={false}
            audioTracks={false}
          />
        )}
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'end', paddingRight: '4%', marginTop: '10%' }}>
        <Button
          variant="outlined"
          sx={{
            fontSize: '12px',
            borderRadius: '8px',
            width: 'max-content',
            height: '30px',
            textTransform: 'none',
            paddingLeft: '20px',
          }}
        >
          Invite
        </Button>
      </Box>
    </div>
  );
}

export default Participants;
