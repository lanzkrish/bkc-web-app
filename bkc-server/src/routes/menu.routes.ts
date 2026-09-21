import { Router } from 'express';
import MenuSection from '../models/Menu';

const router = Router();

// Get all menu sections
router.get('/', async (req, res) => {
  try {
    const menu = await MenuSection.find({}).lean();
    res.json(menu);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
});

// Admin: Add a new menu section
router.post('/', async (req, res) => {
  try {
    const newSection = new MenuSection(req.body);
    await newSection.save();
    res.status(201).json(newSection);
  } catch (error) {
    console.error('Error adding menu section:', error);
    res.status(500).json({ error: 'Failed to add menu section' });
  }
});

// Admin: Update a menu section
router.put('/:id', async (req, res) => {
  try {
    const updated = await MenuSection.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    console.error('Error updating menu section:', error);
    res.status(500).json({ error: 'Failed to update menu section' });
  }
});

export default router;
