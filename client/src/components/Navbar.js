import React from 'react';
import { BsChatDots } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { useLogoutUserMutation } from '../services/appApi';

export default function Navbar() {
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();
  const user = useSelector((state) => state.user);
  // const logoutHandler = async (e) => {
  //   e.preventDefault();
  //   await logoutUser(user);
  //   navigate('/');
  // };
  const logoutHandler = async (e) => {
    e.preventDefault();
    await logoutUser(user);
    navigate('/');
  };
  return (
    <header>
      <nav className="bg-gray-100 p-3 mb-2 flex justify-between items-center">
        <div className="flex-col justify-center items-center">
          <Link to="/">
            <BsChatDots className="text-red-600 scale-150 m-auto" />
            FamilyChat
          </Link>
        </div>

        <div>
          <Link to="/chat" className="mr-3">
            Chat
          </Link>
          {!user ? (
            <Link to="/login">Login</Link>
          ) : (
            <Menu as="div" className="relative inline-block">
              <Menu.Button>{user.name}</Menu.Button>
              <Menu.Items className="absolute rounded-sm p-2 right-0 w-40 origin-top-right shadow-lg bg-red-100">
                <Menu.Item>
                  <Link to="/profile" className="block">
                    Profile
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <button className="text-red-600" onClick={logoutHandler}>
                    Logout
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          )}
        </div>
      </nav>
    </header>
  );
}
