import express, {Request, Response} from "express";
import {engine} from "express-handlebars";
import i18next from "i18next";
import HandlebarsI18n from "handlebars-i18n";
import Handlebars from "handlebars";
import path from "path";
import allRecipes from "./recipes.json";
import enGb from "./locales/en-gb.json";
import nlNl from "./locales/nl-nl.json";

const LOCALES = ["en-gb", "nl-nl"] as const;
type Locale = (typeof LOCALES)[number];
const DEFAULT_LOCALE: Locale = "en-gb";

async function main() {
    await i18next.init({
        lng: DEFAULT_LOCALE,
        fallbackLng: DEFAULT_LOCALE,
        resources: {
            "en-GB": {translation: enGb},
            "nl-NL": {translation: nlNl},
        },
    });

    HandlebarsI18n.init(Handlebars, i18next as any);

    // Override the __ helper to read locale from template context
    Handlebars.registerHelper(
        "__",
        (key: string, options: Handlebars.HelperOptions) =>
            i18next.t(key, {lng: options.data.root.locale})
    );

    const app = express();
    const PORT = 3000;

    app.engine("handlebars", engine({handlebars: Handlebars}));
    app.set("view engine", "handlebars");
    app.set("views", path.join(__dirname, "views"));
    app.use(express.static(__dirname));

    function getLocale(req: Request): Locale {
        const cookie = req.headers.cookie || "";
        const match = cookie.match(/lang=(en-gb|nl-nl)/);
        return (match ? match[1] : DEFAULT_LOCALE) as Locale;
    }

    function localizeRecipe(
        recipe: (typeof allRecipes)[number],
        locale: Locale
    ) {
        return {
            slug: recipe.slug,
            image: recipe.image,
            title: recipe.title[locale],
            description: recipe.description[locale],
            ingredients: recipe.ingredients[locale],
            steps: recipe.steps[locale],
        };
    }

    app.get("/", (req: Request, res: Response) => {
        const locale = getLocale(req);
        const recipes = allRecipes.map((r) => localizeRecipe(r, locale));
        res.render("index", {
            title: i18next.t("siteTitle", {lng: locale}),
            recipes,
            locale,
        });
    });

    app.get("/:slug", (req: Request, res: Response) => {
        const locale = getLocale(req);
        const raw = allRecipes.find((r) => r.slug === req.params.slug);
        if (!raw) {
            res.redirect("/");
            return;
        }
        const recipe = localizeRecipe(raw, locale);
        res.render("recipe", {title: recipe.title, recipe, locale});
    });

    app.use((_req: Request, res: Response) => {
        res.redirect("/");
    });

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

main();