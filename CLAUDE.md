# Food Recipes

Simple Node.js recipe website using Express and Handlebars.

## Stack

- **Runtime:** Node.js with TypeScript
- **Framework:** Express 5
- **Templating:** Handlebars (via express-handlebars)
- **Styling:** SCSS (compiled via `sass`)

## Project structure

- `src/app.ts` — Express server entry point (port 3000)
- `src/views/layouts/main.handlebars` — Shared HTML layout (head, body wrapper)
- `src/views/index.handlebars` — Home page listing all recipes as cards
- `src/views/recipe.handlebars` — Recipe detail template
- `src/styles/style.scss` — SCSS source
- `src/images/` — Source images
- `recipes.json` — All recipe data; adding a recipe means adding an entry here + an image
- `dist/` — Build output (gitignored)

## Commands

- `npm start` — Build and start the server
- `npm run build` — Compile TypeScript, SCSS, and copy views + images to `dist/`
- `npm run build:css` — Compile SCSS only
- `npm run build:copy` — Copy views and images to `dist/`

## Conventions

- All source code lives in `src/`; `dist/` is the build output
- Recipes are data-driven via `recipes.json`, not hardcoded in templates
- Images go in `src/images/` and are referenced by filename in `recipes.json`
- Templates use Handlebars (`{{var}}` for output, `{{#each}}` / `{{#if}}` for logic)
- Shared HTML boilerplate lives in `src/views/layouts/main.handlebars`
