import React from 'react';
import MessageForm from '../components/MessageForm';
import Sidebar from '../components/Sidebar';

export default function Chat() {
  return (
    <div className="grid grid-row-12 sm:grid-cols-12">
      <div className="row-span-3 sm:col-span-3 bg-red-100 min-h-[85vh]">
        <Sidebar />
      </div>

      <div className="row-span-9 sm:col-span-9  min-h-[85vh]">
        <MessageForm />
      </div>
    </div>
  );
}
