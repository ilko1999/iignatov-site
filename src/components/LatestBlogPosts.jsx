import React from 'react';
import { motion } from 'framer-motion';
import BlogPostCard from './BlogPostCard';

const LatestBlogPosts = ({ posts }) => {
  // Only show the latest 2 posts
  const latestPosts = posts.slice(0, 2);

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  // Section title animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  // Link to all posts animation variants
  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.8,
      },
    },
    hover: {
      x: 5,
      color: 'var(--primary)',
      transition: {
        type: 'spring',
        stiffness: 400,
      },
    },
  };

  return (
    <motion.div className="mt-16" initial="hidden" animate="visible" variants={containerVariants}>
      <div className="flex justify-between items-center mb-8">
        <motion.h2 className="text-2xl font-bold" variants={titleVariants}>
          Latest Articles
        </motion.h2>

        <motion.a
          href="/blog"
          className="btn btn-ghost btn-sm flex items-center gap-2"
          variants={linkVariants}
          whileHover="hover"
        >
          View all articles
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </motion.a>
      </div>

      {latestPosts.length > 0 ? (
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestPosts.map((post, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: 'easeOut',
                  },
                },
              }}
            >
              <BlogPostCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div className="card bg-base-200 p-8 text-center" variants={titleVariants}>
          <h3 className="text-xl mb-2">No blog posts yet</h3>
          <p className="opacity-70">Check back soon for new content!</p>
        </motion.div>
      )}

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
    </motion.div>
  );
};

export default LatestBlogPosts;
