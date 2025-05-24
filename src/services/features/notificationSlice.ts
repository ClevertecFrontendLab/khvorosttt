import { createSlice } from '@reduxjs/toolkit';

export interface NotificationStateI {
    title: string;
    description: string;
    typeN: 'error' | 'success';
}

const initialNotificationState: NotificationStateI = {
    title: '',
    description: '',
    typeN: 'error',
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialNotificationState,
    reducers: {
        setNotification: (state, action) => {
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.typeN = action.payload.typeN;
        },
        clearNotification: (state) => {
            state.title = '';
            state.description = '';
            state.typeN = 'error';
        },
    },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
