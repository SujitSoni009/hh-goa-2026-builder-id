import React, { useState, useRef, useCallback, useEffect } from 'react';
import { FormatType, BuilderData } from '../types';
import { ArrowLeft, Download, Upload, X, ZoomIn, ZoomOut, Check, Twitter, Sparkles } from 'lucide-react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../lib/cropImage';
import { toPng } from 'html-to-image';
import { BuilderIDPreview } from './BuilderIDPreview';
import { PFPPreview } from './PFPPreview';
import { saveBuilderId } from '../lib/firebase';

interface GeneratorPageProps {
  format: FormatType;
  onSelectFormat: (format: FormatType | null) => void;
}

export function GeneratorPage({ format, onSelectFormat }: GeneratorPageProps) {
  const [data, setData] = useState<BuilderData>({
    fullName: '',
    handle: '',
    bio: '',
    location: '',
    website: '',
    photoUrl: null,
    cropArea: null,
    builderId: '',
  });

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImagePixels, setCroppedImagePixels] = useState(null);
  
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasSavedToDb, setHasSavedToDb] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'generating' | 'downloaded'>('idle');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState(1);

  // Generate unique ID on mount
  useEffect(() => {
    const uniqueId = `HHGOA-2026-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setData(prev => ({ ...prev, builderId: uniqueId }));
  }, []);

  // Handle responsive scaling of the preview card
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const targetWidth = format === 'builder_id' ? 450 : 500;
        const targetHeight = format === 'builder_id' ? 700 : 500;
        // Padding of 32px horizontally and 64px vertically
        const scaleW = (width - 32) / targetWidth;
        const scaleH = (height - 64) / targetHeight;
        setScale(Math.min(1, Math.min(scaleW, scaleH)));
      }
    });
    
    observer.observe(container);
    return () => observer.disconnect();
  }, [format]);

  const verifyUrl = `${window.location.origin}/verify/${data.builderId}`;

  const onCropComplete = useCallback(async (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedImagePixels(croppedAreaPixels);
  }, []);

  const onCropDone = async () => {
    if (data.photoUrl && croppedImagePixels) {
      try {
        const croppedImage = await getCroppedImg(data.photoUrl, croppedImagePixels);
        setData(prev => ({ ...prev, croppedPhotoUrl: croppedImage }));
        setHasSavedToDb(false);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setData(prev => ({ ...prev, photoUrl: reader.result as string }));
        setZoom(1);
        setCrop({ x: 0, y: 0 });
        setHasSavedToDb(false);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const removePhoto = () => {
    setData(prev => ({ ...prev, photoUrl: null, cropArea: null, croppedPhotoUrl: null }));
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    setCroppedImagePixels(null);
    setHasSavedToDb(false);
  };

  const handleDownload = async () => {
    if (!previewRef.current) return;
    
    setIsGenerating(true);
    setDownloadStatus('generating');
    try {
      if (format === 'builder_id' && !hasSavedToDb && data.croppedPhotoUrl) {
        await saveBuilderId({
          uniqueId: data.builderId,
          fullName: data.fullName,
          handle: data.handle,
          bio: data.bio,
          location: data.location,
          photoBase64: data.croppedPhotoUrl
        });
        setHasSavedToDb(true);
      }

      await new Promise(resolve => setTimeout(resolve, 150)); // Allow transitions to settle
      
      const dataUrl = await toPng(previewRef.current, {
        quality: 1.0,
        pixelRatio: 2, // High resolution download
        skipFonts: false,
      });
      
      const link = document.createElement('a');
      link.download = `HH_GOA_2026_${format === 'builder_id' ? 'ID' : 'PFP'}_${data.builderId}.png`;
      link.href = dataUrl;
      link.click();
      
      setDownloadStatus('downloaded');
      setTimeout(() => setDownloadStatus('idle'), 3000);
    } catch (err: any) {
      console.error('Error generating image:', err);
      alert('Error: ' + err.message);
      setToastMessage('Failed to generate image. Please try again.');
      setTimeout(() => setToastMessage(null), 3000);
      setDownloadStatus('idle');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShareX = () => {
    const text = encodeURIComponent(`I'm building at Hacker House Goa 2026! 🌴✨ Can't wait to build.\n\nVerify my official Builder ID here: ${verifyUrl}\n\n@hackerhouses #HHGoa2026 #Solana`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
    setHasSavedToDb(false);
  };

  return (
    <div className="min-h-screen lg:h-screen flex flex-col bg-[#0A2E1F] text-hh-cream font-sans">
      
      {/* HEADER */}
      <header className="flex-none bg-[#0A2E1F] border-b border-[#1d5732] px-4 py-3 flex items-center justify-between z-50 shadow-sm">
        <button onClick={() => onSelectFormat(null)} className="flex items-center text-hh-cream hover:text-hh-yellow transition-colors font-bold text-sm">
          <ArrowLeft size={16} className="mr-2" /> BACK
        </button>
        <div className="font-display font-black text-xl tracking-widest hidden sm:block text-hh-cream uppercase">
          HH GOA <span className="text-hh-yellow">2026</span>
        </div>
        <div className="bg-hh-yellow text-[#0A2E1F] px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-sm">
          {format === 'builder_id' ? 'BUILDER ID' : 'PFP FRAME'}
        </div>
      </header>

      {/* MAIN CONTENT LAYOUT */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden relative">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50 bg-hh-yellow text-[#0A2E1F] px-6 py-3 rounded-full font-bold text-sm shadow-[0_4px_12px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-top-4 flex items-center gap-2 border border-[#0A2E1F]">
            <Check size={16} /> {toastMessage}
          </div>
        )}

        {/* LEFT PANEL: FORM (Order 3 on mobile) */}
        <div className="w-full lg:w-[30%] order-3 lg:order-1 lg:border-r border-[#1d5732] bg-[#0A2E1F] p-6 sm:p-8 lg:overflow-y-auto custom-scrollbar">
          
          <h2 className="font-display font-black text-hh-yellow text-xl mb-4 uppercase tracking-wide">1. Your Photo</h2>
          
          {!data.croppedPhotoUrl ? (
            <div 
              className={`w-full aspect-[4/3] border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 text-center transition-all cursor-pointer group ${isDragging ? 'border-hh-yellow bg-hh-yellow/10 scale-[1.02]' : 'border-[#2b5e3a] hover:border-hh-yellow bg-[#123624] hover:bg-[#163f2b]'}`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    setData(prev => ({ ...prev, photoUrl: reader.result as string }));
                    setZoom(1); setCrop({ x: 0, y: 0 }); setHasSavedToDb(false);
                  };
                  reader.readAsDataURL(e.dataTransfer.files[0]);
                }
              }}
              onClick={() => document.getElementById('photo-upload')?.click()}
            >
              <div className="w-14 h-14 rounded-full bg-[#1d5732] group-hover:bg-hh-yellow group-hover:text-[#0A2E1F] flex items-center justify-center mb-4 transition-all duration-300 shadow-sm text-hh-yellow">
                <Upload size={24} />
              </div>
              <p className="font-bold text-hh-cream text-lg mb-1">DROP YOUR PHOTO</p>
              <p className="text-sm text-hh-cream/60">or click to browse</p>
              <p className="text-[10px] text-hh-cream/40 mt-3 font-mono font-bold tracking-widest bg-[#0A2E1F] px-2 py-1 rounded">JPG • PNG • WEBP</p>
              <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </div>
          ) : (
            <div className="bg-[#123624] p-4 rounded-xl border border-[#1d5732] flex items-center gap-4 transition-all hover:border-[#2b5e3a]">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-hh-yellow shrink-0 bg-hh-green-tropical shadow-sm">
                <img src={data.croppedPhotoUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-hh-cream mb-2 flex items-center gap-1.5"><Check size={14} className="text-hh-yellow"/> Photo Uploaded</p>
                <div className="flex gap-2">
                  <button onClick={() => document.getElementById('photo-upload-replace')?.click()} className="text-[10px] font-black tracking-wider uppercase bg-[#1d5732] hover:bg-[#2b5e3a] text-hh-cream px-3 py-1.5 rounded transition-colors">
                    REPLACE
                  </button>
                  <button onClick={removePhoto} className="text-[10px] font-black tracking-wider uppercase text-red-400 hover:bg-red-400/10 px-3 py-1.5 rounded transition-colors">
                    REMOVE
                  </button>
                  <input id="photo-upload-replace" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                </div>
              </div>
            </div>
          )}

          <h2 className="font-display font-black text-hh-yellow text-xl mb-4 mt-10 uppercase tracking-wide">2. Builder Details</h2>
          <div className="space-y-5">
            <div className="group">
              <label className="block text-xs font-bold text-hh-cream/70 uppercase tracking-wider mb-2 group-focus-within:text-hh-yellow transition-colors">Full Name</label>
              <input 
                type="text" 
                name="fullName" 
                value={data.fullName} 
                onChange={handleChange} 
                placeholder="e.g. Madhavan Singh"
                className="w-full bg-[#123624] border border-[#2b5e3a] focus:border-hh-yellow focus:ring-1 focus:ring-hh-yellow rounded-lg px-4 py-3 text-hh-cream placeholder:text-hh-cream/20 outline-none transition-all font-medium shadow-inner"
              />
              {!data.fullName && <p className="text-[10px] text-hh-yellow/80 font-medium mt-1.5 opacity-0 group-focus-within:opacity-100 transition-opacity">This will appear on your ID card.</p>}
            </div>
            
            <div className="group">
              <label className="block text-xs font-bold text-hh-cream/70 uppercase tracking-wider mb-2 group-focus-within:text-hh-yellow transition-colors">Role / Builder Tag</label>
              <input 
                type="text" 
                name="bio" 
                value={data.bio} 
                onChange={handleChange} 
                placeholder="e.g. Full Stack Developer"
                className="w-full bg-[#123624] border border-[#2b5e3a] focus:border-hh-yellow focus:ring-1 focus:ring-hh-yellow rounded-lg px-4 py-3 text-hh-cream placeholder:text-hh-cream/20 outline-none transition-all font-medium shadow-inner"
                maxLength={30}
              />
            </div>
            
            <div className="group">
              <label className="block text-xs font-bold text-hh-cream/70 uppercase tracking-wider mb-2 group-focus-within:text-hh-yellow transition-colors">Location</label>
              <input 
                type="text" 
                name="location" 
                value={data.location} 
                onChange={handleChange} 
                placeholder="e.g. Goa, India"
                className="w-full bg-[#123624] border border-[#2b5e3a] focus:border-hh-yellow focus:ring-1 focus:ring-hh-yellow rounded-lg px-4 py-3 text-hh-cream placeholder:text-hh-cream/20 outline-none transition-all font-medium shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* CENTER PANEL: PREVIEW (Order 1 on mobile) */}
        <div className="w-full lg:w-[45%] order-1 lg:order-2 relative flex flex-col items-center justify-center p-4 sm:p-8 min-h-[500px] lg:min-h-0 bg-[#0e3b26] overflow-hidden border-b lg:border-b-0 border-[#1d5732]">
          
          {/* Rich Attractive Background inspired by Goa */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {/* Dynamic Mesh Gradients */}
            <div className="absolute top-[-10%] left-[-20%] w-[500px] h-[500px] rounded-full bg-[#f5db4c] mix-blend-overlay filter blur-[120px] opacity-10 animate-pulse" style={{ animationDuration: '8s' }}></div>
            <div className="absolute bottom-[-10%] right-[-20%] w-[600px] h-[600px] rounded-full bg-[#1d5732] mix-blend-multiply filter blur-[100px] opacity-80"></div>
            
            {/* Abstract Wave / Topography lines */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM42.11 0c12.639 0 20.842 2.622 34.256 7.426.475.17.962.342 1.46.516L79.588 8.6c11.083 3.963 17.585 5.4 20.412 5.4v2c-3.13 0-10.424-1.637-22.186-5.834-2.11-.755-4.24-1.52-6.386-2.285C57.652 2.923 50.311 2 42.11 2 30.65 2 24.168 4.238 12.39 8.233l-1.77.603C6.738 10.155 3.328 11.233 0 12v-2c3.56 0 7.353-1.164 11.458-2.56l1.763-.598C25.074 2.825 31.066 0 42.11 0z' fill='%23f5db4c' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '150px'
            }}></div>
            <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(#FFE082 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>
            
            <Sparkles className="absolute top-12 right-12 text-hh-yellow/20 w-8 h-8 hidden sm:block" />
            <Sparkles className="absolute bottom-16 left-12 text-hh-yellow/10 w-12 h-12 hidden lg:block" />
          </div>

          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center text-hh-yellow font-bold text-[10px] sm:text-xs tracking-widest z-20 bg-[#0A2E1F]/60 px-3 py-1.5 rounded-full backdrop-blur-md border border-hh-yellow/20 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>
            LIVE PREVIEW
          </div>

          {/* Scale Container */}
          <div ref={containerRef} className="relative z-10 w-full h-full flex items-center justify-center group lg:perspective-[1200px]">
            {/* The Card wrapper with hover tilt (only on desktop/lg screens) */}
            <div 
              className="origin-center transition-transform duration-500 ease-out lg:group-hover:-translate-y-2 lg:group-hover:rotate-x-2 lg:group-hover:-rotate-y-2 lg:group-hover:shadow-[20px_40px_60px_rgba(0,0,0,0.6)] shadow-[10px_20px_40px_rgba(0,0,0,0.4)] rounded-xl"
              style={{ 
                transform: `scale(${scale})`,
                width: format === 'builder_id' ? 450 : 500,
                height: format === 'builder_id' ? 700 : 500
              }}
            >
              {/* ID Generator Stage */}
              <div 
                ref={previewRef}
                className="w-full h-full bg-white overflow-hidden rounded-xl"
              >
                {format === 'builder_id' ? (
                  <BuilderIDPreview data={data} crop={crop} zoom={zoom} verifyUrl={verifyUrl} />
                ) : (
                  <PFPPreview data={data} crop={crop} zoom={zoom} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: ACTIONS (Order 2 on mobile) */}
        <div className="w-full lg:w-[25%] order-2 lg:order-3 lg:border-l border-[#1d5732] bg-[#082216] p-6 sm:p-8 flex flex-col justify-center border-b lg:border-b-0 border-[#1d5732] shadow-[-10px_0_30px_rgba(0,0,0,0.2)] z-10 relative">
          
          <h2 className="font-display font-black text-2xl lg:text-3xl text-hh-cream mb-2 uppercase leading-none">Your ID <br className="hidden lg:block"/>is Ready</h2>
          <p className="text-xs lg:text-sm text-hh-cream/70 mb-8 font-medium leading-relaxed">
            Download your official HH Goa 2026 Builder ID and share it with the community.
          </p>
          
          <button 
            onClick={handleDownload}
            disabled={downloadStatus !== 'idle'}
            className="w-full bg-hh-yellow hover:bg-[#ffe599] text-[#0A2E1F] font-black uppercase tracking-wider py-4 px-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(10,46,31,1)] transition-all active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(10,46,31,1)] flex items-center justify-center gap-2 mb-4 disabled:opacity-90 disabled:cursor-wait text-sm sm:text-base"
          >
            {downloadStatus === 'idle' && <><Download size={20} /> DOWNLOAD YOUR ID CARD</>}
            {downloadStatus === 'generating' && (
              <><div className="w-5 h-5 border-2 border-[#0A2E1F] border-t-transparent rounded-full animate-spin"></div> GENERATING...</>
            )}
            {downloadStatus === 'downloaded' && <><Check size={20} /> DOWNLOADED</>}
          </button>
          
          <button 
            onClick={handleShareX}
            className="w-full bg-[#123624] hover:bg-[#1a4a32] border border-[#2b5e3a] text-hh-cream font-bold text-xs sm:text-sm tracking-wider py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Twitter size={16} /> SHARE ON X
          </button>
        </div>

      </div>

      {/* Crop Modal */}
      {data.photoUrl && !data.croppedPhotoUrl && (
        <div className="fixed inset-0 z-[100] bg-[#0A2E1F]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#123624] w-full max-w-lg rounded-2xl overflow-hidden border border-[#2b5e3a] shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-[#2b5e3a] bg-[#0e2a1c]">
              <h3 className="text-hh-cream font-black text-lg uppercase tracking-widest">Crop Photo</h3>
              <button onClick={removePhoto} className="text-hh-cream/50 hover:text-hh-cream transition-colors bg-[#1a4a32] p-1.5 rounded-full">
                <X size={18} />
              </button>
            </div>
            
            <div className="relative h-[60vh] sm:h-80 bg-black/50">
              <Cropper
                image={data.photoUrl}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                cropShape="round"
                showGrid={false}
              />
            </div>

            <div className="p-6 bg-[#0e2a1c]">
              <div className="flex items-center gap-4 mb-6 px-2">
                <ZoomOut size={20} className="text-hh-cream/50" />
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-2 bg-[#2b5e3a] rounded-lg appearance-none cursor-pointer accent-hh-yellow"
                />
                <ZoomIn size={20} className="text-hh-cream/50" />
              </div>
              
              <div className="flex justify-end gap-3">
                <button onClick={removePhoto} className="px-5 py-3 rounded-lg font-bold text-hh-cream/80 hover:text-hh-cream hover:bg-[#2b5e3a] transition-colors text-sm uppercase tracking-wider">
                  Cancel
                </button>
                <button onClick={onCropDone} className="bg-hh-yellow text-[#0A2E1F] px-8 py-3 rounded-lg font-black uppercase tracking-wider hover:bg-[#ffe599] transition-colors text-sm shadow-[2px_2px_0px_0px_rgba(10,46,31,1)]">
                  Save Crop
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
