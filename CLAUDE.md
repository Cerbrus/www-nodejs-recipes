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

```
src/
├── scripts/
│   ├── server/                   # Server-side scripts
│   │   ├── app.ts                # Express entry point (port 3000), i18n init, route registration
│   │   ├── helpers/              # Helper scripts; I18nHelper: locale resolution, recipe localization
│   │   └── types/                # Server-side types (Locale, RecipeData, RecipeLocalized)
│   └── client/                   # Client-side scripts (loaded via <script> in templates)
│       ├── lang.ts               # Client-side language switching (localStorage + cookie)
│       └── recipe.ts             # Client-side recipe page interactions (sticky back button)
├── views/
│   ├── layouts/                  # Handlebars layouts
│   │   └── main.handlebars       # Shared HTML layout (head, body wrapper, lang switcher)
│   └── pages/                    # Handlebars page templates + controllers
│       ├── index.controller.ts   # Controller: loads and localizes all recipes
│       ├── index.handlebars      # Home page listing all recipes as cards
│       ├── recipe.controller.ts  # Controller: loads and localizes a single recipe by slug
│       └── recipe.handlebars     # Recipe detail template
├── locales/
│   └── [lang].json               # Translation strings (en, nl)
├── styles/
│   └── style.scss                # SCSS source
├── images/                       # Source images
└── recipes.json                  # All recipe data (multilingual)
scripts/                          # Deployment shell scripts (add-site.sh, setup-pi.sh)
dist/                             # Build output (gitignored)
```

## Commands

- `npm start` — Build and start the server
- `npm run build` — Compile TypeScript (+ resolve path aliases via `tsc-alias`), SCSS, and copy views + images to `dist/`
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
- Path aliases (`server`, `views`, `locales`) are defined in `tsconfig.json` and resolved at build time by `tsc-alias`
