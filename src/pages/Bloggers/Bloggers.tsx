import { Flex, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router';

import { useGetBloggersQuery } from '~/api/authApi';
import { errorI } from '~/interfaces/authI';
import { NewRecipes } from '~/sections/NewRecipes/NewRecipes';
import { setNotification } from '~/services/features/notificationSlice';
import { getUserIdFromToken } from '~/services/utils';

import { FavoriteBloggers } from './sections/FavoriteBloggers/FavoriteBloggers';
import { OthersBloggers } from './sections/OthersBloggers/OthersBlogers';

export function Bloggers() {
    const currentUserId = getUserIdFromToken();
    const [limit, setLimit] = useState('9');
    const { data, error } = useGetBloggersQuery({ currentUserId: currentUserId!, limit: limit });
    const dispatch = useDispatch();
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        if (showAll) {
            setLimit('all');
        } else {
            setLimit('9');
        }
    }, [showAll]);

    if (error) {
        if ((error as errorI).status === 400) {
            return <Navigate to='/' />;
        } else {
            dispatch(
                setNotification({
                    title: 'Ошибка сервера',
                    typeN: 'error',
                    description: 'Попробуйте немного позже.',
                }),
            );

            return <Navigate to='/' />;
        }
    }

    return (
        <Flex flexDirection='column' w='100%' p='90px 24px' gap='24px'>
            <Heading as='h1' fontWeight={700} fontSize='48px' fontFamily='text' textAlign='center'>
                Кулинарные блоги
            </Heading>
            <Flex flexDirection='column' gap='40px'>
                {data?.favorites.length ? <FavoriteBloggers bloggers={data?.favorites} /> : null}
                {data?.others.length ? (
                    <OthersBloggers
                        bloggers={data?.others}
                        showAll={showAll}
                        setShowAll={setShowAll}
                    />
                ) : null}
            </Flex>
            <NewRecipes />
        </Flex>
    );
}
