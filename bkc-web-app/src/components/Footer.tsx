import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-text-light py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img alt="Logo" className="h-10 w-10 brightness-0 invert" src="/assets/BKC-nobg.png" />
            <span className="font-headline-sm text-headline-sm text-gold tracking-wide">BHUBANESWAR KITCHEN & CAFE</span>
          </div>
          <p className="font-label-caps text-label-caps text-primary-light tracking-widest uppercase">
            Fine Dining | Rooms | Events
          </p>
          <p className="font-body-md text-text-light/70 max-w-xs">
            Celebrating the culinary soul of Odisha through premium hospitality, luxury stays, and authentic flavours.
          </p>
          <div className="pt-1">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-gold/20 font-label-caps text-xs tracking-wider text-text-light/90">
              <span className="text-gold font-semibold">GSTIN:</span> 21KDMPS2101B1Z1
            </span>
          </div>
          <div className="flex gap-4 pt-2">
            <Link href="https://www.instagram.com/bhubaneswarkitchenn/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-text-light/20 flex items-center justify-center hover:text-gold hover:border-gold transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-label-caps text-label-caps text-gold">EXPLORE</h4>
            <ul className="space-y-3 font-body-md text-text-light/70">
              <li><Link href="/menu" className="hover:text-gold transition-colors">Restaurant</Link></li>
              <li><Link href="/menu/full" className="hover:text-gold transition-colors">Full Menu</Link></li>
              <li><Link href="/rooms" className="hover:text-gold transition-colors">Rooms & Stay</Link></li>
              <li><Link href="/gallery" className="hover:text-gold transition-colors">Gallery</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Events</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-label-caps text-label-caps text-gold">LEGAL & TAX</h4>
            <ul className="space-y-3 font-body-md text-text-light/70">
              <li><Link href="#" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Terms of Service</Link></li>
              <li className="pt-2 text-xs space-y-1">
                <span className="block text-gold font-medium">GST Registered:</span>
                <span className="font-mono text-text-light/90 block">21KDMPS2101B1Z1</span>
                <span className="text-text-light/50 text-[11px] block">Prop. PRAMOD KUMAR SAHU</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="space-y-6">
          <h4 className="font-label-caps text-label-caps text-gold">LOCATION & HOURS</h4>
          <div className="space-y-3 text-text-light/70 font-body-md">
            <p className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary-light text-[20px]">location_on</span>
              <span>Plot no- 99, beside indian oil petrol pump, <br /> Sector A, Rasulgarh, Bhubaneswar, Odisha 751010</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-light text-[20px]">phone</span>
              <span>083398 88901</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-light text-[20px]">mail</span>
              <span>hello@bhubaneswarkitchen.com</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary-light text-[20px]">schedule</span>
              <span>Mon - Sun: 11 am – 11:30 pm</span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-20 pt-8 border-t border-text-light/10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p className="font-body-md text-text-light/50">© 2026 BHUBANESWAR KITCHEN & CAFE. All rights reserved.</p>
        <p className="font-body-md text-text-light/60 text-sm">
          <span className="text-gold font-medium">GSTIN:</span> 21KDMPS2101B1Z1
        </p>
      </div>
    </footer>
  );
}
