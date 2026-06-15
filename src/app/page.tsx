
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-60"
            alt="A cinematic, high-end interior shot of a luxury restaurant in Bhubaneswar at night."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLG7xgbAlOAEdpBGZggn_0G9756iXVd4ToSu6ALLOg1oN8S4ktlao2G4iPj57hl2rr90sW4TCoPpV2DYLuDpPvLEqz8KHOZAd1uh_hvotGlNT1Y8Of3bu8tqAcScMGF3nOu74gPzW7fkMFAFlUy_E6saBEEC4GqZYYTfRJV4yrPfoTraE3UcA_v1I3jc5z9Fk7uKd6bJfGowl4dhMRgqUXGWzH7hFlLULTds3aiqdV78ZHwAHQgnZqTBMunrHqqb8ONZjayqGMActN"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface/20 via-surface/40 to-surface"></div>
        </div>
        <div className="relative z-10 text-center px-margin-mobile max-w-4xl mx-auto">
          <span className="font-label-caps text-label-caps text-primary mb-6 block tracking-[0.3em] uppercase">Elegance in Every Bite</span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-8 text-on-surface leading-tight">
            Experience Authentic <br /> Flavours in Bhubaneswar
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12">
            A premium family dining experience celebrating the rich heritage of Odia cuisine and signature biryanis, served in a space defined by quiet luxury.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link href="/book-a-table" className="w-full md:w-auto">
              <button className="bg-primary-container text-on-primary-container px-10 py-5 rounded-lg font-label-caps text-label-caps hover:scale-105 transition-transform duration-200 active:scale-95 gold-glow w-full">
                Book a Table
              </button>
            </Link>
            <Link href="/contact-us" className="w-full md:w-auto">
              <button className="border border-primary text-primary px-10 py-5 rounded-lg font-label-caps text-label-caps hover:bg-primary/10 transition-colors duration-200 w-full flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[20px]">chat</span>
                Chat on WhatsApp
              </button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <span className="material-symbols-outlined text-on-surface text-3xl">keyboard_double_arrow_down</span>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-16 md:py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center mb-24">
          <span className="font-label-caps text-label-caps text-primary mb-4 block tracking-widest">OUR SPECIALTIES</span>
          <h2 className="font-headline-md text-headline-md text-on-surface">Signature Culinary Creations</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Dish 1 */}
          <div className="group relative overflow-hidden rounded-xl bg-surface-container-high transition-all duration-500 hover:-translate-y-4">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="Signature Hyderabadi Biryani"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoQQMuZIQ1ipkQWR4fnWJ01CnKjBCN2joMEI67pmegINZoMASuQe9WqNUjAumyx2VyWOQL-V2MAqAhiwcLSJq1mu6GkA_3QAt4ZzQ2FiLpe36rLfJ8q8aIJFN3BhoO1BCBubKz-JWWlhD_nruA4Wo8KFFfO0av7wmfd9rx9UgVe4DCNb8aQ-h0pFpnVv67MLSJW4rc6_-297dquYwNFZrM4tcrOqHXp62Gw_h4Xfs7-q6eWyzmcjgiPfcVY3tzKjihAH-RyLPK0KMp"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Signature Biryani</h3>
              <p className="font-body-md text-on-surface-variant line-clamp-2 mb-4">Aromatic Basmati rice layered with premium spices and succulent marinated meat.</p>
              <div className="flex justify-between items-center border-t border-white/10 pt-4">
                <span className="font-label-caps text-label-caps text-primary">₹549</span>
                <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </div>
          </div>
          {/* Dish 2 */}
          <div className="group relative overflow-hidden rounded-xl bg-surface-container-high transition-all duration-500 hover:-translate-y-4">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="Traditional Odia Dalma"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDn-GdzhOQAuVjpCvCkjs3wtqzrBIpHe7Rcz-dP06y_AuxtifXq0Myj-e8mcbRJfqm4lFIa8RpL4HWCQSMJLPF8NaH1RJkhm5k4nBLwNZw4Xr8na8NGtL13MkZeqjbGX5V4_Cid1-TPRoQ6_4epFe_j1maMqvdrY7bFAz84mF1PjbDj3lRZIcrePHBBaFVGzkXvjAWe92OjqWIIPX9C88etx5U8L_c7SvhE52YvENFkubdFhNLquocT6_5jj8o71ykLrZoFW7DcDMYT"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Traditional Dalma</h3>
              <p className="font-body-md text-on-surface-variant line-clamp-2 mb-4">The soul of Odisha: Nutritious lentils cooked with garden-fresh vegetables and local spices.</p>
              <div className="flex justify-between items-center border-t border-white/10 pt-4">
                <span className="font-label-caps text-label-caps text-primary">₹299</span>
                <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </div>
          </div>
          {/* Dish 3 */}
          <div className="group relative overflow-hidden rounded-xl bg-surface-container-high transition-all duration-500 hover:-translate-y-4">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="Pakhala Thali"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_2T9sLQzPgyhJQecVt9gX4Biq7cVxintpn00CspjJsEoTX_glEU8AQEIcBEMDLKzvET0-pM8EKU8bauBb18sRPOXiunhW58ztn5HiL1WkaK-f3s_uGEigsXGOl3txGUcU4op5p5U9EBdSyywByu2cSbAynkekCRde8AQOVtSQ48RQWtLfXVvOo2wv6myh4trCBf3QY82_BzLweDjyyhGcwoFI3ZF2sWcv-p4ZEiZBxAsrqCBW2itTn6UjsJAUn17VQjB1rOjUw47e"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Pakhala Thali</h3>
              <p className="font-body-md text-on-surface-variant line-clamp-2 mb-4">The ultimate summer comfort: Fermented rice served with a curated assortment of roasted sides.</p>
              <div className="flex justify-between items-center border-t border-white/10 pt-4">
                <span className="font-label-caps text-label-caps text-primary">₹449</span>
                <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-section-gap bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1">
            <span className="font-label-caps text-label-caps text-primary mb-6 block">OUR STORY</span>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-8 leading-tight">Tradition Meets Modern Hospitality</h2>
            <div className="space-y-6">
              <p className="font-body-lg text-on-surface-variant">
                Rooted in the heart of Odisha&apos;s capital, Bhubaneswar Kitchen n Cafe was born from a desire to preserve the vanishing art of authentic Odia cooking while elevating it for a modern palate.
              </p>
              <p className="font-body-lg text-on-surface-variant">
                Our chefs bridge the gap between ancestral recipes passed down through generations and contemporary culinary techniques. Every grain of rice and every pinch of spice is sourced ethically to ensure we honor the heritage we represent.
              </p>
            </div>
            <div className="mt-12 flex items-center gap-8">
              <div>
                <span className="block font-headline-sm text-primary">15+</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">Years of Heritage</span>
              </div>
              <div className="w-px h-12 bg-on-surface/10"></div>
              <div>
                <span className="block font-headline-sm text-primary">50+</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">Authentic Recipes</span>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative group">
              <div className="absolute -inset-4 border border-primary/20 rounded-xl group-hover:inset-0 transition-all duration-500"></div>
              <img
                className="relative rounded-lg w-full h-[600px] object-cover"
                alt="A premium wide-angle shot of the restaurant's interior."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbs7aWG73tjjOeZgZTylH_BoMudhfnUraCWstltVJD5y8Xbb0IszHZL5CVOAmnLDupyOFaLBc6heq8obMuKLx4rl3SXHCnuANfR7vLiMQl0nYben_FyQAb7ISJyFjPNjg6_rR5SLzrovcANNfAPE3CauMevxw6zciDe81gdXxQZUWbT6sSUdsxymLeMyAIMZbvyNbjDw24IT5QV-r5IxvL-rgHahrwweZlXAhvsLATFcd52HWw-rIWSnxhb46JgwzDRJi-bkOtb6tg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-headline-md text-headline-md text-on-surface">The Kitchen Experience</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          <div className="p-10 bg-surface-container rounded-xl border border-white/5 hover:border-primary/30 transition-colors text-center group">
            <span className="material-symbols-outlined text-4xl text-primary mb-6 block group-hover:scale-110 transition-transform">family_restroom</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4">Family Dining</h3>
            <p className="text-on-surface-variant">Spacious, comfortable seating designed for meaningful family conversations.</p>
          </div>
          <div className="p-10 bg-surface-container rounded-xl border border-white/5 hover:border-primary/30 transition-colors text-center group">
            <span className="material-symbols-outlined text-4xl text-primary mb-6 block group-hover:scale-110 transition-transform">restaurant_menu</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4">Authentic Flavours</h3>
            <p className="text-on-surface-variant">Uncompromised traditional recipes and the finest locally sourced ingredients.</p>
          </div>
          <div className="p-10 bg-surface-container rounded-xl border border-white/5 hover:border-primary/30 transition-colors text-center group">
            <span className="material-symbols-outlined text-4xl text-primary mb-6 block group-hover:scale-110 transition-transform">spa</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4">Premium Ambience</h3>
            <p className="text-on-surface-variant">A minimalist aesthetic that provides a sanctuary from the urban rush.</p>
          </div>
          <div className="p-10 bg-surface-container rounded-xl border border-white/5 hover:border-primary/30 transition-colors text-center group">
            <span className="material-symbols-outlined text-4xl text-primary mb-6 block group-hover:scale-110 transition-transform">bolt</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4">Quick Service</h3>
            <p className="text-on-surface-variant">Seamless hospitality and efficient service without compromising quality.</p>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 md:py-section-gap bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="font-label-caps text-label-caps text-primary mb-4 block">VISUAL JOURNEY</span>
              <h2 className="font-headline-md text-headline-md text-on-surface">Gallery of Delights</h2>
            </div>
            <button className="font-label-caps text-label-caps text-primary border-b border-primary hover:pb-1 transition-all">View All Moments</button>
          </div>
          <div className="masonry">
            <div className="masonry-item">
              <img className="rounded-lg w-full object-cover" alt="Gallery item" src="/assets/BKC-nobg.png" />
            </div>
            <div className="masonry-item">
              <img className="rounded-lg w-full object-cover" alt="Gallery item" src="/assets/BKC-nobg.png" />
            </div>
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="py-16 md:py-section-gap relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover grayscale brightness-50"
            alt="Table setting"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ-6IOr7gPsRwF4kqKKecYwsV2vpA5FMMNXEsW7FR6K-cze_3mMlaO2kPDHLf6SMCO-znJecxUMBcRaLgJSEw0pyT4NcUCUwRLphaDxIR_ayK3X0rkK3aCAa-HIjsKlf93qs4GIZ0_PdnHD5wN404vfNP1umfZUZFmh3HJQtUQ-Lq6rUUe3Hq_6VWgcEkdWA_sjpeVfGQFQQ7N7ZJ58PQN1UG_I_IjVplX9LTOGqCnQflhb-fFmK3blO8Tt8gclXlFpd9VYnTcUlVt"
          />
          <div className="absolute inset-0 bg-primary/10"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-margin-mobile">
          <h2 className="font-display-lg text-display-lg-mobile md:text-headline-md text-on-surface mb-8">Reserve Your Table Today</h2>
          <p className="font-body-lg text-on-surface/80 mb-12 max-w-2xl mx-auto">
            Join us for an unforgettable evening where every detail is crafted for your comfort and every flavour tells a story of Odisha.
          </p>
          <div className="glass-effect p-8 rounded-xl max-w-md mx-auto">
            <form className="space-y-6 text-left">
              <div>
                <label className="font-label-caps text-label-caps text-primary block mb-2">DATE</label>
                <input className="w-full bg-surface-container border-b border-primary/30 focus:border-primary bg-transparent py-2 text-on-surface focus:ring-0 outline-none transition-all" type="date" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="font-label-caps text-label-caps text-primary block mb-2">GUESTS</label>
                  <select className="w-full bg-surface-container border-b border-primary/30 focus:border-primary bg-transparent py-2 text-on-surface focus:ring-0 outline-none transition-all">
                    <option>2 Persons</option>
                    <option>4 Persons</option>
                    <option>6+ Persons</option>
                  </select>
                </div>
                <div>
                  <label className="font-label-caps text-label-caps text-primary block mb-2">TIME</label>
                  <select className="w-full bg-surface-container border-b border-primary/30 focus:border-primary bg-transparent py-2 text-on-surface focus:ring-0 outline-none transition-all">
                    <option>07:00 PM</option>
                    <option>08:00 PM</option>
                    <option>09:00 PM</option>
                  </select>
                </div>
              </div>
              <button className="w-full bg-primary-container text-on-primary-container py-4 rounded-lg font-label-caps text-label-caps hover:scale-[1.02] active:scale-[0.98] transition-transform gold-glow">
                Confirm Reservation
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
