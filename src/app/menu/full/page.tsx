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



export default function FullMenuPage() {
  const [fullMenuData, setFullMenuData] = useState<MenuSection[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietFilter, setDietFilter] = useState("all");

  useEffect(() => {
    fetch('http://localhost:5010/api/menu')
      .then(res => res.json())
      .then(data => {
        setFullMenuData(data);
        const cats = Array.from(new Set(data.map((s: MenuSection) => s.category))) as string[];
        setCategories(cats);
        if (cats.length > 0) setActiveCategory(cats[0]);
      })
      .catch(console.error);
  }, []);

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
