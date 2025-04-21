import React from 'react';
import { motion } from 'framer-motion';

const AnimatedSection = ({
  children,
  delay = 0,
  direction = 'up', // "up", "down", "left", "right"
  type = 'spring', // "spring", "tween"
  duration = 0.8,
  className = '',
  once = true,
  threshold = 0.1,
}) => {
  // Set initial animation values based on direction
  const getInitialValues = () => {
    switch (direction) {
      case 'up':
        return { y: 80, opacity: 0 };
      case 'down':
        return { y: -80, opacity: 0 };
      case 'left':
        return { x: 80, opacity: 0 };
      case 'right':
        return { x: -80, opacity: 0 };
      default:
        return { y: 80, opacity: 0 };
    }
  };

  // Animation configurations
  const variants = {
    hidden: getInitialValues(),
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        delay: delay,
        duration: duration,
        type: type,
        stiffness: type === 'spring' ? 70 : undefined,
        damping: type === 'spring' ? 20 : undefined,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, threshold }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
