import { Router } from 'express';
import {authenticate , CodeSend }  from '../Controller/AuthController';
const router = Router();

router.use(authenticate);
router.use(CodeSend);




router.post('/authenticate' ,authenticate);
//router.post('/SendAvatar' , upload, InitialiseAvatar) ;
//router.post('/hello',CodeSend );

export default router;