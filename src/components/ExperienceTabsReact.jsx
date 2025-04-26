import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Individual work item component
const WorkItem = ({ item, index }) => (
  <motion.div
    className="mb-12 relative"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.5,
      delay: index * 0.1,
      ease: [0.25, 0.1, 0.25, 1.0],
    }}
  >
    <div className="flex">
      {/* Logo */}
      <motion.div
        className="z-10 mr-6"
        initial={{ scale: 1 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.2 + index * 0.1,
          type: 'spring',
          stiffness: 200,
        }}
      >
        <div className="avatar">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden bg-base-100">
            <img src={item.logo} alt={item.company} className="w-8 h-8 " />
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1">
        <motion.div
          className="text-sm opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
        >
          {item.period}
        </motion.div>
        <motion.h3
          className="text-xl font-bold mt-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
        >
          {item.company}
        </motion.h3>
        <motion.div
          className="text-lg opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
        >
          {item.role}
        </motion.div>

        <motion.ul
          className="mt-4 list-disc list-inside pl-4 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
        >
          {item.achievements.map((achievement, index) => (
            <motion.li
              key={index}
              className="opacity-90"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.6 + index * 0.1,
                ease: 'easeOut',
              }}
            >
              {achievement}
            </motion.li>
          ))}
        </motion.ul>

        {/* Tech Skills Badges */}
        {item.skills && item.skills.length > 0 && (
          <motion.div
            className="mt-4 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.7 + (item.achievements?.length || 0) * 0.05,
              ease: 'easeOut',
            }}
          >
            {item.skills.map((skill, idx) => (
              <span key={idx} className="badge badge-primary badge-outline">
                {skill}
              </span>
            ))}
          </motion.div>
        )}

        {item.links && item.links.length > 0 && (
          <motion.div
            className="mt-4 flex gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.7 + item.achievements.length * 0.05,
              ease: 'easeOut',
            }}
          >
            {item.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-soft btn-primary"
              >
                <span className="mr-1">{link.name}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  </motion.div>
);

// Individual education item component
const EducationItem = ({ item, index }) => (
  <motion.div
    className="mb-12 relative"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.5,
      delay: index * 0.1,
      ease: [0.25, 0.1, 0.25, 1.0],
    }}
  >
    <div className="flex">
      {/* Logo */}
      <motion.div
        className="z-10 mr-6"
        initial={{ scale: 1 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.2 + index * 0.1,
          type: 'spring',
          stiffness: 200,
        }}
      >
        <div className="avatar">
          <div className="w-12 h-12 rounded-lg  flex items-center justify-center overflow-hidden bg-[#f1f1f1]">
            <img src={item.logo} alt={item.institution} className="w-8 h-8 " />
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1">
        <motion.div
          className="text-sm opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
        >
          {item.period}
        </motion.div>
        <motion.h3
          className="text-xl font-bold mt-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
        >
          {item.institution}
        </motion.h3>
        <motion.div
          className="text-lg opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
        >
          {item.degree}
        </motion.div>

        <motion.ul
          className="mt-4 list-disc list-inside pl-4 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
        >
          {item.achievements.map((achievement, i) => (
            <motion.li
              key={i}
              className="opacity-90"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.6 + i * 0.1,
                ease: 'easeOut',
              }}
            >
              {achievement}
            </motion.li>
          ))}
        </motion.ul>

        {/* Tech Skills Badges */}
        {item.skills && item.skills.length > 0 && (
          <motion.div
            className="mt-4 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.7 + (item.achievements?.length || 0) * 0.05,
              ease: 'easeOut',
            }}
          >
            {item.skills.map((skill, idx) => (
              <span key={idx} className="badge badge-primary badge-outline">
                {skill}
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  </motion.div>
);

// Variants for Framer Motion animations
const tabContentVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const workVariants = {
  enter: { x: -50, opacity: 0 },
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0],
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    x: 50,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

const educationVariants = {
  enter: { x: 50, opacity: 0 },
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0],
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    x: -50,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

// Timeline line animation
const lineVariants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 1,
      ease: 'easeOut',
      delay: 0.2,
    },
  },
};

const ExperienceTabsReact = ({ workData, educationData, initialTab = 'work' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  return (
    <>
      {/* Tabs */}
      <motion.div
        className="tabs tabs-boxed w-full mb-6 bg-base-200 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
        }}
      >
        <button
          className={`tab flex-1 relative transition-all duration-300 ease-in-out ${
            activeTab === 'work' ? 'tab-active font-bold' : ''
          }`}
          onClick={() => handleTabChange('work')}
        >
          Work
          {activeTab === 'work' && (
            <motion.div
              className="absolute bottom-1  left-1 right-0 h-[80%] rounded-lg bg-primary/10"
              layoutId="activeTab"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </button>
        <button
          className={`tab flex-1 relative transition-all duration-300 ease-in-out ${
            activeTab === 'education' ? 'tab-active font-bold' : ''
          }`}
          onClick={() => handleTabChange('education')}
        >
          Education
          {activeTab === 'education' && (
            <motion.div
              className="absolute bottom-1  left-1 right-0 h-[80%] rounded-lg bg-primary/10"
              layoutId="activeTab"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </button>
      </motion.div>

      {/* Content */}
      <motion.div
        className="bg-base-200 rounded-xl p-6 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.1,
          ease: 'easeOut',
        }}
      >
        {/* Timeline container */}
        <div className="relative">
          {/* Vertical line */}
          <AnimatePresence mode="wait">
            {activeTab === 'work' ? (
              <motion.div
                key="work"
                initial="enter"
                animate="center"
                exit="exit"
                variants={workVariants}
              >
                <motion.div
                  className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/30 z-0"
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                ></motion.div>

                {workData.map((item, index) => (
                  <WorkItem key={item.id} item={item} index={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="education"
                initial="enter"
                animate="center"
                exit="exit"
                variants={educationVariants}
              >
                <motion.div
                  className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/30 z-0"
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                ></motion.div>

                {educationData.map((item, index) => (
                  <EducationItem key={item.id} item={item} index={index} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};

export default ExperienceTabsReact;
