import express, { Response } from 'express';
import { engine } from 'express-handlebars';
import i18next from 'i18next';
import HandlebarsI18n from 'handlebars-i18n';
import Handlebars from 'handlebars';
import path from 'path';
import en from 'locales/en.json';
import nl from 'locales/nl.json';
import { DEFAULT_LOCALE } from './types';
import { IndexController, RecipeController } from 'views/pages';

class App {
    private app = express();
    private readonly port = 3000;

    public async start(): Promise<void> {
        await this.initI18n();
        this.configureEngine();
        this.registerRoutes();
        this.app.listen(this.port, () => {
            console.log(`Server running at http://localhost:${this.port}`);
        });
    }

    private async initI18n(): Promise<void> {
        await i18next.init({
            lng: DEFAULT_LOCALE,
            fallbackLng: DEFAULT_LOCALE,
            resources: {
                en: { translation: en },
                nl: { translation: nl },
            },
        });

        HandlebarsI18n.init(Handlebars, i18next as any);

        // Override the __ helper to read locale from template context
        Handlebars.registerHelper('__', (key: string, options: Handlebars.HelperOptions) =>
            i18next.t(key, { lng: options.data.root.locale })
        );
    }

    private configureEngine(): void {
        const viewsDir = path.join(__dirname, '..', '..', 'views');
        this.app.engine('handlebars', engine({ handlebars: Handlebars, layoutsDir: path.join(viewsDir, 'layouts') }));
        this.app.set('view engine', 'handlebars');
        this.app.set('views', path.join(viewsDir, 'pages'));
        this.app.use(express.static(path.join(__dirname, '..', '..')));
    }

    private registerRoutes(): void {
        const indexController = new IndexController();
        const recipeController = new RecipeController();

        this.app.get('/', (req, res) => indexController.render(req, res));
        this.app.get('/:slug', (req, res) => recipeController.render(req, res));
        this.app.use((_req, res: Response) => res.redirect('/'));
    }
}

new App().start();
