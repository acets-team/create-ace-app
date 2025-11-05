# Changelog
- All notable changes to `create-ace-app` will be documented here
- The format of this file is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
- & `create-ace-app` adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)



## [0.6.2] - 2025-11-04

### 🧠 Improved
- Updated `ace.config.js` w/ `origins` > `prod`



## [0.6.1] - 2025-11-04

### ✨ Added
- `wrangler.jsonc` so we can deploy to Cloudflare

### 🧠 Improved
- `sw.js` > `packageDotJsonVersion`



## [0.6.0] - 2025-11-04

### ✨ Added
- Open Graph @ each page
- Add to package.json:
    - @highlightjs/cdn-assets
    - highlight.js

### 🧠 Improved
- Update `<Pulse />` @ `Home.tsx` to equal the size of content
- Use `<Messages />` @ chat rather then `showToast()` for errors
- POST chat messages
- Now we provide a `wrangler.jsonc` rather then `wrangler.toml`
- Markdown is now SEO friendly & supports code syntax highlighting
- Updated the version of:
    - @acets-team/ace
    - @solidjs/start
    - @types/node
    - ag-grid-community
    - chart.js
    - highlight.js
    - solid-js
    - typescript

### 🗑️ Removed
- `<MarkdownIncoming/>` @ `Home.tsx` b/c it's static now



---



[0.6.1]: https://github.com/acets-team/create-ace-app/compare/v0.6.1...v0.6.2
[0.6.1]: https://github.com/acets-team/create-ace-app/compare/v0.6.0...v0.6.1
[0.6.0]: https://github.com/acets-team/create-ace-app/releases/tag/v0.6.0
