import express from "express";
import http from "http";
import dotenv from'dotenv' ;
import { Server } from "socket.io";  // Importer le type `Server` de `socket.io`
import authRoutes from "./Router/authRoutes";
import verifyCodeRoutes from './Router/verifyConfirmationCode' ;
import userRoutes from './Router/UserRouter' ;
import "reflect-metadata";
import cors from "cors";
import  Session  from "express-session";
import cookieParser from 'cookie-parser';

// Créer une application express
const app = express();
const server = http.createServer(app);
const port = 5000;

//pour accéder au var d'environnements situées dans le fichier .env
dotenv.config();


// Utiliser le router
//app.use("/api/users",authRoutes);

let options={
  origin: 'http://localhost:5173', // Remplacez par l'URL de votre front-end
  methods: ['GET', 'POST'], // Méthodes HTTP autorisées
  allowedHeaders:['Access-Control-Allow-Headers', 'Access-Control-Allow-Origin', 'Content-Type',] ,
  /*Le serveur doit répondre à cette requête OPTIONS avec les en-têtes CORS appropriés 
  (Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers, etc.)
   pour autoriser le navigateur à envoyer la vraie requête.
  optionsSuccessStatus: 200*/
}

app.use(express.json());
app.use(cors(options));
app.use(cookieParser());

//app.options('*', cors()); // include before other routes

app.use('/api/users/authent',authRoutes);
app.use('/api/users/verifycode' ,verifyCodeRoutes) ;
app.use('/api/users/verifyuser',userRoutes) ;

app.use(Session({
  secret: 'votre_secret',
  resave:false,
  saveUninitialized:false,
  cookie:{
    secure:false,
    maxAge:1000*60*60*24
  }

}))

// Configurer `socket.io` avec les types appropriés
const io = new Server(server, {
	cors: {
		origin: "http://localhost:5173/",
		methods: ["GET", "POST"] ,

	}
});

// Définir les types pour les sockets
interface SocketData {
  emit(event: string, data: any): void;
  id: string;
  on(event: string, callback: () => void): void;
  on(event: string, callback: (data: any) => void): void;
  broadcast: {
    emit(event: string): void;
  };
}

// Gérer les événements de connexion
/*io.on("connection", (socket: SocketData) => {
  const id=socket.id ;
  console.log(id)
  // Émettre l'ID du socket au client
  socket.emit("me", id);

  // Gérer la déconnexion du client
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    socket.broadcast.emit("callEnded");
  });
});
*/

// Démarrer le serveur
server.listen(port, () => console.log(`Server is running on port ${port}`));
