import React from 'react';
import { motion } from 'framer-motion';

function AnimatedDivider() {
  return (
    <motion.div
      className="divider my-8"
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{
        opacity: 1,
        scaleX: 1,
        transition: {
          duration: 0.8,
          delay: 0.5,
        },
      }}
    ></motion.div>
  );
}

export default AnimatedDivider;
