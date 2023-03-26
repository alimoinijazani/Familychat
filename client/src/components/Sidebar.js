import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { GoPrimitiveDot } from 'react-icons/go';
import { AppContext } from './../context/appContext';
import { useSelector, useDispatch } from 'react-redux';
import { addNotifications, resetNotifications } from '../features/userSlice';
export default function Sidebar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    socket,
    members,
    setMembers,
    currentRoom,
    setCurrentRoom,
    rooms,
    setRooms,
    privateMemberMsg,
    setPrivateMemberMsg,
  } = useContext(AppContext);

  const joinRoom = (room, isPublic = true) => {
    if (!user) {
      return alert('please login');
    }

    socket.emit('join-room', room, currentRoom);
    setCurrentRoom(room);

    if (isPublic) {
      setPrivateMemberMsg(null);
    }
    //dispatch for notifications
    dispatch(resetNotifications(room));
  };
  socket.off('notifications').on('notifications', (room) => {
    if (currentRoom !== room) {
      dispatch(addNotifications(room));
    }
  });
  useEffect(() => {
    if (user) {
      setCurrentRoom('Family');

      const getRooms = async () => {
        try {
          const { data } = await axios.get('/rooms');
          setRooms(data);
        } catch (err) {}
      };
      getRooms();
      socket.emit('join-room', 'Family');
      socket.emit('new-user'); //update self as members
    }
  }, []);

  socket.off('new-user').on('new-user', (payload) => {
    setMembers(payload);
  });
  const orderIds = (id1, id2) => {
    if (id1 > id2) {
      return id1 + '-' + id2;
    } else {
      return id2 + '-' + id1;
    }
  };

  const handlePrivateMemberMsg = (member) => {
    setPrivateMemberMsg(member);
    const roomId = orderIds(user._id, member._id);

    joinRoom(roomId, false);
  };

  return (
    <div>
      <div className="p-3 overflow-y-auto max-h-[40vh]">
        <h3 className="font-semibold text-xl mb-3 sticky top-0  shadow-md  p-2 text-center bg-red-200">
          Available rooms
        </h3>
        {rooms.map((room) => (
          <div
            key={room}
            className="flex justify-start items-center mb-3 gap-2"
            onClick={() => joinRoom(room)}
          >
            <div className="relative">
              <img
                src="images/parmin.jpeg"
                alt="groupimage"
                className="rounded-full w-12 h-12"
              />
              <GoPrimitiveDot className="absolute bottom-0 left-0 text-green-500" />
            </div>
            <div className="font-medium text-sm sm:text-base">{room}</div>
            {user.newMessages[room] && (
              <span className="rounded-full w-5 h-5 bg-blue-500 text-white flex justify-center items-center">
                {user.newMessages[room]}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="p-3 overflow-y-auto max-h-[50vh] ">
        <h3 className="font-semibold text-xl mb-3 sticky top-0  shadow-md p-2 text-center bg-red-200">
          Members
        </h3>
        {members
          ?.filter((m) => m._id !== user?._id)
          .map((member) => (
            <div
              key={member._id}
              className="flex justify-start items-center mb-3 gap-2"
              onClick={() => handlePrivateMemberMsg(member)}
            >
              <div className="relative">
                <img
                  src={member.picture ? member.picture : '/images/noAvatar.png'}
                  alt="memberimage"
                  className="rounded-full w-12 h-12"
                />
                <GoPrimitiveDot
                  className={
                    member.status === 'online'
                      ? 'absolute bottom-0 left-0 text-green-500'
                      : 'absolute bottom-0 left-0 text-red-500'
                  }
                />
              </div>
              <div className="font-medium text-sm sm:text-base">
                {member.name}
              </div>
              {user.newMessages[orderIds(member._id, user._id)] && (
                <div className="rounded-full w-5 h-5 bg-blue-500 text-white flex justify-center items-center">
                  {user.newMessages[orderIds(member._id, user._id)]}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
