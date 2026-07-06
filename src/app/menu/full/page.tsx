"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

type MenuItem = {
  name: string;
  type: string;
  price: number | Record<string, number>;
};

type MenuSection = {
  category: string;
  subCategory?: string;
  items: MenuItem[];
};

const fullMenuData: MenuSection[] = [
  {
    category: "Soup Section",
    items: [
      { name: "Roasted Tomato Basil Soup", type: "veg", price: { regular: 106, large: 130 } },
      { name: "Authentic Sweet Corn Soup", type: "veg", price: { regular: 106, large: 130 } },
      { name: "Veg Manchow Soup", type: "veg", price:{ regular:106, large:130 } },
      { name:"Hot & Sour Soup", type:"veg", price:{ regular:106, large:130 } },
      { name:"Burnt Garlic Soup", type:"veg", price:{ regular:106, large:130 } },
      { name:"Chef's Special Soup", type:"veg", price:{ regular:119, large:142 } },
      { name:"Lemon Coriander Soup", type:"veg", price:{ regular:106, large:130 } },
      { name:"Mutton Soup", type:"non-veg", price:149 }
    ]
  },
  {
    category:"Starters & Appetizers",
    subCategory:"Vegetarian",
    items:[
      { name:"Masala Papad", type:"veg", price:60 },
      { name:"Fried Papad", type:"veg", price:50 },
      { name:"Roasted Papad", type:"veg", price:40 },
      { name:"Paneer Deep Fried with Hong Kong Sauce", type:"veg", price:298 },
      { name:"Veg Shashlik", type:"veg", price:238 },
      { name:"Paneer Lollipop", type:"veg", price:238 },
      { name:"Stuffed Mushroom with Hot Garlic Sauce", type:"veg", price:238 },
      { name:"Veg Manchurian", type:"veg", price:226 },
      { name:"Honey Chilli Potato", type:"veg", price:190 },
      { name:"American Crispy Corn Chatpata", type:"veg", price:190 },
      { name:"French Fries", type:"veg", price:144 },
      { name:"Peri Peri French Fries", type:"veg", price:139 },
      { name:"Paneer Chatpata", type:"veg", price:169 }
    ]
  },
  {
    category: "Rice & Noodles",
    items: [
      { name: "Plain Rice", type: "veg", price: { veg: 82, mix: 159 } },
      { name: "Burnt Garlic Fried Rice", type: "both", price: { veg: 199, nonVeg: 234, mix: 259 } },
      { name: "Schezwan Fried Rice", type: "both", price: { veg: 199, nonVeg: 214, mix: 259 } },
      { name: "Chilli Garlic Fried Rice", type: "both", price: { veg: 199, nonVeg: 214, mix: 259 } },
      { name: "Jeera Rice", type: "veg", price: 142 },
      { name: "Curd Rice", type: "veg", price: 142 },
      { name: "Ghee Rice", type: "veg", price: 166 },
      { name: "Special Fried Rice", type: "both", price: { veg: 219, nonVeg: 269 } },
      { name: "Paneer Fried Rice", type: "veg", price: 178 },
      { name: "Mushroom Fried Rice", type: "veg", price: 178 },
      { name: "Baby Corn Fried Rice", type: "veg", price: 178 },
      { name: "Veg Pulao", type: "veg", price: 199 },
      { name: "Veg Noodles", type: "veg", price: 142 },
      { name: "Mix Veg Noodles", type: "veg", price: 226 },
      { name: "Schezwan Veg Noodles", type: "veg", price: 166 },
      { name: "Chicken Noodles", type: "non-veg", price: 199 },
      { name: "Schezwan Chicken Noodles", type: "non-veg", price: 214 },
      { name: "Mix Non Veg Noodles", type: "non-veg", price: { regular:274, mix:299 } }
    ]
  },
  {
    category: "Main Course",
    subCategory: "Veg Curries",
    items: [
      { name:"Dal Fry", type:"veg", price:130 },
      { name:"Dal Tadka (Ghee)", type:"veg", price:166 },
      { name:"Veg Curry Mix", type:"veg", price:200 },
      { name:"Veg Kadai", type:"veg", price:190 },
      { name:"Veg Do Pyaza", type:"veg", price:200 },
      { name:"Veg Hyderabadi", type:"veg", price:200 },
      { name:"Navratan Korma", type:"veg", price:226 }
    ]
  },
  {
    category:"Main Course",
    subCategory:"Paneer",
    items:[
      { name:"Paneer Kadai", type:"veg", price:214 },
      { name:"Paneer Hyderabadi", type:"veg", price:214 },
      { name:"Paneer Butter Masala", type:"veg", price:214 },
      { name:"Paneer Navratan Korma", type:"veg", price:238 },
      { name:"Paneer Do Piyaza", type:"veg", price:226 },
      { name:"Paneer Chatpata", type:"veg", price:226 },
      { name:"Paneer Tikka Masala", type:"veg", price:238 },
      { name:"Kaju Paneer Curry", type:"veg", price:299 }
    ]
  },
  {
    category:"Main Course",
    subCategory:"Mushroom",
    items:[
      { name:"Mushroom Kadai", type:"veg", price:200 },
      { name:"Mushroom Do Pyaza", type:"veg", price:200 },
      { name:"Mushroom Kolhapuri", type:"veg", price:226 },
      { name:"Mushroom Butter Masala", type:"veg", price:226 },
      { name:"Mushroom Chatpata", type:"veg", price:226 },
      { name:"Mushroom Hyderabadi", type:"veg", price:226 },
      { name:"Kaju Mushroom Curry", type:"veg", price:286 }
    ]
  },
  {
    category:"Main Course",
    subCategory:"Chicken",
    items:[
      { name:"Butter Chicken", type:"non-veg", price:264 },
      { name:"Kadai Chicken", type:"non-veg", price:238 },
      { name:"Chicken Do Pyaza", type:"non-veg", price:238 },
      { name:"Chicken Lababdar", type:"non-veg", price:274 },
      { name:"Chicken Kaswa", type:"non-veg", price:264 },
      { name:"Chicken Curry (Home Style)", type:"non-veg", price:252 },
      { name:"Chicken Rogan Josh", type:"non-veg", price:238 },
      { name:"Chicken Muglai", type:"non-veg", price:249 }
    ]
  },
  {
    category:"Main Course",
    subCategory:"Egg",
    items:[
      { name:"Egg Masala", type:"egg", price:154 },
      { name:"Egg Kadai", type:"egg", price:154 },
      { name:"Egg Do Pyaza", type:"egg", price:154 },
      { name:"Egg Bhurji", type:"egg", price:118 }
    ]
  },
  {
    category:"Main Course",
    subCategory:"Seafood",
    items:[
      { name:"Fish Curry", type:"non-veg", price:240 },
      { name:"Prawn Masala", type:"non-veg", price:389 },
      { name:"Kadai Prawn", type:"non-veg", price:389 },
      { name:"Malai Prawn Curry", type:"non-veg", price:389 },
      { name:"Prawn Curry (Home Style)", type:"non-veg", price:389 }
    ]
  },
  {
    category:"Main Course",
    subCategory:"Mutton",
    items:[
      { name:"Mutton Masala", type:"non-veg", price:389 },
      { name:"Mutton Curry (Home Style)", type:"non-veg", price:389 },
      { name:"Mutton Kadai", type:"non-veg", price:389 },
      { name:"Mutton Rogan Josh", type:"non-veg", price:389 },
      { name:"Mutton Kaswa", type:"non-veg", price:389 },
      { name:"Mutton Do Pyaza", type:"non-veg", price:389 },
      { name:"Baripada Mutton Mudhi", type:"non-veg", price:399 }
    ]
  },
  {
    category:"Continental",
    items:[
      { name:"Chicken Popcorn", type:"non-veg", price:234 },
      { name:"Fish Fingers", type:"non-veg", price:389 },
      { name:"Butter Garlic Prawns", type:"non-veg", price:389 },
      { name:"Peri Peri Prawns", type:"non-veg", price:389 }
    ]
  },
  {
    category:"Biryani",
    items:[
      { name:"Hyderabadi Chicken Dum Biryani", type:"non-veg", price:239 },
      { name:"Boneless Chicken Biryani", type:"non-veg", price:264 },
      { name:"Chicken Fry Piece Biryani", type:"non-veg", price:239 },
      { name:"Bhubaneswar Kitchen Special Biryani", type:"non-veg", price:329 },
      { name:"Chicken Lollipop Biryani", type:"non-veg", price:298 },
      { name:"Mutton Fry Piece Biryani", type:"non-veg", price:359 },
      { name:"Prawn Biryani", type:"non-veg", price:359 },
      { name:"Veg Biryani (Mushroom)", type:"veg", price:300 },
      { name:"Veg Biryani (Paneer)", type:"veg", price:310 },
      { name:"Muglai Chicken Biryani", type:"non-veg", price:279 },
      { name:"Muglai Mutton Biryani", type:"non-veg", price:359 },
      { name:"Paneer Biryani", type:"veg", price:239 },
      { name:"Mushroom Biryani", type:"veg", price:229 }
    ]
  },
  {
    category:"Tandoori & Breads",
    subCategory:"Breads",
    items:[
      { name:"Roti Plain", type:"veg", price:18 },
      { name:"Roti Butter", type:"veg", price:30 },
      { name:"Naan Plain", type:"veg", price:35 },
      { name:"Butter Naan", type:"veg", price:40 },
      { name:"Garlic Naan", type:"veg", price:50 },
      { name:"Methi Naan", type:"veg", price:50 },
      { name:"Tandoori Roti Plain", type:"veg", price:25 },
      { name:"Tandoori Roti Butter", type:"veg", price:30 },
      { name:"Masala Kulcha", type:"veg", price:45 },
      { name:"Butter Kulcha", type:"veg", price:35 }
    ]
  },
  {
    category:"Paratha",
    items:[
      { name:"Laccha Paratha", type:"veg", price:30 },
      { name:"Butter Paratha", type:"veg", price:40 },
      { name:"Garlic Paratha", type:"veg", price:50 },
      { name:"Aloo Paratha", type:"veg", price:99 },
      { name:"Methi Paratha", type:"veg", price:99 }
    ]
  },
  {
    category:"Tandoori",
    items:[
      { name:"Tandoori Chicken Half", type:"non-veg", price:299 },
      { name:"Tandoori Chicken Full", type:"non-veg", price:549 },
      { name:"Tangdi Kebab", type:"non-veg", price:239 },
      { name:"Chicken Tikka", type:"non-veg", price:239 },
      { name:"Chicken Malai Tikka", type:"non-veg", price:249 },
      { name:"Paneer Tikka", type:"veg", price:249 },
      { name:"Malai Paneer Tikka", type:"veg", price:279 },
      { name:"Reshmi Kebab", type:"non-veg", price:289 }
    ]
  },
  {
    category:"Desserts",
    items:[
      { name:"Dahi Boondi", type:"veg", price:69 },
      { name:"Sizzling Brownie with Ice Cream", type:"veg", price:229 },
      { name:"Brownie with Ice Cream", type:"veg", price:199 },
      { name:"Hot Gulab Jamun with Chocolate Sauce", type:"veg", price:89 },
      { name:"Chocolate Ice Cream", type:"veg", price:99 },
      { name:"Vanilla Ice Cream", type:"veg", price:99 },
      { name:"Strawberry Ice Cream", type:"veg", price:99 },
      { name:"Butterscotch Ice Cream", type:"veg", price:99 }
    ]
  },
  {
    category:"Beverages",
    subCategory:"Classic",
    items:[
      { name:"Tea", type:"veg", price:20 },
      { name:"Masala Tea", type:"veg", price:25 },
      { name:"Coffee", type:"veg", price:30 },
      { name:"Buttermilk", type:"veg", price:49 },
      { name:"Fresh Lime Soda", type:"veg", price:89 },
      { name:"Lassi Plain", type:"veg", price:99 },
      { name:"Sweet Lassi", type:"veg", price:99 },
      { name:"Salted Lassi", type:"veg", price:99 },
      { name:"Vanilla Milkshake", type:"veg", price:149 },
      { name:"Strawberry Milkshake", type:"veg", price:149 },
      { name:"KitKat Milkshake", type:"veg", price:149 },
      { name:"Oreo Milkshake", type:"veg", price:149 },
      { name:"Butterscotch Milkshake", type:"veg", price:149 },
      { name:"Chocolate Milkshake", type:"veg", price:149 },
      { name:"Cold Coffee", type:"veg", price:149 },
      { name:"Masala Soft Drink", type:"veg", price:69 }
    ]
  },
  {
    category:"Mocktails",
    items:[
      { name:"Virgin Mojito", type:"veg", price:139 },
      { name:"Blue Lagoon", type:"veg", price:129 },
      { name:"Blueberry Mojito", type:"veg", price:129 },
      { name:"Green Apple", type:"veg", price:129 },
      { name:"Kiwi Mojito", type:"veg", price:129 },
      { name:"Spring Fever", type:"veg", price:149 },
      { name:"Coco Colada", type:"veg", price:149 }
    ]
  }
];

