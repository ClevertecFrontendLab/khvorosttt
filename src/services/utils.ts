export function getUserIdFromToken(): string | null {
    const token = localStorage.getItem('access_token');

    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.userId;
    } catch (e) {
        console.error('Ошибка декодирования токена', e);
        return null;
    }
}
