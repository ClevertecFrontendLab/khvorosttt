import { Flex } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { Navigate, useParams } from 'react-router';

import { useGetRecipeByUserQuery } from '~/api/authApi';
import { setNotification } from '~/services/features/notificationSlice';

import { InfoCard } from './sections/InfoCard/InfoCard';
import { Notes } from './sections/Notes/Notes';
import { OtherBloggers } from './sections/OtherBloggers/OtherBloggers';
import { UserRecipe } from './sections/UserRecipe/UserRecipe';

export function Blogger() {
    const { bloggerId } = useParams();
    const { data, isError } = useGetRecipeByUserQuery(bloggerId);
    const dispatch = useDispatch();
    if (isError) {
        dispatch(
            setNotification({
                title: 'Ошибка сервера',
                typeN: 'error',
                description: 'Попробуйте немного позже.',
            }),
        );
        return <Navigate to='/not-found' />;
    }
    return (
        <Flex flexDirection='column' w='100%' p='90px 24px' gap='24px'>
            <InfoCard />
            <UserRecipe recipes={data ? data.recipes : []} />
            <Notes notes={data ? data.notes : []} />
            <OtherBloggers />
        </Flex>
    );
}