export default function FullMenuPage() {
  const categories = useMemo(() => Array.from(new Set(fullMenuData.map(s => s.category))), []);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dietFilter, setDietFilter] = useState("all");

  const filteredData = useMemo(() => {
    let data = fullMenuData;

    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.toLowerCase();
      data = data.map(section => ({
        ...section,
        items: section.items.filter(item => item.name.toLowerCase().includes(lowerQuery))
      })).filter(section => section.items.length > 0);
    } else {
      data = data.filter(section => section.category === activeCategory);
    }

    if (dietFilter !== "all") {
      data = data.map(section => ({
        ...section,
        items: section.items.filter(item => {
          if (dietFilter === "veg") return item.type === "veg" || item.type === "both";
          if (dietFilter === "non-veg") return item.type === "non-veg" || item.type === "both" || item.type === "egg";
          return true;
        })
      })).filter(section => section.items.length > 0);
    }

    return data;
  }, [activeCategory, searchQuery, dietFilter]);

  return (
    <>
      <section className="pt-32 pb-12 bg-surface-dark text-text-light text-center px-margin-mobile">
        <span className="font-label-caps text-label-caps text-gold mb-4 block tracking-[0.3em]">COMPLETE OFFERINGS</span>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-white mb-6">Full Menu</h1>
        <p className="max-w-2xl mx-auto font-body-lg text-text-light/80 mb-10">
          Discover our comprehensive culinary selection, carefully crafted to offer a taste of tradition and modernity.
        </p>
        <Link href="/menu">
          <button className="border border-gold text-gold px-8 py-3 rounded-full font-label-caps text-label-caps hover:bg-gold/10 transition-colors duration-200 tracking-widest uppercase">
            &larr; Back to Featured Menu
          </button>
        </Link>
      </section>

      {/* Interactive Toolbar */}
      <section className="sticky top-[80px] z-40 bg-background/95 backdrop-blur-md border-b border-border-custom py-4 px-margin-mobile shadow-sm">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search */}
          <div className="relative w-full md:w-1/2">
            <input 
              type="text" 
              placeholder="Search for a dish..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-border-custom rounded-full px-6 py-2 outline-none focus:border-primary text-text-main font-body-md"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Diet Filter */}
          <div className="flex bg-surface rounded-full p-1 border border-border-custom w-full md:w-auto">
            <button onClick={() => setDietFilter("all")} className={`flex-1 md:flex-none px-4 py-1.5 rounded-full font-label-caps text-xs tracking-wider uppercase transition-colors ${dietFilter === 'all' ? 'bg-primary text-white' : 'text-text-secondary hover:text-primary'}`}>All</button>
            <button onClick={() => setDietFilter("veg")} className={`flex-1 md:flex-none px-4 py-1.5 rounded-full font-label-caps text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-1 ${dietFilter === 'veg' ? 'bg-primary text-white' : 'text-text-secondary hover:text-primary'}`}>
              <span className={`w-2 h-2 rounded-full ${dietFilter === 'veg' ? 'bg-white' : 'bg-green-600'}`}></span> Veg
            </button>
            <button onClick={() => setDietFilter("non-veg")} className={`flex-1 md:flex-none px-4 py-1.5 rounded-full font-label-caps text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-1 ${dietFilter === 'non-veg' ? 'bg-primary text-white' : 'text-text-secondary hover:text-primary'}`}>
              <span className={`w-2 h-2 rounded-full ${dietFilter === 'non-veg' ? 'bg-white' : 'bg-red-600'}`}></span> Non-Veg
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        {searchQuery.trim() === "" && (
          <div className="max-w-3xl mx-auto mt-4 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide pb-2">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`font-label-caps text-xs tracking-widest uppercase px-5 py-2 rounded-full transition-colors flex-shrink-0 border ${
                  activeCategory === cat ? 'bg-primary border-primary text-white' : 'bg-transparent border-border-custom text-text-secondary hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="py-12 md:py-16 bg-background min-h-[50vh]">
        <div className="max-w-3xl mx-auto px-margin-mobile">
          {filteredData.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="font-headline-md text-text-main mb-2">No dishes found</h3>
              <p className="font-body-lg text-text-secondary">Try adjusting your search or filters.</p>
            </div>
          ) : (
            filteredData.map((section, idx) => {
              const isFirstInCategory = idx === 0 || filteredData[idx - 1].category !== section.category;
              
              return (
                <div key={idx} className="mb-16">
                  {(isFirstInCategory || section.subCategory) && (
                    <div className="text-center mb-10 border-b border-border-custom pb-6">
                      {isFirstInCategory && (
                        <h2 className="font-headline-md text-headline-md text-text-main uppercase tracking-wider">{section.category}</h2>
                      )}
                      {section.subCategory && (
                        <h3 className={`font-headline-sm text-text-primary ${isFirstInCategory ? 'mt-2' : ''} text-primary`}>
                          {section.subCategory}
                        </h3>
                      )}
                    </div>
                  )}
                  <div className="space-y-6">
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex justify-between items-end border-b border-border-custom/30 pb-3 hover:border-primary/50 transition-colors">
                      <div className="flex-1 pr-4">
                        <h4 className="font-headline-sm text-text-main flex items-center gap-3">
                          {item.name}
                          {item.type === 'veg' && (
                            <span title="Vegetarian" className="w-4 h-4 border-2 border-green-600 flex items-center justify-center p-[2px] bg-white flex-shrink-0">
                              <span className="w-full h-full bg-green-600 rounded-full"></span>
                            </span>
                          )}
                          {item.type === 'non-veg' && (
                            <span title="Non-Vegetarian" className="w-4 h-4 border-2 border-red-600 flex items-center justify-center p-[2px] bg-white flex-shrink-0">
                              <span className="w-full h-full bg-red-600 rounded-full"></span>
                            </span>
                          )}
                          {item.type === 'egg' && (
                            <span title="Egg" className="w-4 h-4 border-2 border-yellow-500 flex items-center justify-center p-[2px] bg-white flex-shrink-0">
                              <span className="w-full h-full bg-yellow-500 rounded-full"></span>
                            </span>
                          )}
                          {item.type === 'both' && (
                            <div className="flex gap-1">
                              <span title="Vegetarian" className="w-4 h-4 border-2 border-green-600 flex items-center justify-center p-[2px] bg-white flex-shrink-0">
                                <span className="w-full h-full bg-green-600 rounded-full"></span>
                              </span>
                              <span title="Non-Vegetarian" className="w-4 h-4 border-2 border-red-600 flex items-center justify-center p-[2px] bg-white flex-shrink-0">
                                <span className="w-full h-full bg-red-600 rounded-full"></span>
                              </span>
                            </div>
                          )}
                        </h4>
                      </div>
                      <div className="font-body-lg text-primary-dark font-bold whitespace-nowrap text-right">
                        {typeof item.price === 'object' ? (
                          <span className="text-[0.9em] flex items-center gap-2">
                            {Object.entries(item.price).map(([key, val], i, arr) => (
                              <span key={key} className="flex items-center">
                                <span className="text-text-secondary font-normal mr-1 capitalize">{key}:</span>₹{val}
                                {i < arr.length - 1 && <span className="mx-2 text-border-custom">|</span>}
                              </span>
                            ))}
                          </span>
                        ) : (
                          <span>₹{item.price}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
        </div>
      </section>
    </>
  );
}
