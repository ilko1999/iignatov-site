import React from 'react';
import { motion } from 'framer-motion';
import BlogPostCard from './BlogPostCard';

const BlogPostGrid = ({ posts }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {posts.map((post, index) => (
        <BlogPostCard post={post} />
      ))}
    </motion.div>
  );
};

export default BlogPostGrid;
