import ContactMessage from '../models/ContactMessage.js';

// @desc    Submit a contact inquiry message
// @route   POST /api/contact
// @access  Public
export const submitContactMessage = async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, email, and message'
      });
    }

    const contact = await ContactMessage.create({
      fullName,
      email,
      phone: phone || '',
      subject: subject || 'general',
      message
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. Our Multan support team will contact you shortly.',
      contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error submitting contact message'
    });
  }
};

// @desc    Get all contact messages (Admin)
// @route   GET /api/contact
// @access  Public / Admin
export const getContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching contact messages'
    });
  }
};
