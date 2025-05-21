import * as yup from 'yup';

export const schema = yup.object().shape({
    email: yup
        .string()
        .trim()
        .required('Введите e-mail')
        .max(50, 'Максимальная длина 50 символов')
        .email('Введите корректный e-mail')
        .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 'Введите корректный e-mail'),
});
