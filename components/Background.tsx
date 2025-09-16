
import React from 'react';
import { motion } from 'framer-motion';

const Particle: React.FC = () => {
  const size = Math.random() * 3 + 1;
  const duration = Math.random() * 5 + 5; // 5 to 10 seconds
  const delay = Math.random() * 5;

  return (
    <motion.div
      className="absolute rounded-full bg-white/30 dark:bg-white/10"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      }}
      initial={{ y: 0, opacity: 0 }}
      animate={{ 
        y: [0, -20, 0],
        opacity: [0, 0.7, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay: delay,
      }}
    />
  );
};

const Background: React.FC = () => {
  const particles = Array.from({ length: 50 });

  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-800 dark:to-black transition-colors duration-500">
      {particles.map((_, i) => (
        <Particle key={i} />
      ))}
    </div>
  );
};

export default Background;
