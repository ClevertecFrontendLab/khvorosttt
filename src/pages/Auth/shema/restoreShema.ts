import * as yup from 'yup';

export const schema = yup.object().shape({
    login: yup
        .string()
        .trim()
        .required('Введите логин')
        .min(5, 'Не соответствует формату')
        .max(50, 'Максимальная длина 50 символов')
        .matches(/^[A-Za-z0-9!@#$&_+-.]+$/, 'Не соответствует формату'),
    password: yup
        .string()
        .required('Введите пароль')
        .min(8, 'Не соответствует формату')
        .max(50, 'Максимальная длина 50 символов')
        .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9!@#$&_+-.]+$/, 'Не соответствует формату'),
    confirmPassword: yup
        .string()
        .required('Повторите пароль')
        .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});
