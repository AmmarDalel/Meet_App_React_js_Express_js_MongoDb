
import { Router } from 'express';
import {getParticipantsInRoom}  from '../Controller/RoomController';

const router = Router();

router.use(getParticipantsInRoom);

router.post('/getParticipantsInRoom', getParticipantsInRoom);

export default router;