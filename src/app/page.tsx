import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            alt="A cinematic, high-end interior shot of a luxury restaurant in Bhubaneswar at night."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLG7xgbAlOAEdpBGZggn_0G9756iXVd4ToSu6ALLOg1oN8S4ktlao2G4iPj57hl2rr90sW4TCoPpV2DYLuDpPvLEqz8KHOZAd1uh_hvotGlNT1Y8Of3bu8tqAcScMGF3nOu74gPzW7fkMFAFlUy_E6saBEEC4GqZYYTfRJV4yrPfoTraE3UcA_v1I3jc5z9Fk7uKd6bJfGowl4dhMRgqUXGWzH7hFlLULTds3aiqdV78ZHwAHQgnZqTBMunrHqqb8ONZjayqGMActN"
          />
          <div 
            className="absolute inset-0"
            style={{ background: 'linear-gradient(rgba(43,30,26,0.65), rgba(43,30,26,0.45))' }}
          ></div>
        </div>
        <div className="relative z-10 text-center px-margin-mobile max-w-4xl mx-auto text-text-light">
          <span className="font-label-caps text-label-caps text-gold mb-6 block tracking-[0.3em] uppercase">
            Fine Dining • Rooms • Celebration
          </span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-8 leading-tight text-white">
            Experience Comfort, Taste & Luxury Together
          </h1>
          <p className="font-body-lg text-body-lg text-text-light/80 max-w-2xl mx-auto mb-12">
            A premium boutique resort and family dining experience celebrating the rich heritage of Odia hospitality, served in a space defined by quiet luxury.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link href="/rooms" className="w-full md:w-auto">
              <button className="btn-primary px-10 py-5 w-full font-label-caps text-label-caps uppercase tracking-widest">
                Book a Room
              </button>
            </Link>
            <Link href="/book-a-table" className="w-full md:w-auto">
              <button className="border border-gold text-gold px-10 py-5 rounded-full font-label-caps text-label-caps hover:bg-gold/10 transition-colors duration-200 w-full uppercase tracking-widest">
                Reserve a Table
              </button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 text-text-light">
          <span className="material-symbols-outlined text-3xl">keyboard_double_arrow_down</span>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-16 md:py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto bg-background">
        <div className="text-center mb-24">
          <span className="font-label-caps text-label-caps text-primary mb-4 block tracking-widest uppercase">OUR SPECIALTIES</span>
          <h2 className="font-headline-md text-headline-md text-text-main">Signature Culinary Creations</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Dish 1 */}
          <div className="card group">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 gallery-img rounded-b-none"
                alt="Signature Hyderabadi Biryani"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoQQMuZIQ1ipkQWR4fnWJ01CnKjBCN2joMEI67pmegINZoMASuQe9WqNUjAumyx2VyWOQL-V2MAqAhiwcLSJq1mu6GkA_3QAt4ZzQ2FiLpe36rLfJ8q8aIJFN3BhoO1BCBubKz-JWWlhD_nruA4Wo8KFFfO0av7wmfd9rx9UgVe4DCNb8aQ-h0pFpnVv67MLSJW4rc6_-297dquYwNFZrM4tcrOqHXp62Gw_h4Xfs7-q6eWyzmcjgiPfcVY3tzKjihAH-RyLPK0KMp"
              />
            </div>
            <div className="p-8">
              <h3 className="font-headline-sm text-headline-sm text-text-main mb-2">Signature Biryani</h3>
              <p className="font-body-md text-text-secondary line-clamp-2 mb-4">Aromatic Basmati rice layered with premium spices and succulent marinated meat.</p>
              <div className="flex justify-between items-center border-t border-border-custom pt-4">
                <span className="font-label-caps text-label-caps text-primary-dark">₹549</span>
                <span className="material-symbols-outlined text-primary-dark group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </div>
          </div>
          {/* Dish 2 */}
          <div className="card group">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 gallery-img rounded-b-none"
                alt="Traditional Odia Dalma"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDn-GdzhOQAuVjpCvCkjs3wtqzrBIpHe7Rcz-dP06y_AuxtifXq0Myj-e8mcbRJfqm4lFIa8RpL4HWCQSMJLPF8NaH1RJkhm5k4nBLwNZw4Xr8na8NGtL13MkZeqjbGX5V4_Cid1-TPRoQ6_4epFe_j1maMqvdrY7bFAz84mF1PjbDj3lRZIcrePHBBaFVGzkXvjAWe92OjqWIIPX9C88etx5U8L_c7SvhE52YvENFkubdFhNLquocT6_5jj8o71ykLrZoFW7DcDMYT"
              />
            </div>
            <div className="p-8">
              <h3 className="font-headline-sm text-headline-sm text-text-main mb-2">Traditional Dalma</h3>
              <p className="font-body-md text-text-secondary line-clamp-2 mb-4">The soul of Odisha: Nutritious lentils cooked with garden-fresh vegetables and local spices.</p>
              <div className="flex justify-between items-center border-t border-border-custom pt-4">
                <span className="font-label-caps text-label-caps text-primary-dark">₹299</span>
                <span className="material-symbols-outlined text-primary-dark group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </div>
          </div>
          {/* Dish 3 */}
          <div className="card group">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 gallery-img rounded-b-none"
                alt="Pakhala Thali"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_2T9sLQzPgyhJQecVt9gX4Biq7cVxintpn00CspjJsEoTX_glEU8AQEIcBEMDLKzvET0-pM8EKU8bauBb18sRPOXiunhW58ztn5HiL1WkaK-f3s_uGEigsXGOl3txGUcU4op5p5U9EBdSyywByu2cSbAynkekCRde8AQOVtSQ48RQWtLfXVvOo2wv6myh4trCBf3QY82_BzLweDjyyhGcwoFI3ZF2sWcv-p4ZEiZBxAsrqCBW2itTn6UjsJAUn17VQjB1rOjUw47e"
              />
            </div>
            <div className="p-8">
              <h3 className="font-headline-sm text-headline-sm text-text-main mb-2">Pakhala Thali</h3>
              <p className="font-body-md text-text-secondary line-clamp-2 mb-4">The ultimate summer comfort: Fermented rice served with a curated assortment of roasted sides.</p>
              <div className="flex justify-between items-center border-t border-border-custom pt-4">
                <span className="font-label-caps text-label-caps text-primary-dark">₹449</span>
                <span className="material-symbols-outlined text-primary-dark group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-section-gap bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1">
            <span className="font-label-caps text-label-caps text-primary mb-6 block uppercase">OUR STORY</span>
            <h2 className="font-headline-md text-headline-md text-text-main mb-8 leading-tight">Tradition Meets Modern Hospitality</h2>
            <div className="space-y-6">
              <p className="font-body-lg text-text-secondary">
                Rooted in the heart of Odisha&apos;s capital, The Grand Aroma Boutique Dining & Stay was born from a desire to preserve the vanishing art of authentic Odia hospitality while elevating it for a modern palate.
              </p>
              <p className="font-body-lg text-text-secondary">
                We bridge the gap between ancestral heritage and contemporary luxury. Every detail, from our premium AC rooms to our signature recipes, is meticulously crafted to ensure we honor the royal culture we represent.
              </p>
            </div>
            <div className="mt-12 flex items-center gap-8">
              <div>
                <span className="block font-headline-sm text-primary">15+</span>
                <span className="font-label-caps text-label-caps text-text-secondary uppercase">Years of Heritage</span>
              </div>
              <div className="w-px h-12 bg-border-custom"></div>
              <div>
                <span className="block font-headline-sm text-primary">Premium</span>
                <span className="font-label-caps text-label-caps text-text-secondary uppercase">Boutique Stay</span>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative group">
              <div className="absolute -inset-4 border border-gold rounded-xl group-hover:inset-0 transition-all duration-500"></div>
              <img
                className="relative rounded-lg w-full h-[600px] object-cover gallery-img"
                alt="A premium wide-angle shot of the restaurant's interior."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbs7aWG73tjjOeZgZTylH_BoMudhfnUraCWstltVJD5y8Xbb0IszHZL5CVOAmnLDupyOFaLBc6heq8obMuKLx4rl3SXHCnuANfR7vLiMQl0nYben_FyQAb7ISJyFjPNjg6_rR5SLzrovcANNfAPE3CauMevxw6zciDe81gdXxQZUWbT6sSUdsxymLeMyAIMZbvyNbjDw24IT5QV-r5IxvL-rgHahrwweZlXAhvsLATFcd52HWw-rIWSnxhb46JgwzDRJi-bkOtb6tg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Combined Reservations Section */}
      <section className="py-16 md:py-section-gap relative overflow-hidden bg-background">
        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <span className="font-label-caps text-label-caps text-primary mb-4 block tracking-widest uppercase">Experience & Stay</span>
          <h2 className="font-headline-md text-headline-md text-text-main mb-8">Make a Reservation</h2>
          <p className="font-body-lg text-text-secondary mb-16 max-w-2xl mx-auto">
            Whether you are joining us for an unforgettable dining experience or seeking a luxurious stay, we look forward to welcoming you.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Table Booking Card */}
            <div className="card p-8 md:p-12 text-left">
              <h3 className="font-headline-sm text-headline-sm text-text-main mb-8 text-center">Reserve a Table</h3>
              <form className="space-y-6">
                <div>
                  <label className="font-label-caps text-label-caps text-primary-dark block mb-2">FULL NAME</label>
                  <input className="w-full border-b border-border-custom focus:border-primary bg-transparent py-2 text-text-main focus:ring-0 outline-none transition-all" placeholder="Your Name" type="text" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-label-caps text-label-caps text-primary-dark block mb-2">EMAIL ADDRESS</label>
                    <input className="w-full border-b border-border-custom focus:border-primary bg-transparent py-2 text-text-main focus:ring-0 outline-none transition-all" placeholder="Your Email" type="email" />
                  </div>
                  <div>
                    <label className="font-label-caps text-label-caps text-primary-dark block mb-2">PHONE NUMBER</label>
                    <input className="w-full border-b border-border-custom focus:border-primary bg-transparent py-2 text-text-main focus:ring-0 outline-none transition-all" placeholder="+91 00000 00000" type="tel" />
                  </div>
                </div>
                <div>
                  <label className="font-label-caps text-label-caps text-primary-dark block mb-2">DATE</label>
                  <input className="w-full border-b border-border-custom focus:border-primary bg-transparent py-2 text-text-main focus:ring-0 outline-none transition-all" type="date" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-label-caps text-label-caps text-primary-dark block mb-2">GUESTS</label>
                    <select className="w-full border-b border-border-custom focus:border-primary bg-transparent py-2 text-text-main focus:ring-0 outline-none transition-all">
                      <option>2 Persons</option>
                      <option>4 Persons</option>
                      <option>6+ Persons</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-label-caps text-label-caps text-primary-dark block mb-2">TIME</label>
                    <select className="w-full border-b border-border-custom focus:border-primary bg-transparent py-2 text-text-main focus:ring-0 outline-none transition-all">
                      <option>07:00 PM</option>
                      <option>08:00 PM</option>
                      <option>09:00 PM</option>
                    </select>
                  </div>
                </div>
                <div className="pt-4">
                  <button className="btn-primary w-full py-4 font-label-caps text-label-caps uppercase tracking-widest">
                    Confirm Table
                  </button>
                </div>
              </form>
            </div>

            {/* Room Booking Card */}
            <div className="card p-8 md:p-12 text-left bg-surface-dark border-gold/20 shadow-2xl">
              <h3 className="font-headline-sm text-headline-sm text-gold mb-8 text-center">Book a Room</h3>
              <form className="space-y-6">
                <div>
                  <label className="font-label-caps text-label-caps text-gold block mb-2">FULL NAME</label>
                  <input className="w-full border-b border-border-custom focus:border-gold bg-transparent py-2 text-text-main focus:ring-0 outline-none transition-all" placeholder="Your Name" type="text" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-label-caps text-label-caps text-gold block mb-2">EMAIL ADDRESS</label>
                    <input className="w-full border-b border-border-custom focus:border-gold bg-transparent py-2 text-text-main focus:ring-0 outline-none transition-all" placeholder="Your Email" type="email" />
                  </div>
                  <div>
                    <label className="font-label-caps text-label-caps text-gold block mb-2">PHONE NUMBER</label>
                    <input className="w-full border-b border-border-custom focus:border-gold bg-transparent py-2 text-text-main focus:ring-0 outline-none transition-all" placeholder="+91 00000 00000" type="tel" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-label-caps text-label-caps text-gold block mb-2">CHECK-IN</label>
                    <input className="w-full border-b border-border-custom focus:border-gold bg-transparent py-2 text-text-main focus:ring-0 outline-none transition-all" type="date" />
                  </div>
                  <div>
                    <label className="font-label-caps text-label-caps text-gold block mb-2">CHECK-OUT</label>
                    <input className="w-full border-b border-border-custom focus:border-gold bg-transparent py-2 text-text-main focus:ring-0 outline-none transition-all" type="date" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-label-caps text-label-caps text-gold block mb-2">GUESTS</label>
                    <select className="w-full border-b border-border-custom focus:border-gold bg-transparent py-2 text-text-main focus:ring-0 outline-none transition-all [&>option]:text-text-main">
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 Guests</option>
                      <option>4+ Guests</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-label-caps text-label-caps text-gold block mb-2">ROOM TYPE</label>
                    <select className="w-full border-b border-border-custom focus:border-gold bg-transparent py-2 text-text-main focus:ring-0 outline-none transition-all [&>option]:text-text-main">
                      <option>The Heritage Suite</option>
                      <option>The Classic Room</option>
                    </select>
                  </div>
                </div>
                <div className="pt-4">
                  <button className="btn-gold w-full py-4 font-label-caps text-label-caps uppercase tracking-widest text-text-main">
                    Request Room
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
