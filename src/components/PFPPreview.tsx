import React from 'react';
import { BuilderData } from '../types';
import { Palmtree, Waves, Sun, Sparkles } from 'lucide-react';

interface PFPPreviewProps {
  data: BuilderData;
  crop: any;
  zoom: number;
}

export function PFPPreview({ data }: PFPPreviewProps) {
  const photoToUse = data.croppedPhotoUrl || data.photoUrl;

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-white group">
      
      {/* Background / Base image - perfectly circular for X */}
      <div className="absolute inset-2 z-0 bg-hh-cream-dark rounded-full overflow-hidden border-8 border-hh-yellow">
        {photoToUse ? (
          <img src={photoToUse} alt="Builder" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-hh-green-dark/30 font-bold text-2xl border-4 border-dashed border-hh-green-dark/20 m-4 rounded-full">
            PHOTO
          </div>
        )}
      </div>

      {/* Frame overlay - circular to match X's crop */}
      <div className="absolute inset-2 z-10 pointer-events-none rounded-full border-[16px] border-hh-green-dark shadow-[inset_0_0_0_4px_#FFD166]">
        
        {/* Top curved badge */}
        <div className="absolute top-0 left-0 right-0 h-1/4 flex items-start justify-center pt-2">
           <div className="bg-hh-pink px-4 py-1.5 rounded-full border-2 border-hh-green-dark shadow-[2px_2px_0px_0px_rgba(10,46,31,1)] flex items-center gap-2">
             <Palmtree size={14} className="text-hh-yellow" />
             <h1 className="font-display font-black text-xs text-white leading-none uppercase tracking-widest mt-0.5">HH GOA 2026</h1>
           </div>
        </div>
        
        {/* Bottom curved banner */}
        <div className="absolute bottom-[-2px] left-[10%] right-[10%] h-1/3 flex flex-col items-center justify-end pb-8">
           <div className="bg-hh-green-dark px-6 py-2 rounded-t-2xl rounded-b-xl border-t-4 border-x-4 border-hh-yellow shadow-lg flex flex-col items-center w-[90%] max-w-[280px]">
             
             {/* Sun graphic popping out */}
             <div className="absolute -top-6 text-hh-yellow">
               <Sun size={32} className="fill-hh-yellow" />
             </div>

             <h2 className="font-display text-xl font-black text-hh-cream uppercase tracking-wide truncate w-full text-center z-10 drop-shadow-sm mt-1">
               {data.fullName || 'YOUR NAME'}
             </h2>
             <p className="font-bold text-hh-green-light text-[10px] tracking-widest uppercase z-10">
               {data.bio || 'BUILDER'}
             </p>
           </div>
        </div>

        {/* Decorative elements around the ring */}
        <div className="absolute top-1/3 -left-1 bg-white border-2 border-hh-green-dark p-1 rounded-full shadow-[2px_2px_0px_0px_rgba(10,46,31,1)]">
          <Waves size={16} className="text-hh-green-tropical" />
        </div>
        
        <div className="absolute top-1/3 -right-1 bg-white border-2 border-hh-green-dark p-1 rounded-full shadow-[2px_2px_0px_0px_rgba(10,46,31,1)]">
          <Sparkles size={16} className="text-hh-orange" />
        </div>

      </div>
    </div>
  );
}

