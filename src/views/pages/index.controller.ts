import { Request, Response } from 'express';
import i18next from 'i18next';
import allRecipes from '../../recipes.json';
import type { Locale, RecipeData } from 'server';
import { I18nHelper } from 'server';

export class IndexController {
    public render(req: Request, res: Response): void {
        const locale: Locale = I18nHelper.getLocale(req);
        const recipes = allRecipes.map((r: RecipeData) => I18nHelper.localizeRecipe(r, locale));

        res.render('index', {
            title: i18next.t('siteTitle', { lng: locale }),
            recipes,
            locale,
        });
    }
}
