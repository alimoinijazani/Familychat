import React from 'react';
import { BsChatFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-row-12 sm:grid-cols-12">
      <div className="row-span-6 sm:col-span-6 p-10">
        <h1 className="font-semibold text-2xl text-center p-3">
          Share the world with friend
        </h1>
        <p className="text-center p-2">
          ChatApp lets you connect with the world,no matter your location
        </p>
        <button
          type="button"
          className="flex text-gray-50 shadow-xl justify-around items-center rounded p-2 bg-pink-400 m-auto"
          onClick={() => {
            navigate('/login');
          }}
        >
          GetStarted <BsChatFill className="text-red-200 ml-2" />
        </button>
      </div>
      <div className="row-span-6 sm:col-span-6">
        <img
          src="images/home1.jpg"
          alt="homeimage"
          className="max-h-[20rem] object-cover  w-full  m-auto sm:w-full sm:object-none sm:max-h-[40rem] sm:min-h-[37rem] "
        />
      </div>
    </div>
  );
}
