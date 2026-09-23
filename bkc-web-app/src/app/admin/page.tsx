"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5010";

type BookingType = {
  _id: string;
  bookingType: "table" | "room";
  fullName: string;
  email: string;
  phone: string;
  guests: string;
  date?: string;
  time?: string;
  occasion?: string;
  checkIn?: string;
  checkOut?: string;
  roomType?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
};

type MenuItem = {
  _id?: string;
  name: string;
  type: string;
  price: any;
  isOutOfStock?: boolean;
};

type MenuSection = {
  _id: string;
  category: string;
  subCategory?: string;
  items: MenuItem[];
};

type RoomType = {
  _id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  pricePerNight: number;
  capacity: string;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
};

export default function AdminPage() {
  // Authentication PIN state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  // Main Tabs: ONLY 3 (Bookings, Menu, Room Types)
  const [activeTab, setActiveTab] = useState<"bookings" | "menu" | "rooms">("bookings");

  // Sub-menu for Bookings: past, today, upcoming
  const [bookingSubTab, setBookingSubTab] = useState<"today" | "upcoming" | "past">("today");
  const [bookingFilterType, setBookingFilterType] = useState<"all" | "table" | "room">("all");
  const [bookingSearch, setBookingSearch] = useState("");

  // Data States
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [menuSections, setMenuSections] = useState<MenuSection[]>([]);
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Menu Filters & Modals
  const [menuSearch, setMenuSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingItem, setEditingItem] = useState<{ sectionId: string; item: MenuItem } | null>(null);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    sectionId: "",
    category: "",
    subCategory: "",
    name: "",
    type: "veg",
    price: "",
    isMultiPrice: false,
    priceKey1: "Regular",
    priceVal1: "",
    priceKey2: "Large",
    priceVal2: "",
    isOutOfStock: false,
  });

  // Room Modals & Editing
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<RoomType | null>(null);
  const [managingImagesRoom, setManagingImagesRoom] = useState<RoomType | null>(null);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [roomFormData, setRoomFormData] = useState({
    name: "",
    tagline: "",
    description: "",
    pricePerNight: "",
    capacity: "2 Guests",
    amenities: "High-Speed Wi-Fi, Central Air Conditioning, 24/7 Room Service, Smart TV",
    images: "",
    isAvailable: true,
  });

  // Check authentication on mount
  useEffect(() => {
    const auth = sessionStorage.getItem("bkc_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Show toast notification
  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Fetch all initial data
  const fetchData = async () => {
    setLoading(true);
    try {
      const headers = { "ngrok-skip-browser-warning": "true" };
      const [bookingsRes, menuRes, roomsRes] = await Promise.all([
        fetch(`${API_URL}/api/bookings`, { headers }).then((r) => r.json()),
        fetch(`${API_URL}/api/menu`, { headers }).then((r) => r.json()),
        fetch(`${API_URL}/api/rooms`, { headers }).then((r) => r.json()),
      ]);

      if (Array.isArray(bookingsRes)) setBookings(bookingsRes);
      if (Array.isArray(menuRes)) setMenuSections(menuRes);
      if (Array.isArray(roomsRes)) setRooms(roomsRes);
    } catch (err) {
      console.error("Failed to load admin data:", err);
      showToast("Error connecting to server. Is bkc-server running?", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
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
      console.error("Passkey verification error:", err);
      setPinError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("bkc_admin_auth");
    setIsAuthenticated(false);
    setPinInput("");
  };

  // ==========================================
  // 1. BOOKINGS LOGIC (Today, Upcoming, Past)
  // ==========================================
  const categorizedBookings = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayList: BookingType[] = [];
    const upcomingList: BookingType[] = [];
    const pastList: BookingType[] = [];

    bookings.forEach((b) => {
      let bDate: Date | null = null;
      let checkOutDate: Date | null = null;

      if (b.bookingType === "table" && b.date) {
        bDate = new Date(b.date);
        bDate.setHours(0, 0, 0, 0);
      } else if (b.bookingType === "room" && b.checkIn) {
        bDate = new Date(b.checkIn);
        bDate.setHours(0, 0, 0, 0);
        if (b.checkOut) {
          checkOutDate = new Date(b.checkOut);
          checkOutDate.setHours(23, 59, 59, 999);
        }
      }

      if (!bDate) {
        // Fallback to createdAt if date is missing
        bDate = new Date(b.createdAt);
        bDate.setHours(0, 0, 0, 0);
      }

      const isToday =
        bDate.getTime() === today.getTime() ||
        (checkOutDate && bDate <= today && today <= checkOutDate);

      if (isToday) {
        todayList.push(b);
      } else if (bDate > today) {
        upcomingList.push(b);
      } else {
        pastList.push(b);
      }
    });

    return { today: todayList, upcoming: upcomingList, past: pastList };
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    let list = categorizedBookings[bookingSubTab] || [];

    if (bookingFilterType !== "all") {
      list = list.filter((b) => b.bookingType === bookingFilterType);
    }

    if (bookingSearch.trim() !== "") {
      const q = bookingSearch.toLowerCase();
      list = list.filter(
        (b) =>
          b.fullName.toLowerCase().includes(q) ||
          b.phone.toLowerCase().includes(q) ||
          b.email.toLowerCase().includes(q) ||
          (b.roomType && b.roomType.toLowerCase().includes(q)) ||
          (b.occasion && b.occasion.toLowerCase().includes(q))
      );
    }

    return list;
  }, [categorizedBookings, bookingSubTab, bookingFilterType, bookingSearch]);

  const handleUpdateBookingStatus = async (id: string, newStatus: "pending" | "confirmed" | "cancelled") => {
    try {
      // Optimistic update
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
      );

      const res = await fetch(`${API_URL}/api/bookings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");
      showToast(`Booking marked as ${newStatus}`);
    } catch (err) {
      console.error(err);
      showToast("Failed to update status", "error");
      fetchData(); // Rollback
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      setBookings((prev) => prev.filter((b) => b._id !== id));
      const res = await fetch(`${API_URL}/api/bookings/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete booking");
      showToast("Booking deleted successfully");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete booking", "error");
      fetchData();
    }
  };

  // ==========================================
  // 2. MENU LOGIC (Update, Delete, Out of Stock)
  // ==========================================
  const menuCategories = useMemo(() => {
    return Array.from(new Set(menuSections.map((s) => s.category)));
  }, [menuSections]);

  const filteredMenuSections = useMemo(() => {
    let sections = menuSections;

    if (selectedCategory !== "all") {
      sections = sections.filter((s) => s.category === selectedCategory);
    }

    if (menuSearch.trim() !== "") {
      const q = menuSearch.toLowerCase();
      sections = sections
        .map((s) => ({
          ...s,
          items: s.items.filter((item) => item.name.toLowerCase().includes(q)),
        }))
        .filter((s) => s.items.length > 0);
    }

    return sections;
  }, [menuSections, selectedCategory, menuSearch]);

  const handleToggleStock = async (sectionId: string, itemId?: string) => {
    if (!itemId) return;

    // Optimistic toggle
    setMenuSections((prev) =>
      prev.map((sec) => {
        if (sec._id === sectionId) {
          return {
            ...sec,
            items: sec.items.map((it) =>
              it._id === itemId ? { ...it, isOutOfStock: !it.isOutOfStock } : it
            ),
          };
        }
        return sec;
      })
    );

    try {
      const res = await fetch(
        `${API_URL}/api/menu/item/${sectionId}/${itemId}/toggle-stock`,
        { method: "PATCH" }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to toggle stock");
      showToast(
        data.isOutOfStock ? "Item marked Out of Stock" : "Item marked In Stock"
      );
    } catch (err) {
      console.error(err);
      showToast("Failed to toggle stock status", "error");
      fetchData();
    }
  };

  const handleDeleteItem = async (sectionId: string, itemId?: string) => {
    if (!itemId) return;
    if (!confirm("Are you sure you want to delete this dish from the menu?")) return;

    try {
      setMenuSections((prev) =>
        prev.map((sec) => {
          if (sec._id === sectionId) {
            return {
              ...sec,
              items: sec.items.filter((it) => it._id !== itemId),
            };
          }
          return sec;
        })
      );

      const res = await fetch(`${API_URL}/api/menu/item/${sectionId}/${itemId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete menu item");
      showToast("Dish deleted successfully");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete item", "error");
      fetchData();
    }
  };

  const handleSaveEditItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.item._id) return;

    try {
      const res = await fetch(
        `${API_URL}/api/menu/item/${editingItem.sectionId}/${editingItem.item._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: editingItem.item.name,
            type: editingItem.item.type,
            price: editingItem.item.price,
            isOutOfStock: editingItem.item.isOutOfStock,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update item");
      showToast("Dish updated successfully");
      setEditingItem(null);
      fetchData();
    } catch (err) {
      console.error(err);
      showToast("Failed to save changes", "error");
    }
  };

  const handleAddDish = async (e: React.FormEvent) => {
    e.preventDefault();

    let priceValue: any = Number(newItem.price);
    if (newItem.isMultiPrice) {
      priceValue = {
        [newItem.priceKey1.toLowerCase()]: Number(newItem.priceVal1) || 0,
        [newItem.priceKey2.toLowerCase()]: Number(newItem.priceVal2) || 0,
      };
    }

    try {
      const res = await fetch(`${API_URL}/api/menu/item`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionId: newItem.sectionId || undefined,
          category: newItem.category,
          subCategory: newItem.subCategory || undefined,
          name: newItem.name,
          type: newItem.type,
          price: priceValue,
          isOutOfStock: newItem.isOutOfStock,
        }),
      });

      if (!res.ok) throw new Error("Failed to add dish");
      showToast("New dish added to menu!");
      setIsAddItemOpen(false);
      setNewItem({
        sectionId: "",
        category: "",
        subCategory: "",
        name: "",
        type: "veg",
        price: "",
        isMultiPrice: false,
        priceKey1: "Regular",
        priceVal1: "",
        priceKey2: "Large",
        priceVal2: "",
        isOutOfStock: false,
      });
      fetchData();
    } catch (err) {
      console.error(err);
      showToast("Failed to add dish", "error");
    }
  };

  // ==========================================
  // 3. ROOM TYPES LOGIC (Add, Update, Images)
  // ==========================================
  const handleOpenAddRoom = () => {
    setRoomFormData({
      name: "",
      tagline: "",
      description: "",
      pricePerNight: "",
      capacity: "2 Guests",
      amenities: "High-Speed Wi-Fi, Central Air Conditioning, 24/7 Room Service, Smart TV",
      images: "",
      isAvailable: true,
    });
    setIsAddRoomOpen(true);
  };

  const handleOpenEditRoom = (room: RoomType) => {
    setEditingRoom(room);
    setRoomFormData({
      name: room.name,
      tagline: room.tagline || "",
      description: room.description,
      pricePerNight: room.pricePerNight.toString(),
      capacity: room.capacity || "2 Guests",
      amenities: room.amenities.join(", "),
      images: room.images.join("\n"),
      isAvailable: room.isAvailable,
    });
  };

  const handleSaveRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    const amenitiesArr = roomFormData.amenities
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const imagesArr = roomFormData.images
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      name: roomFormData.name,
      tagline: roomFormData.tagline,
      description: roomFormData.description,
      pricePerNight: Number(roomFormData.pricePerNight),
      capacity: roomFormData.capacity,
      amenities: amenitiesArr,
      images: imagesArr,
      isAvailable: roomFormData.isAvailable,
    };

    try {
      if (editingRoom) {
        const res = await fetch(`${API_URL}/api/rooms/${editingRoom._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update room");
        showToast("Room updated successfully!");
        setEditingRoom(null);
      } else {
        const res = await fetch(`${API_URL}/api/rooms`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to create room");
        showToast("New Room Type added!");
        setIsAddRoomOpen(false);
      }
      fetchData();
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to save room", "error");
    }
  };

  const handleDeleteRoom = async (id: string) => {
    if (!confirm("Are you sure you want to delete this room type?")) return;
    try {
      const res = await fetch(`${API_URL}/api/rooms/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete room");
      showToast("Room type deleted");
      fetchData();
    } catch (err) {
      console.error(err);
      showToast("Failed to delete room", "error");
    }
  };

  // Image Management for Rooms (Cloudflare R2)
  const handleUploadImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !managingImagesRoom) return;

    setUploadingImage(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64Data = reader.result as string;
        const uploadRes = await fetch(`${API_URL}/api/rooms/upload-image`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Data }),
        });
        const uploadJson = await uploadRes.json();
        if (!uploadRes.ok || !uploadJson.url) {
          throw new Error(uploadJson.error || "Failed to upload image to Cloudflare R2");
        }

        const updatedImages = [...managingImagesRoom.images, uploadJson.url];
        await updateRoomImages(managingImagesRoom._id, updatedImages);
        showToast("Image uploaded to Cloudflare R2!");
      } catch (err: any) {
        console.error(err);
        showToast(err.message || "Upload failed", "error");
      } finally {
        setUploadingImage(false);
        e.target.value = "";
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddImageUrl = async () => {
    if (!newImageUrl.trim() || !managingImagesRoom) return;
    const updatedImages = [...managingImagesRoom.images, newImageUrl.trim()];
    await updateRoomImages(managingImagesRoom._id, updatedImages);
    setNewImageUrl("");
    showToast("Image URL added!");
  };

  const handleSetPrimaryImage = async (index: number) => {
    if (!managingImagesRoom || index === 0) return;
    const target = managingImagesRoom.images[index];
    const remaining = managingImagesRoom.images.filter((_, i) => i !== index);
    const updatedImages = [target, ...remaining];
    await updateRoomImages(managingImagesRoom._id, updatedImages);
    showToast("Set as primary thumbnail!");
  };

  const handleMoveImage = async (index: number, direction: "left" | "right") => {
    if (!managingImagesRoom) return;
    const newIdx = direction === "left" ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= managingImagesRoom.images.length) return;
    const updatedImages = [...managingImagesRoom.images];
    const temp = updatedImages[index];
    updatedImages[index] = updatedImages[newIdx];
    updatedImages[newIdx] = temp;
    await updateRoomImages(managingImagesRoom._id, updatedImages);
  };

  const handleRemoveImage = async (indexToRemove: number) => {
    if (!managingImagesRoom) return;
    const targetUrl = managingImagesRoom.images[indexToRemove];
    try {
      // Call backend to delete from R2 and room
      await fetch(`${API_URL}/api/rooms/delete-image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId: managingImagesRoom._id, imageUrl: targetUrl }),
      });
    } catch (err) {
      console.warn("Could not delete from R2:", err);
    }
    const updatedImages = managingImagesRoom.images.filter((_, idx) => idx !== indexToRemove);
    await updateRoomImages(managingImagesRoom._id, updatedImages);
    showToast("Image removed and deleted from Cloudflare R2");
  };

  const updateRoomImages = async (roomId: string, images: string[]) => {
    const res = await fetch(`${API_URL}/api/rooms/${roomId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ images }),
    });
    if (!res.ok) throw new Error("Failed to update room images");
    setManagingImagesRoom((prev) => (prev ? { ...prev, images } : null));
    fetchData();
  };

  // ==========================================
  // PIN LOGIN GATE
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 bg-surface/30">
        <div className="card max-w-md w-full p-8 md:p-10 border border-gold/30 shadow-2xl text-center backdrop-blur-md">
          <div className="w-16 h-16 rounded-full bg-primary/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-3xl text-primary-dark">
              admin_panel_settings
            </span>
          </div>
          <span className="font-label-caps text-label-caps text-gold tracking-[0.25em] uppercase block mb-2">
            MANAGEMENT CONSOLE
          </span>
          <h1 className="font-headline-md text-2xl md:text-3xl text-text-main mb-2">
            BKC Admin Portal
          </h1>
          <p className="font-body-md text-text-secondary text-sm mb-8">
            Please enter your management passkey to access bookings, menu, and room settings.
          </p>

          <form onSubmit={handlePinSubmit} className="space-y-6">
            <div>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="Enter Admin Passkey"
                autoFocus
                className="w-full text-center tracking-[0.2em] font-mono text-lg py-3 px-4 bg-background border border-border-custom rounded-xl outline-none focus:border-primary transition-all"
              />
              {pinError && (
                <p className="text-red-600 text-xs mt-2 font-medium">
                  Invalid Passkey. Please verify your <span className="font-mono font-bold">ADMIN_PASSKEY</span>.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-3.5 font-label-caps text-label-caps uppercase tracking-widest text-sm"
            >
              Unlock Dashboard
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border-custom/50 text-xs text-text-secondary">
            <Link href="/" className="hover:text-primary transition-colors inline-flex items-center gap-1">
              &larr; Return to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
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

      {/* Admin Top Banner */}
      <header className="bg-surface-dark text-text-light border-b border-gold/20 pt-8 pb-6 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-label-caps text-xs tracking-[0.2em] text-gold uppercase">
                ADMINISTRATION PORTAL
              </span>
            </div>
            <h1 className="font-headline-md text-2xl md:text-3xl text-white">
              Bhubaneswar Kitchen & Cafe
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={fetchData}
              disabled={loading}
              className="px-4 py-2 rounded-full border border-gold/30 hover:border-gold text-gold text-xs font-label-caps uppercase tracking-wider flex items-center gap-1.5 transition-all"
            >
              <span className={`material-symbols-outlined text-[16px] ${loading ? "animate-spin" : ""}`}>
                sync
              </span>
              Refresh
            </button>
            <Link
              href="/admin/gallery"
              className="px-4 py-2 rounded-full bg-gold/20 hover:bg-gold/30 text-gold text-xs font-label-caps uppercase tracking-wider flex items-center gap-1.5 transition-all border border-gold/40 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">photo_library</span>
              Cafe & Restaurant Gallery &rarr;
            </Link>
            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 rounded-full bg-surface/10 hover:bg-surface/20 text-white/80 text-xs font-label-caps uppercase tracking-wider transition-all"
            >
              Live Site &nearr;
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-label-caps uppercase tracking-wider transition-all"
            >
              Lock
            </button>
          </div>
        </div>
      </header>

      {/* Primary Navigation - ONLY 3 TABS (Bookings, Menu, Room Types) */}
      <nav className="sticky top-[80px] z-40 bg-surface/90 backdrop-blur-md border-b border-border-custom shadow-sm px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto flex justify-center md:justify-start gap-2 sm:gap-6">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`py-4 px-4 sm:px-6 font-label-caps text-xs sm:text-sm uppercase tracking-widest border-b-2 flex items-center gap-2 transition-all ${
              activeTab === "bookings"
                ? "border-primary text-primary font-bold"
                : "border-transparent text-text-secondary hover:text-text-main"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">calendar_today</span>
            Bookings
            <span className="ml-1 px-2 py-0.5 text-[10px] rounded-full bg-primary/10 text-primary-dark font-bold">
              {bookings.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("menu")}
            className={`py-4 px-4 sm:px-6 font-label-caps text-xs sm:text-sm uppercase tracking-widest border-b-2 flex items-center gap-2 transition-all ${
              activeTab === "menu"
                ? "border-primary text-primary font-bold"
                : "border-transparent text-text-secondary hover:text-text-main"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">restaurant_menu</span>
            Menu
            <span className="ml-1 px-2 py-0.5 text-[10px] rounded-full bg-primary/10 text-primary-dark font-bold">
              {menuSections.reduce((acc, s) => acc + s.items.length, 0)}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("rooms")}
            className={`py-4 px-4 sm:px-6 font-label-caps text-xs sm:text-sm uppercase tracking-widest border-b-2 flex items-center gap-2 transition-all ${
              activeTab === "rooms"
                ? "border-primary text-primary font-bold"
                : "border-transparent text-text-secondary hover:text-text-main"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">bed</span>
            Room Types
            <span className="ml-1 px-2 py-0.5 text-[10px] rounded-full bg-primary/10 text-primary-dark font-bold">
              {rooms.length}
            </span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8">
        {/* ==========================================
            TAB 1: BOOKINGS (Past, Today, Upcoming)
        ========================================== */}
        {activeTab === "bookings" && (
          <section className="space-y-6">
            {/* Bookings Sub-Menu Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface p-4 rounded-2xl border border-border-custom">
              {/* Sub-menu Pills: Past, Today, Upcoming */}
              <div className="flex bg-background rounded-xl p-1 border border-border-custom self-start">
                <button
                  onClick={() => setBookingSubTab("today")}
                  className={`px-5 py-2 rounded-lg font-label-caps text-xs tracking-wider uppercase transition-all flex items-center gap-2 ${
                    bookingSubTab === "today"
                      ? "bg-primary text-white shadow"
                      : "text-text-secondary hover:text-primary"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Today's Bookings
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
                    {categorizedBookings.today.length}
                  </span>
                </button>

                <button
                  onClick={() => setBookingSubTab("upcoming")}
                  className={`px-5 py-2 rounded-lg font-label-caps text-xs tracking-wider uppercase transition-all flex items-center gap-2 ${
                    bookingSubTab === "upcoming"
                      ? "bg-primary text-white shadow"
                      : "text-text-secondary hover:text-primary"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  Upcoming Bookings
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
                    {categorizedBookings.upcoming.length}
                  </span>
                </button>

                <button
                  onClick={() => setBookingSubTab("past")}
                  className={`px-5 py-2 rounded-lg font-label-caps text-xs tracking-wider uppercase transition-all flex items-center gap-2 ${
                    bookingSubTab === "past"
                      ? "bg-primary text-white shadow"
                      : "text-text-secondary hover:text-primary"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                  Past Bookings
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
                    {categorizedBookings.past.length}
                  </span>
                </button>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex bg-background rounded-lg border border-border-custom p-0.5">
                  <button
                    onClick={() => setBookingFilterType("all")}
                    className={`px-3 py-1.5 text-xs font-label-caps rounded ${
                      bookingFilterType === "all" ? "bg-primary/10 text-primary font-bold" : "text-text-secondary"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setBookingFilterType("table")}
                    className={`px-3 py-1.5 text-xs font-label-caps rounded ${
                      bookingFilterType === "table" ? "bg-primary/10 text-primary font-bold" : "text-text-secondary"
                    }`}
                  >
                    Table
                  </button>
                  <button
                    onClick={() => setBookingFilterType("room")}
                    className={`px-3 py-1.5 text-xs font-label-caps rounded ${
                      bookingFilterType === "room" ? "bg-primary/10 text-primary font-bold" : "text-text-secondary"
                    }`}
                  >
                    Room
                  </button>
                </div>

                <div className="relative min-w-[220px]">
                  <input
                    type="text"
                    placeholder="Search guest or phone..."
                    value={bookingSearch}
                    onChange={(e) => setBookingSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-background border border-border-custom rounded-lg text-xs outline-none focus:border-primary text-text-main"
                  />
                  <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[16px] text-text-secondary">
                    search
                  </span>
                </div>
              </div>
            </div>

            {/* Bookings List */}
            {filteredBookings.length === 0 ? (
              <div className="card p-12 text-center border-dashed border-2 border-border-custom">
                <span className="material-symbols-outlined text-4xl text-text-secondary mb-2">
                  event_busy
                </span>
                <h3 className="font-headline-sm text-lg text-text-main mb-1">
                  No {bookingSubTab} bookings found
                </h3>
                <p className="text-text-secondary text-sm">
                  {bookingSearch ? "Try adjusting your search criteria." : "All caught up in this category!"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredBookings.map((b) => (
                  <div
                    key={b._id}
                    className="card p-6 border border-border-custom/80 hover:border-primary/50 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    {/* Left details */}
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-label-caps uppercase tracking-wider font-semibold flex items-center gap-1 ${
                            b.bookingType === "table"
                              ? "bg-amber-100 text-amber-800 border border-amber-300"
                              : "bg-indigo-100 text-indigo-800 border border-indigo-300"
                          }`}
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {b.bookingType === "table" ? "table_restaurant" : "hotel"}
                          </span>
                          {b.bookingType === "table" ? "Table Reservation" : "Room Stay"}
                        </span>

                        {/* Status Badge */}
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-label-caps uppercase tracking-wider font-semibold ${
                            b.status === "confirmed"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : b.status === "cancelled"
                              ? "bg-red-100 text-red-800 border border-red-300"
                              : "bg-yellow-100 text-yellow-800 border border-yellow-300"
                          }`}
                        >
                          {b.status}
                        </span>

                        <span className="text-xs text-text-secondary">
                          Booked {new Date(b.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-headline-sm text-xl text-text-main flex items-center gap-3">
                          {b.fullName}
                          <span className="text-sm font-normal text-text-secondary font-body-md">
                            ({b.guests})
                          </span>
                        </h4>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-text-secondary mt-1">
                          <a
                            href={`tel:${b.phone}`}
                            className="flex items-center gap-1 hover:text-primary transition-colors font-medium text-text-main"
                          >
                            <span className="material-symbols-outlined text-[16px] text-primary">call</span>
                            {b.phone}
                          </a>
                          <a
                            href={`mailto:${b.email}`}
                            className="flex items-center gap-1 hover:text-primary transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px]">mail</span>
                            {b.email}
                          </a>
                          <a
                            href={`https://wa.me/${b.phone.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-600/10 text-emerald-700 hover:bg-emerald-600/20 rounded-md text-xs font-medium transition-colors"
                          >
                            <span>WhatsApp Chat</span>
                            &nearr;
                          </a>
                        </div>
                      </div>

                      {/* Booking Specifics */}
                      <div className="bg-background/80 p-3 rounded-xl border border-border-custom/50 text-sm flex flex-wrap gap-x-6 gap-y-2">
                        {b.bookingType === "table" ? (
                          <>
                            <div>
                              <span className="text-text-secondary">Reservation Date: </span>
                              <strong className="text-text-main">
                                {b.date ? new Date(b.date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" }) : "N/A"}
                              </strong>
                            </div>
                            <div>
                              <span className="text-text-secondary">Time: </span>
                              <strong className="text-text-main">{b.time || "N/A"}</strong>
                            </div>
                            {b.occasion && (
                              <div>
                                <span className="text-text-secondary">Occasion: </span>
                                <strong className="text-primary-dark">{b.occasion}</strong>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <div>
                              <span className="text-text-secondary">Room: </span>
                              <strong className="text-primary-dark">{b.roomType || "Standard Suite"}</strong>
                            </div>
                            <div>
                              <span className="text-text-secondary">Check-In: </span>
                              <strong className="text-text-main">
                                {b.checkIn ? new Date(b.checkIn).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "N/A"}
                              </strong>
                            </div>
                            <div>
                              <span className="text-text-secondary">Check-Out: </span>
                              <strong className="text-text-main">
                                {b.checkOut ? new Date(b.checkOut).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "N/A"}
                              </strong>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Right actions */}
                    <div className="flex lg:flex-col items-end justify-between gap-3 border-t lg:border-t-0 pt-4 lg:pt-0 border-border-custom">
                      <div className="flex items-center gap-1 bg-background p-1 rounded-lg border border-border-custom">
                        <button
                          onClick={() => handleUpdateBookingStatus(b._id, "confirmed")}
                          className={`px-3 py-1 text-xs font-label-caps rounded uppercase transition-colors ${
                            b.status === "confirmed"
                              ? "bg-emerald-600 text-white font-bold"
                              : "text-text-secondary hover:text-emerald-700"
                          }`}
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleUpdateBookingStatus(b._id, "pending")}
                          className={`px-3 py-1 text-xs font-label-caps rounded uppercase transition-colors ${
                            b.status === "pending"
                              ? "bg-yellow-600 text-white font-bold"
                              : "text-text-secondary hover:text-yellow-700"
                          }`}
                        >
                          Pending
                        </button>
                        <button
                          onClick={() => handleUpdateBookingStatus(b._id, "cancelled")}
                          className={`px-3 py-1 text-xs font-label-caps rounded uppercase transition-colors ${
                            b.status === "cancelled"
                              ? "bg-red-600 text-white font-bold"
                              : "text-text-secondary hover:text-red-700"
                          }`}
                        >
                          Cancel
                        </button>
                      </div>

                      <button
                        onClick={() => handleDeleteBooking(b._id)}
                        className="text-xs text-text-secondary hover:text-red-600 p-1 flex items-center gap-1 transition-colors"
                        title="Delete Booking"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ==========================================
            TAB 2: MENU (Update, Delete, Out of Stock)
        ========================================== */}
        {activeTab === "menu" && (
          <section className="space-y-6">
            {/* Menu Controls Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface p-4 rounded-2xl border border-border-custom">
              {/* Search & Category filter */}
              <div className="flex flex-wrap items-center gap-3 flex-1">
                <div className="relative flex-1 min-w-[220px]">
                  <input
                    type="text"
                    placeholder="Search dishes to update or toggle stock..."
                    value={menuSearch}
                    onChange={(e) => setMenuSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-background border border-border-custom rounded-xl text-sm outline-none focus:border-primary text-text-main"
                  />
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-text-secondary">
                    search
                  </span>
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-background border border-border-custom rounded-xl px-4 py-2 text-sm text-text-main outline-none focus:border-primary"
                >
                  <option value="all">All Categories</option>
                  {menuCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Add dish button */}
              <button
                onClick={() => setIsAddItemOpen(true)}
                className="btn-primary px-6 py-2.5 font-label-caps text-xs uppercase tracking-widest flex items-center gap-2 self-start md:self-auto"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                Add New Dish
              </button>
            </div>

            {/* Menu Items List */}
            <div className="space-y-8">
              {filteredMenuSections.map((section) => (
                <div key={section._id} className="card p-6 border border-border-custom">
                  <div className="border-b border-border-custom/50 pb-4 mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-headline-md text-xl text-text-main">
                        {section.category}
                      </h3>
                      {section.subCategory && (
                        <p className="text-xs text-primary font-label-caps tracking-wider uppercase mt-0.5">
                          {section.subCategory}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-text-secondary">
                      {section.items.length} items
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.items.map((item) => (
                      <div
                        key={item._id}
                        className={`p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 ${
                          item.isOutOfStock
                            ? "bg-red-500/5 border-red-200"
                            : "bg-background border-border-custom/60 hover:border-primary/40"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {/* Diet icon */}
                              {item.type === "veg" && (
                                <span className="w-3.5 h-3.5 border border-green-600 flex items-center justify-center p-[2px] bg-white rounded-sm">
                                  <span className="w-full h-full bg-green-600 rounded-full"></span>
                                </span>
                              )}
                              {item.type === "non-veg" && (
                                <span className="w-3.5 h-3.5 border border-red-600 flex items-center justify-center p-[2px] bg-white rounded-sm">
                                  <span className="w-full h-full bg-red-600 rounded-full"></span>
                                </span>
                              )}
                              {item.type === "egg" && (
                                <span className="w-3.5 h-3.5 border border-yellow-500 flex items-center justify-center p-[2px] bg-white rounded-sm">
                                  <span className="w-full h-full bg-yellow-500 rounded-full"></span>
                                </span>
                              )}

                              <h4 className={`font-headline-sm text-base text-text-main ${item.isOutOfStock ? "line-through text-text-secondary" : ""}`}>
                                {item.name}
                              </h4>
                            </div>

                            {/* Price */}
                            <div className="text-sm font-bold text-primary-dark">
                              {typeof item.price === "object" ? (
                                <div className="flex flex-wrap gap-2 text-xs font-normal">
                                  {Object.entries(item.price).map(([k, v]) => (
                                    <span key={k} className="bg-surface px-2 py-0.5 rounded border border-border-custom">
                                      <span className="capitalize text-text-secondary mr-1">{k}:</span>
                                      <strong>₹{String(v)}</strong>
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <span>₹{item.price}</span>
                              )}
                            </div>
                          </div>

                          {/* Out of stock badge */}
                          {item.isOutOfStock ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-label-caps uppercase tracking-wider bg-red-100 text-red-700 border border-red-300 font-bold whitespace-nowrap">
                              Out of Stock
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-label-caps uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold whitespace-nowrap">
                              In Stock
                            </span>
                          )}
                        </div>

                        {/* Action buttons: Out of Stock Toggle, Update, Delete */}
                        <div className="pt-3 border-t border-border-custom/40 flex items-center justify-between gap-2">
                          {/* Toggle Out of Stock Pill */}
                          <button
                            onClick={() => handleToggleStock(section._id, item._id)}
                            className={`px-3 py-1 rounded-full text-xs font-label-caps uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 ${
                              item.isOutOfStock
                                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                                : "bg-red-100 text-red-700 border border-red-300 hover:bg-red-200"
                            }`}
                          >
                            <span className="material-symbols-outlined text-[14px]">
                              {item.isOutOfStock ? "check_circle" : "do_not_disturb_on"}
                            </span>
                            {item.isOutOfStock ? "Set In Stock" : "Mark Out of Stock"}
                          </button>

                          <div className="flex items-center gap-2">
                            {/* Update Button */}
                            <button
                              onClick={() => setEditingItem({ sectionId: section._id, item })}
                              className="px-3 py-1 rounded-lg border border-border-custom hover:border-primary text-text-main text-xs font-label-caps uppercase tracking-wider transition-colors flex items-center gap-1"
                            >
                              <span className="material-symbols-outlined text-[14px] text-primary">edit</span>
                              Update
                            </button>

                            {/* Delete Button */}
                            <button
                              onClick={() => handleDeleteItem(section._id, item._id)}
                              className="p-1 text-text-secondary hover:text-red-600 transition-colors"
                              title="Delete Item"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ==========================================
            TAB 3: ROOM TYPES (Add, Update, Images)
        ========================================== */}
        {activeTab === "rooms" && (
          <section className="space-y-6">
            {/* Header / Add Room Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface p-6 rounded-2xl border border-border-custom">
              <div>
                <span className="font-label-caps text-xs tracking-widest text-primary uppercase block mb-1">
                  ACCOMMODATION MANAGEMENT
                </span>
                <h2 className="font-headline-md text-2xl text-text-main">
                  Room Types & Suites
                </h2>
                <p className="text-text-secondary text-sm mt-1">
                  Manage boutique stay suites, pricing, room details, and photo galleries.
                </p>
              </div>

              <button
                onClick={handleOpenAddRoom}
                className="btn-primary px-6 py-3 font-label-caps text-xs uppercase tracking-widest flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                Add New Room Type
              </button>
            </div>

            {/* Room Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {rooms.map((room) => (
                <div
                  key={room._id}
                  className="card border border-border-custom overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Primary Image preview banner */}
                    <div className="relative h-56 w-full bg-surface-dark overflow-hidden group">
                      {room.images && room.images.length > 0 ? (
                        <img
                          src={room.images[0]}
                          alt={room.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-text-light/40">
                          <span className="material-symbols-outlined text-5xl">image_not_supported</span>
                        </div>
                      )}

                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-label-caps uppercase tracking-wider flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px]">photo_library</span>
                        {room.images?.length || 0} Photos
                      </div>

                      <div className="absolute top-3 right-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-label-caps uppercase tracking-wider font-semibold backdrop-blur-md ${
                            room.isAvailable
                              ? "bg-emerald-900/80 text-emerald-200 border border-emerald-500"
                              : "bg-red-900/80 text-red-200 border border-red-500"
                          }`}
                        >
                          {room.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </div>
                    </div>

                    {/* Room details */}
                    <div className="p-6 space-y-4">
                      <div>
                        {room.tagline && (
                          <span className="font-label-caps text-xs text-primary uppercase tracking-widest block mb-1">
                            {room.tagline}
                          </span>
                        )}
                        <h3 className="font-headline-md text-2xl text-text-main">{room.name}</h3>
                        <p className="text-text-secondary text-sm line-clamp-2 mt-2 font-body-md">
                          {room.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-y border-border-custom/50 py-3">
                        <div className="text-2xl font-headline-md text-primary-dark">
                          ₹{room.pricePerNight?.toLocaleString("en-IN")}{" "}
                          <span className="text-xs font-body-md text-text-secondary">/ night</span>
                        </div>
                        <div className="text-xs font-label-caps text-text-secondary flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">group</span>
                          {room.capacity || "2 Guests"}
                        </div>
                      </div>

                      {/* Amenities chips */}
                      <div>
                        <span className="text-[11px] font-label-caps uppercase text-text-secondary tracking-wider block mb-2">
                          Amenities:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {room.amenities?.map((amenity, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 bg-surface rounded-md text-xs text-text-secondary border border-border-custom/60"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Image Thumbnails Strip */}
                      <div>
                        <span className="text-[11px] font-label-caps uppercase text-text-secondary tracking-wider block mb-2">
                          Image Gallery:
                        </span>
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                          {room.images?.map((img, idx) => (
                            <img
                              key={idx}
                              src={img}
                              alt=""
                              className="w-16 h-12 object-cover rounded-lg border border-border-custom flex-shrink-0"
                            />
                          ))}
                          <button
                            onClick={() => setManagingImagesRoom(room)}
                            className="w-16 h-12 rounded-lg border border-dashed border-primary/50 text-primary flex flex-col items-center justify-center text-[10px] font-label-caps hover:bg-primary/5 transition-colors flex-shrink-0"
                          >
                            <span className="material-symbols-outlined text-[16px]">add_photo_alternate</span>
                            + Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-6 pt-0 flex items-center justify-between gap-3 border-t border-border-custom/40 mt-4">
                    <button
                      onClick={() => setManagingImagesRoom(room)}
                      className="px-4 py-2 rounded-xl bg-surface border border-gold/40 text-gold-dark hover:bg-gold/10 text-xs font-label-caps uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                      Add / Update Images
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditRoom(room)}
                        className="px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary-dark text-xs font-label-caps uppercase tracking-wider flex items-center gap-1.5 transition-colors font-semibold"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                        Update Room
                      </button>

                      <button
                        onClick={() => handleDeleteRoom(room._id)}
                        className="p-2 text-text-secondary hover:text-red-600 transition-colors"
                        title="Delete Room Type"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* ==========================================
          MODAL: EDIT MENU ITEM (Update Dish)
      ========================================== */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="card max-w-lg w-full p-6 md:p-8 bg-background border border-gold/30 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-border-custom mb-6">
              <h3 className="font-headline-md text-xl text-text-main">Update Menu Item</h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-text-secondary hover:text-text-main"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveEditItem} className="space-y-4">
              <div>
                <label className="font-label-caps text-xs text-gold block mb-1">Dish Name</label>
                <input
                  type="text"
                  required
                  value={editingItem.item.name}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, name: e.target.value },
                    })
                  }
                  className="w-full bg-surface border border-border-custom rounded-xl px-4 py-2 text-sm outline-none focus:border-primary text-text-main"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-caps text-xs text-gold block mb-1">Food Type</label>
                  <select
                    value={editingItem.item.type}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        item: { ...editingItem.item, type: e.target.value },
                      })
                    }
                    className="w-full bg-surface border border-border-custom rounded-xl px-4 py-2 text-sm outline-none focus:border-primary text-text-main"
                  >
                    <option value="veg">Vegetarian</option>
                    <option value="non-veg">Non-Vegetarian</option>
                    <option value="egg">Egg</option>
                    <option value="both">Both</option>
                  </select>
                </div>

                <div>
                  <label className="font-label-caps text-xs text-gold block mb-1">Price (₹)</label>
                  {typeof editingItem.item.price === "object" ? (
                    <div className="text-xs text-text-secondary p-2 bg-surface rounded-xl border border-border-custom">
                      Multi-price variant. Edit values in DB or switch to single.
                    </div>
                  ) : (
                    <input
                      type="number"
                      required
                      value={editingItem.item.price}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          item: { ...editingItem.item, price: Number(e.target.value) },
                        })
                      }
                      className="w-full bg-surface border border-border-custom rounded-xl px-4 py-2 text-sm outline-none focus:border-primary text-text-main"
                    />
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="stockCheckbox"
                  checked={editingItem.item.isOutOfStock || false}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, isOutOfStock: e.target.checked },
                    })
                  }
                  className="w-4 h-4 rounded text-primary focus:ring-primary"
                />
                <label htmlFor="stockCheckbox" className="text-sm font-medium text-text-main">
                  Mark as Out of Stock
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border-custom mt-6">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-5 py-2.5 rounded-full border border-border-custom text-text-secondary text-xs font-label-caps uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-6 py-2.5 font-label-caps text-xs uppercase tracking-widest"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: ADD NEW DISH
      ========================================== */}
      {isAddItemOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="card max-w-lg w-full p-6 md:p-8 bg-background border border-gold/30 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-border-custom mb-6">
              <h3 className="font-headline-md text-xl text-text-main">Add New Menu Item</h3>
              <button
                onClick={() => setIsAddItemOpen(false)}
                className="text-text-secondary hover:text-text-main"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddDish} className="space-y-4">
              <div>
                <label className="font-label-caps text-xs text-gold block mb-1">Target Category *</label>
                <input
                  type="text"
                  required
                  list="categoriesList"
                  placeholder="e.g. Starters & Appetizers, Main Course, Biryani"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full bg-surface border border-border-custom rounded-xl px-4 py-2 text-sm outline-none focus:border-primary text-text-main"
                />
                <datalist id="categoriesList">
                  {menuCategories.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="font-label-caps text-xs text-gold block mb-1">Subcategory (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Vegetarian Starters, House Speciality"
                  value={newItem.subCategory}
                  onChange={(e) => setNewItem({ ...newItem, subCategory: e.target.value })}
                  className="w-full bg-surface border border-border-custom rounded-xl px-4 py-2 text-sm outline-none focus:border-primary text-text-main"
                />
              </div>

              <div>
                <label className="font-label-caps text-xs text-gold block mb-1">Dish Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Malai Paneer Tikka"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full bg-surface border border-border-custom rounded-xl px-4 py-2 text-sm outline-none focus:border-primary text-text-main"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-caps text-xs text-gold block mb-1">Food Type *</label>
                  <select
                    value={newItem.type}
                    onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                    className="w-full bg-surface border border-border-custom rounded-xl px-4 py-2 text-sm outline-none focus:border-primary text-text-main"
                  >
                    <option value="veg">Vegetarian</option>
                    <option value="non-veg">Non-Vegetarian</option>
                    <option value="egg">Egg</option>
                    <option value="both">Both</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-label-caps text-xs text-gold block">Price (₹) *</label>
                    <button
                      type="button"
                      onClick={() => setNewItem({ ...newItem, isMultiPrice: !newItem.isMultiPrice })}
                      className="text-[10px] text-primary underline"
                    >
                      {newItem.isMultiPrice ? "Single Price" : "Multi/Variants"}
                    </button>
                  </div>

                  {!newItem.isMultiPrice ? (
                    <input
                      type="number"
                      required
                      placeholder="e.g. 240"
                      value={newItem.price}
                      onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                      className="w-full bg-surface border border-border-custom rounded-xl px-4 py-2 text-sm outline-none focus:border-primary text-text-main"
                    />
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Half"
                          value={newItem.priceKey1}
                          onChange={(e) => setNewItem({ ...newItem, priceKey1: e.target.value })}
                          className="w-1/2 bg-surface border border-border-custom rounded-lg px-2 py-1 text-xs"
                        />
                        <input
                          type="number"
                          placeholder="₹"
                          value={newItem.priceVal1}
                          onChange={(e) => setNewItem({ ...newItem, priceVal1: e.target.value })}
                          className="w-1/2 bg-surface border border-border-custom rounded-lg px-2 py-1 text-xs"
                        />
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Full"
                          value={newItem.priceKey2}
                          onChange={(e) => setNewItem({ ...newItem, priceKey2: e.target.value })}
                          className="w-1/2 bg-surface border border-border-custom rounded-lg px-2 py-1 text-xs"
                        />
                        <input
                          type="number"
                          placeholder="₹"
                          value={newItem.priceVal2}
                          onChange={(e) => setNewItem({ ...newItem, priceVal2: e.target.value })}
                          className="w-1/2 bg-surface border border-border-custom rounded-lg px-2 py-1 text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="newStockCheckbox"
                  checked={newItem.isOutOfStock}
                  onChange={(e) => setNewItem({ ...newItem, isOutOfStock: e.target.checked })}
                  className="w-4 h-4 rounded text-primary focus:ring-primary"
                />
                <label htmlFor="newStockCheckbox" className="text-sm font-medium text-text-main">
                  Mark as Out of Stock initially
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border-custom mt-6">
                <button
                  type="button"
                  onClick={() => setIsAddItemOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-border-custom text-text-secondary text-xs font-label-caps uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-6 py-2.5 font-label-caps text-xs uppercase tracking-widest"
                >
                  Add to Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: ADD / EDIT ROOM TYPE
      ========================================== */}
      {(isAddRoomOpen || editingRoom) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="card max-w-xl w-full p-6 md:p-8 bg-background border border-gold/30 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-border-custom mb-6">
              <h3 className="font-headline-md text-xl text-text-main">
                {editingRoom ? "Update Room Type" : "Add New Room Type"}
              </h3>
              <button
                onClick={() => {
                  setIsAddRoomOpen(false);
                  setEditingRoom(null);
                }}
                className="text-text-secondary hover:text-text-main"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveRoom} className="space-y-4">
              <div>
                <label className="font-label-caps text-xs text-gold block mb-1">Room Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Presidential Suite"
                  value={roomFormData.name}
                  onChange={(e) => setRoomFormData({ ...roomFormData, name: e.target.value })}
                  className="w-full bg-surface border border-border-custom rounded-xl px-4 py-2 text-sm outline-none focus:border-primary text-text-main"
                />
              </div>

              <div>
                <label className="font-label-caps text-xs text-gold block mb-1">Tagline / Subtitle</label>
                <input
                  type="text"
                  placeholder="e.g. Unmatched Luxury & Odia Heritage"
                  value={roomFormData.tagline}
                  onChange={(e) => setRoomFormData({ ...roomFormData, tagline: e.target.value })}
                  className="w-full bg-surface border border-border-custom rounded-xl px-4 py-2 text-sm outline-none focus:border-primary text-text-main"
                />
              </div>

              <div>
                <label className="font-label-caps text-xs text-gold block mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the room, beds, ambiance, and view..."
                  value={roomFormData.description}
                  onChange={(e) => setRoomFormData({ ...roomFormData, description: e.target.value })}
                  className="w-full bg-surface border border-border-custom rounded-xl px-4 py-2 text-sm outline-none focus:border-primary text-text-main resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-caps text-xs text-gold block mb-1">Price Per Night (₹) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 4500"
                    value={roomFormData.pricePerNight}
                    onChange={(e) => setRoomFormData({ ...roomFormData, pricePerNight: e.target.value })}
                    className="w-full bg-surface border border-border-custom rounded-xl px-4 py-2 text-sm outline-none focus:border-primary text-text-main"
                  />
                </div>

                <div>
                  <label className="font-label-caps text-xs text-gold block mb-1">Capacity</label>
                  <input
                    type="text"
                    placeholder="e.g. 2 Guests"
                    value={roomFormData.capacity}
                    onChange={(e) => setRoomFormData({ ...roomFormData, capacity: e.target.value })}
                    className="w-full bg-surface border border-border-custom rounded-xl px-4 py-2 text-sm outline-none focus:border-primary text-text-main"
                  />
                </div>
              </div>

              <div>
                <label className="font-label-caps text-xs text-gold block mb-1">
                  Amenities (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="High-Speed Wi-Fi, Central AC, 24/7 Room Service, Smart TV"
                  value={roomFormData.amenities}
                  onChange={(e) => setRoomFormData({ ...roomFormData, amenities: e.target.value })}
                  className="w-full bg-surface border border-border-custom rounded-xl px-4 py-2 text-sm outline-none focus:border-primary text-text-main"
                />
              </div>

              <div>
                <label className="font-label-caps text-xs text-gold block mb-1">
                  Image URLs (one URL per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="https://images.unsplash.com/...&#10;https://..."
                  value={roomFormData.images}
                  onChange={(e) => setRoomFormData({ ...roomFormData, images: e.target.value })}
                  className="w-full bg-surface border border-border-custom rounded-xl px-4 py-2 text-xs font-mono outline-none focus:border-primary text-text-main resize-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="roomAvailableCheckbox"
                  checked={roomFormData.isAvailable}
                  onChange={(e) => setRoomFormData({ ...roomFormData, isAvailable: e.target.checked })}
                  className="w-4 h-4 rounded text-primary focus:ring-primary"
                />
                <label htmlFor="roomAvailableCheckbox" className="text-sm font-medium text-text-main">
                  Room is Available for Online Booking
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border-custom mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddRoomOpen(false);
                    setEditingRoom(null);
                  }}
                  className="px-5 py-2.5 rounded-full border border-border-custom text-text-secondary text-xs font-label-caps uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-6 py-2.5 font-label-caps text-xs uppercase tracking-widest"
                >
                  {editingRoom ? "Save Room Updates" : "Create Room Type"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: ADD / UPDATE IMAGES (Dedicated Gallery Manager)
      ========================================== */}
      {managingImagesRoom && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="card max-w-2xl w-full p-6 md:p-8 bg-background border border-gold/30 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-border-custom mb-6">
              <div>
                <span className="font-label-caps text-xs text-primary uppercase tracking-widest block">
                  PHOTO GALLERY MANAGER
                </span>
                <h3 className="font-headline-md text-xl text-text-main">
                  {managingImagesRoom.name}
                </h3>
              </div>
              <button
                onClick={() => setManagingImagesRoom(null)}
                className="text-text-secondary hover:text-text-main"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Current Images Gallery */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between">
                <label className="font-label-caps text-xs text-gold block">
                  Current Images ({managingImagesRoom.images.length})
                </label>
                <span className="text-[11px] text-text-secondary">
                  First image is used as the primary room card thumbnail
                </span>
              </div>

              {managingImagesRoom.images.length === 0 ? (
                <div className="p-8 text-center border-2 border-dashed border-border-custom rounded-2xl text-text-secondary text-sm">
                  No images uploaded yet for this room.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {managingImagesRoom.images.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      className="group relative rounded-xl overflow-hidden border border-border-custom shadow-sm bg-surface-dark flex flex-col"
                    >
                      <div className="relative h-36 w-full overflow-hidden bg-black/20">
                        <img src={imgUrl} alt="" className="w-full h-full object-cover" />

                        {idx === 0 && (
                          <span className="absolute top-2 left-2 bg-gold text-white text-[10px] font-label-caps uppercase tracking-wider px-2.5 py-0.5 rounded-md shadow-md font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px]">star</span>
                            Primary
                          </span>
                        )}

                        <button
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full shadow-lg transition-transform hover:scale-110"
                          title="Delete image from Cloudflare R2 & Room"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>

                      {/* Image Control Bar */}
                      <div className="p-2 bg-surface flex items-center justify-between border-t border-border-custom text-xs">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMoveImage(idx, "left")}
                            className="p-1 rounded hover:bg-background text-text-secondary hover:text-text-main disabled:opacity-30 disabled:hover:bg-transparent"
                            title="Move Earlier"
                          >
                            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                          </button>
                          <button
                            type="button"
                            disabled={idx === managingImagesRoom.images.length - 1}
                            onClick={() => handleMoveImage(idx, "right")}
                            className="p-1 rounded hover:bg-background text-text-secondary hover:text-text-main disabled:opacity-30 disabled:hover:bg-transparent"
                            title="Move Later"
                          >
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                          </button>
                        </div>

                        {idx !== 0 && (
                          <button
                            type="button"
                            onClick={() => handleSetPrimaryImage(idx)}
                            className="text-[11px] font-label-caps uppercase tracking-wider text-gold hover:text-gold-dark hover:underline flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[14px]">star_border</span>
                            Make Primary
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add New Images Options */}
            <div className="space-y-6 pt-6 border-t border-border-custom">
              {/* Option A: Direct File Upload to Cloudflare R2 */}
              <div className="p-5 bg-surface rounded-2xl border border-border-custom">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-label-caps text-xs text-primary block font-semibold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                    Upload Image to Cloudflare R2
                  </label>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-mono">
                    Direct Cloud Storage
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploadingImage}
                  onChange={handleUploadImageFile}
                  className="block w-full text-xs text-text-secondary file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border-0 file:text-xs file:font-label-caps file:uppercase file:tracking-wider file:bg-primary file:text-white hover:file:bg-primary-dark cursor-pointer disabled:opacity-50"
                />
                {uploadingImage && (
                  <p className="text-xs text-primary mt-3 flex items-center gap-2 font-medium">
                    <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                    Uploading directly to Cloudflare R2 bucket...
                  </p>
                )}
              </div>

              {/* Option B: Direct Image URL */}
              <div className="p-5 bg-surface rounded-2xl border border-border-custom">
                <label className="font-label-caps text-xs text-primary block mb-2 font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">link</span>
                  Or Add Image via Direct URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://pub-37e146cbf4d744379170ed6a20ce2551.r2.dev/..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="flex-1 bg-background border border-border-custom rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary text-text-main"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="btn-gold px-5 py-2.5 text-xs font-label-caps uppercase tracking-wider rounded-xl"
                  >
                    Add URL
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-border-custom mt-6">
              <button
                type="button"
                onClick={() => setManagingImagesRoom(null)}
                className="btn-primary px-8 py-2.5 font-label-caps text-xs uppercase tracking-widest"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
