# ChatterBox - RealTime Chat App 💬✨

### Internship Details
- **Company:** CODTECH IT Solutions Pvt. Ltd.
- **Role:** MERN Stack Web Development Intern
- **Intern ID:** CITS1761

---

A stunning, state-of-the-art RealTime Chat application built on the MERN stack with Socket.io. Features a premium glassmorphic UI, real-time messaging, password authentication, and the ability to delete your own messages.


## 🚀 Features

- **Real-Time Messaging**: Powered by Socket.io for instantaneous communication.
- **Premium Glassmorphic UI**: Beautiful deep space gradients, frosted glass panels, glowing buttons, and micro-animations for a "Wow" factor.
- **Secure Identity**: Automatic password-protected login ensures nobody can impersonate you.
- **Message Deletion**: Users can delete their own messages instantly, removing them from the database and everyone else's screens in real-time.
- **Spam Protection**: Built-in WebSocket rate limiter prevents users from flooding the chat.
- **Persistent History**: All messages are securely saved in MongoDB Atlas.

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS** + **DaisyUI**
- **Socket.io-Client**
- **Lucide React** (Icons)
- **Google Fonts** (Outfit)

### Backend
- **Node.js** & **Express.js**
- **Socket.io**
- **MongoDB** & **Mongoose**

---

## 💻 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Backend Setup
Navigate to the backend directory, install dependencies, and run the server:
```bash
cd backend
npm install
npm run dev
```
*(Ensure you have a `.env` file in the `backend` folder with your `MONGO_URI` and `PORT=2050`)*

### 2. Frontend Setup
Open a new terminal window, navigate to the frontend directory, install dependencies, and run the Vite dev server:
```bash
cd frontend
npm install
npm run dev
```

### 3. Usage
- Open your browser and navigate to `http://localhost:5173`.
- Enter a Display Name and a Password to securely join the chat.
- Start chatting! Hover over your own messages to reveal the Trash icon and delete them.

