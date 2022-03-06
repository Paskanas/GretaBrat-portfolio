import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin user',
    email: 'admin@admin.admin',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'KG',
    email: 'KG@admin.admin',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'GB',
    email: 'GB@admin.admin',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
