import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    customerName: {
      type: String,
      trim: true
    },
    customerPhone: {
      type: String,
      trim: true
    },
    service: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true
    },
    provider: {
      type: String,
      required: [true, 'Provider name is required'],
      trim: true
    },
    date: {
      type: String,
      required: [true, 'Booking date is required']
    },
    time: {
      type: String,
      default: '10:00 AM'
    },
    status: {
      type: String,
      enum: ['scheduled', 'active', 'completed', 'cancelled'],
      default: 'scheduled'
    },
    price: {
      type: String,
      required: [true, 'Price is required']
    },
    location: {
      type: String,
      required: [true, 'Service address / location is required']
    },
    refNumber: {
      type: String,
      unique: true,
      required: true
    },
    notes: {
      type: String,
      trim: true,
      default: ''
    },
    paymentMethod: {
      type: String,
      enum: ['cod', 'card', 'bank', 'wallet', 'jazzcash', 'easypaisa'],
      default: 'cod'
    },
    isPaid: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
