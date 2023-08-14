import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
    {
       
          title: {type: String},
          authorFirstName: {type: String},
          authorLastName: {type: String},
          Date: {type: String},
          post: {type: String},
          category: {type: String},
          isFeature: {type: Boolean},
          isArchive: {type: Boolean},
    },
    
);
const Blog = mongoose.model('Blogs', blogSchema)

export default Blog