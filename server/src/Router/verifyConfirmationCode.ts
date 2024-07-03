import { Router } from 'express';
import {verifyConfirmationCode}  from '../Controller/ConfirmationCodeController';

const router = Router();

router.use(verifyConfirmationCode) ;
router.post('/confirmationcode',verifyConfirmationCode) ;

export default router;