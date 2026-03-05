import express from "express";
import 'dotenv/config';
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from "cors";
import routes from "./routes/index.js";
import jwt from "jsonwebtoken";
import { chatSocket } from "./sockets/chat.socket.js";

const app = express();
const PORT = process.env.PORT;
const secretKey = process.env.JWT_SECRET!

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: { origin: '*' }
})

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error: No token provided"));
  }
  try {
    const decoded = jwt.verify(token, secretKey) as { userId: string };
    socket.data.userId = decoded.userId;
    next();
  } catch (error) {
    next(new Error("Authentication error: Invalid token"));
  }
})
 
io.on('connection', (socket) => {
  console.log('a user connected', socket.id)
  chatSocket(io, socket)
  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id)
  })
})



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1",routes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Fair Card API" });
});

app.use((_req, res) => {
  res.status(404).json({
    message: 'Route not found'
  })
})

app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err)

  res.status(err.status || 500).json({
    message: err.message || 'Internal server error'
  })
})

httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});