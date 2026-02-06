
import React, { useState, useCallback, useRef } from 'react';
import { ViewState, MusicTrack } from './types';
import { parseMusicFile, getFeaturesList } from './utils';
import Intro from './components/Intro';
import MusicGrid from './components/MusicGrid';
import Sidebar from './components/Sidebar';
import Player from './components/Player';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('intro');
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEnter = useCallback(() => {
    setView('main');
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const musicFiles = (Array.from(files) as File[]).filter(file => 
      file.name.toLowerCase().endsWith('.wav')
    );

    const parsedTracks = musicFiles.map(parseMusicFile);
    setTracks(parsedTracks);
    setActiveCategory('All');
  };

  const filteredTracks = activeCategory === 'All' 
    ? tracks 
    : tracks.filter(t => t.features.includes(activeCategory));

  const features = getFeaturesList(tracks);

  if (view === 'intro') {
    return <Intro onEnter={handleEnter} />;
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#1A1A1A] flex flex-col fade-in">
      {/* Header */}
      <header className="px-8 py-10 flex justify-between items-end border-b border-[#E8E8E8]">
        <div>
          <h1 className="serif text-4xl tracking-tight font-light uppercase">XR Music</h1>
          <p className="text-[10px] tracking-[0.2em] uppercase mt-2 opacity-50">XR AUDIO ARCHIVES</p>
        </div>
        
        <div className="flex gap-4">
          <label className="cursor-pointer border border-[#1A1A1A] px-6 py-2 text-xs uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-all duration-500">
            Import Folder
            <input 
              type="file" 
              className="hidden" 
              // @ts-ignore
              webkitdirectory="" 
              directory="" 
              multiple 
              onChange={handleFileChange}
            />
          </label>
        </div>
      </header>

      <div className="flex flex-1 relative overflow-hidden">
        {/* Sidebar / Categories */}
        <Sidebar 
          categories={features} 
          activeCategory={activeCategory} 
          onSelectCategory={setActiveCategory} 
          totalCount={tracks.length}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8 pb-40">
          {tracks.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-30 text-center">
              <div className="w-px h-24 bg-[#1A1A1A] mb-8"></div>
              <p className="serif italic text-2xl">Select a folder to begin your curation</p>
            </div>
          ) : (
            <MusicGrid 
              tracks={filteredTracks} 
              onPlay={setCurrentTrack} 
              currentTrackId={currentTrack?.id}
            />
          )}
        </main>
      </div>

      {/* Floating Player */}
      {currentTrack && (
        <Player 
          track={currentTrack} 
          onNext={() => {
            const idx = tracks.findIndex(t => t.id === currentTrack.id);
            if (idx < tracks.length - 1) setCurrentTrack(tracks[idx + 1]);
          }}
          onPrev={() => {
            const idx = tracks.findIndex(t => t.id === currentTrack.id);
            if (idx > 0) setCurrentTrack(tracks[idx - 1]);
          }}
        />
      )}
    </div>
  );
};

export default App;
