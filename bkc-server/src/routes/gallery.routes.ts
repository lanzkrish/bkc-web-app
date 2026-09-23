import { Router } from 'express';
import Gallery from '../models/Gallery';
import { uploadImageToR2, deleteFromR2 } from '../services/r2.service';

const router = Router();

const DEFAULT_GALLERY = [
  {
    title: "Fine Dining Grand Room",
    category: "restaurant",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbs7aWG73tjjOeZgZTylH_BoMudhfnUraCWstltVJD5y8Xbb0IszHZL5CVOAmnLDupyOFaLBc6heq8obMuKLx4rl3SXHCnuANfR7vLiMQl0nYben_FyQAb7ISJyFjPNjg6_rR5SLzrovcANNfAPE3CauMevxw6zciDe81gdXxQZUWbT6sSUdsxymLeMyAIMZbvyNbjDw24IT5QV-r5IxvL-rgHahrwweZlXAhvsLATFcd52HWw-rIWSnxhb46JgwzDRJi-bkOtb6tg"
  },
  {
    title: "Signature Hyderabadi Biryani",
    category: "food",
    imageUrl: "/assets/hyderabadi-chicken-dum-biryani.jpg"
  },
  {
    title: "Heritage Dining Hall",
    category: "restaurant",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2GU84Lf2d9r8359l1OQhWMT5HF6dxt3GCEOPsdFpewV9WTd5dQ9Y6nGe5apvkaTaT90rS2jEcnSL73ERparALRvA3LGMdXeYOfRJ8VUfW7HxCPHgFrGxAiStcjnrRyT_NQOH5di04gH02aoi5rbSU8sBFHBep8tkNVUJhKM8g1mHh1wQiH4dV_1yb5rsiH9iyPsFJIKCJ9W_hylQbr4Slzb3WRbU7yzzue_R7_vpbEPhMWh1oM5nnlEnNDeqdXLl9xR5FIa0JDV2L"
  },
  {
    title: "Cafe Lounge Ambiance",
    category: "cafe",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuADtL4CMGMMdCoZZT_Z_ThDGUpfngj2q_CI-gDSIhFIpTAAt0pMOkDQ4M1EiGqq3IorWMg8O7aNXioGmY47loQEPaeNmY61-f68PWc7Kv6sd6OrdDKvPG8r7DT22AOAvtY3N0IHNlvxT0EzQgO0zabKLKQPuhymLolfPlEFP7Evq8lSmeHeXX4xRP9lAX1ue8ae2S-gI5cXxk6_KQpXvdSKb3Hffuu2fJTS5L5SIypIGi72hc-fiXtAiNqU9fAuE8zAdn5CHP9VSTbQ"
  },
  {
    title: "Warm Evening Glow",
    category: "cafe",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuALqVyUUL104K--y8d1gcmbQ4XZgloQRFIJCMkK27742Q1K36_UJwoYCLHYkY7B4jLUwVYNqfzhwxoDhsJBFFweipi8wOxjZQ4i4rG_TUeS7Li1QHALVOYFn7xKFDXsrl-1hfkEmxDLeKklAJHE9hTFfilrWddjIZYD8rSmFM3fkMQjgbbP4j4fKi_lbUVNXuYlh6cKhDiHQrbjYcpM5702-Xq8dp3SM7xSpyqGC58edxGSgSOx3DwxRVDQH9SfTIRqCVARshew8Biz"
  },
  {
    title: "Mutton Ghee Roast Sizzle",
    category: "food",
    imageUrl: "/assets/mutton-ghee-roast.jpg"
  },
  {
    title: "Royal Paneer Gravy",
    category: "food",
    imageUrl: "/assets/paneer-butter-masala.jpg"
  }
];

// Get all gallery items (auto-seeds if empty)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter: any = {};
    if (category && category !== 'all') {
      filter.category = category;
    }

    let items = await Gallery.find(filter).sort({ createdAt: -1 }).lean();
    if (items.length === 0 && (!category || category === 'all')) {
      await Gallery.insertMany(DEFAULT_GALLERY);
      items = await Gallery.find({}).sort({ createdAt: -1 }).lean();
    }

    res.json(items);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    res.status(500).json({ error: 'Failed to fetch gallery items' });
  }
});

// Admin: Upload image to R2 and add to gallery
router.post('/upload', async (req, res) => {
  try {
    const { image, title, category } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'Image data is required' });
    }

    let imageUrl = image;
    let r2Key = undefined;

    // If base64, upload to Cloudflare R2
    if (!image.startsWith('http://') && !image.startsWith('https://')) {
      const uploadResult = await uploadImageToR2(image, 'bkc-gallery');
      imageUrl = uploadResult.url;
      r2Key = uploadResult.key;
    }

    const newItem = new Gallery({
      title: title || '',
      category: category || 'restaurant',
      imageUrl,
      r2Key
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error: any) {
    console.error('Error uploading gallery image:', error);
    res.status(500).json({ error: error.message || 'Failed to upload image' });
  }
});

// Admin: Update gallery item
router.put('/:id', async (req, res) => {
  try {
    const { title, category, imageUrl } = req.body;
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (category !== undefined) updateData.category = category;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;

    const updated = await Gallery.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }

    res.json({ success: true, item: updated });
  } catch (error: any) {
    console.error('Error updating gallery item:', error);
    res.status(500).json({ error: error.message || 'Failed to update item' });
  }
});

// Admin: Delete gallery item (and delete from R2)
router.delete('/:id', async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }

    // Delete from R2
    if (item.imageUrl) {
      await deleteFromR2(item.r2Key || item.imageUrl);
    }

    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting gallery item:', error);
    res.status(500).json({ error: error.message || 'Failed to delete item' });
  }
});

export default router;
