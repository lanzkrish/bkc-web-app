import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-text-light py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img alt="Logo" className="h-10 w-10 brightness-0 invert" src="/assets/BKC-nobg.png" />
            <span className="font-headline-sm text-headline-sm text-gold">Bhubaneswar Kitchen n Cafe</span>
          </div>
          <p className="font-label-caps text-label-caps text-primary-light tracking-widest uppercase">
            Fine Dining | Rooms | Events
          </p>
          <p className="font-body-md text-text-light/70 max-w-xs">
            Celebrating the culinary soul of Odisha through premium hospitality, luxury stays, and authentic flavours.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="w-10 h-10 rounded-full border border-text-light/20 flex items-center justify-center hover:text-gold hover:border-gold transition-colors">
              <span className="material-symbols-outlined text-[18px]">public</span>
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full border border-text-light/20 flex items-center justify-center hover:text-gold hover:border-gold transition-colors">
              <span className="material-symbols-outlined text-[18px]">share</span>
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
            <h4 className="font-label-caps text-label-caps text-gold">LEGAL</h4>
            <ul className="space-y-3 font-body-md text-text-light/70">
              <li><Link href="#" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Terms of Service</Link></li>
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
      <div className="mt-20 pt-8 border-t border-text-light/10 text-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <p className="font-body-md text-text-light/50">© 2026 Bhubaneswar Kitchen n Cafe. All rights reserved.</p>
      </div>
    </footer>
  );
}
