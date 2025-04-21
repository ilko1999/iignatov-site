import React from 'react';
import { motion } from 'framer-motion';

const BlogPostCard = ({ post }) => {
  const { frontmatter, url } = post;

  // Card animation variants

  // Tag animation variants with staggered children
  const tagContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <motion.a
      href={url}
      className="group card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {frontmatter.image && frontmatter.image.url && (
        <figure className="h-48 overflow-hidden">
          <motion.img
            src={frontmatter.image.url}
            alt={frontmatter.image.alt || frontmatter.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
        </figure>
      )}

      <div className="card-body">
        <motion.div className="flex flex-wrap gap-2 mb-2" variants={tagContainerVariants}>
          {frontmatter.tags &&
            frontmatter.tags.slice(0, 3).map((tag, index) => (
              <motion.span
                key={index}
                class="badge badge-soft badge-primary"
                variants={tagVariants}
              >
                {tag}
              </motion.span>
            ))}
        </motion.div>

        <motion.h2
          className="card-title text-xl font-bold group-hover:text-primary transition-colors"
          variants={textVariants}
        >
          {frontmatter.title}
        </motion.h2>

        <motion.p className="opacity-75 line-clamp-3 mb-4" variants={textVariants}>
          {frontmatter.description}
        </motion.p>

        <motion.div
          className="flex justify-between items-center text-sm opacity-70"
          variants={textVariants}
        >
          <time dateTime={frontmatter.pubDate.toString().slice(0, 10)}>
            {new Date(frontmatter.pubDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </time>

          <motion.span
            className="flex items-center gap-1"
            whileHover={{ x: 3 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            Read more
          </motion.span>
        </motion.div>
      </div>
    </motion.a>
  );
};

export default BlogPostCard;
