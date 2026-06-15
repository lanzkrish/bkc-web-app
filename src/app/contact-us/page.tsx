

export default function ContactUsPage() {
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
                <a className="w-10 h-10 flex items-center justify-center border border-on-surface/10 hover:border-primary hover:text-primary transition-all duration-300" href="#">
                  <span className="font-label-caps text-label-caps">FB</span>
                </a>
                <a className="w-10 h-10 flex items-center justify-center border border-on-surface/10 hover:border-primary hover:text-primary transition-all duration-300" href="#">
                  <span className="font-label-caps text-label-caps">IG</span>
                </a>
                <a className="w-10 h-10 flex items-center justify-center border border-on-surface/10 hover:border-primary hover:text-primary transition-all duration-300" href="#">
                  <span className="font-label-caps text-label-caps">TW</span>
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
          <form className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Name</label>
                <input className="w-full bg-transparent border-b border-on-surface/10 py-4 font-body-lg text-body-lg focus:border-primary transition-all placeholder:text-on-surface/20" placeholder="Your Name" type="text" />
              </div>
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Email</label>
                <input className="w-full bg-transparent border-b border-on-surface/10 py-4 font-body-lg text-body-lg focus:border-primary transition-all placeholder:text-on-surface/20" placeholder="Your Email" type="email" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Message</label>
              <textarea className="w-full bg-transparent border-b border-on-surface/10 py-4 font-body-lg text-body-lg focus:border-primary transition-all placeholder:text-on-surface/20 resize-none" placeholder="How can we help you?" rows={4}></textarea>
            </div>
            <div className="flex justify-center">
              <button className="bg-primary text-on-primary-fixed px-12 py-4 rounded-sm font-label-caps text-label-caps tracking-widest hover:scale-105 active:scale-95 transition-all duration-300" type="submit">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
