import React, { useContext, useEffect, useRef, useState } from 'react';
import { BsTelephoneFill } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { BsSendFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './../context/appContext';
export default function MessageForm() {
  const user = useSelector((state) => state.user);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const messageEndRef = useRef(null);
  const { socket, currentRoom, setMessages, messages, privateMemberMsg } =
    useContext(AppContext);

  useEffect(() => {
    if (messageEndRef) {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [message, currentRoom]);
  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();

    month = month.length > 1 ? month : '0' + month;
    let day = date.getDate().toString();

    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
  }
  const todayDate = getFormattedDate();
  socket.off('room-messages').on('room-messages', (roomMessages) => {
    setMessages(roomMessages);
  });
  const senderProfileHandler = (sender) => {
    navigate(`/profile/${sender._id}`);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ':' + minutes;
    //time=14:06
    const roomId = currentRoom;

    socket.emit('message-room', roomId, message, user, time, todayDate);
    setMessage('');
  };
  console.log(messages);
  return (
    <div className=" relative h-[90vh] sm:h-[81vh] ">
      <div className="sticky top-0 shadow-sm p-4 flex justify-between items-center ">
        <div className="flex-col">
          <h3 className="font-semibold">
            {' '}
            {privateMemberMsg
              ? `${privateMemberMsg.name}`
              : currentRoom || 'General'}
          </h3>
          <div className="text-sm text-gray-500">
            {privateMemberMsg ? privateMemberMsg.status : null}
          </div>
        </div>
        <div>
          <BsTelephoneFill className="text-gray-500" />
        </div>
      </div>
      <div className="overflow-y-auto max-h-[50vh] sm:max-h-[68vh]">
        {user &&
          messages?.map(({ _id: date, messageByDate }, idx) => (
            <div key={idx}>
              <p className="alert alert-info text-center">{date}</p>
              {messageByDate?.map(({ content, time, from: sender }, msgIdx) => (
                <div key={msgIdx}>
                  <div
                    className={
                      sender.email === user.email
                        ? 'flex items-center justify-start p-1 m-1 gap-2'
                        : 'flex items-center flex-row-reverse p-1 m-1 gap-2'
                    }
                  >
                    <button
                      className="rounded-circle p-0 border-0"
                      onClick={() => senderProfileHandler(sender)}
                    >
                      <img
                        className="w-12 h-12 rounded-full self-end"
                        alt=""
                        src={sender.picture || 'images/noAvatar.png'}
                      />
                    </button>

                    <div
                      className={
                        sender.email === user.email
                          ? ' px-2 pt-1  d-flex flex-column bg-green-400 rounded-md'
                          : 'px-2 pt-1  d-flex flex-column bg-red-400 rounded-md'
                      }
                    >
                      <span className="text-blue-600">{sender.name}</span>
                      <span>{content}</span>
                      <span className="mb-1 " style={{ color: 'grey' }}>
                        {time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>
          ))}
      </div>
      <div className="absolute bottom-[-2rem] w-full">
        <form
          onClick={handleSubmit}
          className="min-w-full border pt-1 flex justify-between "
        >
          <div className="flex justify-start items-center grow shrink mr-1">
            <ImAttachment className="ml-2 text-gray-500 min-h-[1rem] min-w-[1rem]" />

            <input
              className="p-2 min-w-full"
              placeholder="Write a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button type="submit" className="mr-2 text-red-300">
            <BsSendFill />
          </button>
        </form>
      </div>
    </div>
  );
}
