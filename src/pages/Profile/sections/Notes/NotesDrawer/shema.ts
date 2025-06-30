import * as yup from 'yup';

export const schema = yup.object().shape({
    text: yup.string().trim().required().min(10).max(160),
});
