import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
       
          title: {type: String},
          authorFirstName: {type: String},
          authorLastName: {type: String},
          date: {type: String},
          blog: {type: [String]},
          category: {type: String},
          isFeature: {type: Boolean},
          isArchive: {type: Boolean},
    },
    
);
const Post = mongoose.model('posts', postSchema)

export default Post