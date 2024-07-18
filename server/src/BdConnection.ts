import { AppDataSource } from "./ormconfig";
import { User } from "./entity/User";
import { Conversation } from "./entity/Conversation";
import { Call } from "./entity/Call";
import { Room } from "./entity/Room";
import { Message } from "./entity/Message";


AppDataSource.initialize().then(async () => {
  console.log("Data Source has been initialized!");

}).catch((err) => {
  console.error("Error during Data Source initialization:", err);
});


export const getUserRepository = () => AppDataSource.getRepository(User); 
export const getConversationRepository=()=>AppDataSource.getRepository(Conversation);
export const getHistoricCallRepository=()=>AppDataSource.getRepository(Call);
export const getRoomRepository=()=>AppDataSource.getRepository(Room);
export const getMessageRepository=()=>AppDataSource.getRepository(Message);