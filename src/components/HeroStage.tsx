import React, { useRef, useEffect, useState } from 'react';
import { heroPosterImg, DEFAULT_VIDEO_PRESETS } from '../data/storeData';
import { Volume2, VolumeX } from 'lucide-react';
import { getSavedVideo } from '../lib/videoStorage';

interface HeroStageProps {
  currentVideoUrl: string;
  onVideoChange: (newUrl: string) => void;
  onShopClick: () => void;
  onExploreClick: () => void;
}

export const HeroStage: React.FC<HeroStageProps> = ({
  currentVideoUrl,
  onVideoChange,
  onShopClick,
  onExploreClick,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Restore saved custom video from storage on initial mount if available
  useEffect(() => {
    getSavedVideo().then((saved) => {
      if (saved?.url) {
        onVideoChange(saved.url);
      }
    });
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log("Autoplay waiting for user interaction:", err);
        });
      }
    }
  }, [currentVideoUrl]);

  const toggleSound = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted) {
        videoRef.current.play().catch((err) => console.log("Play with audio error:", err));
      }
    }
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] bg-[#090909] text-white flex items-center py-10 lg:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* LEFT SIDE: Typography & CTA Buttons (40-45% width) */}
        <div className="lg:col-span-5 flex flex-col items-start space-y-6 pt-4 lg:pt-0 z-10">
          
          {/* Small Label */}
          <div className="inline-flex items-center gap-2 px-1 py-0.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span>NEW DROP</span>
          </div>

          {/* Large Heading */}
          <div className="flex flex-col leading-[0.9] select-none tracking-normal">
            <h1 className="font-display text-7xl sm:text-8xl lg:text-9xl uppercase text-white">
              UNIQUE
            </h1>
            <h1 className="font-display text-7xl sm:text-8xl lg:text-9xl uppercase text-[#D4AF37]">
              CLOTHING
            </h1>
          </div>

          {/* Description */}
          <p className="text-neutral-300 text-base sm:text-lg max-w-md leading-relaxed font-sans font-light">
            Stand out. Be different.<br />
            More than fashion—it's a statement of individuality.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={onShopClick}
              className="px-8 py-4 rounded-lg bg-[#D4AF37] text-black font-semibold text-sm uppercase tracking-wider hover:bg-[#c49f27] hover:-translate-y-0.5 transition-all duration-200 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              SHOP NOW
            </button>

            <button
              onClick={onExploreClick}
              className="px-8 py-4 rounded-lg bg-[#111111] text-white font-medium text-sm uppercase tracking-wider border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:-translate-y-0.5 transition-all duration-200"
            >
              EXPLORE
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: Looping MP4 Video (55-60% width) */}
        <div className="lg:col-span-7 relative w-full h-[450px] sm:h-[550px] lg:h-[650px] flex items-center justify-center group">
          
          {/* Subtle Ambient Gold Glow behind video */}
          <div className="absolute inset-0 bg-[#D4AF37]/10 blur-3xl rounded-full pointer-events-none transform scale-90" />

          {/* Container holding the video */}
          <div 
            className={`relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#111111] transition-opacity duration-700 ${
              videoLoaded ? 'opacity-100' : 'opacity-90'
            }`}
          >
            <video
              key={currentVideoUrl || 'default-vid'}
              ref={videoRef}
              poster={heroPosterImg}
              preload="auto"
              autoPlay
              muted={isMuted}
              loop
              playsInline
              crossOrigin="anonymous"
              onLoadedData={() => setVideoLoaded(true)}
              onError={(e) => {
                console.warn("Video failed on web source, switching to reliable fallback stream:", e);
                if (currentVideoUrl !== DEFAULT_VIDEO_PRESETS[0].url) {
                  onVideoChange(DEFAULT_VIDEO_PRESETS[0].url);
                }
              }}
              className="w-full h-full object-cover rounded-2xl"
            >
              {currentVideoUrl && <source src={currentVideoUrl} type="video/mp4" />}
              <source src={DEFAULT_VIDEO_PRESETS[0].url} type="video/mp4" />
              <source src={DEFAULT_VIDEO_PRESETS[1].url} type="video/mp4" />
              <source src={DEFAULT_VIDEO_PRESETS[2].url} type="video/mp4" />
            </video>
            
            {/* Sound Indication & Toggle Control */}
            <button
              onClick={toggleSound}
              className={`absolute top-4 right-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md transition-all shadow-xl cursor-pointer border ${
                isMuted
                  ? 'bg-black/80 text-white border-white/20 hover:border-[#D4AF37] hover:text-[#D4AF37]'
                  : 'bg-[#D4AF37] text-black border-[#D4AF37] hover:bg-[#c49f27]'
              }`}
              title={isMuted ? "Click to Unmute Sound" : "Click to Mute Sound"}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sound Off</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 animate-pulse text-black" />
                  <span>Sound On</span>
                </>
              )}
            </button>

            {/* Subtle Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909]/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

      </div>
    </section>
  );
};
