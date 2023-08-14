import mongoose from 'mongoose';

const userListSchema = mongoose.Schema(
  {
   
    
    name: { type: String },
    email: { type: String },
    
  },
  {
    timestamps: true,
  }
);

const UserList = mongoose.model('UserList', userListSchema);

export default UserList;
