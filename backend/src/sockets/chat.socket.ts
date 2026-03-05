import type { Server, Socket } from "socket.io";

import { prisma } from "../db/client.js";

export const chatSocket = (io: Server, socket: Socket) => {
  socket.on(
    "join_conversation",
    async ({ conversationId }: { conversationId: string }) => {
      try {
        const conversation = await prisma.conversation.findUnique({
          where: { id: conversationId },
        });
        if (!conversation) {
          return socket.emit("error", { message: "Conversation not found" });
        }
        const userId = socket.data.userId;
        if (
          conversation.buyerId !== userId &&
          conversation.sellerId !== userId
        ) {
          return socket.emit("error", { message: "User not authenticated" });
        }
        socket.join(conversationId);
        console.log(`User ${socket.id} joined conversation ${conversationId}`);
        socket.emit("joined_conversation", { conversationId });
      } catch (error) {
        console.error(
          "Error occurred while handling join_conversation:",
          error,
        );
        socket.emit("error", {
          message: "An error occurred while joining the conversation",
        });
      }
    },
  );
  socket.on(
    "send_message",
    async ({
      content,
      conversationId,
    }: {
      content: string;
      conversationId: string;
    }) => {
      try {
        const userId = socket.data.userId;
        if (!userId) {
          return socket.emit("error", { message: "User not authenticated" });
        }
        const message = await prisma.message.create({
          data: {
            content,
            conversationId,
            senderId: userId,
          },
        });
        io.to(conversationId).emit("receive_message", { message });
      } catch (error) {
        console.error("Error occurred while sending message:", error);
        socket.emit("error", {
          message: "An error occurred while sending the message",
        });
      }
    },
  );
};
