"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";

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



const INITIAL_MENU_DATA: MenuSection[] = [
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

const DEFAULT_CATEGORIES = Array.from(new Set(INITIAL_MENU_DATA.map((s) => s.category)));

export default function FullMenuPage() {
  const [fullMenuData, setFullMenuData] = useState<MenuSection[]>(INITIAL_MENU_DATA);
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [activeCategory, setActiveCategory] = useState<string>(DEFAULT_CATEGORIES[0] || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietFilter, setDietFilter] = useState("all");

  useEffect(() => {
    fetch('http://localhost:5010/api/menu')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setFullMenuData(data);
          const cats = Array.from(new Set(data.map((s: MenuSection) => s.category))) as string[];
          setCategories(cats);
          if (cats.length > 0 && !cats.includes(activeCategory)) {
            setActiveCategory(cats[0]);
          }
        }
      })
      .catch((err) => {
        console.warn('Could not fetch remote menu, using fallback menu data:', err);
      });
  }, [activeCategory]);

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
