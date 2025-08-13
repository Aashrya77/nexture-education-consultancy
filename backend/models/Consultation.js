const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  // Personal Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
    maxlength: [100, 'Country name cannot exceed 100 characters']
  },
  
  // Educational Background
  currentEducation: {
    type: String,
    required: [true, 'Current education level is required'],
    enum: [
      'high-school',
      'bachelors-pursuing',
      'bachelors-completed',
      'masters-pursuing',
      'masters-completed',
      'phd',
      'working-professional'
    ]
  },
  interestedCountries: [{
    type: String,
    trim: true,
    maxlength: [100, 'Country name cannot exceed 100 characters']
  }],
  timeline: {
    type: String,
    required: [true, 'Timeline is required'],
    enum: ['immediate', '6months', '1year', '2years', 'flexible']
  },
  budget: {
    type: String,
    enum: ['under-20k', '20k-40k', '40k-60k', '60k-80k', 'above-80k', 'flexible'],
    default: 'flexible'
  },
  
  // Consultation Preferences
  serviceType: {
    type: String,
    required: [true, 'Service type is required'],
    enum: ['study-abroad', 'test-prep', 'visa-assistance', 'career-counseling']
  },
  preferredDate: {
    type: Date,
    required: [true, 'Preferred date is required'],
    validate: {
      validator: function(date) {
        return date > new Date();
      },
      message: 'Preferred date must be in the future'
    }
  },
  preferredTime: {
    type: String,
    required: [true, 'Preferred time is required'],
    enum: [
      '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
      '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
    ]
  },
  communicationMode: {
    type: String,
    required: [true, 'Communication mode is required'],
    enum: ['video', 'phone', 'in-person'],
    default: 'video'
  },
  
  // Additional Information
  currentStatus: {
    type: String,
    enum: [
      'just-starting',
      'researching',
      'preparing-tests',
      'ready-apply',
      'applied',
      'admitted'
    ]
  },
  message: {
    type: String,
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  
  // Consultation Management
  consultationStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'rescheduled'],
    default: 'pending'
  },
  assignedCounselor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  actualDate: {
    type: Date,
    default: null
  },
  actualTime: {
    type: String,
    default: null
  },
  meetingLink: {
    type: String,
    trim: true
  },
  meetingId: {
    type: String,
    trim: true
  },
  duration: {
    type: Number, // in minutes
    default: 60
  },
  
  // Follow-up and Notes
  consultationNotes: {
    type: String,
    trim: true,
    maxlength: [5000, 'Consultation notes cannot exceed 5000 characters']
  },
  actionItems: [{
    item: {
      type: String,
      required: true,
      trim: true,
      maxlength: [500, 'Action item cannot exceed 500 characters']
    },
    completed: {
      type: Boolean,
      default: false
    },
    dueDate: {
      type: Date
    }
  }],
  followUpRequired: {
    type: Boolean,
    default: false
  },
  followUpDate: {
    type: Date,
    default: null
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  feedback: {
    type: String,
    trim: true,
    maxlength: [1000, 'Feedback cannot exceed 1000 characters']
  },
  
  // System fields
  ipAddress: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  },
  remindersSent: {
    type: Number,
    default: 0
  },
  lastReminderSent: {
    type: Date,
    default: null
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
consultationSchema.index({ email: 1 });
consultationSchema.index({ consultationStatus: 1 });
consultationSchema.index({ serviceType: 1 });
consultationSchema.index({ preferredDate: 1 });
consultationSchema.index({ assignedCounselor: 1 });
consultationSchema.index({ createdAt: -1 });

// Virtual for full name
consultationSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for consultation date/time
consultationSchema.virtual('scheduledDateTime').get(function() {
  if (this.actualDate && this.actualTime) {
    return `${this.actualDate.toDateString()} at ${this.actualTime}`;
  }
  return `${this.preferredDate.toDateString()} at ${this.preferredTime}`;
});

// Pre-save middleware
consultationSchema.pre('save', function(next) {
  // Set actual date/time to preferred if not set and consultation is confirmed
  if (this.consultationStatus === 'confirmed' && !this.actualDate) {
    this.actualDate = this.preferredDate;
    this.actualTime = this.preferredTime;
  }
  
  // Set duration based on service type
  if (!this.duration) {
    switch (this.serviceType) {
      case 'study-abroad':
        this.duration = 60;
        break;
      case 'test-prep':
        this.duration = 45;
        break;
      case 'visa-assistance':
        this.duration = 45;
        break;
      case 'career-counseling':
        this.duration = 50;
        break;
      default:
        this.duration = 60;
    }
  }
  
  next();
});

// Static methods
consultationSchema.statics.getConsultationStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$consultationStatus',
        count: { $sum: 1 }
      }
    }
  ]);
};

consultationSchema.statics.getServiceTypeStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$serviceType',
        count: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);
};

consultationSchema.statics.getUpcomingConsultations = function(days = 7) {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + days);
  
  return this.find({
    consultationStatus: 'confirmed',
    actualDate: {
      $gte: startDate,
      $lte: endDate
    }
  }).populate('assignedCounselor', 'firstName lastName email');
};

// Instance methods
consultationSchema.methods.sendReminder = function() {
  this.remindersSent += 1;
  this.lastReminderSent = new Date();
  return this.save();
};

module.exports = mongoose.model('Consultation', consultationSchema);
