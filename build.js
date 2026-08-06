#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const { marked } = require('marked')

// ── Config ─────────────────────────────────────────────────────────────────

const SITE = {
  name: 'Rishi Lokesh',
  email: 'hello@rishilokesh.me',
  url: 'https://rishilokesh.me',
  description: 'Notes and writing from Rishi Lokesh.',
}

const POSTS_DIR = path.join(__dirname, 'content/blog')
const DIST_DIR = path.join(__dirname, 'dist')

// ── CSS ────────────────────────────────────────────────────────────────────

const CSS = `
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Courier New', Courier, monospace;
  font-size: 16px;
  line-height: 1.65;
  color: #111;
  background: #f9f8f4;
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
}

a { color: inherit; text-decoration: underline; text-underline-offset: 3px; }
a:hover { background: #111; color: #f9f8f4; text-decoration: none; }

/* ── Header ── */
.site-header {
  border-bottom: 3px solid #111;
  padding-bottom: 0.85rem;
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
}

.site-name {
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  text-decoration: none;
}
.site-name:hover { background: none; color: #111; text-decoration: underline; text-underline-offset: 3px; }

.site-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #666;
}

/* ── Index ── */
.page-title {
  font-size: 2.2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  line-height: 1;
}

.page-subtitle {
  font-size: 0.85rem;
  color: #555;
  margin-top: 0.75rem;
  max-width: 420px;
}

.post-list {
  list-style: none;
  border-top: 3px solid #111;
  margin-top: 2.5rem;
}

.post-item { border-bottom: 2px solid #111; }

.post-link {
  display: block;
  padding: 1.1rem 0.5rem 1.1rem 0;
  text-decoration: none;
  transition: padding-left 0.08s;
}
.post-link:hover {
  background: #111;
  color: #f9f8f4;
  padding-left: 0.6rem;
}

.post-meta {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #666;
  margin-bottom: 0.35rem;
}
.post-link:hover .post-meta { color: #aaa; }

.post-title {
  font-size: 1.35rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  line-height: 1.15;
}

.post-desc {
  font-size: 0.88rem;
  margin-top: 0.35rem;
  color: #444;
  line-height: 1.5;
}
.post-link:hover .post-desc { color: #ccc; }

/* ── Article ── */
.back-link {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #666;
}
.back-link:hover { background: none; color: #111; text-decoration: underline; }

.article-header {
  border-top: 3px solid #111;
  border-bottom: 3px solid #111;
  padding: 1.5rem 0;
  margin: 1.5rem 0 2.5rem;
}

.article-meta {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #666;
  margin-bottom: 0.75rem;
}

.article-title {
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  line-height: 1.1;
}

.article-desc {
  font-size: 0.92rem;
  color: #555;
  margin-top: 0.75rem;
}

/* ── Prose ── */
.content h2 {
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 2.5rem 0 0.65rem;
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.3rem;
}

.content h3 {
  font-size: 0.88rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 2rem 0 0.5rem;
}

.content p { margin-bottom: 1.2rem; }

.content ul,
.content ol {
  margin: 0 0 1.2rem 1.4rem;
}

.content li { margin-bottom: 0.4rem; }

.content strong { font-weight: bold; }
.content em { font-style: italic; }

.content code {
  background: #eae9e4;
  padding: 0.1em 0.35em;
  font-size: 0.88em;
  border: 1px solid #ccc;
}

.content pre {
  background: #eae9e4;
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1.2rem;
  overflow-x: auto;
}
.content pre code { background: none; border: none; padding: 0; font-size: 0.88em; }

.content blockquote {
  border-left: 3px solid #111;
  padding-left: 1rem;
  color: #555;
  margin-bottom: 1.2rem;
}

.content hr {
  border: none;
  border-top: 2px solid #111;
  margin: 2.5rem 0;
}

/* ── Footer ── */
.site-footer {
  border-top: 2px solid #111;
  margin-top: 5rem;
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #666;
}
.site-footer a { color: #666; }
.site-footer a:hover { background: none; color: #111; }
`

