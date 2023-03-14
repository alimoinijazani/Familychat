import React, { useEffect, useReducer, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { useSignupUserMutation } from '../services/appApi';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getError } from '../utils';
const reducer = (state, action) => {
  switch (action.type) {
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return { ...state, loadingUpload: false, errorUpload: '' };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};
export default function Register() {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate('');
  const [img, setImg] = useState();
  const [{ loadingUpload, errorUpload }, dispatch] = useReducer(reducer, {
    loadingUpload: false,
  });
  const [signupUser, { isLoading, error }] = useSignupUserMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (file.size > 1048576) {
      return alert('max size is 1mb');
    } else {
      const bodyFormData = new FormData();
      bodyFormData.append('file', file);
      try {
        dispatch({ type: 'UPLOAD_REQUEST' });
        const { data } = await axios.post('/api/upload', bodyFormData, {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        });
        dispatch({ type: 'UPLOAD_SUCCESS' });
        toast.success('uploaded image successfully');
        setImg(data.secure_url);
      } catch (err) {
        toast.error(getError(err));
      }
    }
  };
  useEffect(() => {
    if (user) {
      navigate('/chat');
    }
  }, [navigate, user]);

  const submitHandler = ({ name, email, password }) => {
    if (!img) return alert('Please upload your profile picture');
    signupUser({ name, email, password, picture: img }).then(({ data }) => {
      if (data) {
        navigate('/chat');
      } else {
        toast.error(error?.data);
      }
    });
  };

  return (
    <div className="grid grid-row-12 sm:grid-cols-12">
      <div className="row-span-9 sm:col-span-7">
        <div className="flex justify-center items-center">
          <div className="flex-col ">
            <h1 className="font-semibold text-2xl text-center pt-12 mb-3 mt-12">
              Create Account
            </h1>

            <span className="relative flex justify-center ">
              <img
                src={img ? img : '/images/noAvatar.png'}
                alt="photoaccoutn"
                className="rounded-full h-[7rem] w-[7rem] shadow-lg"
              />
              <div>
                <input
                  type="file"
                  id="file"
                  className="hidden"
                  accept="image/jpg"
                  required
                  onChange={uploadFileHandler}
                />
                <label htmlFor="file">
                  <AiOutlinePlus
                    className="bg-green-500 rounded-full text-white cursor-pointer
                                            absolute bottom-6 left-[11rem] sm:left-[12.5rem]"
                  />
                </label>
              </div>
            </span>
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="mb-3">
                <label htmlFor="name" className="mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', {
                    required: 'Please enter Name',

                    minLength: {
                      value: 3,
                      message: 'at least 4 character',
                    },
                  })}
                  className="block  shadow-lg py-2 px-3 rounded-xl min-w-[15rem]
                              sm:min-w-[20rem] max-w-[30rem] w-full"
                  autoFocus
                />
                {errors.name && (
                  <div className="text-red-500">{errors.name.message}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="mb-1">Email</label>
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
                <label className="mb-1">Password</label>
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
                className="flex shadow-lg text-gray-50 justify-around items-center rounded px-4 py-2 bg-pink-400 "
                disabled={loadingUpload || isLoading}
              >
                Register
              </button>
            </form>
            <div className="mt-4">
              Already have an acoount{' '}
              <Link to="/login" className="ml-2">
                Signin
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row-span-3 sm:col-span-5">
        <img
          src="/images/home.jpg"
          alt="registerImage"
          className="object-cover h-[90vh]"
        />
      </div>
    </div>
  );
}
