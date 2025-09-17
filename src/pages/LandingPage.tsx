import { useState } from "react";
import { motion } from "framer-motion";
import { MagicalTransition, SparkleEffect } from "@/components/MagicalTransition";
import tanjiroImage from "@/assets/tanjiro-running.png";
import narutoImage from "@/assets/naruto-jumping.png";
import luffyImage from "@/assets/luffy-fighting.png";
import gokuImage from "@/assets/goku-fighting.png";
import natsuImage from "@/assets/natsu-fire.png";
import ichigoImage from "@/assets/ichigo-sword.png";

interface LandingPageProps {
  onNameSubmit: (name: string) => void;
}

export default function LandingPage({ onNameSubmit }: LandingPageProps) {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.toLowerCase().trim() === "dottie") {
      setIsSubmitting(true);
      setTimeout(() => {
        onNameSubmit(name);
      }, 2000);
    } else {
      // Shake animation for wrong name
      const input = document.querySelector('.magic-input');
      input?.classList.add('animate-pulse');
      setTimeout(() => {
        input?.classList.remove('animate-pulse');
      }, 1000);
    }
  };

  return (
    <MagicalTransition className="min-h-screen w-full relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 animated-bg" />
      
      {/* Floating Anime Characters */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 opacity-80"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img src={tanjiroImage} alt="Tanjiro" className="w-full h-full object-contain drop-shadow-2xl" />
      </motion.div>

      <motion.div
        className="absolute top-40 right-16 w-36 h-36 opacity-80"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <img src={narutoImage} alt="Naruto" className="w-full h-full object-contain drop-shadow-2xl" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-20 w-34 h-34 opacity-80"
        animate={{
          x: [0, 60, 0],
          y: [0, -20, 0],
          rotate: [0, 4, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <img src={luffyImage} alt="Luffy" className="w-full h-full object-contain drop-shadow-2xl" />
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-5 w-28 h-28 opacity-75"
        animate={{
          x: [0, 30, 0],
          y: [0, -40, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      >
        <img src={gokuImage} alt="Goku" className="w-full h-full object-contain drop-shadow-2xl" />
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-10 w-30 h-30 opacity-75"
        animate={{
          x: [0, -35, 0],
          y: [0, 25, 0],
          rotate: [0, 3, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      >
        <img src={natsuImage} alt="Natsu" className="w-full h-full object-contain drop-shadow-2xl" />
      </motion.div>

      <motion.div
        className="absolute top-32 right-32 w-32 h-32 opacity-70"
        animate={{
          x: [0, -45, 0],
          y: [0, 30, 0],
          rotate: [0, -4, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      >
        <img src={ichigoImage} alt="Ichigo" className="w-full h-full object-contain drop-shadow-2xl" />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-anime-sparkle rounded-full"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-8">
        <motion.div
          className="text-center max-w-md w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-8 glow-text"
            animate={{
              textShadow: [
                "0 0 20px rgba(168, 85, 247, 0.8)",
                "0 0 40px rgba(168, 85, 247, 1)",
                "0 0 20px rgba(168, 85, 247, 0.8)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨ Magical ✨
            <br />
            <span className="text-anime-gold">Birthday</span>
            <br />
            <span className="text-anime-pink">Surprise</span>
          </motion.h1>

          <motion.p
            className="text-xl mb-8 text-anime-white/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            A special surprise awaits...
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter My name to unlock the surprise 🎁"
                className="magic-input w-full text-center text-lg"
                required
                disabled={isSubmitting}
              />
            </motion.div>

            <motion.button
              type="submit"
              className="magic-button text-lg font-bold w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              {isSubmitting ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  ✨ Opening Portal ✨
                </motion.span>
              ) : (
                "🔓 Unlock the Magic"
              )}
            </motion.button>
          </form>

          {name && name.toLowerCase().trim() !== "dottie" && (
            <motion.p
              className="text-anime-pink mt-4 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Hmm... that doesn't seem right. Try again! 💫
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Sparkle Effects */}
      {isSubmitting && <SparkleEffect count={30} />}
    </MagicalTransition>
  );
}