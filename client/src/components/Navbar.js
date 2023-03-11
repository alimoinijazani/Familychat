import React from 'react';
import { BsChatDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <div className="bg-gray-100 p-3 mb-2 flex justify-between items-center">
      <div className="flex-col justify-center items-center ">
        <Link to="/">
          <BsChatDots className="text-red-600 scale-150 m-auto" />
          FamilyChat
        </Link>
      </div>
      <div>
        <Link to="/chat">Chat</Link>
      </div>
    </div>
  );
}
