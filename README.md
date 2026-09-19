# DevSite

Website for McRam Engineering Solutions, an engineering consultancy delivering integrated, reliable, and value-driven solutions across the EPC sector.

## Local development

Requirements: Node.js 22 or newer.

```bash
pnpm install
pnpm dev
```

The development server runs at `http://localhost:8443`.

## Production build

```bash
pnpm build
```

The deployable website is generated in `dist/`.

## GitHub Pages deployment

Pushing to `main` automatically builds the site and deploys `dist/` to GitHub Pages.
The published site is available at `https://ashikreddy09.github.io/devSite02/`.
Use the repository URL with the `/devSite02/` path; the account root URL is not this project.

## GoDaddy deployment

1. Run the production build locally.
2. Open GoDaddy hosting's File Manager or connect with FTP.
3. Upload the contents of `dist/` into the domain's document root, commonly `public_html/`.
4. Keep `.htaccess` in the document root so client-side navigation resolves correctly.

The project is a static Vite build and does not require a Node.js server in production.
