import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import authRoutes from "./Router/authRoutes";
import verifyCodeRoutes from './Router/verifyConfirmationCode';
import userRoutes from './Router/UserRouter';
import "reflect-metadata";
import Session from "express-session";
import { callHandler } from "./Call";

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

// Gérer les événements de connexion
io.on("connection", (socket) => {
  console.log('user is connected');
  callHandler(socket) ;
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Charger les variables d'environnement
dotenv.config();

// Configurer les middlewares
const corsOptions = {
  origin: 'http://localhost:5173', // Remplacez par l'URL de votre front-end
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

app.use(Session({
  secret: 'votre_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

// Démarrer le serveur
server.listen(port, () => console.log(`Server is running on port ${port}`));
