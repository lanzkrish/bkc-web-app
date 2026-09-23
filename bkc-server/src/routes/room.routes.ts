import { Router } from 'express';
import Room from '../models/Room';
import cloudinary from '../services/cloudinary.service';
import { uploadImageToR2, deleteFromR2 } from '../services/r2.service';

const router = Router();

const DEFAULT_ROOMS = [
  {
    name: "The Heritage Suite",
    slug: "the-heritage-suite",
    tagline: "Unmatched Luxury",
    description: "Our Heritage Suites are designed with an elegant touch of Odia art and modern minimalist furniture. Enjoy a king-sized bed, premium linen, and an en-suite bathroom equipped with luxury amenities.",
    pricePerNight: 4500,
    capacity: "2 Guests",
    amenities: [
      "High-Speed Wi-Fi",
      "Central Air Conditioning",
      "24/7 Room Service",
      "Smart TV & Entertainment"
    ],
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800"
    ],
    isAvailable: true
  },
  {
    name: "The Classic Room",
    slug: "the-classic-room",
    tagline: "Comfortable Elegance",
    description: "Perfect for business travelers and couples. The Classic Room offers a serene environment with thoughtful touches to ensure a restful night's sleep.",
    pricePerNight: 3000,
    capacity: "2 Guests",
    amenities: [
      "High-Speed Wi-Fi",
      "Central Air Conditioning",
      "In-room Coffee Maker"
    ],
    images: [
      "https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&q=80&w=800"
    ],
    isAvailable: true
  }
];

// Helper to generate slug
const toSlug = (text: string) =>
  text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

// Get all room types (auto-seeds defaults if empty)
router.get('/', async (req, res) => {
  try {
    let rooms = await Room.find({}).sort({ pricePerNight: -1 }).lean();
    if (rooms.length === 0) {
      await Room.insertMany(DEFAULT_ROOMS);
      rooms = await Room.find({}).sort({ pricePerNight: -1 }).lean();
    }
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

// Admin: Add a new room type
router.post('/', async (req, res) => {
  try {
    const { name, tagline, description, pricePerNight, capacity, amenities, images, isAvailable } = req.body;
    
    if (!name || !pricePerNight) {
      return res.status(400).json({ error: 'Name and price per night are required' });
    }

    const slug = req.body.slug || toSlug(name);

    const newRoom = new Room({
      name,
      slug,
      tagline: tagline || "",
      description: description || "",
      pricePerNight: Number(pricePerNight),
      capacity: capacity || "2 Guests",
      amenities: Array.isArray(amenities) ? amenities : [],
      images: Array.isArray(images) ? images : [],
      isAvailable: isAvailable !== undefined ? Boolean(isAvailable) : true
    });

    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error: any) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: error.message || 'Failed to create room' });
  }
});

// Admin: Update a room type
router.put('/:id', async (req, res) => {
  try {
    const { name, slug, tagline, description, pricePerNight, capacity, amenities, images, isAvailable } = req.body;
    
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;
    if (tagline !== undefined) updateData.tagline = tagline;
    if (description !== undefined) updateData.description = description;
    if (pricePerNight !== undefined) updateData.pricePerNight = Number(pricePerNight);
    if (capacity !== undefined) updateData.capacity = capacity;
    if (amenities !== undefined) updateData.amenities = amenities;
    if (images !== undefined) updateData.images = images;
    if (isAvailable !== undefined) updateData.isAvailable = Boolean(isAvailable);

    const updated = await Room.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json({ success: true, room: updated });
  } catch (error: any) {
    console.error('Error updating room:', error);
    res.status(500).json({ error: error.message || 'Failed to update room' });
  }
});

// Admin: Delete a room type
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Room.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json({ success: true, message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ error: 'Failed to delete room' });
  }
});

// Admin: Upload image directly to Cloudflare R2
router.post('/upload-image', async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'No image data provided' });
    }

    // If already a hosted URL, return it
    if (typeof image === 'string' && (image.startsWith('http://') || image.startsWith('https://'))) {
      return res.json({ success: true, url: image });
    }

    // Upload base64 image to Cloudflare R2
    const { url, key } = await uploadImageToR2(image, 'bkc-rooms');

    res.json({ success: true, url, key });
  } catch (error: any) {
    console.error('Error uploading image to R2:', error);
    res.status(500).json({ error: error.message || 'Failed to upload image' });
  }
});

// Admin: Delete image from room & R2
router.post('/delete-image', async (req, res) => {
  try {
    const { roomId, imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required' });
    }

    // 1. Delete from R2
    await deleteFromR2(imageUrl);

    // 2. If roomId provided, remove from room's images array
    if (roomId) {
      await Room.findByIdAndUpdate(roomId, {
        $pull: { images: imageUrl }
      });
    }

    res.json({ success: true, message: 'Image deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: error.message || 'Failed to delete image' });
  }
});

export default router;
