import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageTransition = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.5, ease: 'easeInOut' },
        }}
        exit={{
          opacity: 0,
          transition: { duration: 0.5, ease: 'easeInOut' },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
