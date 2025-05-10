import { recipeI } from '~/interfaces/recipeI';

export function compareDate(a: recipeI, b: recipeI) {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
}

export function compareLikes(a: recipeI, b: recipeI) {
    return a.likes - b.likes;
}