// ── Templates ──────────────────────────────────────────────────────────────

function layout(title, bodyHtml, extraMeta = '') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escHtml(title)}</title>
<meta name="description" content="${escHtml(SITE.description)}">
${extraMeta}
<style>${CSS}</style>
</head>
<body>
<header class="site-header">
  <a href="/" class="site-name">${escHtml(SITE.name)}</a>
  <span class="site-label">notes</span>
</header>
${bodyHtml}
<footer class="site-footer">
  <span>© ${new Date().getFullYear()} ${escHtml(SITE.name)}</span>
  <a href="mailto:${escHtml(SITE.email)}">${escHtml(SITE.email)}</a>
</footer>
</body>
</html>`
}

function indexPage(posts) {
  const items = posts.map(p => `
  <li class="post-item">
    <a href="/blog/${p.slug}/" class="post-link">
      <div class="post-meta">${formatDate(p.date)} &nbsp;/&nbsp; ${p.readingTime}</div>
      <div class="post-title">${escHtml(p.title)}</div>
      ${p.description ? `<div class="post-desc">${escHtml(p.description)}</div>` : ''}
    </a>
  </li>`).join('\n')

  const body = `
<h1 class="page-title">Blog</h1>
<p class="page-subtitle">Working notes. Unfinished thoughts. Things I wrote down so I wouldn't forget them.</p>
<ul class="post-list">
${items}
</ul>`

  return layout(SITE.name, body)
}

function postPage(post) {
  const tags = post.tags.length > 0 ? ` &nbsp;/&nbsp; ${post.tags.join(', ')}` : ''
  const body = `
<a href="/" class="back-link">← back</a>
<header class="article-header">
  <div class="article-meta">${formatDate(post.date)} &nbsp;/&nbsp; ${post.readingTime}${tags}</div>
  <h1 class="article-title">${escHtml(post.title)}</h1>
  ${post.description ? `<p class="article-desc">${escHtml(post.description)}</p>` : ''}
</header>
<div class="content">
${marked.parse(post.content)}
</div>`

  const meta = `<meta property="og:title" content="${escHtml(post.title)}">
<meta property="og:description" content="${escHtml(post.description)}">`

  return layout(`${post.title} · ${SITE.name}`, body, meta)
}

// ── Helpers ────────────────────────────────────────────────────────────────

function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC',
  })
}

function readingTime(text) {
  const words = text.trim().split(/\s+/).length
  const mins = Math.max(1, Math.round(words / 200))
  return `${mins} min read`
}

function loadPosts() {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8')
      const { data, content } = matter(raw)
      return {
        slug: f.replace(/\.md$/, ''),
        title: data.title ?? f.replace(/\.md$/, ''),
        description: data.description ?? '',
        date: data.date ?? new Date().toISOString(),
        tags: data.tags ?? [],
        content,
        readingTime: readingTime(content),
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

// ── Build ──────────────────────────────────────────────────────────────────

function build() {
  // Clean and recreate dist/
  if (fs.existsSync(DIST_DIR)) fs.rmSync(DIST_DIR, { recursive: true })
  fs.mkdirSync(DIST_DIR, { recursive: true })
  fs.mkdirSync(path.join(DIST_DIR, 'blog'), { recursive: true })

  const posts = loadPosts()

  // Index
  fs.writeFileSync(path.join(DIST_DIR, 'index.html'), indexPage(posts))
  console.log('Built: index.html')

  // Posts
  for (const post of posts) {
    const dir = path.join(DIST_DIR, 'blog', post.slug)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, 'index.html'), postPage(post))
    console.log(`Built: blog/${post.slug}/index.html`)
  }

  console.log(`\nDone. ${posts.length} post(s) → dist/`)
}

build()
