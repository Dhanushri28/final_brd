import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagicalTransition } from "@/components/MagicalTransition";
import GalaxyBackground from "@/components/GalaxyBackground";
import cakeImage from "@/assets/birthday-cake.png";

export default function BirthdayCakePage() {
  const [candlesPlaced, setCandlesPlaced] = useState(true); // Candles are placed first
  const [candlesLit, setCandlesLit] = useState(false);
  const [candlesBlownOut, setCandlesBlownOut] = useState(false);
  const [showWishCard, setShowWishCard] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [micPermission, setMicPermission] = useState<boolean | null>(null);

  const lightCandles = () => {
    setCandlesLit(true);
    setTimeout(() => {
      startMicrophoneListening();
    }, 2000);
  };

  const blowCandles = () => {
    if (candlesLit && !candlesBlownOut) {
      setCandlesBlownOut(true);
      setIsListening(false);
      
      // Play celebration music (if available)
      setTimeout(() => {
        setShowWishCard(true);
      }, 1500);
    }
  };

  const startMicrophoneListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicPermission(true);
      setIsListening(true);
      
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      
      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;
      microphone.connect(analyser);
      
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      
      const detectBlow = () => {
        if (!isListening) return;
        
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        
        // Detect sudden increase in audio level (blowing sound)
        if (average > 30) { // Threshold for blow detection
          blowCandles();
          stream.getTracks().forEach(track => track.stop());
          audioContext.close();
          return;
        }
        
        requestAnimationFrame(detectBlow);
      };
      
      detectBlow();
      
    } catch (error) {
      console.log('Microphone access denied, falling back to click');
      setMicPermission(false);
      setIsListening(true);
    }
  };

  // Fallback: Simple blow detection for desktop (click) and mobile (touch)
  useEffect(() => {
    if (isListening && micPermission === false) {
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.code === 'Space' || e.key === ' ') {
          blowCandles();
        }
      };

      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [isListening, micPermission, candlesLit, candlesBlownOut]);

  return (
    <MagicalTransition className="min-h-screen w-full relative overflow-hidden">
      {/* Galaxy Background */}
      <GalaxyBackground />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-anime-deep-blue/30 to-anime-magic-purple/30" />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8">
        {!showWishCard ? (
          <motion.div
            className="text-center max-w-4xl w-full"
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
              🎂  Close your Eyes and Make a Wish, Kishan!!! 🎂
            </motion.h1>

            {/* 3D Cake Scene */}
            <div className="relative mb-8">
              <motion.div
                className="relative mx-auto"
                style={{ width: '400px', height: '400px' }}
                animate={candlesBlownOut ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1 }}
              >
                {/* Table */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-br from-amber-700 to-amber-900 rounded-full shadow-2xl" />
                
                {/* Cake Base */}
                <motion.div
                  className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-80 h-64 overflow-hidden rounded-t-full"
                  animate={candlesBlownOut ? { filter: "brightness(1.2)" } : {}}
                >
                  <img
                    src={cakeImage}
                    alt="Birthday Cake"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Candles (always visible when placed) */}
                <AnimatePresence>
                  {candlesPlaced && (
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                          key={`candle-${i}`}
                          className="w-2 h-12 bg-gradient-to-t from-amber-600 to-amber-400 rounded-full"
                          initial={{ scale: 0, y: 20 }}
                          animate={{ scale: 1, y: 0 }}
                          transition={{ 
                            duration: 0.6,
                            delay: i * 0.1,
                            type: "spring",
                            stiffness: 200
                          }}
                        />
                      ))}
                    </div>
                  )}
                </AnimatePresence>

                {/* Candle Flames */}
                <AnimatePresence>
                  {candlesLit && !candlesBlownOut && (
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex space-x-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                          key={`flame-${i}`}
                          className="w-3 h-6 bg-gradient-to-t from-anime-gold to-anime-bright-gold rounded-full"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ 
                            scale: [0, 1.2, 1],
                            opacity: 1,
                            y: [0, -2, 0]
                          }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ 
                            duration: 0.5,
                            delay: i * 0.2,
                            y: { duration: 2, repeat: Infinity }
                          }}
                        />
                      ))}
                    </div>
                  )}
                </AnimatePresence>

                {/* Smoke effect after blowing */}
                <AnimatePresence>
                  {candlesBlownOut && (
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex space-x-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                          key={`smoke-${i}`}
                          className="w-1 h-8 bg-gray-400 opacity-60 rounded-full"
                          initial={{ scale: 0, y: 0 }}
                          animate={{ 
                            scale: [0, 1, 0],
                            y: -50,
                            opacity: [0, 0.6, 0]
                          }}
                          transition={{ 
                            duration: 3,
                            delay: i * 0.1
                          }}
                        />
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Instructions */}
            <AnimatePresence mode="wait">
              {candlesPlaced && !candlesLit && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <p className="text-xl text-anime-white mb-6">
                    Perfect! Now let's light the candles! ✨
                  </p>
                  <motion.button
                    onClick={lightCandles}
                    className="magic-button text-lg font-bold px-8 py-4"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ 
                      boxShadow: [
                        "0 0 20px rgba(245, 158, 11, 0.5)",
                        "0 0 40px rgba(245, 158, 11, 0.8)",
                        "0 0 20px rgba(245, 158, 11, 0.5)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🔥 Light the Candles
                  </motion.button>
                </motion.div>
              )}

              {candlesLit && !candlesBlownOut && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <motion.p
                    className="text-xl text-anime-white mb-4"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Now make a wish and blow out the candles! 💨
                  </motion.p>
                  
                  {micPermission === true && (
                    <motion.p
                      className="text-anime-gold text-sm mb-4"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      🎤 Blow into your microphone now!
                    </motion.p>
                  )}
                  
                  {micPermission === false && (
                    <p className="text-anime-white/80 text-sm mb-4">
                      Press SPACE or click the button to blow!
                    </p>
                  )}
                  
                  <motion.button
                    onClick={blowCandles}
                    className="magic-button text-lg font-bold px-8 py-4"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ boxShadow: [
                      "0 0 20px rgba(6, 182, 212, 0.5)",
                      "0 0 40px rgba(6, 182, 212, 0.8)",
                      "0 0 20px rgba(6, 182, 212, 0.5)"
                    ]}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    💨 Blow the Candles.....
                  </motion.button>
                </motion.div>
              )}

              {candlesBlownOut && !showWishCard && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center"
                >
                  <motion.p
                    className="text-2xl text-anime-gold mb-4"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✨ Wish made! ✨
                  </motion.p>
                  <p className="text-anime-white">
                    Something magical is about to happen...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 200 }}
          >
            {/* Wish Card */}
            <motion.div
              className="bg-gradient-to-br from-anime-pink/20 to-anime-bright-purple/20 backdrop-blur-lg border-2 border-anime-gold/30 rounded-3xl p-8 shadow-2xl"
              animate={{
                boxShadow: [
                  "0 0 30px rgba(245, 158, 11, 0.3)",
                  "0 0 60px rgba(245, 158, 11, 0.6)",
                  "0 0 30px rgba(245, 158, 11, 0.3)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.h2
                className="text-4xl font-bold mb-6 glow-text"
                animate={{ textShadow: [
                  "0 0 20px rgba(245, 158, 11, 0.8)",
                  "0 0 40px rgba(245, 158, 11, 1)",
                  "0 0 20px rgba(245, 158, 11, 0.8)",
                ]}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎉 Happy Birthday, Kishan!!🎉
              </motion.h2>
              
              <motion.div
                className="text-lg text-anime-white leading-relaxed space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <p>
                  💖 On this special day, may all your dreams come true and your heart be filled with joy and wonder!
                </p>
                <p>
                  ✨ You bring so much light and happiness to everyone around you, just like the magical anime worlds we love!
                </p>
                <p>
                  🌟 Wishing you a year ahead filled with amazing adventures, beautiful memories, and endless possibilities and lots of achievements!!!!
                </p>
                <p className="text-anime-gold font-semibold text-xl">
                  May your birthday be as magical as you are! 🎂💫
                </p>
              </motion.div>

              {/* Floating hearts */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-2xl"
                    animate={{
                      y: [100, -100],
                      x: [0, Math.random() * 100 - 50],
                      rotate: [0, 360],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 4,
                      delay: i * 0.5,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                    style={{
                      left: `${Math.random() * 100}%`,
                      bottom: 0
                    }}
                  >
                    💖
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Final message */}
            <motion.p
              className="mt-8 text-anime-sparkle text-lg font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
            >
              🎊 Hope your special day was absolutely magical! 🎊
            </motion.p>
          </motion.div>
        )}
      </div>

      {/* Celebration confetti */}
      {showWishCard && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-anime-gold rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -20,
                rotate: 0
              }}
              animate={{
                y: window.innerHeight + 20,
                rotate: 360,
                opacity: [1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 3,
                repeat: Infinity,
                repeatDelay: 5
              }}
            />
          ))}
        </div>
      )}
    </MagicalTransition>
  );
}