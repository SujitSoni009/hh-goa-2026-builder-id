import React from 'react';
import { BuilderData } from '../types';
import { MapPin, Code, Palmtree, Waves, Sun, Sparkles, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import { QRCodeSVG } from 'qrcode.react';

interface BuilderIDPreviewProps {
  data: BuilderData;
  crop: any;
  zoom: number;
  verifyUrl: string;
}

export function BuilderIDPreview({ data, verifyUrl }: BuilderIDPreviewProps) {
  const photoToUse = data.croppedPhotoUrl || data.photoUrl;

  const barcodeWidths = React.useMemo(() => {
    // Generate deterministic widths based on the builderId to prevent jitter on re-renders
    let hash = 0;
    const str = data.builderId || 'HH-GOA-7757';
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Seeded random number generator
    const nextRand = () => {
      hash = Math.sin(hash) * 10000;
      return hash - Math.floor(hash);
    };

    return [...Array(25)].map(() => Math.max(1, nextRand() * 3));
  }, [data.builderId]);

  return (
    <div className="w-full h-full bg-[#F3EFE6] p-3 relative overflow-hidden flex flex-col font-sans text-hh-green-dark border-[12px] border-hh-green-dark rounded-xl shadow-inner">
      {/* Background Decorative Textures */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0A2E1F 2px, transparent 2px)', backgroundSize: '16px 16px' }}></div>

      {/* Top Section */}
      <div className="flex justify-between items-start pt-2 px-2 relative z-10">
        <div className="border-2 border-hh-green-dark px-3 py-1 bg-white transform -rotate-3 rounded-sm shadow-[2px_2px_0px_0px_rgba(10,46,31,1)]">
          <p className="text-[10px] font-bold uppercase tracking-wider text-hh-green-tropical text-center">Location</p>
          <div className="flex items-center justify-center font-black text-sm">
            <MapPin size={12} className="mr-1 text-hh-orange" />
            {data.location || 'GOA, INDIA'}
          </div>
        </div>
        
        {/* Top Center Tag */}
        <div className="absolute left-1/2 -top-3 -translate-x-1/2 bg-hh-pink text-white px-4 pt-4 pb-3 rounded-b-xl border-x-2 border-b-2 border-hh-green-dark shadow-[4px_4px_0px_0px_rgba(10,46,31,1)] flex flex-col items-center">
          <Palmtree size={18} className="text-hh-yellow mb-1" />
          <span className="font-display font-black text-xl leading-none">HH</span>
          <span className="font-display font-black text-xl leading-none">GOA</span>
          <span className="text-[10px] font-bold tracking-widest mt-1 text-hh-yellow">2026</span>
        </div>

        <div className="border-2 border-hh-green-dark p-1.5 bg-hh-cream rounded-full w-14 h-14 flex items-center justify-center transform rotate-6 shadow-[2px_2px_0px_0px_rgba(10,46,31,1)] relative">
          <div className="absolute inset-0 border border-hh-green-dark/20 rounded-full m-1 border-dashed"></div>
          <span className="font-bold text-[8px] text-center uppercase tracking-tighter leading-tight">Build<br/>Ship<br/>Repeat</span>
        </div>
      </div>

      {/* Main Title */}
      <div className="mt-8 text-center relative z-10">
        <h1 className="font-display text-5xl font-black tracking-tight text-hh-green-dark drop-shadow-sm flex items-center justify-center gap-2">
          HACKER <span className="text-hh-orange font-sans transform -rotate-6 scale-110 px-1">HOUSE</span>
        </h1>
      </div>

      {/* Photo Section */}
      <div className="relative mt-2 mb-2 flex justify-center z-10 flex-1">
        {/* Decorative elements around photo */}
        <div className="absolute top-4 -left-2 w-16 h-16 bg-hh-yellow rounded-full mix-blend-multiply opacity-60"></div>
        <div className="absolute bottom-0 -right-4 w-24 h-24 bg-hh-green-light rounded-full mix-blend-multiply opacity-30"></div>
        
        {/* Photo Container */}
        <div className="relative w-48 h-48 rounded-full border-4 border-hh-yellow shadow-[6px_6px_0px_0px_rgba(10,46,31,1)] bg-white p-1 z-20">
          <div className="w-full h-full rounded-full overflow-hidden bg-hh-cream-dark border-2 border-hh-green-dark border-dashed flex items-center justify-center relative">
            {photoToUse ? (
              <img src={photoToUse} alt="Builder" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-2">
                <span className="font-black text-hh-green-dark/40 text-[11px] sm:text-xs uppercase tracking-widest mb-1">YOUR PHOTO</span>
                <span className="text-[8px] sm:text-[9px] font-bold text-hh-green-dark/40 leading-tight uppercase">Upload photo to personalize</span>
              </div>
            )}
          </div>
          
          {/* Yellow Let's Build tag */}
          <div className="absolute -right-6 bottom-4 bg-hh-yellow border-2 border-hh-green-dark px-3 py-2 transform rotate-12 shadow-[2px_2px_0px_0px_rgba(10,46,31,1)] z-30">
            <span className="font-black text-sm block leading-tight">LET'S</span>
            <span className="font-black text-sm block leading-tight">BUILD!</span>
          </div>
        </div>
      </div>

      {/* Name Badge */}
      <div className="z-20 mx-4 relative">
        <div className="bg-hh-green-dark text-hh-cream px-4 py-3 rounded-xl border-2 border-hh-green-dark shadow-[4px_4px_0px_0px_rgba(255,209,102,1)] flex items-center justify-center relative">
          <Sparkles size={16} className="absolute left-4 text-hh-yellow" />
          <h2 className="font-display text-2xl font-black uppercase tracking-wider text-center truncate max-w-[280px]">
            {data.fullName || 'YOUR NAME'}
          </h2>
          <Sparkles size={16} className="absolute right-4 text-hh-yellow" />
        </div>
      </div>

      {/* Role */}
      <div className="text-center mt-3 z-20">
        <p className="font-black text-hh-orange text-sm tracking-widest uppercase flex items-center justify-center gap-2">
          <Zap size={14} className="text-hh-yellow fill-hh-yellow" />
          {data.bio || 'BUILDER TAG / ROLE'}
          <Zap size={14} className="text-hh-yellow fill-hh-yellow" />
        </p>
      </div>

      {/* Bottom Content Area */}
      <div className="grid grid-cols-3 gap-2 mt-4 z-20 relative h-[180px]">
        {/* Column 1: Builder Class */}
        <div className="text-center flex flex-col items-center border-r-2 border-hh-pink/20 border-dashed border-opacity-50 h-[120px]">
          <p className="text-[9px] font-black text-hh-green-dark uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
            <span className="text-hh-pink">✦</span> BUILDER CLASS <span className="text-hh-pink">✦</span>
          </p>
          <p className="font-black text-hh-pink uppercase text-[11px] leading-tight mb-1">
            TERMINAL<br/>WIZARD
          </p>
          
          <div className="mt-auto flex flex-col items-center">
            <p className="text-[7px] font-bold text-hh-green-dark uppercase tracking-widest mb-0.5">
              SCAN TO VERIFY
            </p>
            <div className="bg-white p-1 rounded-sm border-2 border-hh-green-dark mb-1">
              <QRCodeSVG 
                value={verifyUrl} 
                size={48} 
                bgColor={"#ffffff"}
                fgColor={"#0A2E1F"}
                level={"L"}
                includeMargin={false}
              />
            </div>
            <p className="font-black text-hh-green-dark text-[7px] font-mono tracking-wider">
              {data.builderId || 'HHGOA-2026-XXXX'}
            </p>
          </div>
        </div>

        {/* Column 2: Beach Bag */}
        <div className="text-center flex flex-col items-center border-r-2 border-hh-pink/20 border-dashed border-opacity-50 h-[120px]">
          <p className="text-[9px] font-black text-hh-green-dark uppercase tracking-wider mb-1.5 flex items-center justify-center gap-1">
            <span className="text-hh-pink">✦</span> BEACH BAG <span className="text-hh-pink">✦</span>
          </p>
          <div className="flex flex-col gap-1.5 items-start text-[9px] font-bold text-hh-green-dark uppercase tracking-wider pl-1">
            <div className="flex items-center gap-2">
              <span className="text-base leading-none">☼</span> SUN UP
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-hh-green-dark text-hh-green-light px-1 py-0.5 rounded-sm leading-none font-mono text-[8px]">&lt;/&gt;</span> CODE ON
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base leading-none">⚡</span> IDEAS LOUD
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base leading-none">◉</span> BUILD TOGETHER
            </div>
          </div>
        </div>

        {/* Column 3: Currently Shipping */}
        <div className="text-center flex flex-col items-center h-[120px]">
          <p className="text-[9px] font-black text-hh-green-dark uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
            <span className="text-hh-pink">✦</span> CURRENTLY SHIPPING <span className="text-hh-pink">✦</span>
          </p>
          <p className="font-black text-hh-pink uppercase text-[11px] leading-tight mb-1">
            BUILDING<br/>THE FUTURE
          </p>
          
          <div className="mt-auto flex flex-col items-center">
            <p className="text-[9px] font-bold text-hh-green-dark uppercase tracking-widest mb-0.5">
              ACCESS TIER
            </p>
            <p className="font-black text-hh-green-dark text-[9px] mb-1 font-mono tracking-wider">
              ✦ ALL ACCESS ✦
            </p>
            {/* Fake Barcode */}
            <div className="w-20 h-5 flex gap-[1px] opacity-80 justify-center">
              {barcodeWidths.map((w, i) => (
                <div key={i} className="bg-hh-green-dark h-full" style={{ width: `${w}px` }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Very Bottom Dark Green Landscape & Ribbon */}
      <div className="absolute bottom-0 left-0 right-0 h-24 flex items-end justify-center z-10">
         {/* Green Landscape Silhouette */}
         <div className="absolute bottom-0 left-0 right-0 h-16 bg-hh-green-dark" style={{
           clipPath: 'polygon(0% 100%, 100% 100%, 100% 40%, 85% 60%, 75% 20%, 65% 50%, 50% 30%, 35% 60%, 25% 10%, 15% 50%, 0% 30%)'
         }}></div>
         
         {/* Sunset */}
         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-hh-yellow rounded-full z-0"></div>
         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-20 h-10 bg-hh-pink/40 rounded-t-full blur-md z-10"></div>
         
         {/* Palm Tree Silhouettes */}
         <Palmtree size={24} className="absolute bottom-8 right-12 text-hh-green-dark z-20" />
         <Palmtree size={16} className="absolute bottom-6 right-8 text-hh-green-dark z-20" />
         <Palmtree size={28} className="absolute bottom-6 left-8 text-hh-green-dark z-20" />
         
         {/* Ocean Waves Layer */}
         <div className="absolute bottom-0 left-0 right-0 h-8 bg-hh-green-tropical border-t-2 border-hh-green-dark z-20 flex items-center justify-around opacity-90">
            <Waves size={16} className="text-hh-green-dark opacity-50" />
            <Waves size={16} className="text-hh-green-dark opacity-50" />
            <Waves size={16} className="text-hh-green-dark opacity-50" />
         </div>
      </div>

      {/* #FRAMEINGOA Ribbon */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#C2294A] flex items-center justify-center border-2 border-hh-green-dark shadow-[2px_2px_0px_0px_rgba(10,46,31,1)] z-30 px-6 py-1">
        <p className="text-white font-black text-[11px] tracking-[0.2em] uppercase">
          <span className="text-hh-yellow">✦</span> #FRAMEINGOA <span className="text-hh-yellow">✦</span>
        </p>
      </div>

      {/* Ribbon tails */}
      <div className="absolute bottom-[8px] left-[50%] -translate-x-[110px] w-8 h-6 bg-[#931c36] border-2 border-hh-green-dark z-20" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 25% 50%)' }}></div>
      <div className="absolute bottom-[8px] left-[50%] translate-x-[78px] w-8 h-6 bg-[#931c36] border-2 border-hh-green-dark z-20" style={{ clipPath: 'polygon(0 0, 100% 0, 75% 50%, 100% 100%, 0 100%)' }}></div>
    </div>
  );
}
