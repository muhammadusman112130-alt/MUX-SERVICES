import express from 'express';
import {
  createBooking,
  getAllBookings,
  getMyBookings,
  updateBookingStatus
} from '../controllers/bookingController.js';
import { protect, optionalProtect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(optionalProtect, createBooking)
  .get(getAllBookings);

router.get('/my', protect, getMyBookings);

router.put('/:id/status', updateBookingStatus);

export default router;
