import { Request, Response } from 'express';
import { User } from '../entity/User';

import { getUserRepository } from "../BdConnection";
import { FindOneOptions } from 'typeorm';

let userRepository = getUserRepository();

// Utilisez userRepository comme vous en avez besoin ici


export class UserController {
  static getAll = async (req: Request, res: Response) => {

    if(userRepository!=null){
        const users = await userRepository.find();
        res.json(users);
    }

     

  };



  static update = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { name, email } = req.body;
    let user;
    try {
      user = await userRepository.findOneOrFail(id as FindOneOptions<User>);
      user.firstName = name;
      user.email = email;
      await userRepository.save(user);
    } catch (error) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  };

  static getById = async (req: Request, res: Response) => {
    const id = req.params.id || 0 ;
    try {
        if(userRepository!=null){

      const user = await userRepository.findOne(id as FindOneOptions<User>);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json(user);
      }
    }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  

  static create = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    const user = new User();
    user.firstName = name;
    user.email = email;
    if(userRepository!=null){

    await userRepository.save(user);
    res.json(user);
    }
  };

  static delete = async (req: Request, res: Response) => {
    const id = req.params.id;
    let user: User;
    console.log("hello from delete user")
    try {
      user = await userRepository.findOneOrFail(id as FindOneOptions<User>);
      await userRepository.remove(user);
    } catch (error) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  };

  
}
