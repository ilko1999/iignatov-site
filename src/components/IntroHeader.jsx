import React from 'react';
import { motion } from 'framer-motion';

const IntroHeader = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const avatarVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: 'easeOut',
      },
    },
  };

  const waveEmoji = () => {
    return {
      rotate: [0, 15, -15, 15, -15, 0],
      transition: {
        duration: 1,
        ease: 'easeInOut',
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
      },
    };
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-10 mt-16">
      <motion.div
        className="flex flex-col gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="text-5xl mb-2 font-serif font-extrabold" variants={itemVariants}>
          hi im Iliyan{' '}
          <motion.span
            className="wave-emoji inline-block cursor-default"
            animate={waveEmoji()}
            whileHover={waveEmoji()}
          >
            👋
          </motion.span>
        </motion.h1>

        <motion.p className="text-lg mb-4 font-light" variants={itemVariants}>
          25-year-old software developer from <span className="font-bold ">Bulgaria 🇧🇬</span>
        </motion.p>

        <motion.p className="text-md mb-6 font-light" variants={itemVariants}>
          I like to develop full-stack, drink V60 coffee and use my white scottish fold cat{' '}
          <span className="font-bold">(Mochi)</span> as a rubber ducky.
        </motion.p>
      </motion.div>

      <motion.div className="avatar" variants={avatarVariants} initial="hidden" animate="visible">
        <div className="w-54 rounded-lg">
          <img src="/images/me.jpeg" alt="Iliyan Ignatov" />
        </div>
      </motion.div>
    </div>
  );
};

export default IntroHeader;
