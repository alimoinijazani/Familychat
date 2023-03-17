import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext, socket } from './context/appContext';
import { useState } from 'react';
function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});

  return (
    <>
      <div className="layout-container">
        <AppContext.Provider
          value={{
            socket,
            currentRoom,
            setCurrentRoom,
            members,
            setMembers,
            messages,
            setMessages,
            privateMemberMsg,
            setPrivateMemberMsg,
            rooms,
            setRooms,
            newMessages,
            setNewMessages,
          }}
        >
          <BrowserRouter>
            <ToastContainer position="bottom-center" limit={1} />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </BrowserRouter>
        </AppContext.Provider>
      </div>
      <footer className="w-full flex justify-center">All Right Reserved</footer>
    </>
  );
}

export default App;
