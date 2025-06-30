import * as yup from 'yup';

export const schema = yup.object().shape({
    firstName: yup
        .string()
        .trim()
        .required('Введите имя')
        .matches(/^[А-Яа-яёЁ]/, 'Должно начинаться с кириллицы А-Я')
        .matches(/^[А-Яа-яёЁ-]+$/, 'Только кириллица А-Я, и "-"')
        .max(50, 'Максимальная длина 50 символов'),
    lastName: yup
        .string()
        .trim()
        .required('Введите фамилию')
        .matches(/^[А-Яа-яёЁ]/, 'Должно начинаться с кириллицы А-Я')
        .matches(/^[А-Яа-яёЁ-]+$/, 'Только кириллица А-Я, и "-"')
        .max(50, 'Максимальная длина 50 символов'),
});
