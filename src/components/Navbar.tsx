"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLinkClass = (path: string) => {
    return pathname === path
      ? "font-label-caps text-label-caps text-primary border-b-2 border-primary pb-1"
      : "font-label-caps text-label-caps text-text-main hover:text-primary transition-colors duration-300";
  };

  const getMobileLinkClass = (path: string) => {
    return pathname === path
      ? "font-headline-sm text-headline-sm text-primary block py-4 border-b border-border-custom"
      : "font-headline-sm text-headline-sm text-text-main block py-4 border-b border-border-custom hover:text-primary transition-colors duration-300";
  };

  const navClasses = `fixed top-0 w-full h-[80px] z-50 transition-all duration-300 ${
    isScrolled 
      ? "bg-background" 
      : "bg-transparent"
  }`;

  const navStyle = isScrolled ? { boxShadow: '0 8px 30px rgba(143,74,53,0.12)' } : {};

  return (
    <>
      <nav className={navClasses} style={navStyle}>
        <div className="flex justify-between items-center px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto h-full">
          <div className="flex items-center gap-4">
            <img
              alt="Bhubaneswar Kitchen n Cafe Logo"
              className="h-12 w-12 object-contain opacity-80"
              style={{ filter: 'brightness(0)' }}
              src="/assets/BKC-nobg.png"
            />
            <span className="font-headline-sm text-headline-sm text-text-main tracking-tight hidden lg:block">
              Bhubaneswar Kitchen n Cafe
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={getLinkClass("/")}>
              Home
            </Link>
            <Link href="/menu" className={getLinkClass("/menu")}>
              Restaurant
            </Link>
            <Link href="/menu/full" className={getLinkClass("/menu/full")}>
              Full Menu
            </Link>
            <Link href="/rooms" className={getLinkClass("/rooms")}>
              Rooms
            </Link>
            <Link href="/gallery" className={getLinkClass("/gallery")}>
              Gallery
            </Link>
            <Link href="/contact-us" className={getLinkClass("/contact-us")}>
              Contact
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/book-a-table" className="hidden md:block">
              <button className="btn-primary px-8 py-3 font-label-caps text-label-caps">
                Book Now
              </button>
            </Link>
            
            {/* Mobile Book Icon Button */}
            <Link href="/book-a-table" className="md:hidden">
              <button className="btn-primary w-10 h-10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">calendar_month</span>
              </button>
            </Link>

            {/* Mobile Hamburger Menu */}
            <button 
              className="md:hidden text-primary w-10 h-10 flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="material-symbols-outlined text-3xl">
                {isOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-surface/95 backdrop-blur-xl pt-[80px] px-margin-mobile flex flex-col md:hidden">
          <div className="flex flex-col mt-8">
            <Link href="/" className={getMobileLinkClass("/")} onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/menu" className={getMobileLinkClass("/menu")} onClick={() => setIsOpen(false)}>
              Restaurant
            </Link>
            <Link href="/menu/full" className={getMobileLinkClass("/menu/full")} onClick={() => setIsOpen(false)}>
              Full Menu
            </Link>
            <Link href="/rooms" className={getMobileLinkClass("/rooms")} onClick={() => setIsOpen(false)}>
              Rooms
            </Link>
            <Link href="/gallery" className={getMobileLinkClass("/gallery")} onClick={() => setIsOpen(false)}>
              Gallery
            </Link>
            <Link href="/contact-us" className={getMobileLinkClass("/contact-us")} onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
