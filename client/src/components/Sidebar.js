import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GoPrimitiveDot } from 'react-icons/go';
export default function Sidebar() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await axios.get('/rooms');
      setRooms(data);
    };
    fetchRooms();
  });
  return (
    <div>
      <div className="p-3 overflow-y-auto max-h-[40vh]">
        <h3 className="font-semibold text-xl mb-3 sticky top-0  shadow-md  p-2 text-center">
          Available rooms
        </h3>
        {rooms.map((room) => (
          <div
            key={room}
            className="flex justify-start items-center mb-3 gap-2"
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
          </div>
        ))}
      </div>
      <div className="p-3 overflow-y-auto max-h-[50vh] ">
        <h3 className="font-semibold text-xl mb-3 sticky top-0  shadow-md p-2 text-center">
          Members
        </h3>
        {rooms.map((room) => (
          <div
            key={room}
            className="flex justify-start items-center mb-3 gap-2"
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
          </div>
        ))}
      </div>
    </div>
  );
}
