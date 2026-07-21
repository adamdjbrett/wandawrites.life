[![Deploy Eleventy to XMIT](https://github.com/adamdjbrett/wandawrites.life/actions/workflows/xmit-deploy.yml/badge.svg?branch=master)](https://github.com/adamdjbrett/wandawrites.life/actions/workflows/xmit-deploy.yml)
Deployed to [xmit.co](https://xmit.co)

# wandaWrites.life

Official site of Wanda C. Brett, built with Eleventy 4.0.0 canary. Using a modified version of David Darnes Alembic template for Jekyll.

## Stack
- Node 24
- Eleventy 4.0.0 canary (ESM config)
- Liquid templates
- Native JavaScript date filters in Eleventy/Nunjucks
- Sass build to `/public/assets/css/styles.css`

## Project structure
- `content/` pages and posts
- `content/_includes/` layouts and partials
- `public/assets/` css, js, images, and static assets
- `_site/` generated output

## Commands
- `npm run build` runs an Eleventy production build
- `npm run start` runs local Eleventy dev server
