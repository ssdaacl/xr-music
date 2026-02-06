
import React, { useEffect, useRef } from 'react';

interface IntroProps {
  onEnter: () => void;
}

const Intro: React.FC<IntroProps> = ({ onEnter }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 5 + 1; // Circle size
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.2 + 0.05;
      }

      update(width: number, height: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > width) this.x = 0;
        else if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        else if (this.y < 0) this.y = height;
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = `rgba(26, 26, 26, ${this.opacity})`;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
      }
    }

    const init = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      const particleCount = Math.floor((width * height) / 12000);
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(width, height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', init);
    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <div 
      onClick={onEnter}
      className="fixed inset-0 bg-[#F8F7F4] flex flex-col items-center justify-center cursor-pointer group overflow-hidden"
    >
      {/* Particle Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none opacity-60"
      />

      <div className="relative z-10 flex flex-col items-center">
        <h1 
          className="serif text-8xl md:text-[12rem] font-light tracking-tighter text-[#1A1A1A] transition-transform duration-1000 group-hover:scale-105 animate-text-reveal"
          style={{ animationDelay: '0.2s' }}
        >
          XR Music
        </h1>
        <div className="mt-8 flex flex-col items-center transition-all duration-700">
          <div 
            className="w-px bg-[#1A1A1A] animate-line-grow"
            style={{ animationDelay: '0.8s' }}
          ></div>
          <p 
            className="serif italic text-lg pt-6 opacity-40 group-hover:opacity-100 transition-opacity animate-text-reveal"
            style={{ animationDelay: '1.2s' }}
          >
            Click to enter the space
          </p>
        </div>
      </div>

      {/* Decorative Minimal Borders */}
      <div className="absolute top-12 left-12 w-12 h-px bg-[#1A1A1A] opacity-5"></div>
      <div className="absolute top-12 left-12 h-12 w-px bg-[#1A1A1A] opacity-5"></div>
      <div className="absolute bottom-12 right-12 w-12 h-px bg-[#1A1A1A] opacity-5"></div>
      <div className="absolute bottom-12 right-12 h-12 w-px bg-[#1A1A1A] opacity-5"></div>
    </div>
  );
};

export default Intro;
