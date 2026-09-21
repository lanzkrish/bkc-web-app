

'use client';

import { useState } from 'react';

export default function ContactUsPage() {
  const [status, setStatus] = useState<{ loading: boolean, success?: boolean, error?: string }>({ loading: false });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ loading: true });
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5010';
      const res = await fetch(`${API_URL}/api/bookings/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) throw new Error('Failed to send message');
      setStatus({ loading: false, success: true });
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setStatus({ loading: false, error: err.message });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-24 text-center px-margin-mobile">
        <h1 className="font-display-lg text-display-lg mb-4 text-on-surface md:block hidden">Connect With Us</h1>
        <h1 className="font-display-lg-mobile text-display-lg-mobile mb-4 text-on-surface md:hidden">Connect With Us</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Experience the heart of Odisha&apos;s culinary heritage. We are here to assist with your dining enquiries, private events, and feedback.</p>
      </section>

      {/* Split Content Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-16 md:mb-section-gap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
          {/* Left Column: Contact Details */}
          <div className="flex flex-col justify-center space-y-12">
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 flex items-center justify-center border border-primary/30 rounded-sm">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                </div>
                <div>
                  <h3 className="font-label-caps text-label-caps text-primary mb-2">Visit Us</h3>
                  <p className="font-body-lg text-body-lg">Plot no- 99, beside indian oil petrol pump,<br />Sector A, Rasulgarh, Bhubaneswar, Odisha 751010</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 flex items-center justify-center border border-primary/30 rounded-sm">
                  <span className="material-symbols-outlined text-primary">call</span>
                </div>
                <div>
                  <h3 className="font-label-caps text-label-caps text-primary mb-2">Call Us</h3>
                  <p className="font-body-lg text-body-lg">083398 88901</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 flex items-center justify-center border border-primary/30 rounded-sm">
                  <span className="material-symbols-outlined text-primary">mail</span>
                </div>
                <div>
                  <h3 className="font-label-caps text-label-caps text-primary mb-2">Email Us</h3>
                  <p className="font-body-lg text-body-lg">reservations@bbkitchencafe.com<br />feedback@bbkitchencafe.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 flex items-center justify-center border border-primary/30 rounded-sm">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                </div>
                <div>
                  <h3 className="font-label-caps text-label-caps text-primary mb-2">Hours</h3>
                  <p className="font-body-lg text-body-lg">Mon - Sun: 11 am – 11:30 pm</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant">Follow Our Journey</h3>
              <div className="flex gap-4">
                <a className="w-10 h-10 flex items-center justify-center border border-on-surface/10 hover:border-primary hover:text-primary transition-all duration-300" href="https://www.instagram.com/bhubaneswarkitchenn/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </a>
              </div>
            </div>
            <a className="inline-flex items-center justify-center gap-3 bg-primary text-on-primary-fixed px-8 py-4 rounded-sm font-label-caps text-label-caps gold-glow transition-all duration-300 group" href="https://wa.me/918339888901">
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">chat</span>
              Chat on WhatsApp
            </a>
          </div>
          
          {/* Right Column: Map Preview */}
          <div className="relative h-[500px] lg:h-auto min-h-[400px] glass-card overflow-hidden rounded-sm group">
            <div className="absolute inset-0 grayscale contrast-125 brightness-50 opacity-60 transition-all duration-700 group-hover:scale-110 group-hover:opacity-80">
              <img className="w-full h-full object-cover" alt="Map visualization" src="/assets/contact-us-map.png" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
            <div className="absolute bottom-10 left-10 z-10">
              <div className="bg-surface/90 backdrop-blur-md p-6 border border-primary/20 max-w-xs">
                <h4 className="font-headline-sm text-headline-sm text-primary mb-2">Our Location</h4>
                <p className="font-body-md text-body-md text-on-surface mb-4">Rasulgarh, Bhubaneswar</p>
                <a className="text-primary font-label-caps text-label-caps border-b border-primary/40 hover:border-primary transition-all" href="https://maps.app.goo.gl/D7FNUHb5Kmkxjg838" target="_blank" rel="noopener noreferrer">Get Directions</a>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-4 h-4 bg-primary rounded-full animate-ping opacity-75"></div>
              <div className="w-3 h-3 bg-primary rounded-full absolute"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="bg-surface-container py-16 md:py-section-gap px-margin-mobile relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Send an Enquiry</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Fill out the form below and our concierge will get back to you within 24 hours.</p>
          </div>
          
          {status.success && <div className="mb-8 p-4 bg-green-900/30 border border-green-700 text-green-400 rounded text-center">Enquiry sent successfully! Our team will get back to you shortly.</div>}
          {status.error && <div className="mb-8 p-4 bg-red-900/30 border border-red-700 text-red-400 rounded text-center">Error: {status.error}</div>}

          <form className="space-y-12" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Name</label>
                <input name="name" required className="w-full bg-transparent border-b border-on-surface/10 py-4 font-body-lg text-body-lg focus:border-primary transition-all placeholder:text-on-surface/20" placeholder="Your Name" type="text" />
              </div>
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Email</label>
                <input name="email" required className="w-full bg-transparent border-b border-on-surface/10 py-4 font-body-lg text-body-lg focus:border-primary transition-all placeholder:text-on-surface/20" placeholder="Your Email" type="email" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Phone Number</label>
              <input name="phone" required className="w-full bg-transparent border-b border-on-surface/10 py-4 font-body-lg text-body-lg focus:border-primary transition-all placeholder:text-on-surface/20" placeholder="+91 00000 00000" type="tel" />
            </div>
            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Message</label>
              <textarea name="message" required className="w-full bg-transparent border-b border-on-surface/10 py-4 font-body-lg text-body-lg focus:border-primary transition-all placeholder:text-on-surface/20 resize-none" placeholder="How can we help you?" rows={4}></textarea>
            </div>
            <div className="flex justify-center">
              <button disabled={status.loading} className="bg-primary text-on-primary-fixed px-12 py-4 rounded-sm font-label-caps text-label-caps tracking-widest hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50" type="submit">
                {status.loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
