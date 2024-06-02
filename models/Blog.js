const mongoose = require("mongoose")
const { readingTime } = require("../utils/utils")


const BlogSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        min: 4,
    },
    description: {
        type: String,
        required: true,
        min: 12,
    },
    author: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        default: 'draft',
        enum: ['draft', 'published'],
      },
    read_count: {
        type: Number,
    },
    read_time: {
        type: Number,
    },
    tag: [String],
    
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
        default: []
    }
}, {timestamps: true})

// calculate reading time before saving document
  BlogSchema.pre('save', function (next) {
  let Blog = this

  // do nothing if the article body is unchanged
  if (!Blog.isModified('body')) return next()

  // calculate the time in minutes
  const timeToRead = readingTime(this.body)

  Blog.reading_time = timeToRead
  next()
})

BlogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
    delete returnedObject.author
  },

})


module.exports = mongoose.model("Blog", BlogSchema)