# Food Recipes

A simple recipe website built with Node.js, Express, and Handlebars.

## Stack

- **Runtime:** Node.js (LTS) with TypeScript
- **Framework:** Express 5
- **Templating:** Handlebars (via express-handlebars)
- **Styling:** SCSS (compiled via `sass`)

## Getting started

```bash
npm install
npm start
```

The server starts at [http://localhost:3000](http://localhost:3000).

## Commands

| Command | Description |
|---|---|
| `npm start` | Build and start the server |
| `npm run build` | Compile TypeScript, SCSS, and copy views + images to `dist/` |
| `npm run build:css` | Compile SCSS only |
| `npm run build:copy` | Copy views and images to `dist/` |

## Adding a recipe

1. Add an entry to `recipes.json`
2. Place the corresponding image in `src/images/`
3. Reference the image filename in the recipe entry

## Deployment

The app is deployed to a Raspberry Pi at `webhost.cerbrus.nl` via GitHub Actions on push to `main`.

### Raspberry Pi setup

The setup scripts can be fetched from [Cerbrus/www-nodejs-recipes](https://github.com/Cerbrus/www-nodejs-recipes).

**1. Initial setup** — run once on a fresh Raspberry Pi OS Lite install:

```bash
curl -fsSL https://raw.githubusercontent.com/Cerbrus/www-nodejs-recipes/main/scripts/setup-pi.sh | sudo bash
```

This updates the system, installs Node.js LTS, and creates a `deploy` user for SSH-based deployments.

**2. Add a site** — run for each site you want to host:

```bash
curl -fsSL https://raw.githubusercontent.com/Cerbrus/www-nodejs-recipes/main/scripts/add-site.sh | sudo bash -s <name> <port> [description]
```

| Parameter | Description |
|---|---|
| `name` | Site name — used for the system user, `/opt/<name>` directory, and systemd service |
| `port` | Port the app listens on |
| `description` | Optional service description (defaults to `<name> website`) |

For this project:

```bash
curl -fsSL https://raw.githubusercontent.com/Cerbrus/www-nodejs-recipes/main/scripts/add-site.sh | sudo bash -s food 3000 "Food Recipes Website"
```

This creates the system user, app directory, systemd service, and grants the `deploy` user permission to restart the service.

### GitHub Actions

- **Build** (`build.yml`) — Runs on all branches to verify the project builds.
- **Deploy** (`deploy.yml`) — Runs on push to `main`, builds the project, rsyncs to the Pi, and restarts the service.

### Required secrets

| Secret | Description |
|---|---|
| `DEPLOY_SSH_KEY` | SSH private key for the `deploy` user on the Raspberry Pi |
