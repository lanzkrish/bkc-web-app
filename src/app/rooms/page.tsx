import Link from "next/link";

export default function RoomsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            alt="Cinematic shot of luxury hotel room"
            src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=2000"
          />
          <div 
            className="absolute inset-0"
            style={{ background: 'linear-gradient(rgba(43,30,26,0.65), rgba(43,30,26,0.45))' }}
          ></div>
        </div>
        <div className="relative z-20 text-center px-6">
          <span className="font-label-caps text-label-caps text-gold mb-4 block tracking-[0.3em] uppercase">Boutique Stay</span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-text-light mb-6">Premium AC Rooms</h1>
          <p className="max-w-2xl mx-auto font-body-lg text-body-lg text-text-light/80">Experience luxury and comfort right in the heart of Bhubaneswar.</p>
        </div>
      </section>

      {/* Room Showcase */}
      <section className="py-16 md:py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto bg-background">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
            <img 
              className="w-full h-full object-cover gallery-img" 
              src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1200" 
              alt="Premium Room" 
            />
          </div>
          <div>
            <span className="font-label-caps text-label-caps text-primary mb-4 block tracking-widest uppercase">The Heritage Suite</span>
            <h2 className="font-headline-md text-headline-md text-text-main mb-6">Unmatched Luxury</h2>
            <p className="font-body-lg text-text-secondary mb-8">
              Our Heritage Suites are designed with an elegant touch of Odia art and modern minimalist furniture. Enjoy a king-sized bed, premium linen, and an en-suite bathroom equipped with luxury amenities.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-text-main font-body-md">
                <span className="material-symbols-outlined text-primary-dark">wifi</span>
                High-Speed Wi-Fi
              </li>
              <li className="flex items-center gap-3 text-text-main font-body-md">
                <span className="material-symbols-outlined text-primary-dark">ac_unit</span>
                Central Air Conditioning
              </li>
              <li className="flex items-center gap-3 text-text-main font-body-md">
                <span className="material-symbols-outlined text-primary-dark">room_service</span>
                24/7 Room Service
              </li>
              <li className="flex items-center gap-3 text-text-main font-body-md">
                <span className="material-symbols-outlined text-primary-dark">tv</span>
                Smart TV & Entertainment
              </li>
            </ul>
            <div className="text-3xl font-headline-md text-primary-dark mb-8">
              ₹4,500 <span className="text-lg font-body-md text-text-secondary">/ night</span>
            </div>
            <a href="#book-room">
              <button className="btn-primary px-10 py-4 font-label-caps text-label-caps uppercase tracking-widest w-full md:w-auto">
                Check Availability
              </button>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <span className="font-label-caps text-label-caps text-primary mb-4 block tracking-widest uppercase">The Classic Room</span>
            <h2 className="font-headline-md text-headline-md text-text-main mb-6">Comfortable Elegance</h2>
            <p className="font-body-lg text-text-secondary mb-8">
              Perfect for business travelers and couples. The Classic Room offers a serene environment with thoughtful touches to ensure a restful night's sleep.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-text-main font-body-md">
                <span className="material-symbols-outlined text-primary-dark">wifi</span>
                High-Speed Wi-Fi
              </li>
              <li className="flex items-center gap-3 text-text-main font-body-md">
                <span className="material-symbols-outlined text-primary-dark">ac_unit</span>
                Central Air Conditioning
              </li>
              <li className="flex items-center gap-3 text-text-main font-body-md">
                <span className="material-symbols-outlined text-primary-dark">coffee_maker</span>
                In-room Coffee Maker
              </li>
            </ul>
            <div className="text-3xl font-headline-md text-primary-dark mb-8">
              ₹3,000 <span className="text-lg font-body-md text-text-secondary">/ night</span>
            </div>
            <a href="#book-room">
              <button className="btn-primary px-10 py-4 font-label-caps text-label-caps uppercase tracking-widest w-full md:w-auto">
                Check Availability
              </button>
            </a>
          </div>
          <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl order-1 md:order-2">
            <img 
              className="w-full h-full object-cover gallery-img" 
              src="https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=1200" 
              alt="Classic Room" 
            />
          </div>
        </div>
      </section>

      {/* Room Booking Form */}
      <section id="book-room" className="py-16 md:py-section-gap bg-surface-dark text-text-light relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center px-margin-mobile">
          <span className="font-label-caps text-label-caps text-gold mb-4 block tracking-widest uppercase">Reservations</span>
          <h2 className="font-headline-md text-headline-md text-text-light mb-8">Book Your Stay</h2>
          <p className="font-body-lg text-text-light/80 mb-12 max-w-2xl mx-auto">
            Plan your visit to Royal Odisha Boutique Stay. Please select your dates and room preference below.
          </p>
          <div className="bg-surface/5 backdrop-blur-md p-8 md:p-12 rounded-xl max-w-2xl mx-auto border border-gold/20 text-left shadow-2xl">
            <form className="space-y-6">
              <div className="space-y-6 mb-6">
                <div>
                  <label className="font-label-caps text-label-caps text-gold block mb-2">FULL NAME</label>
                  <input className="w-full border-b border-text-light/20 focus:border-gold bg-transparent py-2 text-text-light focus:ring-0 outline-none transition-all" placeholder="Your Name" type="text" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-label-caps text-label-caps text-gold block mb-2">EMAIL ADDRESS</label>
                    <input className="w-full border-b border-text-light/20 focus:border-gold bg-transparent py-2 text-text-light focus:ring-0 outline-none transition-all" placeholder="Your Email" type="email" />
                  </div>
                  <div>
                    <label className="font-label-caps text-label-caps text-gold block mb-2">PHONE NUMBER</label>
                    <input className="w-full border-b border-text-light/20 focus:border-gold bg-transparent py-2 text-text-light focus:ring-0 outline-none transition-all" placeholder="+91 00000 00000" type="tel" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-label-caps text-label-caps text-gold block mb-2">CHECK-IN</label>
                  <input className="w-full border-b border-text-light/20 focus:border-gold bg-transparent py-2 text-text-light focus:ring-0 outline-none transition-all" type="date" />
                </div>
                <div>
                  <label className="font-label-caps text-label-caps text-gold block mb-2">CHECK-OUT</label>
                  <input className="w-full border-b border-text-light/20 focus:border-gold bg-transparent py-2 text-text-light focus:ring-0 outline-none transition-all" type="date" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-label-caps text-label-caps text-gold block mb-2">GUESTS</label>
                  <select className="w-full border-b border-text-light/20 focus:border-gold bg-transparent py-2 text-text-light focus:ring-0 outline-none transition-all [&>option]:text-text-main">
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4+ Guests</option>
                  </select>
                </div>
                <div>
                  <label className="font-label-caps text-label-caps text-gold block mb-2">ROOM TYPE</label>
                  <select className="w-full border-b border-text-light/20 focus:border-gold bg-transparent py-2 text-text-light focus:ring-0 outline-none transition-all [&>option]:text-text-main">
                    <option>The Heritage Suite</option>
                    <option>The Classic Room</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-label-caps text-label-caps text-gold block mb-2">SPECIAL REQUESTS</label>
                <textarea className="w-full border-b border-text-light/20 focus:border-gold bg-transparent py-2 text-text-light focus:ring-0 outline-none transition-all resize-none h-10" placeholder="Any special requirements?"></textarea>
              </div>
              <button className="btn-gold w-full py-4 font-label-caps text-label-caps uppercase tracking-widest mt-8">
                Request Booking
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-section-gap bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16">
            <span className="font-label-caps text-label-caps text-primary mb-4 block uppercase tracking-widest">VISUAL JOURNEY</span>
            <h2 className="font-headline-md text-headline-md text-text-main">Room Gallery</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <img className="rounded-xl w-full h-[300px] object-cover gallery-img shadow-lg" alt="Gallery 1" src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800" />
            <img className="rounded-xl w-full h-[300px] object-cover gallery-img shadow-lg" alt="Gallery 2" src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800" />
            <img className="rounded-xl w-full h-[300px] object-cover gallery-img shadow-lg" alt="Gallery 3" src="https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&q=80&w=800" />
          </div>
        </div>
      </section>
    </>
  );
}
