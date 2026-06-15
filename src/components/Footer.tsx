import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-on-surface/5 py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img alt="Logo" className="h-10 w-10" src="/assets/BKC-nobg.png" />
            <span className="font-headline-sm text-headline-sm text-primary">Bhubaneswar Kitchen n Cafe</span>
          </div>
          <p className="font-body-md text-on-surface-variant max-w-xs">
            Celebrating the culinary soul of Odisha through premium hospitality and authentic flavours.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="w-10 h-10 rounded-full border border-on-surface/10 flex items-center justify-center hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[18px]">public</span>
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full border border-on-surface/10 flex items-center justify-center hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[18px]">share</span>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-label-caps text-label-caps text-on-surface">EXPLORE</h4>
            <ul className="space-y-3 font-body-md text-on-surface-variant">
              <li><Link href="/menu" className="hover:text-primary transition-colors">Menu</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Catering</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-label-caps text-label-caps text-on-surface">LEGAL</h4>
            <ul className="space-y-3 font-body-md text-on-surface-variant">
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="space-y-6">
          <h4 className="font-label-caps text-label-caps text-on-surface">LOCATION & HOURS</h4>
          <div className="space-y-3 text-on-surface-variant font-body-md">
            <p className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
              <span>Plot no- 99, beside indian oil petrol pump, <br /> Sector A, Rasulgarh, Bhubaneswar, Odisha 751010</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">phone</span>
              <span>083398 88901</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">mail</span>
              <span>hello@bhubaneswarkitchen.com</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">schedule</span>
              <span>Mon - Sun: 11 am – 11:30 pm</span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-20 pt-8 border-t border-on-surface/5 text-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <p className="font-body-md text-on-surface-variant/60">© 2024 Bhubaneswar Kitchen n Cafe. All rights reserved.</p>
      </div>
    </footer>
  );
}
