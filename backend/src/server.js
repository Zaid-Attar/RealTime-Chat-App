import express from "express"
import bodyParser from "body-parser"
import { connectDB } from "./config/db.js"  
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import Message from "./models/messageModel.js";
import User from "./models/userModel.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow frontend local dev origin
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5090;
const __dirname = path.resolve();

app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(bodyParser.json()); 

app.use((req, res, next) => {
  console.log(`[API] ${req.method} ${req.url}`);
  next();
});

// Socket.io connection logic
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  
  // Track authenticated user for this socket
  socket.username = null;
  socket.lastMessageTime = 0;

  socket.on("joinChat", async ({ username, password }, callback) => {
    try {
      let user = await User.findOne({ username });
      
      if (user) {
        // Verify password
        if (user.password !== password) {
          return callback({ success: false, message: "Incorrect password" });
        }
      } else {
        // Create new user
        user = new User({ username, password });
        await user.save();
      }

      // Store username in socket session
      socket.username = username;
      callback({ success: true });

      // Send last 50 messages to the user when they successfully join
      const messages = await Message.find().sort({ createdAt: 1 }).limit(50); 
      socket.emit("initialMessages", messages);

    } catch (error) {
      console.error("Error during joinChat:", error);
      callback({ success: false, message: "Server error" });
    }
  });

  socket.on("sendMessage", async (data) => {
    if (!socket.username) return; // Unauthenticated
    
    // Rate Limiter: maximum 1 message per second
    const now = Date.now();
    if (now - socket.lastMessageTime < 1000) {
      socket.emit("rateLimitError", "Whoa, slow down! Please wait a second before sending another message.");
      return;
    }
    socket.lastMessageTime = now;

    try {
      const newMessage = new Message({
        sender: socket.username, // Force sender to be the authenticated username
        content: data.content,
      });
      await newMessage.save();

      io.emit("receiveMessage", newMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("deleteMessage", async (messageId) => {
    if (!socket.username) return;

    try {
      const message = await Message.findById(messageId);
      if (!message) return;

      // Only allow deleting if they are the sender
      if (message.sender === socket.username) {
        await Message.findByIdAndDelete(messageId);
        io.emit("messageDeleted", messageId);
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.use(express.static(path.join(__dirname,"../frontend/dist")));

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
});  

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on Port : ${PORT}`);
  });
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});