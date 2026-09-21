'use client';

import { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5010';

export default function BookingForms() {
  const [tableStatus, setTableStatus] = useState<{ loading: boolean, success?: boolean, error?: string }>({ loading: false });
  const [roomStatus, setRoomStatus] = useState<{ loading: boolean, success?: boolean, error?: string }>({ loading: false });

  const handleTableSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTableStatus({ loading: true });
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const res = await fetch(`${API_URL}/api/bookings/table`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) throw new Error('Failed to submit booking');
      setTableStatus({ loading: false, success: true });
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setTableStatus({ loading: false, error: err.message });
    }
  };

  const handleRoomSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRoomStatus({ loading: true });
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const res = await fetch(`${API_URL}/api/bookings/room`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) throw new Error('Failed to submit booking');
      setRoomStatus({ loading: false, success: true });
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setRoomStatus({ loading: false, error: err.message });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
      {/* Table Booking Card */}
      <div className="card p-8 md:p-12 text-left">
        <h3 className="font-headline-sm text-headline-sm text-text-main mb-8 text-center">Reserve a Table</h3>
        
        {tableStatus.success && <div className="mb-6 p-4 bg-green-900/30 border border-green-700 text-green-400 rounded">Table requested! You will receive a WhatsApp confirmation shortly.</div>}
        {tableStatus.error && <div className="mb-6 p-4 bg-red-900/30 border border-red-700 text-red-400 rounded">Error: {tableStatus.error}</div>}
        
        <form className="space-y-6" onSubmit={handleTableSubmit}>
          <div>
            <label className="font-label-caps text-label-caps text-primary-dark block mb-2">FULL NAME</label>
            <input name="fullName" required className="w-full border-b border-border-custom focus:border-primary bg-transparent py-2 text-text-main focus:ring-0 outline-none transition-all" placeholder="Your Name" type="text" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-label-caps text-label-caps text-primary-dark block mb-2">EMAIL ADDRESS</label>
              <input name="email" required className="w-full border-b border-border-custom focus:border-primary bg-transparent py-2 text-text-main focus:ring-0 outline-none transition-all" placeholder="Your Email" type="email" />
            </div>
            <div>
              <label className="font-label-caps text-label-caps text-primary-dark block mb-2">PHONE NUMBER</label>
              <input name="phone" required className="w-full border-b border-border-custom focus:border-primary bg-transparent py-2 text-text-main focus:ring-0 outline-none transition-all" placeholder="+91 00000 00000" type="tel" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-label-caps text-label-caps text-primary-dark block mb-2">DATE</label>
              <input name="date" required className="w-full border-b border-border-custom focus:border-primary bg-transparent py-2 text-text-main focus:ring-0 outline-none transition-all" type="date" />
            </div>
            <div>
              <label className="font-label-caps text-label-caps text-primary-dark block mb-2">OCCASION</label>
              <select name="occasion" required className="w-full border-b border-border-custom focus:border-primary bg-transparent py-2 text-text-main focus:ring-0 outline-none transition-all [&>option]:text-text-main">
                <option>Casual</option>
                <option>Birthday</option>
                <option>Anniversary</option>
                <option>Corporate</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-label-caps text-label-caps text-primary-dark block mb-2">GUESTS</label>
              <select name="guests" required className="w-full border-b border-border-custom focus:border-primary bg-transparent py-2 text-text-main focus:ring-0 outline-none transition-all">
                <option>2 Persons</option>
                <option>4 Persons</option>
                <option>6+ Persons</option>
              </select>
            </div>
            <div>
              <label className="font-label-caps text-label-caps text-primary-dark block mb-2">TIME</label>
              <select name="time" required className="w-full border-b border-border-custom focus:border-primary bg-transparent py-2 text-text-main focus:ring-0 outline-none transition-all [&>option]:text-text-main">
                <option>11:00 AM</option>
                <option>11:30 AM</option>
                <option>12:00 PM</option>
                <option>12:30 PM</option>
                <option>01:00 PM</option>
                <option>01:30 PM</option>
                <option>02:00 PM</option>
                <option>02:30 PM</option>
                <option>03:00 PM</option>
                <option>03:30 PM</option>
                <option>04:00 PM</option>
                <option>04:30 PM</option>
                <option>05:00 PM</option>
                <option>05:30 PM</option>
                <option>06:00 PM</option>
                <option>06:30 PM</option>
                <option>07:00 PM</option>
                <option>07:30 PM</option>
                <option>08:00 PM</option>
                <option>08:30 PM</option>
                <option>09:00 PM</option>
                <option>09:30 PM</option>
              </select>
            </div>
          </div>
          <div className="pt-4">
            <button disabled={tableStatus.loading} className="btn-primary w-full py-4 font-label-caps text-label-caps uppercase tracking-widest disabled:opacity-50">
              {tableStatus.loading ? 'Submitting...' : 'Confirm Table'}
            </button>
          </div>
        </form>
      </div>

      {/* Room Booking Card */}
      <div className="card p-8 md:p-12 text-left bg-surface-dark border-gold/20 shadow-2xl">
        <h3 className="font-headline-sm text-headline-sm text-gold mb-8 text-center">Book a Room</h3>
        
        {roomStatus.success && <div className="mb-6 p-4 bg-green-900/30 border border-green-700 text-green-400 rounded">Room requested! You will receive a WhatsApp confirmation shortly.</div>}
        {roomStatus.error && <div className="mb-6 p-4 bg-red-900/30 border border-red-700 text-red-400 rounded">Error: {roomStatus.error}</div>}
        
        <form className="space-y-6" onSubmit={handleRoomSubmit}>
          <div>
            <label className="font-label-caps text-label-caps text-gold block mb-2">FULL NAME</label>
            <input name="fullName" required className="w-full border-b border-border-custom focus:border-gold bg-transparent py-2 text-text-main focus:ring-0 outline-none transition-all" placeholder="Your Name" type="text" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-label-caps text-label-caps text-gold block mb-2">EMAIL ADDRESS</label>
              <input name="email" required className="w-full border-b border-border-custom focus:border-gold bg-transparent py-2 text-text-main focus:ring-0 outline-none transition-all" placeholder="Your Email" type="email" />
            </div>
            <div>
              <label className="font-label-caps text-label-caps text-gold block mb-2">PHONE NUMBER</label>
              <input name="phone" required className="w-full border-b border-border-custom focus:border-gold bg-transparent py-2 text-text-main focus:ring-0 outline-none transition-all" placeholder="+91 00000 00000" type="tel" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-label-caps text-label-caps text-gold block mb-2">CHECK-IN</label>
              <input name="checkIn" required className="w-full border-b border-border-custom focus:border-gold bg-transparent py-2 text-text-main focus:ring-0 outline-none transition-all" type="date" />
            </div>
            <div>
              <label className="font-label-caps text-label-caps text-gold block mb-2">CHECK-OUT</label>
              <input name="checkOut" required className="w-full border-b border-border-custom focus:border-gold bg-transparent py-2 text-text-main focus:ring-0 outline-none transition-all" type="date" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-label-caps text-label-caps text-gold block mb-2">GUESTS</label>
              <select name="guests" required className="w-full border-b border-border-custom focus:border-gold bg-transparent py-2 text-text-main focus:ring-0 outline-none transition-all [&>option]:text-text-main">
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4+ Guests</option>
              </select>
            </div>
            <div>
              <label className="font-label-caps text-label-caps text-gold block mb-2">ROOM TYPE</label>
              <select name="roomType" required className="w-full border-b border-border-custom focus:border-gold bg-transparent py-2 text-text-main focus:ring-0 outline-none transition-all [&>option]:text-text-main">
                <option>The Heritage Suite</option>
                <option>The Classic Room</option>
              </select>
            </div>
          </div>
          <div className="pt-4">
            <button disabled={roomStatus.loading} className="btn-gold w-full py-4 font-label-caps text-label-caps uppercase tracking-widest text-text-main disabled:opacity-50">
              {roomStatus.loading ? 'Submitting...' : 'Request Room'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
