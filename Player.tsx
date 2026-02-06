
import React, { useState, useRef, useEffect } from 'react';
import { MusicTrack } from '../types';

interface PlayerProps {
  track: MusicTrack;
  onNext: () => void;
  onPrev: () => void;
}

const Player: React.FC<PlayerProps> = ({ track, onNext, onPrev }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [track]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const time = (Number(e.target.value) / 100) * audioRef.current.duration;
      audioRef.current.currentTime = time;
      setProgress(Number(e.target.value));
    }
  };

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl bg-white border border-[#E8E8E8] shadow-2xl p-6 z-50 flex flex-col md:flex-row items-center gap-8 fade-in">
      <audio 
        ref={audioRef} 
        src={track.url} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={onNext}
      />

      {/* Track Info */}
      <div className="flex items-center gap-6 md:w-1/3">
        <div 
          className="w-16 h-16 shrink-0" 
          style={{ background: track.gradient }} 
        />
        <div className="overflow-hidden">
          <h4 className="serif text-lg leading-tight truncate">{track.title}</h4>
          <p className="text-[10px] tracking-[0.1em] uppercase opacity-40 truncate">
            {track.features.join(' _ ') || 'N/A'}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex-1 flex flex-col items-center gap-3">
        <div className="flex items-center gap-8">
          <button onClick={onPrev} className="opacity-40 hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
          </button>
          
          <button 
            onClick={togglePlay} 
            className="w-12 h-12 bg-[#1A1A1A] text-white flex items-center justify-center rounded-full hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>

          <button onClick={onNext} className="opacity-40 hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
          </button>
        </div>

        <div className="w-full flex items-center gap-4">
          <input 
            type="range" 
            className="w-full h-1 bg-[#E8E8E8] appearance-none cursor-pointer accent-[#1A1A1A]"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="hidden md:flex md:w-1/3 justify-end items-center gap-6">
        <a 
          href={track.url} 
          download={track.fileName}
          className="text-[10px] tracking-[0.2em] uppercase border border-[#1A1A1A] px-4 py-2 hover:bg-[#1A1A1A] hover:text-white transition-all duration-300"
        >
          Download Master
        </a>
      </div>

      <button 
        onClick={() => {}} 
        className="absolute top-4 right-4 text-xs opacity-20 hover:opacity-100"
        title="Settings"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
      </button>
    </div>
  );
};

export default Player;
