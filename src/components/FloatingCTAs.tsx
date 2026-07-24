"use client";

import Link from "next/link";

export default function FloatingCTAs() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 items-end">
      <CTALink 
        href="/book-a-table#booking-form" 
        icon="restaurant" 
        label="Book Table" 
        color="bg-primary hover:bg-primary-dark" 
      />
      <CTALink 
        href="/rooms#book-room" 
        icon="bed" 
        label="Book Room" 
        color="bg-gold hover:bg-yellow-600" 
        textClass="text-surface-dark" 
      />
      <CTALink 
        href="/menu/full" 
        icon="menu_book" 
        label="View Menu" 
        color="bg-surface-dark hover:bg-black" 
        textClass="text-text-light" 
      />
      <CTALink 
        href="https://wa.me/918339888901" 
        icon="chat" 
        label="WhatsApp" 
        color="bg-[#25D366] hover:bg-[#128C7E]" 
        textClass="text-white" 
        target="_blank" 
      />
      <CTALink 
        href="tel:+918339888901" 
        icon="call" 
        label="Call Us" 
        color="bg-blue-600 hover:bg-blue-700" 
        textClass="text-white" 
      />
    </div>
  );
}

function CTALink({ 
  href, 
  icon, 
  label, 
  color, 
  textClass = "text-white", 
  target 
}: { 
  href: string, 
  icon: string, 
  label: string, 
  color: string, 
  textClass?: string, 
  target?: string 
}) {
  return (
    <Link 
      href={href} 
      target={target} 
      className={`group flex items-center h-12 w-12 hover:w-[150px] ${color} ${textClass} rounded-l-xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-300 overflow-hidden justify-end`}
    >
      <span className="font-label-caps whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pr-2">
        {label}
      </span>
      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
        <span className="material-symbols-outlined text-[24px]">
          {icon}
        </span>
      </div>
    </Link>
  );
}
