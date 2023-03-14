import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
// import axios from 'axios';
import { getError } from './../utils';
import { useLoginUserMutation } from '../services/appApi';
import { useSelector } from 'react-redux';
export default function Login() {
  const user = useSelector((state) => state.user);
  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (user) {
      navigate('/chat');
    }
  }, [navigate, user]);
  const submitHandler = async ({ email, password }) => {
    try {
      loginUser({ email, password }).then(({ data }) => {
        if (data) {
          navigate('/chat');
        }
      });
    } catch (err) {
      toast.error(getError(err));
    }
  };
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
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="mb-3">
              <label className="block">Email</label>
              <input
                type="text"
                {...register('email', {
                  required: 'Please enter Email',

                  pattern: {
                    value:
                      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+.[a-zA-Z0-9_.+-]+$/i,
                    message: 'Please Insert Correct Email',
                  },
                })}
                className="block  shadow-lg py-2 px-3 rounded-xl min-w-[15rem]
                              sm:min-w-[17rem] max-w-[25rem] w-full"
                autoFocus
              />
              {errors.email && (
                <div className="text-red-500">{errors.email.message}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="block">Password</label>
              <input
                type="password"
                {...register('password', {
                  required: 'Please Enter Password',
                  minLength: {
                    value: 5,
                    message: 'Password should be More than 5 character',
                  },
                })}
                className="block shadow-lg p-2 px-3 rounded-xl min-w-[15rem]
                              sm:min-w-[17rem] max-w-[25rem] w-full"
              />
              {errors.password && (
                <div className="text-red-500">{errors.password.message}</div>
              )}
            </div>
            <button
              type="submit"
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
