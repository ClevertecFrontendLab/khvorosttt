export interface nutritionValueI {
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
}

export interface ingredientsI {
    title: string;
    count: number;
    measureUnit: string;
}

export interface stepI {
    stepNumber: number;
    description: string;
    image: string;
}

export interface recipeI {
    id: number;
    title: string;
    description: string;
    category: string[];
    subcategory: string[];
    image: string;
    bookmarks: number;
    likes: number;
    date: string;
    time: string;
    portions: number;
    nutritionValue: nutritionValueI;
    ingredients: ingredientsI[];
    steps: stepI[];
    meat?: string;
    side?: string;
    author?: string;
}
