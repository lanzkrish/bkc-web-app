"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5010";

type LiveMenuItem = {
  _id?: string;
  name: string;
  type: string;
  price: any;
  isOutOfStock?: boolean;
};

type MenuSection = {
  _id?: string;
  category: string;
  subCategory?: string;
  items: LiveMenuItem[];
};

type FeaturedDish = {
  name: string;
  price: number | string;
  description: string;
  img: string;
  isOutOfStock?: boolean;
};

const DEFAULT_FEATURED: Record<string, FeaturedDish[]> = {
  starters: [
    {
      name: "Drums of Heaven",
      price: 286,
      description: "Crispy chicken lollipops tossed in a rich, tangy Indo-Chinese sauce and fresh spring onions.",
      img: "/assets/drums-of-heaven.jpg",
    },
    {
      name: "Mutton Ghee Roast",
      price: 359,
      description: "Tender mutton morsels slow-roasted in pure desi ghee with freshly ground coastal spices.",
      img: "/assets/mutton-ghee-roast.jpg",
    },
    {
      name: "Paneer Lollipop",
      price: 238,
      description: "Crispy spiced cottage cheese skewers seasoned with fragrant herbs, served with mint chutney.",
      img: "/assets/paneer-lollipop.jpg",
    },
  ],
  "main-course": [
    {
      name: "Paneer Butter Masala",
      price: 214,
      description: "Soft cottage cheese simmered in a velvety tomato-butter gravy finished with fresh cream.",
      img: "/assets/paneer-butter-masala.jpg",
    },
    {
      name: "Kaju Paneer Curry",
      price: 299,
      description: "Roasted cashew nuts and cottage cheese cooked in a decadent, mildly spiced royal gravy.",
      img: "/assets/kaju-paneer-curry.jpg",
    },
    {
      name: "Dal Tadka",
      price: 166,
      description: "Homestyle yellow lentils tempered with ghee, cumin seeds, garlic, and fresh coriander.",
      img: "/assets/dal-tadka.jpg",
    },
  ],
  biryanis: [
    {
      name: "Hyderabadi Chicken Dum Biryani",
      price: 239,
      description: "Aromatic extra-long basmati rice slow-cooked with tender spiced chicken drumstick, saffron, and caramelized onions.",
      img: "/assets/hyderabadi-chicken-dum-biryani.jpg",
    },
    {
      name: "Chicken Fry Piece Biryani",
      price: 239,
      description: "Fragrant biryani rice served with crispy, spicy seasoned chicken pieces, fried cashews, and fresh mint.",
      img: "/assets/special-chicken-biryani.jpg",
    },
    {
      name: "Paneer Biryani",
      price: 239,
      description: "Succulent marinated cottage cheese layered with fragrant basmati and caramelized onions.",
      img: "/assets/paneer-biryani.jpg",
    },
  ],
  desserts: [
    {
      name: "Hot Gulab Jamun",
      price: 89,
      description: "Warm, melt-in-mouth milk dumplings soaked in cardamom and saffron infused syrup.",
      img: "/assets/hot-gulab-jamun.jpg",
    },
    {
      name: "Ice Cream Selection",
      price: 99,
      description: "Rich and velvety scoops available in classic vanilla, crunch butterscotch, or rich chocolate.",
      img: "/assets/ice-cream-selection.jpg",
    },
  ],
  beverages: [
    {
      name: "Virgin Mojito / Blue Lagoon",
      price: 139,
      description: "Crisp, refreshing coolers with muddled mint, citrus, and sparkling bubbles.",
      img: "/assets/virgin-mojito.jpg",
    },
    {
      name: "Cold Coffee",
      price: 149,
      description: "Rich blended espresso poured over chilled milk and ice, finished with a touch of chocolate.",
      img: "/assets/cold-coffee.jpg",
    },
  ],
};

