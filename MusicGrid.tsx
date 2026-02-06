
import React from 'react';
import { MusicTrack } from '../types';

interface MusicGridProps {
  tracks: MusicTrack[];
  onPlay: (track: MusicTrack) => void;
  currentTrackId?: string;
}

const MusicGrid: React.FC<MusicGridProps> = ({ tracks, onPlay, currentTrackId }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
      {tracks.map((track) => (
        <div 
          key={track.id} 
          className="group cursor-pointer"
          onClick={() => onPlay(track)}
        >
          {/* Card Image Wrapper */}
          <div className="relative aspect-square mb-5 overflow-hidden bg-[#F2F2F2]">
            <div 
              style={{ background: track.gradient }} 
              className="w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Overlay */}
            <div className={`absolute inset-0 bg-black/5 transition-opacity duration-500 group-hover:opacity-0 ${currentTrackId === track.id ? 'opacity-0' : 'opacity-100'}`} />
            
            {/* Play Indicator */}
            <div className={`absolute bottom-6 right-6 w-10 h-10 border border-white/50 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${currentTrackId === track.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
              {currentTrackId === track.id ? (
                <div className="flex items-center gap-0.5">
                   <div className="w-0.5 h-3 bg-white animate-pulse"></div>
                   <div className="w-0.5 h-4 bg-white animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                   <div className="w-0.5 h-3 bg-white animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                </div>
              ) : (
                <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              )}
            </div>

            {/* Feature Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {track.features.slice(0, 2).map(f => (
                <span key={f} className="text-[8px] tracking-[0.1em] px-2 py-1 bg-white/10 backdrop-blur-md text-white border border-white/20 uppercase">
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-1">
            <h3 className="serif text-xl font-light tracking-wide">{track.title}</h3>
            <div className="flex items-center justify-between">
              <p className="text-[10px] tracking-[0.1em] opacity-40 uppercase truncate mr-4">
                {track.features.join(' • ') || 'No specific features'}
              </p>
              <a 
                href={track.url} 
                download={track.fileName}
                onClick={(e) => e.stopPropagation()}
                className="text-[9px] tracking-[0.1em] opacity-0 group-hover:opacity-100 underline transition-opacity"
              >
                DOWNLOAD
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MusicGrid;
