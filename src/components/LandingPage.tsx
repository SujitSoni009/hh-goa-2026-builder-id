import React from 'react';
import { FormatType } from '../types';
import { IdCard, Image as ImageIcon, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface LandingPageProps {
  onSelectFormat: (format: FormatType) => void;
}

export function LandingPage({ onSelectFormat }: LandingPageProps) {
  return (
    <div className="w-full h-[100dvh] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden bg-hh-green-tropical">
      {/* Decorative Landscape Background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#3a7f47] pointer-events-none">
        {/* Sun Rays */}
        <div className="absolute top-[20%] left-[25%] w-12 h-1 bg-[#f5db4c] transform -rotate-[20deg] rounded-full hidden sm:block"></div>
        <div className="absolute top-[12%] left-[45%] w-16 h-1 bg-[#f5db4c] transform -rotate-[5deg] rounded-full hidden sm:block"></div>
        <div className="absolute top-[20%] right-[25%] w-12 h-1 bg-[#f5db4c] transform rotate-[20deg] rounded-full hidden sm:block"></div>

        {/* Giant Sun */}
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-[#f5db4c] rounded-full"></div>

        {/* Ocean */}
        <div className="absolute top-[45%] left-0 right-0 bottom-0 bg-[#428b58] border-t-[3px] border-[#295536]">
           {/* Sun Reflection */}
           <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[300px] h-2 sm:h-3 bg-[#f5db4c] rounded-full"></div>
           <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[200px] h-2 sm:h-3 bg-[#f5db4c] rounded-full"></div>
           <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[120px] h-2 sm:h-3 bg-[#f5db4c] rounded-full"></div>
           <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[60px] h-2 sm:h-3 bg-[#f5db4c] rounded-full"></div>

           {/* Ocean Waves */}
           <div className="absolute top-[20%] left-[15%] w-16 h-[2px] bg-white rounded-full"></div>
           <div className="absolute top-[40%] right-[25%] w-24 h-[2px] bg-white rounded-full"></div>
           <div className="absolute top-[10%] right-[10%] w-12 h-[2px] bg-white rounded-full"></div>
        </div>

        {/* Sand */}
        <div className="absolute top-[65%] left-0 right-0 bottom-0 bg-[#fdfcf7]" style={{
             clipPath: 'polygon(0 15%, 15% 5%, 35% 15%, 50% 8%, 70% 12%, 85% 0%, 100% 15%, 100% 100%, 0 100%)'
        }}>
        </div>

        {/* Left Palm Tree */}
        <div className="absolute bottom-[-10%] -left-16 sm:left-[-5%] w-64 sm:w-96 h-[500px] sm:h-[700px] text-[#1d5732]">
           <svg viewBox="0 0 100 200" className="w-full h-full fill-current">
             <path d="M40 200 Q30 100 50 0 Q45 100 40 200" />
             <path d="M50 0 Q10 -20 0 20 Q20 5 50 0" />
             <path d="M50 0 Q80 -30 100 10 Q70 0 50 0" />
             <path d="M50 0 Q -10 10 -5 50 Q 20 20 50 0" />
             <path d="M50 0 Q 110 20 105 60 Q 80 25 50 0" />
             <path d="M50 0 Q 10 50 0 90 Q 30 60 50 0" />
             <path d="M50 0 Q 90 60 100 100 Q 70 60 50 0" />
           </svg>
        </div>

        {/* Right Palm Tree */}
        <div className="absolute bottom-[-10%] -right-16 sm:right-[-5%] w-64 sm:w-96 h-[500px] sm:h-[700px] text-[#1d5732] transform -scale-x-100">
           <svg viewBox="0 0 100 200" className="w-full h-full fill-current">
             <path d="M40 200 Q30 100 50 0 Q45 100 40 200" />
             <path d="M50 0 Q10 -20 0 20 Q20 5 50 0" />
             <path d="M50 0 Q80 -30 100 10 Q70 0 50 0" />
             <path d="M50 0 Q -10 10 -5 50 Q 20 20 50 0" />
             <path d="M50 0 Q 110 20 105 60 Q 80 25 50 0" />
             <path d="M50 0 Q 10 50 0 90 Q 30 60 50 0" />
             <path d="M50 0 Q 90 60 100 100 Q 70 60 50 0" />
           </svg>
        </div>
      </div>
      
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex justify-between items-center z-20 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3 bg-hh-cream px-3 py-2 rounded-full border-2 border-hh-green-dark shadow-[4px_4px_0px_0px_rgba(10,46,31,1)] hover:-translate-y-0.5 transition-transform">
          <div className="w-7 h-7 bg-hh-green-dark text-hh-yellow rounded-full flex items-center justify-center font-display font-bold text-base">
            H
          </div>
          <span className="font-black tracking-wider text-xs sm:text-sm text-hh-green-dark pr-2">HACKER HOUSE GOA</span>
        </div>
        <div className="text-xs font-black tracking-widest text-hh-green-dark bg-hh-yellow px-4 py-3 rounded-full border-2 border-hh-green-dark shadow-[4px_4px_0px_0px_rgba(10,46,31,1)] hover:-translate-y-0.5 transition-transform">
          OCT 28–31 2026
        </div>
      </header>

      <main className="max-w-5xl w-full z-10 flex flex-col items-center text-center mt-12 sm:mt-0 relative">
        {/* Hero Section */}
        <div className="max-w-3xl mb-6 sm:mb-10 mx-4 sm:mx-0 relative z-20 flex flex-col items-center">
          
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-6 uppercase text-center" style={{ filter: 'drop-shadow(6px 6px 0px #0A2E1F)' }}>
            <span className="text-hh-cream" style={{ WebkitTextStroke: '3px #0A2E1F', paintOrder: 'stroke fill' }}>GET READY</span><br />
            <span className="text-hh-yellow relative inline-block mt-2" style={{ WebkitTextStroke: '3px #0A2E1F', paintOrder: 'stroke fill' }}>
              TO BUILD.
              <Sparkles className="absolute -right-8 sm:-right-12 -top-4 sm:-top-6 text-hh-yellow w-10 h-10 sm:w-14 sm:h-14 hidden sm:block" style={{ filter: 'drop-shadow(3px 3px 0px #0A2E1F)' }} />
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl font-black text-hh-cream mb-3 drop-shadow-md" style={{ WebkitTextStroke: '1.5px #0A2E1F', paintOrder: 'stroke fill', textShadow: '2px 2px 0px #0A2E1F' }}>
            Create your HH Goa 2026 identity.
          </p>
          
          <p className="text-sm sm:text-base text-hh-cream max-w-xl mx-auto font-bold leading-relaxed hidden sm:block" style={{ WebkitTextStroke: '0.5px #0A2E1F', paintOrder: 'stroke fill', textShadow: '1px 1px 0px #0A2E1F' }}>
            Upload your photo and create a unique HH Goa 2026 Builder ID Card or PFP Frame, ready to download and share.
          </p>
        </div>

        {/* Format Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl px-4 sm:px-0">
          <button
            onClick={() => onSelectFormat('builder_id')}
            className={cn(
              "group relative flex flex-col text-left p-5 sm:p-6 rounded-2xl transition-all duration-300",
              "bg-white border-2 border-hh-green-dark shadow-[4px_4px_0px_0px_rgba(10,46,31,1)]",
              "hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(10,46,31,1)]",
              "focus:outline-none focus:ring-4 focus:ring-hh-yellow focus:ring-opacity-50"
            )}
          >
            <div className="w-12 h-12 bg-hh-green-dark text-hh-yellow rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <IdCard size={24} />
            </div>
            <h3 className="font-display text-2xl font-bold mb-2 text-hh-green-dark">CREATE BUILDER ID</h3>
            <p className="text-hh-green-tropical mb-4 sm:mb-6 font-medium text-sm">
              Create a unique HH Goa 2026 event-style builder ID card with your details and photo.
            </p>
            <div className="mt-auto flex items-center text-hh-green-dark font-bold group-hover:text-hh-orange transition-colors">
              START GENERATOR <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </div>
          </button>

          <button
            onClick={() => onSelectFormat('pfp_frame')}
            className={cn(
              "group relative flex flex-col text-left p-5 sm:p-6 rounded-2xl transition-all duration-300",
              "bg-white border-2 border-hh-green-dark shadow-[4px_4px_0px_0px_rgba(10,46,31,1)]",
              "hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(10,46,31,1)]",
              "focus:outline-none focus:ring-4 focus:ring-hh-yellow focus:ring-opacity-50"
            )}
          >
            <div className="w-12 h-12 bg-hh-yellow text-hh-green-dark rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <ImageIcon size={24} />
            </div>
            <h3 className="font-display text-2xl font-bold mb-2 text-hh-green-dark">CREATE PFP FRAME</h3>
            <p className="text-hh-green-tropical mb-4 sm:mb-6 font-medium text-sm">
              Create an HH Goa 2026 branded frame for your profile picture, perfect for X (Twitter).
            </p>
            <div className="mt-auto flex items-center text-hh-green-dark font-bold group-hover:text-hh-orange transition-colors">
              START GENERATOR <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}
