const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
})


// Définir les types pour les données des événements
interface CallUserData {
    userToCall: string;
    signalData: any;
    from: string;
    name: string;
  }
  
  interface AnswerCallData {
    to: string;
    signal: any;
  }

io.on("connection", (socket: { emit: (arg0: string, arg1: any) => void; id: any; on: (arg0: string, arg1: { (): void; (data: any): void; (data: any): void }) => void; broadcast: { emit: (arg0: string) => void } }) => {
	socket.emit("me", socket.id)

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
        console.log(typeof data) ;
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data)=> {
		io.to(data.to).emit("callAccepted", data.signal)
	})
})

server.listen(5000, () => console.log("server is running on port 5000"))