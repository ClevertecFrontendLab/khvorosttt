import { createSlice } from '@reduxjs/toolkit';

export interface NotificationStateI {
    title: string;
    description: string;
}

const initialNotificationState: NotificationStateI = {
    title: '',
    description: '',
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialNotificationState,
    reducers: {
        setNotification: (state, action) => {
            state.title = action.payload.title;
            state.description = action.payload.description;
        },
        clearNotification: (state) => {
            state.title = '';
            state.description = '';
        },
    },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
