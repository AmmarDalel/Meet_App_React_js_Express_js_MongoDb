import { Request, Response } from 'express';
import { getUserRepository } from "../BdConnection";
import { User } from '../entity/User';
import { SendMailOptions, SentMessageInfo, createTransport } from 'nodemailer';

let userRepository = getUserRepository();

export const authenticate = async (req: Request, res: Response) => {  
    const { fullName, email } = req.body;
    let user:User|null ;
    let user2:User|null ;

    user = await userRepository.findOne({ where: { fullName , email} });
    user2=await userRepository.findOne({where :  {email} }) ;

    let s=user2 && !user ;
    let s2=!user ;

    console.log(s);
    console.log(s2);


    if(user2 && !user){
      res.status(500).json({ message: 'Incorrect  Full name !' });

    }

    else if (!user) {
        user = new User();
        user.email = email;
        user.fullName = fullName;
        await userRepository.save(user);
    }

    const confirmationCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(confirmationCode);

    try {
       //send email to the user
        //with the function coming from the mailing.js file
        //message containing the user id and the token to help verify their email
         // Send email (use credintials of SendGrid)
         const transporter = createTransport({
          service: process.env.SMTP_SERVICE,
          host:  process.env.SMTP_HOST,
          port: 587,
          secure: true,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });
        
       if(user){
          const mailOptions: SendMailOptions = {
            from: 'ammardalel07@gmail.com',
            to: user.email ,
            subject: 'Virtual Meeting ',
            text: `Confirmation code: ${confirmationCode}`,
          };
          console.log('mailOptions : ',mailOptions)
          transporter.sendMail(mailOptions, function(error: Error | null, info: SentMessageInfo){
            console.log(error)
            if (error) {
              console.log('----------',error);
              if (error.message.includes('550 5.1.1')) {
                return res.status(500).json({ message: 'Email address not found or cannot receive messages' });
              } else {
                return res.status(500).json({ message: 'Failed to send confirmation email' });
              }
            } else {
              console.log('Email sent: ' + info.response);
               // Vérifier si l'erreur est due à une adresse email introuvable
           
            }
          });
          user.confirmationCode=parseInt(confirmationCode) ;
          await userRepository.save(user);

          console.log('Email sent: ' + res);
          res.status(200).json({ message: 'User successfully authenticated' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Error during user authentication' });
    }

  }


  