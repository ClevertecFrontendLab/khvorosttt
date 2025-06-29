import * as yup from 'yup';

export const schema = yup.object().shape({
    password: yup
        .string()
        .required('Введите старый пароль')
        .min(8, 'Не соответствует формату')
        .max(50, 'Максимальная длина 50 символов')
        .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9!@#$&_+-.]+$/, 'Не соответствует формату'),
    newPassword: yup
        .string()
        .required('Введите новый пароль')
        .min(8, 'Не соответствует формату')
        .max(50, 'Максимальная длина 50 символов')
        .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9!@#$&_+-.]+$/, 'Не соответствует формату'),
    confirmPassword: yup
        .string()
        .required('Повторите пароль')
        .oneOf([yup.ref('newPassword')], 'Пароли должны совпадать'),
});
