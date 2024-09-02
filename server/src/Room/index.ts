import { Socket } from "socket.io";
import { v4 as uuidV4 } from "uuid";
import { AddParticipant, CreateRoom, LeaveParticipant } from "../Controller/RoomController";

const rooms: Record<string, string[]> = {};

interface IJoinRoom {
    roomId: string;
    peerId: string;
    email: string;
}

interface IRoomParams {
    roomId: string;
    peerId: string;
    duration: string;
}

interface ICreateRoom {
    userId: any;
    peerId: string;
    email: string;
}

export const RoomHandler = (socket: Socket) => {

    const createRoom = async ({ userId, peerId, email }: ICreateRoom) => {
        const roomId = uuidV4();
        rooms[roomId] = [];
        rooms[roomId].push(peerId);
        try {
            await CreateRoom(email, peerId, roomId);
        } catch (error) {
            console.log(error);
        }
        socket.emit('room-created', { roomId });
    };

    const joinRoom = async ({ roomId, peerId, email }: IJoinRoom) => {
        if (rooms[roomId]) {
            rooms[roomId].push(peerId);
            socket.join(roomId);

            socket.broadcast.emit("user-joined", peerId);

            await AddParticipant(email, peerId, roomId);
            socket.emit('get-users', {
                roomId,
                participants: rooms[roomId],
            });
        }
    };

    const leaveRoom = async ({ roomId, peerId, duration }: IRoomParams) => {
        socket.on('disconnect', async () => {
            rooms[roomId] = rooms[roomId].filter((id) => id !== peerId);
           const participant= await LeaveParticipant(peerId, roomId, duration);
            socket.to(roomId).emit("user-disconnected", {peerId , participant});
        });
    };

    const startSharing = async ({ roomId, peerId }: { roomId: string, peerId: string }) => {
       // console.log("user-started-sharing", peerId, ' roomId : ', roomId);
        try {
            socket.broadcast.emit("user-started-sharing", peerId);
        } catch (error) {
            console.log(error);
        }
    };

    const stopSharing = async (roomId: string) => {
      //  console.log("user-stop-sharing, roomId : ", roomId , typeof socket.rooms);
        socket.to(roomId).emit("user-Stopp");
    };

   

    socket.on('create-room', createRoom);
    socket.on('join-room', joinRoom);
    socket.on('user-leaved', leaveRoom);
    socket.on('start-sharing', startSharing);
    socket.on('stop-sharing', stopSharing);

    
};
