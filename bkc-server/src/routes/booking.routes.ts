import { Router } from 'express';
import Booking from '../models/Booking';
import { waService } from '../services/whatsapp.service';

const router = Router();

router.post('/table', async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      bookingType: 'table',
      status: 'pending'
    });
    
    await booking.save();
    
    // Send WhatsApp confirmation to customer
    const customerMessage = `Hello ${booking.fullName},\n\nWe have received your table reservation request for ${booking.guests} on ${new Date(booking.date!).toLocaleDateString()} at ${booking.time}${booking.occasion ? ` for a ${booking.occasion}` : ''}.\n\nWe will confirm your reservation shortly.\n\nThank you for choosing Bhubaneswar Kitchen!`;
    waService.sendMessage(booking.phone, customerMessage).catch(console.error);

    // Send WhatsApp notification to admin
    const adminPhone = process.env.ADMIN_PHONE;
    if (adminPhone) {
      const adminMessage = `New Table Booking!\n\nName: ${booking.fullName}\nPhone: ${booking.phone}\nGuests: ${booking.guests}\nDate: ${new Date(booking.date!).toLocaleDateString()}\nTime: ${booking.time}${booking.occasion ? `\nOccasion: ${booking.occasion}` : ''}`;
      waService.sendMessage(adminPhone, adminMessage).catch(console.error);
    } else {
      console.warn('ADMIN_PHONE not set in environment variables. Admin notification skipped.');
    }

    res.status(201).json({ success: true, booking });
  } catch (error) {
    console.error('Error saving table booking:', error);
    res.status(500).json({ success: false, error: 'Failed to save booking' });
  }
});

router.post('/room', async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      bookingType: 'room',
      status: 'pending'
    });
    
    await booking.save();
    
    // Send WhatsApp confirmation to customer
    const customerMessage = `Hello ${booking.fullName},\n\nWe have received your room booking request for a ${booking.roomType} (${booking.guests}) from ${new Date(booking.checkIn!).toLocaleDateString()} to ${new Date(booking.checkOut!).toLocaleDateString()}.\n\nWe will confirm your booking shortly.\n\nThank you for choosing Bhubaneswar Kitchen!`;
    waService.sendMessage(booking.phone, customerMessage).catch(console.error);

    // Send WhatsApp notification to admin
    const adminPhone = process.env.ADMIN_PHONE;
    if (adminPhone) {
      const adminMessage = `New Room Booking!\n\nName: ${booking.fullName}\nPhone: ${booking.phone}\nRoom Type: ${booking.roomType}\nGuests: ${booking.guests}\nCheck-in: ${new Date(booking.checkIn!).toLocaleDateString()}\nCheck-out: ${new Date(booking.checkOut!).toLocaleDateString()}`;
      waService.sendMessage(adminPhone, adminMessage).catch(console.error);
    } else {
      console.warn('ADMIN_PHONE not set in environment variables. Admin notification skipped.');
    }

    res.status(201).json({ success: true, booking });
  } catch (error) {
    console.error('Error saving room booking:', error);
    res.status(500).json({ success: false, error: 'Failed to save booking' });
  }
});

// Admin: get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Admin: update booking status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ success: true, booking });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ error: 'Failed to update booking status' });
  }
});

// Admin: delete booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json({ success: true, message: 'Booking deleted' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

// Contact enquiry: send details via WhatsApp to admin
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    const adminPhone = process.env.ADMIN_PHONE;
    if (adminPhone) {
      const adminMessage = `New Contact Us Enquiry!\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
      await waService.sendMessage(adminPhone, adminMessage);
    } else {
      console.warn('ADMIN_PHONE not set in environment variables. Admin notification skipped.');
    }
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error handling contact message:', error);
    res.status(500).json({ success: false, error: 'Failed to process message' });
  }
});

export default router;
