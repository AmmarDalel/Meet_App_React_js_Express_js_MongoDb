import { Server } from "socket.io";
import { Request, Response } from "express";

export const videoCallController = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("join-room", (roomId, userId) => {
      socket.join(roomId);
      socket.to(roomId).emit("user-connected", userId);

      socket.on("disconnect", () => {
        socket.to(roomId).emit("user-disconnected", userId);
      });
    });
  });
};
