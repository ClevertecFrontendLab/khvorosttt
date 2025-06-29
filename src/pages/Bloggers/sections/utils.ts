import { LikesBookmarksI } from '~/interfaces/bloggerI';

export function newRecipeText(count: number) {
    const countMod = count % 10;
    if (count > 10 && count < 20) return `${count} новых рецептов`;
    if (countMod == 1) return `${count} новый рецепт`;
    if (countMod > 1 && countMod < 5) return `${count} новых рецепта`;
    return `${count} новых рецептов`;
}

export function sunscribersText(count: number) {
    const countMod = count % 10;
    if (count > 10 && count < 20) return `${count} подписчиков`;
    if (countMod == 1) return `${count} подписчик`;
    if (countMod > 1 && countMod < 5) return `${count} подписчика`;
    return `${count} подписчиков`;
}

export function bookmarksText(count: number) {
    const countMod = count % 10;
    if (count > 10 && count < 20) return `${count} сохранений`;
    if (countMod == 1) return `${count} сохранение`;
    if (countMod > 1 && countMod < 5) return `${count} сохранения`;
    return `${count} сохранений`;
}

export function likesText(count: number) {
    const countMod = count % 10;
    if (count > 10 && count < 20) return `${count} лайков`;
    if (countMod == 1) return `${count} лайк`;
    if (countMod > 1 && countMod < 5) return `${count} лайка`;
    return `${count} лайков`;
}

interface groupDataI {
    [key: string]: number;
}

export function groupDataByWeek(data: LikesBookmarksI[]) {
    const groupData: groupDataI = {};
    data.forEach((item) => {
        const date = new Date(item.date);
        const dayOfWeek = date.getDay();
        const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        const monday = new Date(date);
        monday.setDate(date.getDate() - diffToMonday);
        monday.setHours(0, 0, 0, 0);
        const weekKey = monday.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });

        groupData[weekKey] = (groupData[weekKey] || 0) + item.count;
    });
    if (data.length > 1) {
        const minDate = new Date(data[0].date);
        const maxDate = new Date(data[data.length - 1].date);
        const firstMonday = new Date(minDate);
        firstMonday.setDate(
            minDate.getDate() - (minDate.getDay() === 0 ? 6 : minDate.getDay() - 1),
        );
        firstMonday.setHours(0, 0, 0, 0);
        const lastMonday = new Date(maxDate);
        lastMonday.setDate(maxDate.getDate() - (maxDate.getDay() === 0 ? 6 : maxDate.getDay() - 1));
        lastMonday.setHours(0, 0, 0, 0);
        const currentMonday = new Date(firstMonday);
        while (currentMonday <= lastMonday) {
            const weekKey = currentMonday.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
            });

            if (!groupData[weekKey]) {
                groupData[weekKey] = 0;
            }

            currentMonday.setDate(currentMonday.getDate() + 7);
        }
    }
    return Object.entries(groupData)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
