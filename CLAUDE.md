# Food Recipes

Simple Node.js recipe website using Express and Handlebars, with i18n support (English & Dutch).

## Stack

- **Runtime:** Node.js with TypeScript
- **Framework:** Express 5
- **Templating:** Handlebars (via express-handlebars)
- **Styling:** SCSS (compiled via `sass`)
- **i18n:** i18next + handlebars-i18n (locales: `en`, `nl`)
- **Linting/Formatting:** ESLint + Prettier (configs in `.eslintrc.json`, `.prettierrc`)

## Project structure

- `src/scripts/app.ts` — Express server entry point (port 3000), i18n init, route registration
- `src/scripts/helpers.ts` — I18nHelper: locale resolution, recipe localization
- `src/scripts/lang.ts` — Client-side language switching (localStorage + cookie)
- `src/scripts/recipe.ts` — Client-side recipe page interactions (sticky back button)
- `src/scripts/types/` — Shared TypeScript types (`Locale`, `RecipeData`, `RecipeLocalized`)
- `src/views/layouts/main.handlebars` — Shared HTML layout (head, body wrapper, lang switcher)
- `src/views/pages/index.controller.ts` — Controller: loads and localizes all recipes for the index
- `src/views/pages/index.handlebars` — Home page listing all recipes as cards
- `src/views/pages/recipe.controller.ts` — Controller: loads and localizes a single recipe by slug
- `src/views/pages/recipe.handlebars` — Recipe detail template
- `src/locales/[lang].json` — Translation strings
- `src/recipes.json` — All recipe data (multilingual); adding a recipe means adding an entry here + an image
- `src/styles/style.scss` — SCSS source
- `src/images/` — Source images
- `scripts/` — Deployment shell scripts (`add-site.sh`, `setup-pi.sh`)
- `dist/` — Build output (gitignored)

## Commands

- `npm start` — Build and start the server
- `npm run build` — Compile TypeScript, SCSS, and copy views + images to `dist/`
- `npm run build:css` — Compile SCSS only
- `npm run build:copy` — Copy views and images to `dist/`

## Conventions

- All source code lives in `src/`; `dist/` is the build output
- Views live in `src/views/pages/` with co-located `.controller.ts` files that handle data loading
- Recipes are data-driven via `src/recipes.json`, not hardcoded in templates
- Recipe fields (`title`, `description`, `ingredients`, `steps`) are multilingual objects keyed by locale
- Images go in `src/images/` and are referenced by filename in `src/recipes.json`
- Templates use Handlebars (`{{var}}` for output, `{{#each}}` / `{{#if}}` for logic)
- Shared HTML boilerplate lives in `src/views/layouts/main.handlebars`
