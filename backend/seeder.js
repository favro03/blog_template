import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import blogs from './data/blogs.js';
import userList from './data/userList.js';
import User from './models/userModel.js';
import Blog from './models/blogModel.js';
import UserList from './models/userListModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Blog.deleteMany();
    await UserList.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleBlogs = blogs.map((blog) => {
      return { ...blog };
    });

    await Blog.insertMany(sampleBlogs);

    const sampleUserList = userList.map((userList) => {
        return { ...userList};
      });
  
      await UserList.insertMany(sampleUserList);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Blog.deleteMany();
    await UserList.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}