import { Call } from '../entity/Call';
import { getUserRepository ,getHistoricCallRepository} from '../BdConnection';

let userRepository = getUserRepository();
let historicCallRepository=getHistoricCallRepository() ;

export const createHistoricCall = async ( callId:string ) => {
  console.log('from create historiccall')

  // Obtenir les repositories nécessaires
  //console.log('userid :', userid) ;
    try{
    
    const historiccalltest = await historicCallRepository.find({ where: { callId: callId } });
    console.log('historic call search : ',historiccalltest) ;
    if(historiccalltest.length==0){
      

      // Créer une nouvelle instance de HistoricCall
      const newHistoricCall = new Call();
      newHistoricCall.callType = 'video';
      newHistoricCall.callId = callId;
      newHistoricCall.endTime = new Date();
      newHistoricCall.duration = 3600; // durée en secondes
    
      //console.log('user from historic call controller : ',  newHistoricCall.users)



      // Enregistrer la nouvelle instance de HistoricCall
    try{
      await historicCallRepository.save(newHistoricCall);
    }
    catch(error){
      console.log(error) ;
    }

      console.log('New HistoricCall created with ID:', newHistoricCall.id);
      
    }

    console.log('Historic call exist ') ;
    }
    catch(error){
      console.log(error)
    }

  
};

export const AddUser = async (callId: string, userId: any, PeerId: string) => {
  try {
    // Trouver l'utilisateur pour l'association ManyToOne
    const user = await userRepository.findOne(userId);
    if (!user) {
      console.log('User not found');
      return;
    }

   

  } catch (error) {
    console.log('Error:', error);
  }
};
