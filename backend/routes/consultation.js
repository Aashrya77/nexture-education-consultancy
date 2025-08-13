const express = require('express');
const { body, validationResult } = require('express-validator');
const Consultation = require('../models/Consultation');
const { sendEmail } = require('../utils/email');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/consultation
// @desc    Book a consultation
// @access  Public
router.post('/', [
  body('firstName').trim().isLength({ min: 1, max: 50 }).withMessage('First name is required and must be less than 50 characters'),
  body('lastName').trim().isLength({ min: 1, max: 50 }).withMessage('Last name is required and must be less than 50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('phone').trim().isLength({ min: 1, max: 20 }).withMessage('Phone number is required and must be less than 20 characters'),
  body('country').trim().isLength({ min: 1, max: 100 }).withMessage('Country is required'),
  body('currentEducation').isIn(['high-school', 'bachelors-pursuing', 'bachelors-completed', 'masters-pursuing', 'masters-completed', 'phd', 'working-professional']).withMessage('Invalid education level'),
  body('interestedCountries').isArray({ min: 1 }).withMessage('At least one interested country is required'),
  body('timeline').isIn(['immediate', '6months', '1year', '2years', 'flexible']).withMessage('Invalid timeline'),
  body('serviceType').isIn(['study-abroad', 'test-prep', 'visa-assistance', 'career-counseling']).withMessage('Invalid service type'),
  body('preferredDate').isISO8601().withMessage('Invalid preferred date').custom((value) => {
    if (new Date(value) <= new Date()) {
      throw new Error('Preferred date must be in the future');
    }
    return true;
  }),
  body('preferredTime').isIn(['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM']).withMessage('Invalid time slot'),
  body('communicationMode').isIn(['video', 'phone', 'in-person']).withMessage('Invalid communication mode'),
  body('budget').optional().isIn(['under-20k', '20k-40k', '40k-60k', '60k-80k', 'above-80k', 'flexible']).withMessage('Invalid budget range'),
  body('currentStatus').optional().isIn(['just-starting', 'researching', 'preparing-tests', 'ready-apply', 'applied', 'admitted']).withMessage('Invalid current status'),
  body('message').optional().trim().isLength({ max: 2000 }).withMessage('Message must be less than 2000 characters')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const consultationData = {
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    };

    // Check for existing consultation with same email and date
    const existingConsultation = await Consultation.findOne({
      email: consultationData.email,
      preferredDate: new Date(consultationData.preferredDate),
      consultationStatus: { $in: ['pending', 'confirmed'] }
    });

    if (existingConsultation) {
      return res.status(400).json({
        success: false,
        message: 'You already have a consultation booked for this date. Please choose a different date or contact us to reschedule.'
      });
    }

    // Create consultation record
    const consultation = new Consultation(consultationData);
    await consultation.save();

    // Send confirmation email to user
    try {
      await sendEmail({
        to: consultation.email,
        subject: 'Consultation Booking Confirmation - Nexture Education',
        template: 'consultation-confirmation',
        data: {
          firstName: consultation.firstName,
          serviceType: consultation.serviceType,
          preferredDate: consultation.preferredDate.toDateString(),
          preferredTime: consultation.preferredTime,
          communicationMode: consultation.communicationMode,
          consultationId: consultation._id
        }
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
    }

    // Send notification to admin
    try {
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New Consultation Booking - ${consultation.serviceType}`,
        template: 'consultation-notification',
        data: {
          consultation: consultation.toObject(),
          fullName: consultation.fullName
        }
      });
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Your consultation has been booked successfully! We will send you a confirmation email with meeting details shortly.',
      data: {
        id: consultation._id,
        status: consultation.consultationStatus,
        scheduledDateTime: consultation.scheduledDateTime
      }
    });

  } catch (error) {
    console.error('Consultation booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to book consultation. Please try again later.'
    });
  }
});

// @route   GET /api/consultation
// @desc    Get all consultations (Admin only)
// @access  Private/Admin
router.get('/', auth, authorize('admin', 'counselor', 'staff'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const serviceType = req.query.serviceType;
    const search = req.query.search;
    const dateFrom = req.query.dateFrom;
    const dateTo = req.query.dateTo;

    // Build query
    let query = {};
    if (status) query.consultationStatus = status;
    if (serviceType) query.serviceType = serviceType;
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (dateFrom || dateTo) {
      query.preferredDate = {};
      if (dateFrom) query.preferredDate.$gte = new Date(dateFrom);
      if (dateTo) query.preferredDate.$lte = new Date(dateTo);
    }

    const consultations = await Consultation.find(query)
      .populate('assignedCounselor', 'firstName lastName email department')
      .sort({ preferredDate: 1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Consultation.countDocuments(query);

    res.json({
      success: true,
      data: {
        consultations,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });

  } catch (error) {
    console.error('Get consultations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch consultations'
    });
  }
});

// @route   GET /api/consultation/upcoming
// @desc    Get upcoming consultations
// @access  Private
router.get('/upcoming', auth, async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const consultations = await Consultation.getUpcomingConsultations(days);

    res.json({
      success: true,
      data: consultations
    });

  } catch (error) {
    console.error('Get upcoming consultations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch upcoming consultations'
    });
  }
});

// @route   GET /api/consultation/stats
// @desc    Get consultation statistics
// @access  Private/Admin
router.get('/stats', auth, authorize('admin', 'counselor', 'staff'), async (req, res) => {
  try {
    const [statusStats, serviceStats] = await Promise.all([
      Consultation.getConsultationStats(),
      Consultation.getServiceTypeStats()
    ]);

    const totalConsultations = await Consultation.countDocuments();
    const pendingConsultations = await Consultation.countDocuments({ consultationStatus: 'pending' });
    const todayConsultations = await Consultation.countDocuments({
      actualDate: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lt: new Date().setHours(23, 59, 59, 999)
      },
      consultationStatus: 'confirmed'
    });

    res.json({
      success: true,
      data: {
        total: totalConsultations,
        pending: pendingConsultations,
        today: todayConsultations,
        statusBreakdown: statusStats,
        serviceBreakdown: serviceStats
      }
    });

  } catch (error) {
    console.error('Get consultation stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch consultation statistics'
    });
  }
});

// @route   PUT /api/consultation/:id
// @desc    Update consultation
// @access  Private/Admin
router.put('/:id', auth, authorize('admin', 'counselor', 'staff'), [
  body('consultationStatus').optional().isIn(['pending', 'confirmed', 'completed', 'cancelled', 'rescheduled']).withMessage('Invalid status'),
  body('assignedCounselor').optional().isMongoId().withMessage('Invalid counselor ID'),
  body('actualDate').optional().isISO8601().withMessage('Invalid actual date'),
  body('actualTime').optional().isIn(['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM']).withMessage('Invalid time slot'),
  body('meetingLink').optional().isURL().withMessage('Invalid meeting link'),
  body('consultationNotes').optional().trim().isLength({ max: 5000 }).withMessage('Notes must be less than 5000 characters'),
  body('followUpRequired').optional().isBoolean().withMessage('Follow-up required must be boolean'),
  body('followUpDate').optional().isISO8601().withMessage('Invalid follow-up date'),
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('feedback').optional().trim().isLength({ max: 1000 }).withMessage('Feedback must be less than 1000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('assignedCounselor', 'firstName lastName email department');

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
    }

    // Send update notification if status changed to confirmed
    if (req.body.consultationStatus === 'confirmed' && consultation.meetingLink) {
      try {
        await sendEmail({
          to: consultation.email,
          subject: 'Consultation Confirmed - Meeting Details',
          template: 'consultation-confirmed',
          data: {
            firstName: consultation.firstName,
            actualDate: consultation.actualDate ? consultation.actualDate.toDateString() : consultation.preferredDate.toDateString(),
            actualTime: consultation.actualTime || consultation.preferredTime,
            meetingLink: consultation.meetingLink,
            counselor: consultation.assignedCounselor
          }
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
      }
    }

    res.json({
      success: true,
      message: 'Consultation updated successfully',
      data: consultation
    });

  } catch (error) {
    console.error('Update consultation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update consultation'
    });
  }
});

// @route   DELETE /api/consultation/:id
// @desc    Cancel/Delete consultation
// @access  Private/Admin
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id);

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
    }

    // Send cancellation email
    try {
      await sendEmail({
        to: consultation.email,
        subject: 'Consultation Cancelled - Nexture Education',
        template: 'consultation-cancelled',
        data: {
          firstName: consultation.firstName,
          scheduledDateTime: consultation.scheduledDateTime
        }
      });
    } catch (emailError) {
      console.error('Failed to send cancellation email:', emailError);
    }

    await Consultation.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Consultation cancelled successfully'
    });

  } catch (error) {
    console.error('Cancel consultation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel consultation'
    });
  }
});

// @route   POST /api/consultation/:id/reminder
// @desc    Send reminder for consultation
// @access  Private/Admin
router.post('/:id/reminder', auth, authorize('admin', 'counselor', 'staff'), async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id);

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
    }

    if (consultation.consultationStatus !== 'confirmed') {
      return res.status(400).json({
        success: false,
        message: 'Can only send reminders for confirmed consultations'
      });
    }

    // Send reminder email
    await sendEmail({
      to: consultation.email,
      subject: 'Consultation Reminder - Tomorrow',
      template: 'consultation-reminder',
      data: {
        firstName: consultation.firstName,
        actualDate: consultation.actualDate ? consultation.actualDate.toDateString() : consultation.preferredDate.toDateString(),
        actualTime: consultation.actualTime || consultation.preferredTime,
        meetingLink: consultation.meetingLink
      }
    });

    // Update reminder count
    await consultation.sendReminder();

    res.json({
      success: true,
      message: 'Reminder sent successfully'
    });

  } catch (error) {
    console.error('Send reminder error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send reminder'
    });
  }
});

module.exports = router;
