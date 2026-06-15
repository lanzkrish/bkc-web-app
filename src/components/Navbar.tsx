"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const getLinkClass = (path: string) => {
    return pathname === path
      ? "font-label-caps text-label-caps text-primary border-b-2 border-primary pb-1"
      : "font-label-caps text-label-caps text-on-surface hover:text-primary transition-colors duration-300";
  };

  const getMobileLinkClass = (path: string) => {
    return pathname === path
      ? "font-headline-sm text-headline-sm text-primary block py-4 border-b border-on-surface/10"
      : "font-headline-sm text-headline-sm text-on-surface block py-4 border-b border-on-surface/10 hover:text-primary transition-colors duration-300";
  };

  return (
    <>
      <nav className="fixed top-0 w-full h-[80px] bg-surface/70 backdrop-blur-xl border-b border-on-surface/10 z-50">
        <div className="flex justify-between items-center px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto h-full">
          <div className="flex items-center gap-4">
            <img
              alt="Bhubaneswar Kitchen n Cafe Logo"
              className="h-12 w-12 object-contain"
              src="/assets/BKC-nobg.png"
            />
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight hidden lg:block">
              Bhubaneswar Kitchen n Cafe
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={getLinkClass("/")}>
              Home
            </Link>
            <Link href="/menu" className={getLinkClass("/menu")}>
              Menu
            </Link>
            <Link href="/book-a-table" className={getLinkClass("/book-a-table")}>
              Reservations
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
              <button className="bg-primary-container text-on-primary-container px-6 py-3 rounded-lg font-label-caps text-label-caps hover:scale-105 transition-transform duration-200 active:scale-95">
                Book a Table
              </button>
            </Link>
            
            {/* Mobile Book Icon Button */}
            <Link href="/book-a-table" className="md:hidden">
              <button className="bg-primary-container text-on-primary-container w-10 h-10 flex items-center justify-center rounded-lg hover:scale-105 transition-transform duration-200 active:scale-95">
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
              Menu
            </Link>
            <Link href="/book-a-table" className={getMobileLinkClass("/book-a-table")} onClick={() => setIsOpen(false)}>
              Reservations
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
