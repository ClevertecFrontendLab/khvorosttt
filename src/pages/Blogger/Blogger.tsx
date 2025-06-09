import { Flex } from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router';

import { useGetRecipeByUserQuery } from '~/api/authApi';

import { InfoCard } from './sections/InfoCard/InfoCard';
import { UserRecipe } from './sections/UserRecipe/UserRecipe';

export function Blogger() {
    const { bloggerId } = useParams();
    const { data, isError } = useGetRecipeByUserQuery(bloggerId);
    if (isError) {
        return <Navigate to='/not-found' />;
    }
    return (
        <Flex flexDirection='column' w='100%' p='90px 24px' gap='24px'>
            <InfoCard />
            <UserRecipe recipes={data ? data.recipes : []} />
        </Flex>
    );
}
