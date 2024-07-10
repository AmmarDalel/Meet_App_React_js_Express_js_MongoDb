import { Router } from 'express';
import { getByEmailName } from '../Controller/UserContoller';

const router = Router();


router.post('/getuser',getByEmailName);


export default router;
