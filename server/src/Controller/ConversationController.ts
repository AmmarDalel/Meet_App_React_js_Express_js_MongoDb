import { Request, Response } from 'express';
import { Conversation } from '../entity/Conversation';
import { getConversationRepository } from "../BdConnection";
import { FindOneOptions } from 'typeorm';

let conversationRepository=getConversationRepository() ;

export class ConversationController {

  static getAll = async (req: Request, res: Response) => {
    try {
      if (conversationRepository) {
        const conversations = await conversationRepository.find();
        res.json(conversations);
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
      if (conversationRepository) {
        const conversation = await conversationRepository.findOne(id as FindOneOptions<Conversation>);
        if (!conversation) {
          res.status(404).json({ message: 'Conversation not found' });
        } else {
          res.json(conversation);
        }
      } else {
        res.status(500).json({ message: 'Repository not initialized' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  static create = async (req: Request, res: Response) => {
    const { message, timestamp, userId } = req.body;
    const conversation = new Conversation();
    conversation.message = message;
    conversation.timestamp = timestamp;
    // Assuming userId is provided in the request body
    conversation.user = userId;
    try {
      if (conversationRepository) {
        await conversationRepository.save(conversation);
        res.json(conversation);
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
      if (conversationRepository) {
        const conversation = await conversationRepository.findOne(id as FindOneOptions<Conversation>);
        if (!conversation) {
          res.status(404).json({ message: 'Conversation not found' });
        } else {
          await conversationRepository.remove(conversation);
          res.json({ message: 'Conversation deleted successfully' });
        }
      } else {
        res.status(500).json({ message: 'Repository not initialized' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}
