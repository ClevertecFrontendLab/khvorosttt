export interface stepsI {
    stepNumber: number;
    description: string;
    image: string;
}

export interface nutritionValueI {
    calories: number;
    protein: number;
    fats: number;
    carbohydrates: number;
}

export interface ingredientsI {
    title: string;
    count: number;
    measureUnit: string;
}

export interface recipeI {
    _id: string;
    createdAt: string;
    title: string;
    description: string;
    time: number;
    image: string;
    likes: number;
    bookmarks: number;
    views: number;
    portions: number;
    authorId: string;
    categoriesIds: string[];
    steps: stepsI[];
    nutritionValue: nutritionValueI;
    ingredients: ingredientsI[];
}

export interface recipeResponceI {
    data: recipeI[];
}
