import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="grid grid-row-12 sm:grid-cols-12 sm:gap-x-12">
      <div className="row-span-6 sm:col-span-6">
        <img
          src="images/login.jpg"
          alt="loginimage"
          className="max-h-[20rem] object-cover  w-full  m-auto sm:w-full  sm:max-h-[40rem] sm:min-h-[37rem] "
        />
      </div>
      <div className="row-span-6 sm:col-span-6 flex justify-center items-center my-12">
        <div className=" grow mx-2 ">
          <form>
            <div className="mb-3">
              <label className="block">Email</label>
              <input
                type="email"
                className="block  shadow-lg py-2 px-3 rounded-xl min-w-[15rem]
                              sm:min-w-[17rem] max-w-[25rem] w-full"
                autoFocus
              />
            </div>
            <div className="mb-3">
              <label className="block">Password</label>
              <input
                type="password"
                className="block shadow-lg p-2 px-3 rounded-xl min-w-[15rem]
                              sm:min-w-[17rem] max-w-[25rem] w-full"
              />
            </div>
            <button
              type="button"
              className="flex shadow-xl text-gray-50 justify-around items-center rounded px-4 py-2 bg-pink-400 "
            >
              Login
            </button>
          </form>
          <div className="mt-4">
            if you not register yet
            <Link to="/register"> Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
