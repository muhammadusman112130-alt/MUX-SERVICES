import Booking from '../models/Booking.js';

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public (or Protected if authenticated)
export const createBooking = async (req, res) => {
  try {
    const {
      service,
      provider,
      date,
      time,
      price,
      location,
      notes,
      refNumber,
      paymentMethod,
      customerName,
      customerPhone
    } = req.body;

    if (!service || !provider || !date || !price || !location) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (service, provider, date, price, location)'
      });
    }

    const generatedRef = refNumber || `BK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const booking = await Booking.create({
      user: req.user ? req.user._id : undefined,
      customerName: customerName || (req.user ? req.user.name : undefined),
      customerPhone: customerPhone || (req.user ? req.user.phone : undefined),
      service,
      provider,
      date,
      time: time || '10:00 AM',
      price,
      location,
      refNumber: generatedRef,
      notes: notes || '',
      paymentMethod: paymentMethod || 'cod',
      status: 'scheduled'
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error creating booking'
    });
  }
};

// @desc    Get all bookings (with search/filter)
// @route   GET /api/bookings
// @access  Public / Admin
export const getAllBookings = async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { service: { $regex: search, $options: 'i' } },
        { provider: { $regex: search, $options: 'i' } },
        { refNumber: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const bookings = await Booking.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching bookings'
    });
  }
};

// @desc    Get current logged in user bookings
// @route   GET /api/bookings/my
// @access  Protected
export const getMyBookings = async (req, res) => {
  try {
    const query = req.user ? { user: req.user._id } : {};
    const bookings = await Booking.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching your bookings'
    });
  }
};

// @desc    Update booking status (active, completed, cancelled)
// @route   PUT /api/bookings/:id/status
// @access  Public / Protected
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!['scheduled', 'active', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be scheduled, active, completed, or cancelled'
      });
    }

    // Try finding by MongoDB _id or custom refNumber
    let booking = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      booking = await Booking.findById(id);
    }
    if (!booking) {
      booking = await Booking.findOne({ refNumber: id });
    }

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({
      success: true,
      message: `Booking status updated to ${status}`,
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error updating booking status'
    });
  }
};
