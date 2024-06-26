import express from "express";
import http from "http";
import { Server } from "socket.io";  // Importer le type `Server` de `socket.io`
import router from "./Router/UserRouter";
import "reflect-metadata";

// Créer une application express
const app = express();
const server = http.createServer(app);
const port = 5000;

// Utiliser le router
app.use(router);

// Configurer `socket.io` avec les types appropriés
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"]
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
io.on("connection", (socket: SocketData) => {
  console.log(`Client connected: ${socket.id}`);

  // Émettre l'ID du socket au client
  socket.emit("me", socket.id);

  // Gérer la déconnexion du client
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    socket.broadcast.emit("callEnded");
  });
});

// Démarrer le serveur
server.listen(port, () => console.log(`Server is running on port ${port}`));




/*import "reflect-metadata";
import express  from "express";

import router from "./Router/UserRouter";

const app = express();
const port = 3000;

app.use(router);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

*/