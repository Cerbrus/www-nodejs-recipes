import type { Locale } from './locale';

interface Ingredient {
    name: string;
    subtitle: string;
}

interface Step {
    text: string;
    options: Array<string>;
}

type Localized<T> = { [key in Locale]: T };

export interface RecipeData {
    slug: string;
    image: string;
    title: Localized<string>;
    description: Localized<string>;
    ingredients: Localized<Array<Ingredient>>;
    steps: Localized<Array<string | Step>>;
}

export interface RecipeLocalized {
    slug: string;
    image: string;
    title: string;
    description: string;
    ingredients: Array<Ingredient>;
    steps: Array<string | Step>;
}
