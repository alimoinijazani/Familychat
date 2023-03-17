import React, { useContext } from 'react';
import { BsChatDots } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { useLogoutUserMutation } from '../services/appApi';
import { AppContext } from '../context/appContext';

export default function Navbar() {
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();
  const user = useSelector((state) => state.user);
  const { socket, setMembers } = useContext(AppContext);
  const logoutHandler = async (e) => {
    try {
      e.preventDefault();
      await logoutUser(user);
      socket.emit('new-user');
      navigate('/');
    } catch (err) {}
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

        <div className="flex justify-center items-center">
          <Link to="/chat" className="mr-3">
            Chat
          </Link>
          {!user ? (
            <Link to="/login">Login</Link>
          ) : (
            <Menu as="div" className="relative inline-block">
              <Menu.Button className="text-red-600 flex justify-center items-center">
                {user.name}
                <img
                  src={user.picture ? user.picture : 'images/noAvatar.png'}
                  alt="profilepic"
                  className="rounded-full w-10 h-10 ml-1"
                />
              </Menu.Button>
              <Menu.Items className="absolute rounded-sm p-2 right-0 w-40 origin-top-right shadow-lg bg-red-100 z-10">
                <Menu.Item>
                  <Link to="/profile" className="block">
                    Profile
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <button
                    type="button"
                    className="text-red-600 "
                    onClick={logoutHandler}
                  >
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
