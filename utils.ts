
import { MusicTrack } from './types';

// Curated high-end neutral gradients
const GRADIENTS = [
  'linear-gradient(135deg, #E2E2E2 0%, #C9C9C9 100%)',
  'linear-gradient(135deg, #D4D4D4 0%, #BDBDBD 100%)',
  'linear-gradient(135deg, #EAE7E2 0%, #D8D2C2 100%)',
  'linear-gradient(135deg, #F2F2F2 0%, #E0E0E0 100%)',
  'linear-gradient(135deg, #E5E5E5 0%, #CCCCCC 100%)',
  'linear-gradient(135deg, #D9D9D9 0%, #BFBFBF 100%)',
  'linear-gradient(135deg, #F0EDE5 0%, #D7D2C8 100%)',
  'linear-gradient(135deg, #E8E8E8 0%, #D1D1D1 100%)',
];

const stringToHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
};

export const parseMusicFile = (file: File): MusicTrack => {
  const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
  const parts = nameWithoutExt.split('_');
  
  const title = parts[0] || 'Untitled';
  const features = parts.slice(1).map(f => f.trim()).filter(f => f !== "");
  
  const hash = stringToHash(file.name);
  const gradient = GRADIENTS[hash % GRADIENTS.length];

  return {
    id: Math.random().toString(36).substr(2, 9),
    fileName: file.name,
    title,
    features,
    url: URL.createObjectURL(file),
    blob: file,
    gradient
  };
};

export const getFeaturesList = (tracks: MusicTrack[]): string[] => {
  const allFeatures = tracks.flatMap(t => t.features);
  return Array.from(new Set(allFeatures)).sort();
};
