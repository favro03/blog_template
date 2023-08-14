import bcrypt from 'bcryptjs'

const users =[
    {
        name: 'Tracy Favro',
        email:'wetr9902@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
   
]

export default users;