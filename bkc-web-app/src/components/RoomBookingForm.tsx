'use client';

import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5010';

export default function RoomBookingForm() {
  const [roomTypes, setRoomTypes] = useState<string[]>([
    'The Heritage Suite',
    'The Classic Room',
  ]);
  const [status, setStatus] = useState<{ loading: boolean; success?: boolean; error?: string }>({
    loading: false,
  });

  useEffect(() => {
    fetch(`${API_URL}/api/rooms`, {
      headers: { "ngrok-skip-browser-warning": "true" },
    })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setRoomTypes(data.map((r: any) => r.name));
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ loading: true, error: undefined });

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${API_URL}/api/bookings/room`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to submit room booking');
      }

      setStatus({ loading: false, success: true });
      form.reset();
    } catch (err: any) {
      setStatus({ loading: false, error: err.message || 'Something went wrong. Please try again.' });
    }
  };

  return (
    <div className="bg-surface/5 backdrop-blur-md p-8 md:p-12 rounded-xl max-w-2xl mx-auto border border-gold/20 text-left shadow-2xl">
      {status.success && (
        <div className="mb-6 p-4 bg-green-900/50 border border-green-700 text-green-300 rounded-lg text-sm">
          Room booking requested! You will receive a WhatsApp confirmation shortly.
        </div>
      )}
      {status.error && (
        <div className="mb-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-sm">
          Error: {status.error}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-6 mb-6">
          <div>
            <label className="font-label-caps text-label-caps text-gold block mb-2">FULL NAME</label>
            <input
              name="fullName"
              required
              className="w-full border-b border-text-light/20 focus:border-gold bg-transparent py-2 text-text-light focus:ring-0 outline-none transition-all"
              placeholder="Your Name"
              type="text"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-label-caps text-label-caps text-gold block mb-2">EMAIL ADDRESS</label>
              <input
                name="email"
                required
                className="w-full border-b border-text-light/20 focus:border-gold bg-transparent py-2 text-text-light focus:ring-0 outline-none transition-all"
                placeholder="Your Email"
                type="email"
              />
            </div>
            <div>
              <label className="font-label-caps text-label-caps text-gold block mb-2">PHONE NUMBER</label>
              <input
                name="phone"
                required
                className="w-full border-b border-text-light/20 focus:border-gold bg-transparent py-2 text-text-light focus:ring-0 outline-none transition-all"
                placeholder="+91 00000 00000"
                type="tel"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-label-caps text-label-caps text-gold block mb-2">CHECK-IN</label>
            <input
              name="checkIn"
              required
              className="w-full border-b border-text-light/20 focus:border-gold bg-transparent py-2 text-text-light focus:ring-0 outline-none transition-all"
              type="date"
            />
          </div>
          <div>
            <label className="font-label-caps text-label-caps text-gold block mb-2">CHECK-OUT</label>
            <input
              name="checkOut"
              required
              className="w-full border-b border-text-light/20 focus:border-gold bg-transparent py-2 text-text-light focus:ring-0 outline-none transition-all"
              type="date"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-label-caps text-label-caps text-gold block mb-2">GUESTS</label>
            <select
              name="guests"
              required
              defaultValue="2 Guests"
              className="w-full border-b border-text-light/20 focus:border-gold bg-transparent py-2 text-text-light focus:ring-0 outline-none transition-all [&>option]:text-text-main"
            >
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3 Guests</option>
              <option>4+ Guests</option>
            </select>
          </div>
          <div>
            <label className="font-label-caps text-label-caps text-gold block mb-2">ROOM TYPE</label>
            <select
              name="roomType"
              required
              defaultValue={roomTypes[0] || "The Heritage Suite"}
              className="w-full border-b border-text-light/20 focus:border-gold bg-transparent py-2 text-text-light focus:ring-0 outline-none transition-all [&>option]:text-text-main"
            >
              {roomTypes.map((rt) => (
                <option key={rt} value={rt}>
                  {rt}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="font-label-caps text-label-caps text-gold block mb-2">SPECIAL REQUESTS</label>
          <textarea
            name="specialRequests"
            className="w-full border-b border-text-light/20 focus:border-gold bg-transparent py-2 text-text-light focus:ring-0 outline-none transition-all resize-none h-16"
            placeholder="Any special requirements?"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={status.loading}
          className="btn-gold w-full py-4 font-label-caps text-label-caps uppercase tracking-widest mt-8 disabled:opacity-50 transition-opacity"
        >
          {status.loading ? 'Submitting...' : 'Request Booking'}
        </button>
      </form>
    </div>
  );
}
