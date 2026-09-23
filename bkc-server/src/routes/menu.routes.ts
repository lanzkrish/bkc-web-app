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

// Admin: Add a new item to a section
router.post('/item', async (req, res) => {
  try {
    const { sectionId, category, subCategory, name, type, price, isOutOfStock } = req.body;
    
    let section;
    if (sectionId) {
      section = await MenuSection.findById(sectionId);
    } else if (category) {
      section = await MenuSection.findOne({ category, ...(subCategory ? { subCategory } : {}) });
      if (!section) {
        section = new MenuSection({ category, subCategory, items: [] });
      }
    }

    if (!section) {
      return res.status(404).json({ error: 'Menu section not found' });
    }

    section.items.push({
      name,
      type,
      price,
      isOutOfStock: Boolean(isOutOfStock)
    });

    await section.save();
    res.status(201).json(section);
  } catch (error) {
    console.error('Error adding menu item:', error);
    res.status(500).json({ error: 'Failed to add menu item' });
  }
});

// Admin: Update a specific menu item
router.put('/item/:sectionId/:itemId', async (req, res) => {
  try {
    const { sectionId, itemId } = req.params;
    const { name, type, price, isOutOfStock } = req.body;

    const section = await MenuSection.findById(sectionId);
    if (!section) {
      return res.status(404).json({ error: 'Menu section not found' });
    }

    const item = (section.items as any).id(itemId);
    if (!item) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    if (name !== undefined) item.name = name;
    if (type !== undefined) item.type = type;
    if (price !== undefined) item.price = price;
    if (isOutOfStock !== undefined) item.isOutOfStock = isOutOfStock;

    await section.save();
    res.json({ success: true, item, section });
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ error: 'Failed to update menu item' });
  }
});

// Admin: Toggle out of stock status for an item
router.patch('/item/:sectionId/:itemId/toggle-stock', async (req, res) => {
  try {
    const { sectionId, itemId } = req.params;

    const section = await MenuSection.findById(sectionId);
    if (!section) {
      return res.status(404).json({ error: 'Menu section not found' });
    }

    const item = (section.items as any).id(itemId);
    if (!item) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    item.isOutOfStock = !item.isOutOfStock;
    await section.save();
    res.json({ success: true, isOutOfStock: item.isOutOfStock, item });
  } catch (error) {
    console.error('Error toggling stock status:', error);
    res.status(500).json({ error: 'Failed to toggle stock status' });
  }
});

// Admin: Delete a menu item
router.delete('/item/:sectionId/:itemId', async (req, res) => {
  try {
    const { sectionId, itemId } = req.params;

    const updatedSection = await MenuSection.findByIdAndUpdate(
      sectionId,
      { $pull: { items: { _id: itemId } } },
      { new: true }
    );

    if (!updatedSection) {
      return res.status(404).json({ error: 'Menu section not found' });
    }

    res.json({ success: true, section: updatedSection });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
});

// Admin: Delete a whole menu section
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await MenuSection.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Menu section not found' });
    }
    res.json({ success: true, message: 'Section deleted' });
  } catch (error) {
    console.error('Error deleting menu section:', error);
    res.status(500).json({ error: 'Failed to delete menu section' });
  }
});

export default router;
