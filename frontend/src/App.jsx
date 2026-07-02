import { Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import { Toaster } from "react-hot-toast";
import "./index.css";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-gray-100 font-sans selection:bg-indigo-500/30">
      <Navbar />
      <Toaster 
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#fff',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<ChatPage />} />
      </Routes>
    </div>
  );
};

export default App;