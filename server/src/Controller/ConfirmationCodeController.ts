import { Request, Response } from 'express';
import { getUserRepository } from "../BdConnection";

let userRepository = getUserRepository();

// Route pour vérifier le code de confirmation
export const verifyConfirmationCode = async (req: Request, res: Response) => {
    const { email, confirmationCode } = req.body;
    console.log('from verify confirmation code method')
    try {
        // Trouver l'utilisateur par son email
        let user = await userRepository.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        console.log(confirmationCode) ;
        console.log(email) ;

        // Vérifier si le code de confirmation correspond
        if (user.confirmationCode == confirmationCode) {
            return res.status(200).json({ message: 'Code de confirmation correct, utilisateur confirmé' });
        } else {
            return res.status(400).json({ message: 'Code de confirmation incorrect' });
        }

    } catch (error) {
        console.error('Erreur lors de la vérification du code de confirmation :', error);
        res.status(500).json({ message: 'Erreur lors de la vérification du code de confirmation' });
    }
};

