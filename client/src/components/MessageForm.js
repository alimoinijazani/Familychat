import React from 'react';
import { BsTelephoneFill } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { BsSendFill } from 'react-icons/bs';
export default function MessageForm() {
  return (
    <div className=" h-[85vh] relative">
      <div className="sticky top-0 shadow-sm p-4 flex justify-between items-center ">
        <div className="flex-col">
          <div className="font-semibold">ali moini</div>
          <div className="text-sm text-gray-500">Online</div>
        </div>
        <div>
          <BsTelephoneFill className="text-gray-500" />
        </div>
      </div>
      <div className="overflow-y-auto max-h-[50vh] sm:max-h-[68vh]">
        <div className="p-12">hi</div>
        <div className="p-12">hi</div>
        <div className="p-12">hi</div>
        <div className="p-12">hi</div> <div className="p-12">hi</div>{' '}
        <div className="p-12">hi</div> <div className="p-12">hi</div>{' '}
        <div className="p-12">hi</div>
        <div className="p-12">hi</div>
        <div className="p-12">hi</div>
        <div className="p-12">hi</div>
        <div className="p-12">hi</div> <div className="p-12">hi</div>{' '}
        <div className="p-12">hi</div> <div className="p-12">hi</div>{' '}
        <div className="p-12">hi</div>
      </div>
      <div className="absolute bottom-0 w-full">
        <form className="min-w-full border pt-1 flex justify-between ">
          <div className="flex justify-start items-center grow shrink mr-1">
            <ImAttachment className="ml-2 text-gray-500 min-h-[1rem] min-w-[1rem]" />

            <input
              className="p-2 min-w-full"
              placeholder="Write a message..."
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
