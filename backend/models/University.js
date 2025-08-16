const mongoose = require('mongoose');

const uniSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Case study title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },  
    country: {
      type: String,
      required: [true, 'Client country is required'],
      trim: true,
      maxlength: [100, 'Country cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
        trim: true,
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    features: [
  {
    title: {
      type: String,
      required: [true, 'Feature title is required'],
    },
    description: {
      type: String,
      required: [true, 'Feature description is required'],
    }
  }
]


})

module.exports = mongoose.model('University', uniSchema);