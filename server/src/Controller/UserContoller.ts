import { Request, Response } from 'express';
import { User } from '../entity/User';

import { getUserRepository } from "../BdConnection";
import { FindOneOptions } from 'typeorm';

let userRepository = getUserRepository();


export const getByEmailName = async (req: Request, res: Response) => {
  const { fullName, email } = req.body;
  console.log('req.body : ',req.body) ;

  console.log('from getByEmail !!!!!!');
  console.log(email) ;
  console.log(fullName) ;
  try {
      if(userRepository!=null){

      const user = await userRepository.findOne({ where: { fullName , email} });     
      if (!user) {
        console.log('User not found');
      res.status(404).json({ message: 'User not found' });
    } else {
      console.log('User from get user ' , user);
      res.json(user);
    }
  }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
  
  export const getAll = async (req: Request, res: Response) => {

    if(userRepository!=null){
        const users = await userRepository.find();
        res.json(users);
    }

     

  };

  export const update = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { name, email } = req.body;
    let user;
    try {
      user = await userRepository.findOneOrFail(id as FindOneOptions<User>);
      user.fullName = name;
      user.email = email;
      await userRepository.save(user);
    } catch (error) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  };

  export const getById = async (req: Request, res: Response) => {
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

  export const create = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    const user = new User();
    user.fullName = name;
    user.email = email;
    if(userRepository!=null){

    await userRepository.save(user);
    res.json(user);
    }
  };

  export const delet = async (req: Request, res: Response) => {
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

  export const updateConfirmationCode = async (req: Request, res: Response) => {
    const { email, confirmationCode } = req.body;

        try {
          let user = await userRepository.findOne({ where: { email } });

          if (!user) {
            // Si l'utilisateur n'existe pas, le créer avec le code de confirmation
            user = new User();
            user.email = email;
            user.confirmationCode = confirmationCode;
            await userRepository.save(user); // Enregistrer l'utilisateur dans la base de données
            } else {
                // Si l'utilisateur existe, mettre à jour le code de confirmation
                user.confirmationCode = confirmationCode;
                await userRepository.save(user);  // Mettre à jour l'utilisateur dans la base de données
            }
            // Mettre à jour le code de confirmation
            user.confirmationCode = confirmationCode;
            await userRepository.save(user);

            res.status(200).json({ message: 'Code de confirmation mis à jour avec succès' });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du code de confirmation :', error);
            res.status(500).json({ message: 'Erreur lors de la mise à jour du code de confirmation' });
        }
  };

  

