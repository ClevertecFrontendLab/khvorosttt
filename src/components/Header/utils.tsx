import { bookmarksI, likesI } from '~/interfaces/bloggerI';

export function likesCount(likes: likesI[] | undefined) {
    if (!likes) return 0;
    return likes.reduce((prev, curr) => prev + curr.count, 0);
}

export function bookmarksCount(bookmarks: bookmarksI[] | undefined) {
    if (!bookmarks) return 0;
    return bookmarks.reduce((prev, curr) => prev + curr.count, 0);
}
