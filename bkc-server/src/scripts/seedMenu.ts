import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MenuSection from '../models/Menu';

dotenv.config({ path: '.env.local' });

const fullMenuData = [
  {
    category: "Soups",
    subCategory: "Vegetarian Soups",
    items: [
      { name: "Veg Manchow Soup", type: "veg", price: 106 },
      { name: "Veg Hot & Sour Soup", type: "veg", price: 106 },
      { name: "Veg Lemon Coriander Soup", type: "veg", price: 106 }
    ]
  },
  {
    category: "Soups",
    subCategory: "Non-Vegetarian Soups",
    items: [
      { name: "Mutton Soup", type: "non-veg", price: 149 },
      { name: "Chicken Lemon Coriander Soup", type: "non-veg", price: 130 },
      { name: "Chicken Hot & Sour Soup", type: "non-veg", price: 130 },
      { name: "Chicken Manchow Soup", type: "non-veg", price: 130 }
    ]
  },
  {
    category: "Starters & Appetizers",
    subCategory: "Vegetarian Starters",
    items: [
      { name: "Green Salad", type: "veg", price: 75 },
      { name: "Masala Papad / Roasted Papad", type: "veg", price: { masala: 65, roasted: 45 } },
      { name: "Paneer Lollipop", type: "veg", price: 238 },
      { name: "Veg Manchurian", type: "veg", price: 226 },
      { name: "American Crispy Corn", type: "veg", price: 189 },
      { name: "Mushroom (Salt & Pepper / 65 / Chilli)", type: "veg", price: 190 },
      { name: "Paneer (65 / Chilli)", type: "veg", price: 210 },
      { name: "Baby Corn (Manchurian / Chilli)", type: "veg", price: 199 }
    ]
  },
  {
    category: "Starters & Appetizers",
    subCategory: "Non-Vegetarian Starters",
    items: [
      { name: "Dragon Chicken", type: "non-veg", price: 238 },
      { name: "Drums of Heaven", type: "non-veg", price: 286 },
      { name: "Chicken 65", type: "non-veg", price: 238 },
      { name: "Chilli Chicken", type: "non-veg", price: 238 },
      { name: "Chicken Manchurian", type: "non-veg", price: 238 },
      { name: "Mutton Ghee Roast", type: "non-veg", price: 359 },
      { name: "Apollo Fish", type: "non-veg", price: 299 },
      { name: "Crispy Prawn", type: "non-veg", price: 359 }
    ]
  },
  {
    category: "Rice & Noodles",
    subCategory: "Vegetarian Rice & Noodles",
    items: [
      { name: "Plain Rice", type: "veg", price: 69 },
      { name: "Basmati Rice", type: "veg", price: 89 },
      { name: "Jeera Rice", type: "veg", price: 142 },
      { name: "Mix Veg Fried Rice", type: "veg", price: 239 },
      { name: "Mix Veg Noodles", type: "veg", price: 226 }
    ]
  },
  {
    category: "Rice & Noodles",
    subCategory: "Non-Vegetarian Rice & Noodles",
    items: [
      { name: "Chicken Noodles", type: "non-veg", price: 199 },
      { name: "Mix Non Veg Noodles", type: "non-veg", price: 299 },
      { name: "Chicken Fried Rice", type: "non-veg", price: 199 },
      { name: "Mix Non Veg Fried Rice", type: "non-veg", price: 259 }
    ]
  },
  {
    category: "Main Course",
    subCategory: "Dal & Vegetable Mains",
    items: [
      { name: "Dal Fry", type: "veg", price: 129 },
      { name: "Dal Tadka", type: "veg", price: 166 },
      { name: "Mix Veg", type: "veg", price: 199 },
      { name: "Paneer Kadai", type: "veg", price: 214 },
      { name: "Paneer Butter Masala", type: "veg", price: 214 },
      { name: "Mushroom Do Pyaaza", type: "veg", price: 199 },
      { name: "Paneer Chatpata", type: "veg", price: 226 },
      { name: "Kaju Paneer Curry", type: "veg", price: 299 },
      { name: "Mushroom Butter Masala", type: "veg", price: 226 }
    ]
  },
  {
    category: "Main Course",
    subCategory: "Non-Vegetarian Mains",
    items: [
      { name: "Butter Chicken", type: "non-veg", price: 264 },
      { name: "Kadai Chicken", type: "non-veg", price: 238 },
      { name: "Chicken Rogan Josh", type: "non-veg", price: 238 },
      { name: "Mutton Rogon Josh", type: "non-veg", price: 389 },
      { name: "Mutton Curry Home Style", type: "non-veg", price: 389 },
      { name: "Prawn Curry Home Style", type: "non-veg", price: 389 }
    ]
  },
  {
    category: "Biryani & Tandoori",
    subCategory: "Biryani - House Speciality",
    items: [
      { name: "Veg Biryani", type: "veg", price: 210 },
      { name: "Paneer Biryani", type: "veg", price: 239 },
      { name: "Hyderabadi Dum Biryani", type: "non-veg", price: 239 },
      { name: "Mutton Biryani", type: "non-veg", price: 359 }
    ]
  },
  {
    category: "Biryani & Tandoori",
    subCategory: "Tandoori",
    items: [
      { name: "Tandoori Chicken (Half / Full)", type: "non-veg", price: { half: 299, full: 549 } },
      { name: "Tangdi Kabab", type: "non-veg", price: 239 },
      { name: "Chicken Tikka", type: "non-veg", price: 239 }
    ]
  },
  {
    category: "Breads & Rolls",
    subCategory: "Breads",
    items: [
      { name: "Roti (Plain / Butter)", type: "veg", price: { plain: 15, butter: 25 } },
      { name: "Naan (Plain / Butter / Garlic)", type: "veg", price: { plain: 50, butter: 60, garlic: 72 } },
      { name: "Tandoori Roti (Plain / Butter)", type: "veg", price: { plain: 25, butter: 35 } },
      { name: "Laccha Paratha", type: "veg", price: 40 }
    ]
  },
  {
    category: "Breads & Rolls",
    subCategory: "Rolls",
    items: [
      { name: "Paneer Roll", type: "veg", price: 149 },
      { name: "Mix Veg Roll", type: "veg", price: 149 },
      { name: "Chicken Roll", type: "non-veg", price: 179 }
    ]
  },
  {
    category: "Desserts & Beverages",
    subCategory: "Desserts, Beverages & Mocktails",
    items: [
      { name: "Hot Gulab Jamun", type: "veg", price: 89 },
      { name: "Ice Cream (Vanilla / Butterscotch / Chocolate)", type: "veg", price: 99 },
      { name: "Tea", type: "veg", price: 40 },
      { name: "Masala Tea", type: "veg", price: 45 },
      { name: "Coffee", type: "veg", price: 40 },
      { name: "Lassi", type: "veg", price: 99 },
      { name: "Milkshake (Vanilla / Butterscotch / Chocolate)", type: "veg", price: 149 },
      { name: "Cold Coffee", type: "veg", price: 149 },
      { name: "Masala Soft Drink", type: "veg", price: 69 },
      { name: "Virgin Mojito / Blue Lagoon", type: "veg", price: 139 },
      { name: "Lemon Ice Tea", type: "veg", price: 135 }
    ]
  }
];

const seedMenu = async () => {
  const mongoUri = process.env.MONOG_URI || process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('No MongoDB URI found');
    return;
  }
  
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB. Clearing existing menu...');
    await MenuSection.deleteMany({});
    
    console.log('Inserting new menu data...');
    await MenuSection.insertMany(fullMenuData);
    
    console.log('Menu successfully seeded.');
  } catch (error) {
    console.error('Error seeding menu:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seedMenu();
