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
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRZv1RL_jkEwN-yUvHUsdH8wXi1vHVwPVDtJQMqSPsOS7XInMFXXYHwsIom-uHPFgG7DgFXfu_P8XxgkAC1bGiJJO4QXp1NW8dkiAmhuQT1jO1j9U4E_DK_dwIwmkKyHckxLq_tKhnarRTlub-skj-MvT9FIghyagC4W1rp2IkawA-6FDAZpOZHnWx0j2xyBYPEeSuk7jHf81hzvSpRZStEee50lq1TTWjsyvVBMrHHfM24nMT300O5WoNph3OdzzMc2WDS6njoSKI",
    },
    {
      name: "Mutton Ghee Roast",
      price: 359,
      description: "Tender mutton morsels slow-roasted in pure desi ghee with freshly ground coastal spices.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTk8lyZgR5LR1uITK5zWs_LMCrB2ICi04hnjozCvKUcH-OSInlg2BmcwRAYGwtgTtn2SEEpHsWW4ehME1FWzv-KaiwhGT4bnbhPyhMjstZR-T25046c-pvzG5Jeg0U9ruykdK_kUB7gL0e-yP0rdsfZcPz6DA9366qmktTAyK4mtoUddt57a48-nAOAZzEeV3bN5vhfWua5VLWaMcy9WnWHD0fRyL_oCernmOWjbbIZzjK0wdNATByP-zwRw2FaMczsywjuzAa4Gl1",
    },
    {
      name: "Paneer Lollipop",
      price: 238,
      description: "Crispy spiced cottage cheese skewers seasoned with fragrant herbs, served with mint chutney.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkNhhv2hSYoSeP-vkOtpjhj6iMShtjAyRo3PBNH6gTz07ZHN63nl5LmIwksv0JyvmqP1V4CxiExpuehqcdk6wLejHrRozA1PK9_oHvrNbtMMwr0RjmmsdJTjr1b0S1vfO_mmGkjvxHhd_pVn3pT1HbdNls7A4kgjtcAXZw0fpeQneLayO4sbZQIx0bPiCUFSj8DwLFAg8qYbUiy4kAsbA12tWOCKxcR6_lNFLjqZt5v2P3uQW-Yk3Gl0eOJBjW0wAtsc5c2a2SAcmg",
    },
  ],
  "main-course": [
    {
      name: "Paneer Butter Masala",
      price: 214,
      description: "Soft cottage cheese simmered in a velvety tomato-butter gravy finished with fresh cream.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZKLJ14Su_vJiHmy5Jk-RVXWX7kRZWyLKRBSIaMZeW3uJOLX7rvOvdHu7RMeFVoCP322CkXNwzNtJLT4_nVoSTx_Ji8mB_LaSsNS8QRKMKw02xhTF7PuTx-ZIHuYuXno1GyDsuQ4A8mQywfob1RtXQwdgcrTyBSeLHs_ngdDKxYlyGnanvWa1qywKH4HsAZSICytGRfITA17S3a5C6xvrQsLT9_jvUg-gUZriCTZNCNHNMzvlB1fJ1V0JRAk0S859uhHBANY15G8OI",
    },
    {
      name: "Kaju Paneer Curry",
      price: 299,
      description: "Roasted cashew nuts and cottage cheese cooked in a decadent, mildly spiced royal gravy.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYWl3LHhoE554XVoV9GrnAIIC0pe7WWVpElIauK8Ootf0zN_8oAN_rRZ-yQy4BGHdev-iZSWNpE5gTvEfj8Yoeh2Yvj2iaYGR52XP7x2ICjd-JvDGSqf6EAssAz9W82njq9Tz775oXgEdHEL5kUNaT6LSPIL4NKRzH-y6ZyqjAe0lYxu1gQqQ_pUcm9E8_A4ZZQL_HWaZM5WW-7Gdx_ovdDVJyxHcKOHzoHqp2PKU4YxwkzNFe_CFjBdE3Lf6yQRMIbvxMSYivoTdf",
    },
    {
      name: "Dal Tadka",
      price: 166,
      description: "Homestyle yellow lentils tempered with ghee, cumin seeds, garlic, and fresh coriander.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0woEiPkU04kVNN87EPsPbQArOUiistNKeFDhS3KMRWhIO3AHq8wFZ9bnou6qnwf27PLfzzD1ZFVyr8Jj9Ga8uxP7MYhLltJVz3JBrq-RAkkHc6BOietXNvPpSHuNkzT1j3qGSP-8BJ-PMFAFqKwCWX1HMKBugaZusr62p4esFn19eS9NIaYqKbYGRCcEyzIF6__3GLQqhPgXf9l0Drs4DR1WJOr-1gcQEtERJaYuJVXDXYCBRccpp25cEXocNnoB7xQCYm41tz4DQ",
    },
  ],
  biryanis: [
    {
      name: "Veg Biryani",
      price: 210,
      description: "Long-grain basmati rice layered with garden-fresh vegetables and secret royal spices.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUPiRNcEGuEIOqA7AeXH1SX8m7CZ_UOtTLHkh5kLyYd8-fTOi8QdOZguca--CiCumURP0hW9sRVKLDepLnDYYsvt8uzGaYS8wB_nPpiPL4W4kncPpTvtPGutkHKheC4cRZ875NbhlmZ6LWI9f8gVZ3M7AzQTxrb1pnmdcpe19Jb92ZrSZKsBf5vvbLXpMjSPE_-wm9Uke6ltsLhHiRUQu8JmvVEKjwgyPiTq2QXG0sJD3kEeR_ECqPzDlszrX9jhQcB3aIpyD4OS9B",
    },
    {
      name: "Paneer Biryani",
      price: 239,
      description: "Succulent marinated cottage cheese layered with fragrant basmati and caramelized onions.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1MktCLp3ovnKkkIjOXotrjCIOGfzT-Ib1PiFBwV5Wqn9Oc-PjsQcY5c21v2QgW63flZ35IX7U67J2Jf9i2S0yzo6utDA01RvkdJDA46oWwOQWMNXeZBRjsuIkwezDkQ1rk5pZVPVggVar-yYPfpos4KlcsC4iJ-RLbu7HQ781hmkWtxocu9XfO4U2yYUP1QYGQ1YwlIG3nd7mDSIBCX8dLwxX1P64xN98kwExpytz6TrPSWexW02XBBuHtfzdQA2gyDYXKD-_WkB6",
    },
  ],
  desserts: [
    {
      name: "Hot Gulab Jamun",
      price: 89,
      description: "Warm, melt-in-mouth milk dumplings soaked in cardamom and saffron infused syrup.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDW4FqUIZ6nmS29Pr0_R53tBg0QTVG2Bw1OCNMYlJzcK6a0zw3FZV14hh8HyKiHxuWBeZjmDvMZkQvO9PMa83ALmNtb8lS-8q6OXwGfYlxdJ_1hbqeuZAc6VuqQjAJtHqK5ZwhGKYRmPohT-ZYlllq3F8dZ8KMmiBhKXtePMoN2xYOQqNrSMk9pM47j8bPS0Yc7Un5y81lmVMCAycXgYhvuP9UiyJhKlnIGsNwNyFtpf2X9so39SUyyugUvHNAixW1NY1_vkCul7cBc",
    },
    {
      name: "Ice Cream Selection",
      price: 99,
      description: "Rich and velvety scoops available in classic vanilla, crunch butterscotch, or rich chocolate.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsCx83dqEZ-Y9mLTGHV28JyMuWbm1L8Ml8qppDV4Op9-Qn5Ex6kV_ulgmdfplCSsQyBlpOpYa-DqPzQCYSDXlrmIfSEwDjEM6sHHyXaC7MyrnEXsFXjS59wOhoiijVdB1SJTdsasaHcPK2AJmMXeAx7-zFfnfrRxOebWB2QN_VLc81zC-9OafqHpWOh2WYSijRCq8PxnstJRuExdATQ3S8pP70NtzC4RxVKxcUzA9ThrIdgnfkXFDZM1048gvF3rknTylYoFlgfc29",
    },
  ],
  beverages: [
    {
      name: "Virgin Mojito / Blue Lagoon",
      price: 139,
      description: "Crisp, refreshing coolers with muddled mint, citrus, and sparkling bubbles.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAretVutjCqrS3Ie4MTMAd9kADda_fQmpB2-RPYwt24MCu4gyPzeLAG7akN7BUBeZPufNTX6v2wwvY4E5SKiSN8fGytr2Upqn4Bw6fELqMWYjboi1df5kobgBMa7ckr4pbKswGIg17kG2m61MVjjEdxwcKTzVO_fH4Fv8dPAxJ56mRUCL2vNfpYjZ26abuXz28O45_X1Ja6MVK4mVZIW8A9V6m_6cZxtFHzatqZR2f6daSARvsHYPzoSV0t_drnCBmOcI6PU5WIu6GX",
    },
    {
      name: "Cold Coffee",
      price: 149,
      description: "Rich blended espresso poured over chilled milk and ice, finished with a touch of chocolate.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbtay4EKBj9zKRCVmh_lm5AndlPq83LJ5BZh3mPC9kfA6uNpCyMskLNV6Qay-EXSC6tJbTYWHwYWSq9aJPb5uY7_uzUdS9VnUVT3j8mdffUTmND5AMZRu364ryyk67khQG5J7SXnPNEkOycJejG0y_9w6jh0_NsnHUePEggmbEgMYl227aFUdtifslceg61HHq6WZqrckQh8XPbqQQZxhCVesZjqYmjRXvFLxNjF9bOO-si5H612UUwnCaKao9AJAdVKNt-mpwRUKV",
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
    for (const sec of liveMenu) {
      for (const item of sec.items) {
        if (
          item.name.toLowerCase().trim() === dishNameNorm ||
          item.name.toLowerCase().includes(dishNameNorm) ||
          dishNameNorm.includes(item.name.toLowerCase().trim())
        ) {
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
