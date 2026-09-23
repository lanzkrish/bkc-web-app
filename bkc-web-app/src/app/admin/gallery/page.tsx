"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5010";

type GalleryItem = {
  _id: string;
  title: string;
  category: "cafe" | "restaurant" | "food" | "ambiance" | "rooms" | "general";
  imageUrl: string;
  r2Key?: string;
  createdAt: string;
};

export default function AdminGalleryPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  // Gallery items state
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Upload Form State
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [directUrl, setDirectUrl] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [imageCategory, setImageCategory] = useState<"cafe" | "restaurant" | "food" | "ambiance" | "rooms">("cafe");
  const [isUploading, setIsUploading] = useState(false);

  // Edit Modal State
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState<string>("cafe");
  const [isUpdating, setIsUpdating] = useState(false);

  // Delete State
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Check auth
  useEffect(() => {
    const auth = sessionStorage.getItem("bkc_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/gallery`, {
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setItems(data);
      }
    } catch (err) {
      console.error("Failed to load gallery:", err);
      showToast("Failed to load gallery from server", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchGallery();
    }
  }, [isAuthenticated]);

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/admin/verify-passkey`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passkey: pinInput.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem("bkc_admin_auth", "true");
        setPinError(false);
      } else {
        setPinError(true);
      }
    } catch (err) {
      console.error("Passkey error:", err);
      setPinError(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile && !directUrl.trim()) {
      showToast("Please choose an image file or enter a direct image URL", "error");
      return;
    }

    setIsUploading(true);
    try {
      let imageData = directUrl.trim();

      if (uploadFile) {
        // Read as base64
        imageData = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(uploadFile);
        });
      }

      const res = await fetch(`${API_URL}/api/gallery/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: imageData,
          title: imageTitle.trim() || undefined,
          category: imageCategory,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload to Cloudflare R2");
      }

      showToast("Image successfully uploaded to Cloudflare R2!");
      setUploadFile(null);
      setPreviewUrl(null);
      setDirectUrl("");
      setImageTitle("");
      fetchGallery();
    } catch (err: any) {
      console.error("Upload error:", err);
      showToast(err.message || "Failed to upload image", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleEditOpen = (item: GalleryItem) => {
    setEditingItem(item);
    setEditTitle(item.title || "");
    setEditCategory(item.category || "cafe");
  };

  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsUpdating(true);
    try {
      const res = await fetch(`${API_URL}/api/gallery/${editingItem._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle.trim(),
          category: editCategory,
        }),
      });
      if (!res.ok) throw new Error("Failed to update item");

      showToast("Gallery item updated!");
      setEditingItem(null);
      fetchGallery();
    } catch (err: any) {
      showToast(err.message || "Update failed", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (item: GalleryItem) => {
    if (!confirm(`Are you sure you want to permanently delete "${item.title || 'this image'}"? It will be removed from Cloudflare R2.`)) {
      return;
    }

    setDeletingId(item._id);
    try {
      const res = await fetch(`${API_URL}/api/gallery/${item._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete image");

      showToast("Image removed from Cloudflare R2 and Gallery");
      fetchGallery();
    } catch (err: any) {
      showToast(err.message || "Delete failed", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredItems = useMemo(() => {
    if (filterCategory === "all") return items;
    return items.filter((item) => item.category === filterCategory);
  }, [items, filterCategory]);

  const categories = [
    { id: "all", label: "All Items" },
    { id: "cafe", label: "Cafe & Lounge" },
    { id: "restaurant", label: "Restaurant & Dining" },
    { id: "food", label: "Culinary & Food" },
    { id: "ambiance", label: "Ambiance & Decor" },
    { id: "rooms", label: "Rooms" },
  ];

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "cafe":
        return "bg-amber-500/10 text-amber-500 border-amber-500/30";
      case "restaurant":
        return "bg-rose-500/10 text-rose-500 border-rose-500/30";
      case "food":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/30";
      case "ambiance":
        return "bg-indigo-500/10 text-indigo-500 border-indigo-500/30";
      case "rooms":
        return "bg-purple-500/10 text-purple-500 border-purple-500/30";
      default:
        return "bg-gold/10 text-gold border-gold/30";
    }
  };

  // PIN Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 bg-surface/30">
        <div className="card max-w-md w-full p-8 md:p-10 border border-gold/30 shadow-2xl text-center backdrop-blur-md">
          <div className="w-16 h-16 rounded-full bg-primary/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-3xl text-gold">photo_library</span>
          </div>

          <h2 className="font-headline-md text-2xl text-text-main mb-2">
            Gallery Manager
          </h2>
          <p className="font-body-md text-text-secondary text-sm mb-6">
            Enter your admin passkey to manage cafe & restaurant gallery photos.
          </p>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="Enter admin passkey..."
                className={`w-full px-4 py-3 bg-surface border rounded-xl text-center text-lg tracking-widest outline-none transition-all ${
                  pinError
                    ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                    : "border-border-custom focus:border-gold focus:ring-2 focus:ring-gold/20"
                }`}
                autoFocus
              />
              {pinError && (
                <p className="text-red-500 text-xs mt-2">
                  Invalid Passkey. Please verify your <span className="font-mono font-bold">ADMIN_PASSKEY</span>.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-3.5 font-label-caps text-label-caps uppercase tracking-widest text-sm"
            >
              Unlock Gallery
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border-custom/50 text-xs text-text-secondary flex justify-center gap-4">
            <Link href="/admin" className="hover:text-primary transition-colors">
              &larr; Admin Dashboard
            </Link>
            <span>&bull;</span>
            <Link href="/" className="hover:text-primary transition-colors">
              Return to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-8 right-8 z-50 px-6 py-3 rounded-xl shadow-2xl border text-sm font-medium flex items-center gap-3 transition-all animate-fade-in ${
            toast.type === "success"
              ? "bg-emerald-900/90 text-emerald-100 border-emerald-700"
              : "bg-red-900/90 text-red-100 border-red-700"
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">
            {toast.type === "success" ? "check_circle" : "error"}
          </span>
          {toast.message}
        </div>
      )}

      {/* Admin Top Header */}
      <header className="bg-surface-dark text-text-light border-b border-gold/20 pt-8 pb-6 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-label-caps text-xs tracking-[0.2em] text-gold uppercase">
                CLOUDFLARE R2 POWERED
              </span>
            </div>
            <h1 className="font-headline-md text-2xl md:text-3xl text-white">
              Cafe & Restaurant Gallery Manager
            </h1>
            <p className="text-xs text-text-light/70 mt-1">
              Upload, modify, and delete high-resolution photos displayed across the cafe website.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/admin"
              className="px-4 py-2 rounded-full border border-border-custom hover:border-gold text-text-light text-xs font-label-caps uppercase tracking-wider flex items-center gap-1.5 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">dashboard</span>
              Admin Dashboard
            </Link>
            <Link
              href="/gallery"
              target="_blank"
              className="px-4 py-2 rounded-full bg-gold/20 hover:bg-gold/30 text-gold text-xs font-label-caps uppercase tracking-wider flex items-center gap-1.5 transition-all border border-gold/30"
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              Public Gallery &nearr;
            </Link>
            <button
              onClick={fetchGallery}
              disabled={loading}
              className="p-2 rounded-full border border-border-custom hover:border-gold text-text-light transition-all"
              title="Refresh Gallery"
            >
              <span className={`material-symbols-outlined text-[18px] ${loading ? "animate-spin" : ""}`}>
                sync
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-10 space-y-12">
        {/* ==========================================
            SECTION 1: UPLOAD NEW PHOTO TO R2
        ========================================== */}
        <div className="card p-6 md:p-8 bg-surface border border-gold/20 shadow-xl rounded-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-border-custom mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-gold/30 flex items-center justify-center text-gold">
                <span className="material-symbols-outlined">cloud_upload</span>
              </div>
              <div>
                <h2 className="font-headline-sm text-lg text-text-main">
                  Upload Photo to Cloudflare R2
                </h2>
                <p className="text-xs text-text-secondary">
                  Images are stored in your Cloudflare R2 bucket with global CDN delivery.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              R2 Storage Active
            </span>
          </div>

          <form onSubmit={handleUpload} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Col: File Selector / Preview */}
            <div className="lg:col-span-5 space-y-4">
              <label className="font-label-caps text-xs text-gold block">
                Select Photo from Device
              </label>

              <div className="relative border-2 border-dashed border-border-custom hover:border-gold/60 rounded-2xl p-6 text-center bg-background/50 transition-all">
                {previewUrl ? (
                  <div className="space-y-3">
                    <div className="h-44 rounded-xl overflow-hidden bg-black/20 relative shadow-inner">
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          setUploadFile(null);
                          setPreviewUrl(null);
                        }}
                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full shadow"
                        title="Remove photo"
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    </div>
                    <p className="text-xs text-text-secondary truncate">{uploadFile?.name}</p>
                  </div>
                ) : (
                  <div className="space-y-3 py-4">
                    <span className="material-symbols-outlined text-4xl text-text-secondary">
                      add_photo_alternate
                    </span>
                    <p className="text-xs text-text-secondary">
                      Drag & drop an image or click to browse
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                  </div>
                )}
              </div>

              {/* Direct URL Alternative */}
              <div>
                <label className="text-xs text-text-secondary block mb-1">
                  Or enter direct image URL:
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={directUrl}
                  onChange={(e) => setDirectUrl(e.target.value)}
                  className="w-full bg-background border border-border-custom rounded-xl px-4 py-2.5 text-xs text-text-main outline-none focus:border-gold"
                />
              </div>
            </div>

            {/* Right Col: Details & Meta */}
            <div className="lg:col-span-7 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <label className="font-label-caps text-xs text-gold block mb-1.5">
                    Image Caption / Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Cozy Cafe Corner & Espresso Bar"
                    value={imageTitle}
                    onChange={(e) => setImageTitle(e.target.value)}
                    className="w-full bg-background border border-border-custom rounded-xl px-4 py-3 text-sm text-text-main outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="font-label-caps text-xs text-gold block mb-1.5">
                    Category Tag
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: "cafe", label: "Cafe & Lounge", icon: "local_cafe" },
                      { id: "restaurant", label: "Restaurant", icon: "restaurant" },
                      { id: "food", label: "Food & Dishes", icon: "dinner_dining" },
                      { id: "ambiance", label: "Ambiance", icon: "wb_sunny" },
                    ].map((cat) => (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setImageCategory(cat.id as any)}
                        className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                          imageCategory === cat.id
                            ? "bg-primary/10 border-primary text-primary-dark font-bold shadow-sm"
                            : "bg-background border-border-custom text-text-secondary hover:border-gold/40"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
                        <span className="text-xs">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border-custom flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isUploading || (!uploadFile && !directUrl.trim())}
                  className="btn-primary px-8 py-3.5 font-label-caps text-xs uppercase tracking-widest flex items-center gap-2 disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                      Uploading to Cloudflare R2...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                      Save & Publish Photo
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* ==========================================
            SECTION 2: CURRENT GALLERY ITEMS
        ========================================== */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-headline-md text-xl text-text-main flex items-center gap-2">
                Published Gallery Photos
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-primary/10 text-primary-dark">
                  {items.length} Photos
                </span>
              </h2>
              <p className="text-xs text-text-secondary mt-0.5">
                Manage titles, categories, and remove photos directly from R2 storage.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilterCategory(cat.id)}
                  className={`text-xs px-4 py-2 rounded-full border transition-all whitespace-nowrap ${
                    filterCategory === cat.id
                      ? "bg-primary border-primary text-white font-bold"
                      : "bg-surface border-border-custom text-text-secondary hover:border-gold"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center text-text-secondary flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-4xl animate-spin text-primary">sync</span>
              <p className="text-sm">Loading gallery photos from Cloudflare R2...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="card p-12 text-center border-dashed border-2 border-border-custom rounded-2xl">
              <span className="material-symbols-outlined text-4xl text-text-secondary mb-2">
                no_photography
              </span>
              <h3 className="font-headline-sm text-base text-text-main mb-1">
                No photos found
              </h3>
              <p className="text-xs text-text-secondary">
                Upload photos above to showcase your cafe, food, and restaurant!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item._id}
                  className="card rounded-2xl overflow-hidden border border-border-custom hover:border-gold/40 transition-all shadow-md bg-surface flex flex-col group"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-black/20">
                    <img
                      src={item.imageUrl}
                      alt={item.title || "Gallery"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Category Badge */}
                    <span
                      className={`absolute top-3 left-3 text-[10px] font-label-caps uppercase tracking-wider px-2.5 py-1 rounded-md border backdrop-blur-md shadow font-semibold ${getCategoryBadgeClass(
                        item.category
                      )}`}
                    >
                      {item.category}
                    </span>

                    {/* R2 Indicator */}
                    {item.imageUrl.includes("r2.dev") && (
                      <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white/90 text-[9px] font-mono px-2 py-0.5 rounded shadow">
                        Cloudflare R2
                      </span>
                    )}

                    {/* Delete button */}
                    <button
                      onClick={() => handleDelete(item)}
                      disabled={deletingId === item._id}
                      className="absolute top-3 right-3 bg-red-600/90 hover:bg-red-700 text-white p-1.5 rounded-full shadow transition-all hover:scale-110 disabled:opacity-50"
                      title="Permanently delete from R2 and Gallery"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {deletingId === item._id ? "sync" : "delete"}
                      </span>
                    </button>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-headline-sm text-sm text-text-main line-clamp-1 mb-1">
                        {item.title || "Untitled Photo"}
                      </h4>
                      <p className="text-[11px] text-text-secondary">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Catalog Item"}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-border-custom flex items-center justify-between">
                      <button
                        onClick={() => handleEditOpen(item)}
                        className="text-xs text-gold hover:text-gold-dark font-label-caps uppercase tracking-wider flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">edit</span>
                        Edit Meta
                      </button>

                      <a
                        href={item.imageUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-text-secondary hover:text-text-main flex items-center gap-1"
                        title="Open full size"
                      >
                        <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                        View
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ==========================================
          MODAL: EDIT PHOTO META
      ========================================== */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="card max-w-md w-full p-6 md:p-8 bg-background border border-gold/30 shadow-2xl rounded-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-border-custom mb-6">
              <h3 className="font-headline-md text-lg text-text-main">
                Edit Photo Details
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-text-secondary hover:text-text-main"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleEditSave} className="space-y-4">
              <div className="h-36 rounded-xl overflow-hidden bg-black/20 mb-4">
                <img src={editingItem.imageUrl} alt="" className="w-full h-full object-cover" />
              </div>

              <div>
                <label className="font-label-caps text-xs text-gold block mb-1">
                  Title / Caption
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-surface border border-border-custom rounded-xl px-4 py-2.5 text-xs text-text-main outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="font-label-caps text-xs text-gold block mb-1">
                  Category
                </label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full bg-surface border border-border-custom rounded-xl px-4 py-2.5 text-xs text-text-main outline-none focus:border-gold"
                >
                  <option value="cafe">Cafe & Lounge</option>
                  <option value="restaurant">Restaurant & Fine Dining</option>
                  <option value="food">Culinary & Food</option>
                  <option value="ambiance">Ambiance & Decor</option>
                  <option value="rooms">Rooms</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border-custom">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-5 py-2 text-xs font-label-caps uppercase tracking-wider text-text-secondary hover:text-text-main"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="btn-primary px-6 py-2 text-xs font-label-caps uppercase tracking-wider"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
