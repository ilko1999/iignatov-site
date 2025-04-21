import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname, resolve } from 'path';

// Configure Markdown parser with all the features we need
const parser = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
});

export async function GET(context) {
  // Get the root directory for the project
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const rootDir = resolve(__dirname, '../../..');

  // Use glob to get all MDX files directly from the posts directory
  const postImportResult = import.meta.glob('./posts/*.mdx', { eager: true });
  const posts = Object.values(postImportResult);

  return rss({
    title: 'Iliyan Ignatov | Blog',
    description: 'Thoughts, ideas, and explorations on web development, technology, and design.',
    site: context.site,
    items: await Promise.all(
      posts.map(async post => {
        // Extract slug from filename
        const fileName = post.file
          ? post.file.split('/').pop()
          : post.url
          ? post.url.split('/').pop()
          : post.id
          ? post.id
          : 'unknown';
        const slug = fileName.replace(/\.[^.]+$/, '');

        // Get metadata from frontmatter or data depending on post structure
        const metadata = post.frontmatter || post.data || {};

        // Get the actual file path
        // First, try to get the absolute path from the post object
        let filePath = '';
        if (post.file) {
          if (post.file.startsWith('/')) {
            filePath = post.file;
          } else {
            filePath = join(__dirname, post.file);
          }
        } else if (post.id) {
          filePath = join(__dirname, 'posts', post.id);
        }

        // Extract content with fallbacks
        let content = '';
        let finalContent = '';

        try {
          // First try to access direct content methods
          if (post.rawContent && typeof post.rawContent === 'function') {
            content = post.rawContent();
          } else if (post.compiledContent && typeof post.compiledContent === 'function') {
            content = post.compiledContent();
          } else if (post.body && typeof post.body === 'string') {
            content = post.body;
          }
          // If we couldn't get content from the object, read file directly
          else if (filePath) {
            console.log('Reading file from:', filePath);
            content = readFileSync(filePath, 'utf-8');

            // Extract content by removing frontmatter
            if (content.startsWith('---')) {
              const secondDivider = content.indexOf('---', 3);
              if (secondDivider !== -1) {
                content = content.slice(secondDivider + 3).trim();
              }
            }
          }

          // Determine if content is already HTML or needs to be converted from Markdown
          if (content && !content.includes('<html') && !content.includes('<body')) {
            // Convert Markdown to HTML if needed
            if (!content.includes('<h1>') && !content.includes('<p>')) {
              finalContent = parser.render(content);
            } else {
              finalContent = content;
            }

            // Sanitize HTML for XML safety
            finalContent = sanitizeHtml(finalContent, {
              allowedTags: sanitizeHtml.defaults.allowedTags.concat([
                'img',
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
              ]),
              allowedAttributes: {
                ...sanitizeHtml.defaults.allowedAttributes,
                img: ['src', 'alt', 'title', 'width', 'height'],
              },
            });
          } else {
            finalContent = content || metadata.description || '';
          }
        } catch (error) {
          console.error(`Error processing content for ${fileName}:`, error);
          finalContent = metadata.description || '';
        }

        return {
          title: metadata.title || 'Blog Post',
          pubDate: metadata.pubDate || metadata.date || new Date(),
          description: metadata.description || '',
          link: `/posts/${slug}`,
          content: finalContent,
          categories: metadata.tags || [],
          author: metadata.author || 'Iliyan Ignatov',
        };
      })
    ),
  });
}
