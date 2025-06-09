import { Flex } from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router';

import { useGetRecipeByUserQuery } from '~/api/authApi';

import { InfoCard } from './sections/InfoCard/InfoCard';
import { Notes } from './sections/Notes/Notes';
import { UserRecipe } from './sections/UserRecipe/UserRecipe';

export function Blogger() {
    const { bloggerId } = useParams();
    const { data, isError } = useGetRecipeByUserQuery(bloggerId);
    console.log(data);
    if (isError) {
        return <Navigate to='/not-found' />;
    }
    return (
        <Flex flexDirection='column' w='100%' p='90px 24px' gap='24px'>
            <InfoCard />
            <UserRecipe recipes={data ? data.recipes : []} />
            <Notes notes={data ? data.notes : []} />
        </Flex>
    );
}
