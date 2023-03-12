import bcryptjs from 'bcryptjs';
export const data = {
  users: [
    {
      name: 'parmin',
      email: 'Parmin@example.com',
      password: bcryptjs.hashSync('123456'),
      picture: 'images/parmin.jpeg',
      isAdmin: false,
    },
    {
      name: 'admin',
      email: 'admin@example.com',
      password: bcryptjs.hashSync('123456'),
      picture: '',
      isAdmin: true,
    },
  ],
};
