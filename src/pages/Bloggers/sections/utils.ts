export function newRecipeText(count: number) {
    const countMod = count % 10;
    if (count > 10 && count < 20) return `${count} новых рецептов`;
    if (countMod == 1) return `${count} новый рецепт`;
    if (countMod > 1 && countMod < 5) return `${count} новых рецепта`;
    return `${count} новых рецептов`;
}
