import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
    {
       
          title: {type: String},
          authorFirstName: {type: String},
          authorLastName: {type: String},
          Date: {type: String},
          post: {type: string},
          category: {type: String},
          isFeature: {type: Boolean},
          isArchive: {type: Boolean},
    },
    
);
const Blog = mongoose.model('Tracker', blogSchema)

export default Blog