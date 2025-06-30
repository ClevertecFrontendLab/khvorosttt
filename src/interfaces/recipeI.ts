export interface stepsI {
    stepNumber: number;
    description: string;
    image?: string | null;
}

export interface stepsOptionalI {
    stepNumber: number | null;
    description: string | null;
    image?: string | null;
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

export interface ingredientsOptionalI {
    title: string | null;
    count: number | null;
    measureUnit: string | null;
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

export interface metaI {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface recipeResponceI {
    data: recipeI[];
    meta: metaI;
}

export interface MeasureUnitsI {
    _id: string;
    name: string;
}
