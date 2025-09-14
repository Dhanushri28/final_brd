import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MagicalTransitionProps {
  children: ReactNode;
  className?: string;
}

export const MagicalTransition = ({ children, className = "" }: MagicalTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.4, 0, 0.2, 1],
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const SparkleEffect = ({ count = 20 }: { count?: number }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-anime-sparkle rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
};