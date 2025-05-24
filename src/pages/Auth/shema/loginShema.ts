import * as yup from 'yup';

export const schema = yup.object().shape({
    login: yup.string().trim().required('Введите логин').max(50, 'Максимальная длина 50 символов'),
    password: yup.string().required('Введите пароль').max(50, 'Максимальная длина 50 символов'),
});
