import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import authRoutes from "./Router/authRoutes";
import messagesrouter from "./Router/MessageRouter" ;
import verifyCodeRoutes from './Router/verifyConfirmationCode';
import userRoutes from './Router/UserRouter';
import CodeSendRoutes from './Router/CodeSendRoutes';
import roomRouter from './Router/RoomRoutes' ;
import "reflect-metadata";
import { RoomHandler } from "./Room";
import { videoCallController } from "./Controller/videoCallController";
import { v4 as uuidv4 } from "uuid"; 
import bodyParser from "body-parser";

// Créer une application express
const app = express();
const server = http.createServer(app);
const port = 5000;

// Configurer `socket.io`
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  } ,

});

 // Video Call Controller
 videoCallController(io);
// Charger les variables d'environnement
dotenv.config();

// Configurer les middlewares
const corsOptions = {
  origin: '*', // Remplacez par l'URL de votre front-end
  methods: ['GET', 'POST'], // Méthodes HTTP autorisées
  allowedHeaders:['Access-Control-Allow-Headers', 'Access-Control-Allow-Origin', 'Content-Type',] ,
  /*Le serveur doit répondre à cette requête OPTIONS avec les en-têtes CORS appropriés 
  (Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers, etc.)
   pour autoriser le navigateur à envoyer la vraie requête.
  optionsSuccessStatus: 200*/
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '100mb' })); // Augmenter la limite à 100mb
app.use(bodyParser.json({ limit: '100mb' })); // Augmenter la limite à 100mb
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true })); // Augmenter la limite à 100mb
app.use(cookieParser());
app.use('/api/users/authent', authRoutes);
app.use('/api/users/verifycode', verifyCodeRoutes);
app.use('/api/users/verifyuser', userRoutes);
app.use('/api/users/codesend', CodeSendRoutes);
app.use('/api/room/participants' ,roomRouter ) ;
app.use('/api/room/messages',messagesrouter) ;

const userSocketMap: { [key: string]: string } = {};


  // Route pour créer une salle
  app.post("/create-room", (req, res) => {
    const { socketId } = req.body; // Récupérer le socket.id du corps de la requête
    console.log('socketid from create-room : ',socketId)
    const roomId = uuidv4(); // Utilisez uuidv4 pour générer l'identifiant unique
    res.json({ roomId });
  });


io.on('connection', (socket: Socket) => {
  console.log("a user connected", socket.id)
  const userId = socket.handshake.query.userId
  console.log('userId : ',userId , 'socket.id : ', socket.id) ;
  if(userId=='null'){console.log('null') }
  else if(userId !== "undefined" && typeof userId === "string") {
    userSocketMap[userId] = socket.id
  }
  console.log('userSocketMap : ', userSocketMap) ;
   RoomHandler(socket) ;
   

});

export const getReceiverSocketId = (receiverId:string) => {
  console.log('receiverId : ',receiverId,' , receivesocketId : ',userSocketMap[receiverId]);
  return userSocketMap[receiverId] ;
}

// Démarrer le serveur
server.listen(port, () => console.log(`Server is running on port ${port}`));

export { app, server, io }
