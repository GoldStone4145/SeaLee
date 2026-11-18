import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

export default function HomePlateLogo({ customLogoUrl, logoStyle = 'housePlate', size = 'md', onClick }) {
  const sizeClasses = {
    sm: 'w-9 h-9 rounded-xl',
    md: 'w-11 h-11 rounded-2xl',
    lg: 'w-16 h-16 rounded-3xl'
  }[size] || 'w-11 h-11 rounded-2xl';

  return (
    <div
      onClick={onClick}
      title="HomePlate 로고 슬롯 (클릭하여 커스텀 로고 이미지 등록/변경)"
      className={`${sizeClasses} relative overflow-hidden flex items-center justify-center cursor-pointer select-none shadow-md border border-amber-400/40 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-white group shrink-0 transition-transform hover:scale-105`}
    >
      {customLogoUrl ? (
        <img
          src={customLogoUrl}
          alt="HomePlate Logo"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      ) : logoStyle === 'housePlate' ? (
        <svg viewBox="0 0 40 40" className="w-7 h-7 fill-none stroke-current" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 18.5L20 8l13 10.5" />
          <path d="M11.5 16.5v13a2 2 0 002 2h13a2 2 0 002-2v-13" />
          <circle cx="20" cy="23" r="5.2" fill="rgba(255,255,255,0.22)" />
          <path d="M18 21.5c0-1.2 1.5-1.2 1.5-2.4M22 21.5c0-1.2 1.5-1.2 1.5-2.4" strokeWidth="1.8" />
        </svg>
      ) : logoStyle === 'homeBase' ? (
        <svg viewBox="0 0 40 40" className="w-7 h-7 fill-none stroke-current" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="9,10 31,10 31,23 20,33 9,23" fill="rgba(255,255,255,0.18)" />
          <circle cx="20" cy="19.5" r="5" />
          <path d="M18.5 19.5h3M20 18v3" strokeWidth="2" />
        </svg>
      ) : (
        <svg viewBox="0 0 40 40" className="w-7 h-7 fill-none stroke-current" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 26a12 12 0 0124 0" fill="rgba(255,255,255,0.2)" />
          <line x1="6" y1="26" x2="34" y2="26" />
          <circle cx="20" cy="11" r="2" />
          <path d="M15 21h10M17.5 21v5M22.5 21v5" strokeWidth="2" />
        </svg>
      )}
      <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-black/65 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <ImageIcon className="w-2.5 h-2.5" />
      </span>
    </div>
  );
}
