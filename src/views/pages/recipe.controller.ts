import { Request, Response } from 'express';
import allRecipes from '../../recipes.json';
import type { Locale, RecipeData } from 'server';
import { I18nHelper } from '../../scripts/server';

export class RecipeController {
    public render(req: Request, res: Response): void {
        const recipeData: RecipeData | undefined = allRecipes.find((r: RecipeData) => r.slug === req.params['slug']);
        if (!recipeData) {
            res.redirect('/');
            return;
        }

        const locale: Locale = I18nHelper.getLocale(req);
        const recipe = I18nHelper.localizeRecipe(recipeData, locale);

        res.render('recipe', { title: recipe.title, recipe, locale });
    }
}
