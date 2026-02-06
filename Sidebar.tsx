
import React from 'react';

interface SidebarProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  totalCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({ categories, activeCategory, onSelectCategory, totalCount }) => {
  return (
    <aside className="w-64 border-r border-[#E8E8E8] h-full overflow-y-auto p-8 bg-[#FAF9F6]">
      <div className="mb-12">
        <h2 className="text-[10px] tracking-[0.3em] uppercase opacity-40 font-semibold mb-6">Archive Filter</h2>
        <ul className="space-y-4">
          <li>
            <button 
              onClick={() => onSelectCategory('All')}
              className={`text-sm tracking-wide transition-all duration-300 flex items-center gap-3 ${activeCategory === 'All' ? 'opacity-100 font-medium' : 'opacity-40 hover:opacity-100'}`}
            >
              <span className={`w-1 h-1 rounded-full bg-[#1A1A1A] ${activeCategory === 'All' ? 'scale-100' : 'scale-0'} transition-transform`}></span>
              ALL WORKS <span className="text-[10px] ml-auto">({totalCount})</span>
            </button>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-[10px] tracking-[0.3em] uppercase opacity-40 font-semibold mb-6">Features</h2>
        <ul className="space-y-4">
          {categories.map((cat) => (
            <li key={cat}>
              <button 
                onClick={() => onSelectCategory(cat)}
                className={`text-sm tracking-wide transition-all duration-300 flex items-center gap-3 text-left w-full ${activeCategory === cat ? 'opacity-100 font-medium' : 'opacity-40 hover:opacity-100'}`}
              >
                <span className={`w-1 h-1 rounded-full bg-[#1A1A1A] ${activeCategory === cat ? 'scale-100' : 'scale-0'} transition-transform`}></span>
                {cat.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-24 pt-8 border-t border-[#E8E8E8] opacity-30">
        <p className="text-[10px] leading-relaxed">
          Curating audio experiences with architectural precision. Use the filters to navigate the sonic landscape.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
