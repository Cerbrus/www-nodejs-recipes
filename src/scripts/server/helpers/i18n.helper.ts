import { Request } from 'express';
import type { Locale, RecipeData, RecipeLocalized } from '../types';
import { DEFAULT_LOCALE } from '../types';

export class I18nHelper {
    public static getLocale(req: Request): Locale {
        const cookie = req.headers.cookie || '';
        const match = cookie.match(/lang=(en|nl)/);
        return (match ? match[1] : DEFAULT_LOCALE) as Locale;
    }

    public static localizeRecipe(recipe: RecipeData, locale: Locale): RecipeLocalized {
        return {
            slug: recipe.slug,
            image: recipe.image,
            title: recipe.title[locale],
            description: recipe.description[locale],
            ingredients: recipe.ingredients[locale],
            steps: recipe.steps[locale],
        };
    }
}
