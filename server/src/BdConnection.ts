import { AppDataSource } from "./ormconfig";
import { User } from "./entity/User";
import { Conversation } from "./entity/Conversation";
import { Call } from "./entity/Call";
import { Repository } from "typeorm";

let userRepository: Repository<User> | null = null;
let conversationRepository: Repository<Conversation> | null = null;
let historiccallRepository :  Repository<Call> | null = null;

AppDataSource.initialize().then(async () => {
  console.log("Data Source has been initialized!");

}).catch((err) => {
  console.error("Error during Data Source initialization:", err);
});


export const getUserRepository = () => AppDataSource.getRepository(User); 
export const getConversationRepository=()=>AppDataSource.getRepository(Conversation);
export const getHistoricCallRepository=()=>AppDataSource.getRepository(Call);