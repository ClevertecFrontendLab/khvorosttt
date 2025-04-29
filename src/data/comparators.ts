import { recipeI } from './interface/data';

export function compareDate(a: recipeI, b: recipeI) {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
}

export function compareLikes(a: recipeI, b: recipeI) {
    return a.likes - b.likes;
}
