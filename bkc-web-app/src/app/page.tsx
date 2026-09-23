import Link from "next/link";
import BookingForms from "@/components/BookingForms";

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
          <Link href="/menu" className="card group block">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 gallery-img rounded-b-none"
                alt="Signature Hyderabadi Biryani"
                src="/assets/hyderabadi-chicken-dum-biryani.jpg"
              />
            </div>
            <div className="p-8">
              <h3 className="font-headline-sm text-headline-sm text-text-main mb-2">Signature Biryani</h3>
              <p className="font-body-md text-text-secondary line-clamp-2 mb-4">Aromatic Basmati rice layered with premium spices and succulent marinated meat.</p>
              <div className="flex justify-between items-center border-t border-border-custom pt-4">
                <span className="font-label-caps text-label-caps text-primary-dark">Explore Dish</span>
                <span className="material-symbols-outlined text-primary-dark group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </div>
          </Link>
          {/* Dish 2 */}
          <Link href="/menu" className="card group block">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 gallery-img rounded-b-none"
                alt="Drums of Heaven"
                src="/assets/drums-of-heaven.jpg"
              />
            </div>
            <div className="p-8">
              <h3 className="font-headline-sm text-headline-sm text-text-main mb-2">Drums of Heaven</h3>
              <p className="font-body-md text-text-secondary line-clamp-2 mb-4">Crispy chicken lollipops tossed in a rich, tangy Indo-Chinese sauce and fresh spring onions.</p>
              <div className="flex justify-between items-center border-t border-border-custom pt-4">
                <span className="font-label-caps text-label-caps text-primary-dark">Explore Dish</span>
                <span className="material-symbols-outlined text-primary-dark group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </div>
          </Link>
          {/* Dish 3 */}
          <Link href="/menu" className="card group block">
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
                <span className="font-label-caps text-label-caps text-primary-dark">Explore Dish</span>
                <span className="material-symbols-outlined text-primary-dark group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </div>
          </Link>
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

          <BookingForms />
        </div>
      </section>
    </>
  );
}
