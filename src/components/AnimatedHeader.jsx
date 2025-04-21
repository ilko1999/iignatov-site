import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const AnimatedHeader = ({ className = '' }) => {
  const [scrollY, setScrollY] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);
  const { scrollY: scrollYProgress } = useScroll();

  // Transform opacity based on scroll position
  const opacity = useTransform(scrollYProgress, [0, 200], [0.95, 0.85], { clamp: true });

  // Add background blur that increases with scroll
  const backdropBlur = useTransform(scrollYProgress, [0, 200], [5, 12], { clamp: true });

  // Change border opacity with scroll
  const borderOpacity = useTransform(scrollYProgress, [0, 200], [0.1, 0.2], { clamp: true });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants for the dock
  const dockVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1,
      },
    },
  };

  // Menu items data
  const menuItems = [
    { name: 'Home', href: '/', icon: 'home' },
    { name: 'Blog', href: '/blog', icon: 'edit-2' },
    { name: 'GitHub', href: 'https://github.com/ilko1999', icon: 'github', external: true },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/iliyan-ignatov-35b65717b/',
      icon: 'linkedin',
      external: true,
    },
  ];

  // SVG icons mapping
  const icons = {
    home: <span>~/</span>,
    'edit-2': <span>blog</span>,
    github: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    ),
    linkedin: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
  };

  // Function to calculate scale based on distance from hovered item

  return (
    <div className="flex justify-center w-full fixed top-8 z-50">
      <motion.div
        ref={containerRef}
        style={{
          opacity,
          backdropFilter: `blur(${backdropBlur}px)`,
          borderColor: `rgba(255, 255, 255, ${borderOpacity})`,
        }}
        variants={dockVariants}
        initial="visible"
        className={`rounded-full bg-base-100/60 backdrop-blur-md border border-white/10 shadow-lg px-4 py-1 flex items-center gap-4 md:gap-8 ${className}`}
      >
        {menuItems.map((item, index) => {
          // Determine what to render based on item type
          const renderItem = () => {
            if (item.isButton) {
              return (
                <motion.button
                  key={index}
                  className="p-2 relative"
                  animate={{
                    y: hoveredIndex === index ? -8 : 0,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 15,
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  whileTap={{ scale: 0.9, rotate: 180, transition: { duration: 0.3 } }}
                >
                  {icons[item.icon]}
                  <motion.span
                    className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium opacity-0 whitespace-nowrap"
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      y: hoveredIndex === index ? 0 : -5,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                  </motion.span>
                </motion.button>
              );
            }

            return (
              <motion.a
                key={index}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="p-2 relative"
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 15,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileTap={{ scale: 0.9 }}
                whileHover={{
                  opacity: 0.8,
                }}
              >
                {icons[item.icon]}
              </motion.a>
            );
          };

          return renderItem();
        })}
      </motion.div>
    </div>
  );
};

export default AnimatedHeader;
