import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Send, User, Sparkles, Trash2, Lock } from "lucide-react";
import toast from "react-hot-toast";

const socket = io(import.meta.env.VITE_BACKEND_URL || "http://localhost:2050");

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on("initialMessages", (initialMessages) => {
      setMessages(initialMessages);
      scrollToBottom();
    });

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
      scrollToBottom();
    });

    socket.on("messageDeleted", (messageId) => {
      setMessages((prev) => prev.filter(msg => msg._id !== messageId));
    });

    socket.on("rateLimitError", (errMsg) => {
      toast.error(errMsg);
    });

    return () => {
      socket.off("initialMessages");
      socket.off("receiveMessage");
      socket.off("messageDeleted");
    };
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleJoin = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast.error("Please enter both Name and Password.");
      return;
    }
    
    setIsLoading(true);
    socket.emit("joinChat", { username: username.trim(), password: password.trim() }, (response) => {
      setIsLoading(false);
      if (response.success) {
        setIsJoined(true);
        toast.success(`Welcome to the chat, ${username}!`);
      } else {
        toast.error(response.message || "Failed to join chat");
      }
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    socket.emit("sendMessage", {
      content: content.trim()
    });

    setContent("");
  };

  const handleDeleteMessage = (messageId) => {
    socket.emit("deleteMessage", messageId);
  };

  if (!isJoined) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="glass-panel w-full max-w-md rounded-2xl p-8 animate-fade-in-up relative overflow-hidden">
          {/* Decorative blur blobs */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/5 rounded-full border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <Sparkles className="w-8 h-8 text-indigo-300" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2 text-center text-white">Join the Chat</h2>
            <p className="text-center text-gray-400 mb-8">Enter your name and a password</p>
            
            <form onSubmit={handleJoin} className="flex flex-col gap-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Your name..."
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  placeholder="Password..."
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-semibold rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Authenticating..." : "Enter Chat"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full p-4 md:p-6 h-[calc(100vh-73px)]">
      {/* Chat Messages Area */}
      <div className="flex-1 glass-panel rounded-2xl p-6 overflow-y-auto mb-4 custom-scrollbar flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        {messages.length === 0 ? (
          <div className="flex flex-col h-full items-center justify-center text-gray-400 gap-4 animate-fade-in-up">
            <Sparkles className="w-12 h-12 opacity-50" />
            <p className="text-lg">No messages yet. Break the ice!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {messages.map((msg, idx) => {
              const isMe = msg.sender === username;
              return (
                <div key={idx} className={`flex flex-col group ${isMe ? 'items-end' : 'items-start'} animate-fade-in-up`}>
                  <span className="text-xs text-gray-400 mb-1 px-1 font-medium tracking-wide">
                    {msg.sender}
                  </span>
                  <div className="flex items-center gap-2">
                    {/* Delete Icon (only shows on own messages when hovering) */}
                    {isMe && (
                      <button 
                        onClick={() => handleDeleteMessage(msg._id)}
                        className="p-2 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/5 rounded-full"
                        title="Delete Message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    
                    {/* Message Bubble */}
                    <div className={`px-5 py-3 rounded-2xl max-w-full break-words leading-relaxed ${
                      isMe 
                        ? 'glass-bubble-me rounded-tr-sm' 
                        : 'glass-bubble-other rounded-tl-sm'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message Input Form */}
      <form onSubmit={handleSendMessage} className="flex gap-3">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-5 py-4 glass-panel rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all shadow-lg"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          autoFocus
        />
        <button 
          type="submit" 
          disabled={!content.trim()}
          className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-full shadow-[0_0_15px_rgba(99,102,241,0.4)] disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Send className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
