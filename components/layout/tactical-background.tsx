'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDelay: number;
  twinkleDuration: number;
  color: string;
}

interface CosmicDust {
  id: number;
  x: number;
  y: number;
  size: number;
  drift: number;
  duration: number;
}

export function TacticalBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [cosmicDust, setCosmicDust] = useState<CosmicDust[]>([]);

  useEffect(() => {
    // Generate twinkling stars with emerald/fuchsia colors
    const starCount = 100;
    const colors = ['rgb(16, 185, 129)', 'rgb(232, 121, 249)']; // emerald-500 and fuchsia-500
    const newStars = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      opacity: Math.random() * 0.5 + 0.5,
      twinkleDelay: Math.random() * 5,
      twinkleDuration: Math.random() * 3 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setStars(newStars);

    // Generate cosmic dust particles
    const dustCount = 40;
    const newDust = Array.from({ length: dustCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 3,
      drift: Math.random() * 60 - 30,
      duration: Math.random() * 30 + 20,
    }));
    setCosmicDust(newDust);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Twinkling Stars - Emerald & Fuchsia */}
      {stars.map((star) => (
        <motion.div
          key={`star-${star.id}`}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.4, star.opacity],
            scale: [1, 0.7, 1],
          }}
          transition={{
            duration: star.twinkleDuration,
            repeat: Infinity,
            delay: star.twinkleDelay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Cosmic Dust - Slow Drifting Particles */}
      {cosmicDust.map((dust) => (
        <motion.div
          key={`dust-${dust.id}`}
          className="absolute rounded-full"
          style={{
            left: `${dust.x}%`,
            top: `${dust.y}%`,
            width: `${dust.size}px`,
            height: `${dust.size}px`,
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, dust.drift, 0],
            y: [0, -30, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: dust.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Nebula Clouds - More Visible */}
      <motion.div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-0 right-1/4 w-[700px] h-[700px] rounded-full blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(232, 121, 249, 0.12) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
      />

    </div>
  );
}
