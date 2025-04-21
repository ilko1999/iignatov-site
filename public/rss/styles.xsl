<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> RSS Feed</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.5;
            color: #333;
            max-width: 900px;
            margin: 0 auto;
            padding: 2rem;
            background-color: #f9f9f9;
          }
          header {
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #eee;
          }
          h1 {
            font-size: 2rem;
            margin: 0;
            color: #1e40af;
          }
          h2 {
            font-size: 1.25rem;
            margin: 0.5rem 0;
          }
          .description {
            color: #666;
          }
          .item {
            margin-bottom: 2rem;
            padding: 1.5rem;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          .item:hover {
            box-shadow: 0 2px 5px rgba(0,0,0,0.15);
          }
          .item h2 a {
            color: #1e40af;
            text-decoration: none;
          }
          .item h2 a:hover {
            text-decoration: underline;
          }
          .item-meta {
            font-size: 0.875rem;
            color: #666;
            margin-top: 0.5rem;
          }
          .categories {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 1rem;
          }
          .category {
            font-size: 0.75rem;
            padding: 0.25rem 0.5rem;
            background-color: #e5e7eb;
            border-radius: 9999px;
          }
          .rss-meta {
            margin-top: 2rem;
            font-size: 0.875rem;
            color: #666;
            text-align: center;
          }
          a.rss-button {
            display: inline-block;
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background-color: #f97316;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
          }
          a.rss-button:hover {
            background-color: #ea580c;
          }
        </style>
      </head>
      <body>
        <header>
          <h1><xsl:value-of select="/rss/channel/title"/></h1>
          <p class="description"><xsl:value-of select="/rss/channel/description"/></p>
          <a class="rss-button" href="{/rss/channel/link}">Visit Website</a>
        </header>
        <main>
          <xsl:for-each select="/rss/channel/item">
            <div class="item">
              <h2>
                <a href="{link}" target="_blank" rel="noopener">
                  <xsl:value-of select="title"/>
                </a>
              </h2>
              <p class="item-meta">
                <span>Published: <xsl:value-of select="pubDate"/></span>
                <xsl:if test="author">
                  <span> • By <xsl:value-of select="author"/></span>
                </xsl:if>
              </p>
              <p><xsl:value-of select="description"/></p>
              <xsl:if test="category">
                <div class="categories">
                  <xsl:for-each select="category">
                    <span class="category"><xsl:value-of select="."/></span>
                  </xsl:for-each>
                </div>
              </xsl:if>
            </div>
          </xsl:for-each>
        </main>
        <footer class="rss-meta">
          <p>This is an RSS feed. Visit <a href="https://aboutfeeds.com">About Feeds</a> to learn more about RSS and feed readers.</p>
          <p>Generated on <xsl:value-of select="format-dateTime(current-dateTime(), '[MNn] [D], [Y] at [h]:[m][P]')"/></p>
        </footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet> 