import React, { useState } from 'react';
import { X, Upload, Link, Check, Video, Sparkles, Film } from 'lucide-react';
import { DEFAULT_VIDEO_PRESETS } from '../data/storeData';

interface VideoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVideoSelected: (videoUrl: string) => void;
  currentVideoUrl: string;
}

export const VideoUploadModal: React.FC<VideoUploadModalProps> = ({
  isOpen,
  onClose,
  onVideoSelected,
  currentVideoUrl,
}) => {
  const [urlInput, setUrlInput] = useState<string>('');
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string>('');

  if (!isOpen) return null;

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('video/')) {
      const objectUrl = URL.createObjectURL(file);
      onVideoSelected(objectUrl);
      setUploadSuccessMessage(`Loaded "${file.name}" onto the stage!`);
      setTimeout(() => {
        setUploadSuccessMessage('');
        onClose();
      }, 1200);
    } else {
      alert('Please upload a valid MP4 or video file.');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onVideoSelected(urlInput.trim());
      setUploadSuccessMessage('Custom video URL applied to stage!');
      setTimeout(() => {
        setUploadSuccessMessage('');
        onClose();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#121318] border border-white/15 rounded-2xl shadow-2xl overflow-hidden p-6 text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-[#d2e032]/10 text-[#d2e032]">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Replace Stage MP4 Video</h3>
              <p className="text-xs text-neutral-400">
                Upload your MP4 video to feature on the Horbar spotlight stage
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert */}
        {uploadSuccessMessage && (
          <div className="mt-4 p-3 rounded-xl bg-[#d2e032]/20 border border-[#d2e032] text-[#d2e032] text-xs font-bold flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>{uploadSuccessMessage}</span>
          </div>
        )}

        {/* Option 1: Drag & Drop File Upload */}
        <div className="mt-5">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 block mb-2">
            1. Upload Local MP4 File
          </label>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
              dragActive 
                ? 'border-[#d2e032] bg-[#d2e032]/10' 
                : 'border-white/20 hover:border-[#d2e032]/50 bg-white/[0.02]'
            }`}
          >
            <input
              type="file"
              accept="video/mp4,video/webm,video/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
              className="hidden"
              id="mp4-file-input"
            />
            <label htmlFor="mp4-file-input" className="cursor-pointer flex flex-col items-center">
              <Upload className="w-8 h-8 text-[#d2e032] mb-2" />
              <span className="text-sm font-semibold text-neutral-200">
                Drag &amp; drop your MP4 video here
              </span>
              <span className="text-xs text-neutral-400 mt-1">
                or <span className="text-[#d2e032] underline">browse your computer</span>
              </span>
            </label>
          </div>
        </div>

        {/* Option 2: Enter Video URL */}
        <form onSubmit={handleUrlSubmit} className="mt-5">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 block mb-2">
            2. Or Paste MP4 Video Link
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Link className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://domain.com/my-video.mp4"
                className="w-full bg-black/50 border border-white/15 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d2e032]"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#d2e032] text-black font-bold text-xs rounded-lg hover:bg-[#b8c628] transition-colors shrink-0"
            >
              Apply
            </button>
          </div>
        </form>

        {/* Option 3: Presets */}
        <div className="mt-5 pt-4 border-t border-white/10">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 block mb-3">
            3. Choose Sample Video Presets
          </label>
          <div className="grid grid-cols-3 gap-3">
            {DEFAULT_VIDEO_PRESETS.map((preset) => {
              const isSelected = currentVideoUrl === preset.url;
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    onVideoSelected(preset.url);
                    onClose();
                  }}
                  className={`relative rounded-xl overflow-hidden border text-left p-2 transition-all flex flex-col items-center justify-center ${
                    isSelected 
                      ? 'border-[#d2e032] bg-[#d2e032]/10 ring-2 ring-[#d2e032]/30' 
                      : 'border-white/10 hover:border-white/30 bg-black/40'
                  }`}
                >
                  <div className="w-full h-16 rounded-lg overflow-hidden relative mb-2">
                    <img src={preset.poster} alt={preset.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Film className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-neutral-200 truncate w-full text-center">
                    {preset.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
