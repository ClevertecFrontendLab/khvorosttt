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