export default function MenuPage() {
  const [activeSection, setActiveSection] = useState("starters");
  const [liveMenu, setLiveMenu] = useState<MenuSection[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/menu`, {
      cache: "no-store",
      headers: { "ngrok-skip-browser-warning": "true" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setLiveMenu(data);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch live menu, using fallback data:", err);
      });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -80% 0px",
      }
    );

    const sections = document.querySelectorAll(".category-anchor");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Helper to get live dish information (price, stock, name) from backend
  const getDish = (dish: FeaturedDish): FeaturedDish => {
    if (!liveMenu || liveMenu.length === 0) return dish;

    const dishNameNorm = dish.name.toLowerCase().trim();

    // 1. Exact match first
    for (const sec of liveMenu) {
      for (const item of sec.items) {
        if (item.name.toLowerCase().trim() === dishNameNorm) {
          let p = item.price;
          if (typeof p === "object" && p !== null) {
            p = Object.values(p)[0] as any;
          }
          return {
            ...dish,
            name: item.name,
            price: p || dish.price,
            isOutOfStock: Boolean(item.isOutOfStock),
          };
        }
      }
    }

    // 2. Partial match (excluding mushroom if dish is not mushroom)
    for (const sec of liveMenu) {
      for (const item of sec.items) {
        const itemNorm = item.name.toLowerCase().trim();
        if (itemNorm.includes("mushroom") && !dishNameNorm.includes("mushroom")) {
          continue;
        }
        if (itemNorm.includes(dishNameNorm) || dishNameNorm.includes(itemNorm)) {
          let p = item.price;
          if (typeof p === "object" && p !== null) {
            p = Object.values(p)[0] as any;
          }
          return {
            ...dish,
            name: item.name,
            price: p || dish.price,
            isOutOfStock: Boolean(item.isOutOfStock),
          };
        }
      }
    }

    return dish;
  };

  const getLinkClass = (id: string) => {
    return activeSection === id
      ? "font-label-caps text-label-caps px-6 py-2 rounded-full bg-primary text-white transition-colors uppercase tracking-widest"
      : "font-label-caps text-label-caps px-6 py-2 rounded-full bg-surface text-text-secondary hover:bg-primary hover:text-white transition-colors uppercase tracking-widest";
  };

  const renderDishCard = (rawDish: FeaturedDish, key: number) => {
    const dish = getDish(rawDish);

    return (
      <div key={key} className={`card group ${dish.isOutOfStock ? "opacity-60" : ""}`}>
        <div className="aspect-[4/3] overflow-hidden image-zoom relative">
          <img
            className="w-full h-full object-cover transition-transform duration-700 gallery-img rounded-b-none"
            alt={dish.name}
            src={dish.img}
          />
          {dish.isOutOfStock && (
            <div className="absolute top-3 right-3 bg-red-600/90 text-white text-[10px] font-label-caps uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md font-semibold">
              Out of Stock
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2 gap-2">
            <h3 className={`font-headline-sm text-headline-sm text-text-main group-hover:text-primary transition-colors ${dish.isOutOfStock ? "line-through text-text-secondary" : ""}`}>
              {dish.name}
            </h3>
            <span className="font-body-lg text-primary-dark font-bold whitespace-nowrap">
              ₹{dish.price}
            </span>
          </div>
          <p className="font-body-md text-text-secondary line-clamp-2">
            {dish.description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img
            className="w-full h-full object-cover"
            alt="Cinematic shot of restaurant interior"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuALqVyUUL104K--y8d1gcmbQ4XZgloQRFIJCMkK27742Q1K36_UJwoYCLHYkY7B4jLUwVYNqfzhwxoDhsJBFFweipi8wOxjZQ4i4rG_TUeS7Li1QHALVOYFn7xKFDXsrl-1hfkEmxDLeKklAJHE9hTFfilrWddjIZYD8rSmFM3fkMQjgbbP4j4fKi_lbUVNXuYlh6cKhDiHQrbjYcpM5702-Xq8dp3SM7xSpyqGC58edxGSgSOx3DwxRVDQH9SfTIRqCVARshew8Biz"
          />
        </div>
        <div className="relative z-20 text-center px-6">
          <span className="font-label-caps text-label-caps text-gold mb-4 block tracking-[0.3em]">
            CRAFTED WITH PASSION
          </span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-text-light mb-6">
            Culinary Excellence
          </h1>
          <p className="max-w-2xl mx-auto font-body-lg text-body-lg text-text-light/80 mb-6">
            Explore a symphony of flavors curated from traditional heritage and modern innovation.
          </p>
          <Link href="/menu/full">
            <button className="border border-gold text-gold px-8 py-3 rounded-full font-label-caps text-label-caps hover:bg-gold/10 transition-colors uppercase tracking-widest text-xs">
              View Complete Menu &rarr;
            </button>
          </Link>
        </div>
      </section>

      {/* Category Shortcuts */}
      <section className="sticky top-[80px] z-40 bg-background/90 backdrop-blur-md border-b border-border-custom py-4">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-start md:justify-center gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <a className={getLinkClass("starters")} href="#starters">
            Starters
          </a>
          <a className={getLinkClass("main-course")} href="#main-course">
            Main Course
          </a>
          <a className={getLinkClass("biryanis")} href="#biryanis">
            Signature Biryanis
          </a>
          <a className={getLinkClass("desserts")} href="#desserts">
            Desserts
          </a>
          <a className={getLinkClass("beverages")} href="#beverages">
            Beverages
          </a>
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-20">
        {/* Category: Starters */}
        <section className="category-anchor mb-section-gap" id="starters">
          <div className="flex items-baseline gap-6 mb-12">
            <h2 className="font-headline-md text-headline-md text-text-main">Starters</h2>
            <div className="flex-grow h-[1px] bg-border-custom"></div>
            <span className="font-label-caps text-label-caps text-primary">01</span>
          </div>
          <div className="menu-grid">
            {DEFAULT_FEATURED.starters.map((d, i) => renderDishCard(d, i))}
          </div>
        </section>

        {/* Category: Main Course */}
        <section className="category-anchor mb-section-gap" id="main-course">
          <div className="flex items-baseline gap-6 mb-12">
            <h2 className="font-headline-md text-headline-md text-text-main">Main Course</h2>
            <div className="flex-grow h-[1px] bg-border-custom"></div>
            <span className="font-label-caps text-label-caps text-primary">02</span>
          </div>
          <div className="menu-grid">
            {DEFAULT_FEATURED["main-course"].map((d, i) => renderDishCard(d, i))}
          </div>
        </section>

        {/* Category: Signature Biryanis */}
        <section className="category-anchor mb-section-gap" id="biryanis">
          <div className="flex items-baseline gap-6 mb-12">
            <h2 className="font-headline-md text-headline-md text-text-main">Signature Biryanis</h2>
            <div className="flex-grow h-[1px] bg-border-custom"></div>
            <span className="font-label-caps text-label-caps text-primary">03</span>
          </div>
          <div className="menu-grid">
            {DEFAULT_FEATURED.biryanis.map((d, i) => renderDishCard(d, i))}
          </div>
        </section>

        {/* Category: Desserts */}
        <section className="category-anchor mb-section-gap" id="desserts">
          <div className="flex items-baseline gap-6 mb-12">
            <h2 className="font-headline-md text-headline-md text-text-main">Desserts</h2>
            <div className="flex-grow h-[1px] bg-border-custom"></div>
            <span className="font-label-caps text-label-caps text-primary">04</span>
          </div>
          <div className="menu-grid">
            {DEFAULT_FEATURED.desserts.map((d, i) => renderDishCard(d, i))}
          </div>
        </section>

        {/* Category: Beverages */}
        <section className="category-anchor" id="beverages">
          <div className="flex items-baseline gap-6 mb-12">
            <h2 className="font-headline-md text-headline-md text-text-main">Beverages</h2>
            <div className="flex-grow h-[1px] bg-border-custom"></div>
            <span className="font-label-caps text-label-caps text-primary">05</span>
          </div>
          <div className="menu-grid">
            {DEFAULT_FEATURED.beverages.map((d, i) => renderDishCard(d, i))}
          </div>
        </section>
      </div>
    </>
  );
}
