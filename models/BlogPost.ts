import mongoose from 'mongoose'


const BlogPostSchema = new mongoose.Schema({
  title: {
    /* The name of this pet */
    type: String,
    maxlength: [90, 'Name cannot be more than 90 characters'],
  },
  s3URL: { 
      type: String
  },
  blogImage: {
    type: String
  }
})

export default mongoose.models.blogposts || mongoose.model('blogposts', BlogPostSchema)