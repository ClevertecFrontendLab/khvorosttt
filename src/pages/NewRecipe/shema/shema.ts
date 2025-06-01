import * as yup from 'yup';

export const schema = yup.object().shape({
    mainImg: yup.string().required(),
    title: yup.string().trim().required().max(50),
    description: yup.string().trim().required().max(500),
    portions: yup.number().positive().required(),
    categoriesIds: yup.array().min(3).required(),
    time: yup.number().positive().required().max(10000),
    ingredients: yup
        .array()
        .of(
            yup.object().shape({
                title: yup.string().required().max(50),
                count: yup.number().positive().required(),
                measureUnit: yup.string().required(),
            }),
        )
        .min(1)
        .required(),
    steps: yup
        .array()
        .of(
            yup.object().shape({
                stepNumber: yup.number().positive().required(),
                description: yup.string().required().max(500),
                image: yup.string(),
            }),
        )
        .min(1)
        .required(),
});
