"use client";

import { useState, useEffect, useMemo } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5010";

type GalleryItem = {
  _id: string;
  title: string;
  category: "cafe" | "restaurant" | "ambiance" | "food" | "rooms" | "general";
  imageUrl: string;
  createdAt: string;
};

const FALLBACK_IMAGES: GalleryItem[] = [
  {
    _id: "fb-1",
    title: "Fine Dining Grand Room",
    category: "restaurant",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbs7aWG73tjjOeZgZTylH_BoMudhfnUraCWstltVJD5y8Xbb0IszHZL5CVOAmnLDupyOFaLBc6heq8obMuKLx4rl3SXHCnuANfR7vLiMQl0nYben_FyQAb7ISJyFjPNjg6_rR5SLzrovcANNfAPE3CauMevxw6zciDe81gdXxQZUWbT6sSUdsxymLeMyAIMZbvyNbjDw24IT5QV-r5IxvL-rgHahrwweZlXAhvsLATFcd52HWw-rIWSnxhb46JgwzDRJi-bkOtb6tg",
    createdAt: new Date().toISOString()
  },
  {
    _id: "fb-2",
    title: "Signature Royal Biryani",
    category: "food",
    imageUrl: "/assets/hyderabadi-chicken-dum-biryani.jpg",
    createdAt: new Date().toISOString()
  },
  {
    _id: "fb-3",
    title: "Heritage Dining Hall",
    category: "restaurant",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2GU84Lf2d9r8359l1OQhWMT5HF6dxt3GCEOPsdFpewV9WTd5dQ9Y6nGe5apvkaTaT90rS2jEcnSL73ERparALRvA3LGMdXeYOfRJ8VUfW7HxCPHgFrGxAiStcjnrRyT_NQOH5di04gH02aoi5rbSU8sBFHBep8tkNVUJhKM8g1mHh1wQiH4dV_1yb5rsiH9iyPsFJIKCJ9W_hylQbr4Slzb3WRbU7yzzue_R7_vpbEPhMWh1oM5nnlEnNDeqdXLl9xR5FIa0JDV2L",
    createdAt: new Date().toISOString()
  },
  {
    _id: "fb-4",
    title: "Cafe Lounge Ambiance",
    category: "cafe",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuADtL4CMGMMdCoZZT_Z_ThDGUpfngj2q_CI-gDSIhFIpTAAt0pMOkDQ4M1EiGqq3IorWMg8O7aNXioGmY47loQEPaeNmY61-f68PWc7Kv6sd6OrdDKvPG8r7DT22AOAvtY3N0IHNlvxT0EzQgO0zabKLKQPuhymLolfPlEFP7Evq8lSmeHeXX4xRP9lAX1ue8ae2S-gI5cXxk6_KQpXvdSKb3Hffuu2fJTS5L5SIypIGi72hc-fiXtAiNqU9fAuE8zAdn5CHP9VSTbQ",
    createdAt: new Date().toISOString()
  },
  {
    _id: "fb-5",
    title: "Warm Evening Glow",
    category: "cafe",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuALqVyUUL104K--y8d1gcmbQ4XZgloQRFIJCMkK27742Q1K36_UJwoYCLHYkY7B4jLUwVYNqfzhwxoDhsJBFFweipi8wOxjZQ4i4rG_TUeS7Li1QHALVOYFn7xKFDXsrl-1hfkEmxDLeKklAJHE9hTFfilrWddjIZYD8rSmFM3fkMQjgbbP4j4fKi_lbUVNXuYlh6cKhDiHQrbjYcpM5702-Xq8dp3SM7xSpyqGC58edxGSgSOx3DwxRVDQH9SfTIRqCVARshew8Biz",
    createdAt: new Date().toISOString()
  },
  {
    _id: "fb-6",
    title: "Mutton Ghee Roast Sizzle",
    category: "food",
    imageUrl: "/assets/mutton-ghee-roast.jpg",
    createdAt: new Date().toISOString()
  },
  {
    _id: "fb-7",
    title: "Royal Paneer Gravy",
    category: "food",
    imageUrl: "/assets/paneer-butter-masala.jpg",
    createdAt: new Date().toISOString()
  }
];

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>(FALLBACK_IMAGES);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/gallery`, {
      cache: "no-store",
      headers: { "ngrok-skip-browser-warning": "true" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setGallery(data);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch live gallery, using fallback data:", err);
      });
  }, []);

  const filteredGallery = useMemo(() => {
    if (activeCategory === "all") return gallery;
    return gallery.filter((item) => item.category === activeCategory);
  }, [gallery, activeCategory]);

  const categories = [
    { id: "all", label: "All Photos" },
    { id: "cafe", label: "Cafe & Lounge" },
    { id: "restaurant", label: "Restaurant & Dining" },
    { id: "food", label: "Culinary Specialties" },
    { id: "rooms", label: "Rooms & Suites" },
  ];

  return (
    <>
      {/* Hero Header */}
      <section className="py-24 text-center px-margin-mobile bg-surface-dark text-text-light">
        <span className="font-label-caps text-label-caps text-gold mb-4 block tracking-[0.3em] uppercase">
          VISUAL JOURNEY
        </span>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-4 text-white">
          Gallery of Delights
        </h1>
        <p className="font-body-lg text-body-lg text-text-light/80 max-w-2xl mx-auto">
          Explore our culinary masterpieces, serene boutique suites, and the vibrant atmosphere of Bhubaneswar Kitchen & Cafe.
        </p>
      </section>

      {/* Category Filter Tabs */}
      <section className="sticky top-[80px] z-40 bg-background/95 backdrop-blur-md border-b border-border-custom py-4 px-margin-mobile shadow-sm">
        <div className="max-w-container-max mx-auto flex justify-start md:justify-center gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`font-label-caps text-xs tracking-widest uppercase px-6 py-2.5 rounded-full transition-all border ${
                activeCategory === cat.id
                  ? "bg-primary border-primary text-white shadow-md font-bold"
                  : "bg-surface border-border-custom text-text-secondary hover:border-primary hover:text-primary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry / Grid Showcase */}
      <section className="py-16 md:py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto min-h-[50vh]">
        {filteredGallery.length === 0 ? (
          <div className="card p-12 text-center border-dashed border-2 border-border-custom max-w-md mx-auto">
            <span className="material-symbols-outlined text-4xl text-text-secondary mb-2">
              photo_library
            </span>
            <h3 className="font-headline-sm text-lg text-text-main mb-1">
              No photos in this category yet
            </h3>
            <p className="text-text-secondary text-sm">
              Check back soon for new photo updates!
            </p>
          </div>
        ) : (
          <div className="masonry">
            {filteredGallery.map((item, idx) => (
              <div
                key={item._id || idx}
                onClick={() => setSelectedPhoto(item)}
                className="masonry-item group relative overflow-hidden rounded-2xl bg-surface border border-border-custom/50 shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer"
              >
                <img
                  className="w-full h-auto object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  alt={item.title || `Gallery photo ${idx + 1}`}
                  src={item.imageUrl}
                  loading="lazy"
                />

                {/* Hover overlay with title and category */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  {item.category && (
                    <span className="font-label-caps text-[10px] uppercase tracking-widest text-gold mb-1">
                      {item.category}
                    </span>
                  )}
                  <h4 className="font-headline-sm text-lg text-white font-medium">
                    {item.title || "Bhubaneswar Kitchen & Cafe"}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Photo Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white p-2 text-2xl transition-colors"
              title="Close Preview"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
            <img
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.title}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/10"
            />
            {selectedPhoto.title && (
              <div className="mt-4 text-center">
                <span className="font-label-caps text-xs text-gold uppercase tracking-widest block mb-1">
                  {selectedPhoto.category}
                </span>
                <h3 className="font-headline-md text-xl text-white">
                  {selectedPhoto.title}
                </h3>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
