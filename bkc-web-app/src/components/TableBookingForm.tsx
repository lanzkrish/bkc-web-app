'use client';

import { useState } from 'react';

export default function TableBookingForm() {
  const [status, setStatus] = useState<{ loading: boolean, success?: boolean, error?: string }>({ loading: false });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ loading: true });
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    // Adding occasion to guests string or just storing it in the payload. The backend doesn't have an occasion field explicitly, but it can be added to notes or guests string.
    data.guests = `${data.guestCount} Guests (${data.occasion})`;
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5010';
      const res = await fetch(`${API_URL}/api/bookings/table`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) throw new Error('Failed to submit booking');
      setStatus({ loading: false, success: true });
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setStatus({ loading: false, error: err.message });
    }
  };

  return (
    <div className="glass-panel p-10 md:p-16 rounded-sm gold-glow">
      {status.success && <div className="mb-6 p-4 bg-green-900/50 border border-green-700 text-green-400 rounded">Reservation requested! You will receive a WhatsApp confirmation shortly.</div>}
      {status.error && <div className="mb-6 p-4 bg-red-900/50 border border-red-700 text-red-400 rounded">Error: {status.error}</div>}
      
      <form className="space-y-12" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {/* Date */}
          <div className="space-y-2">
            <label className="font-label-caps text-[10px] text-on-surface-variant/70 uppercase">Date</label>
            <input name="date" required className="w-full bg-transparent border-none p-0 py-2 font-body-lg text-on-surface input-underline" type="date" />
          </div>
          {/* Time */}
          <div className="space-y-2">
            <label className="font-label-caps text-[10px] text-on-surface-variant/70 uppercase">Time</label>
            <select name="time" required className="w-full bg-transparent border-none p-0 py-2 font-body-lg text-on-surface input-underline appearance-none">
              <option className="bg-surface">11:00 AM</option>
              <option className="bg-surface">11:30 AM</option>
              <option className="bg-surface">12:00 PM</option>
              <option className="bg-surface">12:30 PM</option>
              <option className="bg-surface">01:00 PM</option>
              <option className="bg-surface">01:30 PM</option>
              <option className="bg-surface">02:00 PM</option>
              <option className="bg-surface">02:30 PM</option>
              <option className="bg-surface">03:00 PM</option>
              <option className="bg-surface">03:30 PM</option>
              <option className="bg-surface">04:00 PM</option>
              <option className="bg-surface">04:30 PM</option>
              <option className="bg-surface">05:00 PM</option>
              <option className="bg-surface">05:30 PM</option>
              <option className="bg-surface">06:00 PM</option>
              <option className="bg-surface">06:30 PM</option>
              <option className="bg-surface">07:00 PM</option>
              <option className="bg-surface">07:30 PM</option>
              <option className="bg-surface">08:00 PM</option>
              <option className="bg-surface">08:30 PM</option>
              <option className="bg-surface">09:00 PM</option>
              <option className="bg-surface">09:30 PM</option>
            </select>
          </div>
          {/* Guests */}
          <div className="space-y-2">
            <label className="font-label-caps text-[10px] text-on-surface-variant/70 uppercase">Guest Count</label>
            <input name="guestCount" required className="w-full bg-transparent border-none p-0 py-2 font-body-lg text-on-surface input-underline" placeholder="Number of Guests" type="number" />
          </div>
          {/* Occasion */}
          <div className="space-y-2">
            <label className="font-label-caps text-[10px] text-on-surface-variant/70 uppercase">Occasion</label>
            <select name="occasion" required className="w-full bg-transparent border-none p-0 py-2 font-body-lg text-on-surface input-underline appearance-none">
              <option className="bg-surface">Casual</option>
              <option className="bg-surface">Birthday</option>
              <option className="bg-surface">Anniversary</option>
              <option className="bg-surface">Corporate</option>
            </select>
          </div>
          {/* Name */}
          <div className="space-y-2 md:col-span-2">
            <label className="font-label-caps text-[10px] text-on-surface-variant/70 uppercase">Full Name</label>
            <input name="fullName" required className="w-full bg-transparent border-none p-0 py-2 font-body-lg text-on-surface input-underline" placeholder="Your Name" type="text" />
          </div>
          {/* Email and Phone */}
          <div className="space-y-2 md:col-span-1">
            <label className="font-label-caps text-[10px] text-on-surface-variant/70 uppercase">Email Address</label>
            <input name="email" required className="w-full bg-transparent border-none p-0 py-2 font-body-lg text-on-surface input-underline" placeholder="Your Email" type="email" />
          </div>
          <div className="space-y-2 md:col-span-1">
            <label className="font-label-caps text-[10px] text-on-surface-variant/70 uppercase">Phone Number</label>
            <input name="phone" required className="w-full bg-transparent border-none p-0 py-2 font-body-lg text-on-surface input-underline" placeholder="+91 00000 00000" type="tel" />
          </div>
        </div>
        <div className="pt-6">
          <button disabled={status.loading} className="w-full bg-primary text-on-secondary-fixed py-5 font-label-caps text-label-caps tracking-[0.2em] hover:bg-primary/90 transition-all duration-300 rounded-sm disabled:opacity-50" type="submit">
            {status.loading ? 'SUBMITTING...' : 'REQUEST RESERVATION'}
          </button>
          <p className="text-center mt-6 font-label-caps text-[10px] text-on-surface-variant/50">
            * NOTE: YOUR RESERVATION WILL BE CONFIRMED VIA WHATSAPP.
          </p>
        </div>
      </form>
    </div>
  );
}
