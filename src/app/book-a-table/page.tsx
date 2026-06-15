import Image from "next/image";

export default function BookATablePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0B0B0B]"></div>
          <img
            className="w-full h-full object-cover"
            alt="Cinematic restaurant interior at night"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZADWAkB1pbu97KsWekkeJGDJZWr5jotVqzdCTuh0FDn--RNsfqxaaJZZaXkyWCOFqRlGAU-XwLRG2nh-qm6J8YbSdp9cWdx4GSSnq8_Vwe0UqUBumjjvIBG_uGuwbE53SS_U5iPMmhPq5REcTq-KXwsGyM4XmSwmm55WROFH2akGr0_knuhWQRKpR_dcBQok-NMKKN_Xno0HcQGQSoBsrYNVrfANGuAvS4FrUjhpuSg2qkIi2oclXyxSDcQ0YAhJ8CoLtO52NZBTi"
          />
        </div>
        <div className="relative z-10 text-center px-margin-mobile">
          <span className="font-label-caps text-label-caps text-primary mb-6 block tracking-[0.3em]">ESTABLISHED 2024</span>
          <h1 className="font-display-lg text-display-lg md:text-display-lg text-on-surface max-w-4xl mx-auto">Reserve Your Table</h1>
          <div className="w-24 h-[1px] bg-primary mx-auto mt-8 opacity-50"></div>
        </div>
      </section>

      {/* Reservation Content */}
      <section className="py-16 md:py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Information Column */}
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-6">
            <h2 className="font-headline-md text-headline-md">An Atmosphere of Refinement</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
              Experience the art of fine dining in the heart of Bhubaneswar. Our reservations are held for 15 minutes. For parties larger than 8, please contact our concierge directly.
            </p>
          </div>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <span className="material-symbols-outlined text-primary text-3xl">restaurant_menu</span>
              <div>
                <h4 className="font-label-caps text-label-caps text-primary mb-2">CULINARY EXCELLENCE</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">Chef-curated seasonal menus inspired by local heritage and global techniques.</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <span className="material-symbols-outlined text-primary text-3xl">event_seat</span>
              <div>
                <h4 className="font-label-caps text-label-caps text-primary mb-2">PRIVATE DINING</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">Exclusive spaces available for corporate gatherings and intimate celebrations.</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
              <div>
                <h4 className="font-label-caps text-label-caps text-primary mb-2">WHATSAPP CONFIRMATION</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">Receive instant updates and confirmation details via your registered WhatsApp number.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Form Column */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-10 md:p-16 rounded-sm gold-glow">
            <form className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {/* Date */}
                <div className="space-y-2">
                  <label className="font-label-caps text-[10px] text-on-surface-variant/70 uppercase">Date</label>
                  <input className="w-full bg-transparent border-none p-0 py-2 font-body-lg text-on-surface input-underline" type="date" />
                </div>
                {/* Time */}
                <div className="space-y-2">
                  <label className="font-label-caps text-[10px] text-on-surface-variant/70 uppercase">Time</label>
                  <select className="w-full bg-transparent border-none p-0 py-2 font-body-lg text-on-surface input-underline appearance-none">
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
                  <input className="w-full bg-transparent border-none p-0 py-2 font-body-lg text-on-surface input-underline" placeholder="Number of Guests" type="number" />
                </div>
                {/* Occasion */}
                <div className="space-y-2">
                  <label className="font-label-caps text-[10px] text-on-surface-variant/70 uppercase">Occasion</label>
                  <select className="w-full bg-transparent border-none p-0 py-2 font-body-lg text-on-surface input-underline appearance-none">
                    <option className="bg-surface">Casual</option>
                    <option className="bg-surface">Birthday</option>
                    <option className="bg-surface">Anniversary</option>
                    <option className="bg-surface">Corporate</option>
                  </select>
                </div>
                {/* Name */}
                <div className="space-y-2 md:col-span-2">
                  <label className="font-label-caps text-[10px] text-on-surface-variant/70 uppercase">Full Name</label>
                  <input className="w-full bg-transparent border-none p-0 py-2 font-body-lg text-on-surface input-underline" placeholder="Your Name" type="text" />
                </div>
                {/* Phone */}
                <div className="space-y-2 md:col-span-2">
                  <label className="font-label-caps text-[10px] text-on-surface-variant/70 uppercase">Phone Number</label>
                  <input className="w-full bg-transparent border-none p-0 py-2 font-body-lg text-on-surface input-underline" placeholder="+91 00000 00000" type="tel" />
                </div>
              </div>
              <div className="pt-6">
                <button className="w-full bg-primary text-on-secondary-fixed py-5 font-label-caps text-label-caps tracking-[0.2em] hover:bg-primary/90 transition-all duration-300 rounded-sm" type="submit">
                  REQUEST RESERVATION
                </button>
                <p className="text-center mt-6 font-label-caps text-[10px] text-on-surface-variant/50">
                  * NOTE: YOUR RESERVATION WILL BE CONFIRMED VIA WHATSAPP.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Aesthetic Gallery Accent */}
      <section className="pb-16 md:pb-section-gap px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div className="h-[400px] overflow-hidden">
            <img className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out" alt="Gourmet dish" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2GU84Lf2d9r8359l1OQhWMT5HF6dxt3GCEOPsdFpewV9WTd5dQ9Y6nGe5apvkaTaT90rS2jEcnSL73ERparALRvA3LGMdXeYOfRJ8VUfW7HxCPHgFrGxAiStcjnrRyT_NQOH5di04gH02aoi5rbSU8sBFHBep8tkNVUJhKM8g1mHh1wQiH4dV_1yb5rsiH9iyPsFJIKCJ9W_hylQbr4Slzb3WRbU7yzzue_R7_vpbEPhMWh1oM5nnlEnNDeqdXLl9xR5FIa0JDV2L" />
          </div>
          <div className="h-[400px] overflow-hidden md:mt-12">
            <img className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out" alt="Luxury cocktail" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADtL4CMGMMdCoZZT_Z_ThDGUpfngj2q_CI-gDSIhFIpTAAt0pMOkDQ4M1EiGqq3IorWMg8O7aNXioGmY47loQEPaeNmY61-f68PWc7Kv6sd6OrdDKvPG8r7DT22AOAvtY3N0IHNlvxT0EzQgO0zabKLKQPuhymLolfPlEFP7Evq8lSmeHeXX4xRP9lAX1ue8ae2S-gI5cXxk6_KQpXvdSKb3Hffuu2fJTS5L5SIypIGi72hc-fiXtAiNqU9fAuE8zAdn5CHP9VSTbQ" />
          </div>
          <div className="h-[400px] overflow-hidden">
            <img className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out" alt="Cafe exterior" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLbLdAQscBdAuGuXFkxbfU3VhkyVzc4eycRQult9JE4H2FPNStlyavYIKLyAZlGtNMs-34V6iuttPVDa_3cvO-CWJ612X0XBWnXshDUPmk2W4pdWSWzxitsG4afRFBn59JgBhFiOQF2FpxI-aL3LBykEHMyfbkg8asQtdRdWzsfvxCWfJ5xbPEN6x6MQ_4rEtX70BGp6rSF7isNyqQUMfCKBIyx4njTX-edmeAD6Q_nZoEkSpm30jCnbp6g-4V05OigY88zCIyIOfD" />
          </div>
        </div>
      </section>
    </>
  );
}
