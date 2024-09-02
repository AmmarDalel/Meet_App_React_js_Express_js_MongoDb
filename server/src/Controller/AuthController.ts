import { Request, Response } from 'express';
import { getUserRepository } from "../BdConnection";
import { User } from '../entity/User';
import { SendMailOptions, SentMessageInfo, createTransport } from 'nodemailer';

let userRepository = getUserRepository();
export const authenticate = async ( req:Request  , res:Response) => { 
    const { myFile , fullname, email  } = req.body;

    console.log('fullname : ', fullname) ;
    console.log('email : ', email) ;
    console.log('myFile : ', myFile) ;


    let user:User|null ;
    let user2:User|null ;
    
    user = await userRepository.findOne({ where: { fullName : fullname, email} });
    user2=await userRepository.findOne({where :  {email} }) ;

    if(user2 && !user){
      res.status(500).json({ message: 'Incorrect  Full name !' });
    }

    else if (!user) {
        user = new User();
        user.email = email;
        user.fullName = fullname;
      if(myFile) user.avatar=myFile ;
        await userRepository.save(user);
    }

    const confirmationCode = Math.floor(100000 + Math.random() * 900000).toString();

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
          transporter.sendMail(mailOptions, function(error: Error | null, info: SentMessageInfo){
            if (error) {
              if (error.message.includes('550 5.1.1')) {
                return res.status(500).json({ message: 'Email address not found or cannot receive messages' });
              } else {
                return res.status(500).json({ message: 'Failed to send confirmation email' });
              }
            } else {
              console.log('Email sent: ' + info.response);           
            }
          });
          user.confirmationCode=parseInt(confirmationCode) ;
          if(myFile) user.avatar=myFile ;
          await userRepository.save(user);
          res.status(200).json({ message: 'User successfully authenticated' ,user });
          return;
        }

    } catch (error) {
        res.status(500).json({ message: 'Error during user authentication' });
        return;
    }

  }
  
  export const CodeSend=async (req: Request, res: Response)=>{
    const {email}=req.body ;
    const user = await userRepository.findOne({ where: {email:email} });
    const confirmationCode = Math.floor(100000 + Math.random() * 900000).toString();

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
          transporter.sendMail(mailOptions, function(error: Error | null, info: SentMessageInfo){
            if (error) {
              if (error.message.includes('550 5.1.1')) {
                return res.status(500).json({ message: 'Email address not found or cannot receive messages' });
              } else {
                return res.status(500).json({ message: 'Failed to send confirmation email' });
              }
            } else {
              console.log('Email sent: ' + info.response);           
            }
          });
          user.confirmationCode=parseInt(confirmationCode) ;
          await userRepository.save(user);
          return res.status(200).json({ message: 'User successfully authenticated' ,user });
        }

    } catch (error) {
      return res.status(500).json({ message: 'Error during user authentication' });
    }

  }


  