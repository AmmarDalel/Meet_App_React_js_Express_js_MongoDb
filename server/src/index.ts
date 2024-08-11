import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import authRoutes from "./Router/authRoutes";
import verifyCodeRoutes from './Router/verifyConfirmationCode';
import userRoutes from './Router/UserRouter';
import CodeSendRoutes from './Router/CodeSendRoutes';
import roomRouter from './Router/RoomRoutes' ;
import "reflect-metadata";
import Session from "express-session";
import { RoomHandler } from "./Room";
import { videoCallController } from "./Controller/videoCallController";
import { v4 as uuidv4 } from "uuid"; // Assurez-vous d'importer correctement uuid

// Créer une application express
const app = express();
const server = http.createServer(app);
const port = 5000;

// Configurer `socket.io`
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Stocker les utilisateurs dans une Map (Room ID => Set de User IDs)
const rooms = new Map<string, Set<string>>();


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

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/api/users/authent', authRoutes);
app.use('/api/users/verifycode', verifyCodeRoutes);
app.use('/api/users/verifyuser', userRoutes);
app.use('/api/users/codesend', CodeSendRoutes);
app.use('/api/room/participants' ,roomRouter ) ;


app.use(Session({
  secret: 'votre_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

  // Route pour créer une salle
  app.post("/create-room", (req, res) => {
    const roomId = uuidv4(); // Utilisez uuidv4 pour générer l'identifiant unique
    console.log(roomId)   ;
    res.json({ roomId });
  });


io.on('connection', (socket: Socket) => {
  console.log(`User connected: ${socket.id}`);
  RoomHandler(socket) ;

});
// Démarrer le serveur
server.listen(port, () => console.log(`Server is running on port ${port}`));


