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
