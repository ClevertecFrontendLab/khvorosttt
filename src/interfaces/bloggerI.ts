import { recipeI } from './recipeI';

export interface noteI {
    date: string;
    text: string;
}

export interface bloggerI {
    _id: string;
    subscribersCount: number;
    notes: noteI[];
    newRecipesCount: number;
    login: string;
    lastName: string;
    isFavorite: boolean;
    firstName: string;
    bookmarksCount: number;
}

export interface bloggersResponce {
    favorites: bloggerI[];
    others: bloggerI[];
}

export type toggleSubscriptionI = {
    fromUserId: string;
    toUserId: string;
};

export interface bloggerInfoI {
    bloggerInfo: bloggerI;
    isFavorite: boolean;
    totalBookmarks: number;
    totalSubscribers: number;
}

export interface RecipesUserI {
    recipes: recipeI[];
    userId: string;
    totalBookmarks: number;
    totalSubscribers: number;
    notes: noteI[];
}

export interface userI {
    _id: string;
    email: string;
    login: string;
    firstName: string;
    lastName: string;
    recipesIds: string[];
    drafts: recipeI[];
    subscriptions: string[];
    subscribers: string[];
    photoLink: string;
}

export interface likesI {
    date: string;
    count: number;
}

export interface bookmarksI {
    date: string;
    count: number;
}

export interface statisticI {
    likes: likesI[];
    bookmarks: bookmarksI[];
    recommendationsCount: number;
    recipesWithRecommendations: recipeI[];
}

export interface RecipeBookmarksI {
    recipes: recipeI[];
    notes: noteI[];
    userId: string;
    myBookmarks: recipeI[];
    totalBookmarks: number;
    totalSubscribers: number;
}
