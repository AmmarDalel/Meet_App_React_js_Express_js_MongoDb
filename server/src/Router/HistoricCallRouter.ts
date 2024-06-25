import { Router } from 'express';
import { HistoricCallController } from '../Controller//HistoriCallController';

const router = Router();

router.get('/HistoricCall', HistoricCallController.getAll);
router.get('/HistoricCall/:id', HistoricCallController.getById);
router.post('/HistoricCall/create', HistoricCallController.create);
router.get('/HistoricCall/delete/:id', HistoricCallController.delete);

export default router;
