import React from 'react';

export default function LoginForm() {
  return (
    <form>
      <div className="flex justify-around items-center">
        <label htmlFor="email">Email</label>
        <input type="text" id="email" className="bg-pink-200  w-3/4" />
      </div>
    </form>
  );
}
