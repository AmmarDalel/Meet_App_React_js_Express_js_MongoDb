import { Request, Response } from 'express';
import { HistoricCall } from '../entity/HistoricCall';

import {getHistoricCallRepository } from "../BdConnection";
import { FindOneOptions } from 'typeorm';

let historicCallRepository =getHistoricCallRepository() ;

export class HistoricCallController {
  static getAll = async (req: Request, res: Response) => {
    try {
      if (historicCallRepository) {
        const historicCalls = await historicCallRepository.find();
        res.json(historicCalls);
      } else {
        res.status(500).json({ message: 'Repository not initialized' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const id = req.params.id || 0;
    try {
      if (historicCallRepository) {
        const historicCall = await historicCallRepository.findOne(id as FindOneOptions<HistoricCall>);
        if (!historicCall) {
          res.status(404).json({ message: 'Historic call not found' });
        } else {
          res.json(historicCall);
        }
      } else {
        res.status(500).json({ message: 'Repository not initialized' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  static create = async (req: Request, res: Response) => {
    const { callType, timestamp, duration, userId } = req.body;
    const historicCall = new HistoricCall();
    historicCall.callType = callType;
    historicCall.timestamp = timestamp;
    historicCall.duration = duration;
    // Assuming userId is provided in the request body
    historicCall.user = userId;
    try {
      if (historicCallRepository) {
        await historicCallRepository.save(historicCall);
        res.json(historicCall);
      } else {
        res.status(500).json({ message: 'Repository not initialized' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  static delete = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      if (historicCallRepository) {
        const historicCall = await historicCallRepository.findOne(id as FindOneOptions<HistoricCall>);
        if (!historicCall) {
          res.status(404).json({ message: 'Historic call not found' });
        } else {
          await historicCallRepository.remove(historicCall);
          res.json({ message: 'Historic call deleted successfully' });
        }
      } else {
        res.status(500).json({ message: 'Repository not initialized' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}

export default HistoricCallController ;
