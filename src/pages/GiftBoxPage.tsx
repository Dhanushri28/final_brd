import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagicalTransition } from "@/components/MagicalTransition";
import GalaxyBackground from "@/components/GalaxyBackground";

// Import all memory images
import memory1 from "@/assets/memory-1.png";
import memory2 from "@/assets/memory-2.png";
import memory3 from "@/assets/memory-3.png";
import memory4 from "@/assets/memory-4.png";
import memory5 from "@/assets/memory-5.png";
import memory6 from "@/assets/memory-6.png";
import memory7 from "@/assets/memory-7.png";
import memory8 from "@/assets/memory-8.png";
import memory9 from "@/assets/memory-9.png";
import memory10 from "@/assets/memory-10.png";
import memory11 from "@/assets/memory-11.png";
import memory12 from "@/assets/memory-12.png";

const memories = [
  memory1, memory2, memory3, memory4, memory5, memory6,
  memory7, memory8, memory9, memory10, memory11, memory12
];

interface GiftBoxPageProps {
  onNextStep: () => void;
}

export default function GiftBoxPage({ onNextStep }: GiftBoxPageProps) {
  const [isBoxOpened, setIsBoxOpened] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [showScrollPrompt, setShowScrollPrompt] = useState(false);

  const handleBoxClick = () => {
    if (!isBoxOpened) {
      setIsBoxOpened(true);
      // Confetti effect
      createConfetti();
      
      setTimeout(() => {
        setShowImages(true);
        setTimeout(() => {
          setShowScrollPrompt(true);
        }, 2000);
      }, 1000);
    }
  };

  const createConfetti = () => {
    const colors = ['#a855f7', '#ec4899', '#f59e0b', '#06b6d4'];
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => {
          confetti.remove();
        }, 3000);
      }, i * 100);
    }
  };

  return (
    <MagicalTransition className="min-h-screen w-full relative overflow-hidden">
      {/* Galaxy Background */}
      <GalaxyBackground />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-anime-deep-blue/30 to-anime-magic-purple/30" />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8">
        {!showImages ? (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-8 glow-text"
              animate={{
                textShadow: [
                  "0 0 20px rgba(245, 158, 11, 0.8)",
                  "0 0 40px rgba(245, 158, 11, 1)",
                  "0 0 20px rgba(245, 158, 11, 0.8)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎁 Your Special Gift 🎁
            </motion.h1>

            {/* 3D Gift Box */}
            <motion.div
              className="relative cursor-pointer"
              onClick={handleBoxClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-64 h-64 mx-auto relative"
                animate={isBoxOpened ? {
                  rotateY: [0, 180, 360],
                  scale: [1, 1.2, 1],
                } : {}}
                transition={{ duration: 2 }}
              >
                {/* Gift Box Base */}
                <div className="absolute inset-0 bg-gradient-to-br from-anime-pink to-anime-bright-purple rounded-xl shadow-2xl transform-gpu preserve-3d">
                  <div className="absolute inset-2 bg-gradient-to-br from-anime-gold to-anime-bright-gold rounded-lg opacity-20" />
                </div>

                {/* Gift Box Lid */}
                <motion.div
                  className="absolute -top-8 left-4 right-4 h-16 bg-gradient-to-br from-anime-gold to-anime-bright-gold rounded-t-xl shadow-lg"
                  animate={isBoxOpened ? { 
                    rotateX: -90,
                    y: -20,
                    transformOrigin: "bottom"
                  } : {}}
                  transition={{ duration: 1, delay: 0.5 }}
                />

                {/* Ribbon Vertical */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-full bg-anime-cyan shadow-lg" />
                
                {/* Ribbon Horizontal */}
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-8 bg-anime-cyan shadow-lg" />

                {/* Bow */}
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-anime-pink rounded-full shadow-lg"
                  animate={isBoxOpened ? { scale: 0, opacity: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1 }}
                />
              </motion.div>

              {!isBoxOpened && (
                <motion.p
                  className="text-xl text-anime-white mt-8"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Click to open! ✨
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className="w-full max-w-6xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-8 glow-text"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              💖 Beautiful Memories 💖
            </motion.h2>

            {/* Image Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {memories.map((memory, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300
                  }}
                >
                  <div className="w-48 h-48 mx-auto overflow-hidden rounded-xl shadow-2xl transform-gpu transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]">
                    <img
                      src={memory}
                      alt={`Memory ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Sparkle overlay */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                      background: [
                        "radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
                        "radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.3) 0%, transparent 50%)",
                        "radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>
              ))}
            </div>

            <AnimatePresence>
              {showScrollPrompt && (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.p
                    className="text-2xl text-anime-white mb-6"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Scroll down for more magic! ⬇️
                  </motion.p>

                  <motion.button
                    onClick={onNextStep}
                    className="magic-button text-xl font-bold px-12 py-4"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: "spring" }}
                  >
                    🎂 Click Here for the Final Surprise 🎂
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </MagicalTransition>
  );
}