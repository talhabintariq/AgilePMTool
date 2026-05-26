# Vendored runtime

These files are committed so the app works fully offline / in restricted
environments (no CDN egress). If you delete this folder, `index.html`
falls back to CDN copies automatically.

- `react.min.js`           — React 18.3.1 UMD (production)
- `react-dom.min.js`       — ReactDOM 18.3.1 UMD (production)
- `babel.min.js`           — @babel/standalone 7.25.0 (compiles JSX in the browser)
- `tailwind.css`           — Tailwind 3.4.13 prebuilt with the project's color theme

## Rebuilding Tailwind

```
cd /tmp && mkdir tw && cd tw && npm i tailwindcss@3.4.13
./node_modules/.bin/tailwindcss \
  -c <path>/recovery-meetings/tools/tailwind.config.js \
  -i input.css \
  -o <path>/recovery-meetings/vendor/tailwind.css \
  --minify
```
