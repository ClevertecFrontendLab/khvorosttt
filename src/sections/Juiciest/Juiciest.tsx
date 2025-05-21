import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router';

import { useGetJuiciestRecipesQuery } from '~/api/recipeApi';
import { CardJuiciest } from '~/components/CardJuiciest/CardJuiciest';
import { Loader } from '~/components/Loader/Loader';
import { setNotification } from '~/services/features/notificationSlice';

import { JuiciestButtonStyle, JuiciestSectionHeadingStyle } from './Juiciest.style';

interface JuiciestProps {
    title: string | null;
}

export function Juiciest({ title }: JuiciestProps) {
    const { data, isLoading, isError } = useGetJuiciestRecipesQuery({ limit: 4, page: 1 });
    const dispatch = useDispatch();

    useEffect(() => {
        if (isError) {
            dispatch(
                setNotification({
                    title: 'Ошибка сервера',
                    description: 'Попробуйте поискать снова попозже',
                    typeN: 'error',
                }),
            );
        }
    }, [isError, dispatch]);

    if (isLoading || !data) {
        return <Loader />;
    }

    return (
        <Flex flexDirection='column' gap='16px'>
            <Flex justifyContent='space-between' alignItems='center'>
                {title! ? (
                    <Text as='h3' sx={JuiciestSectionHeadingStyle}>
                        {title}
                    </Text>
                ) : null}

                <Button
                    display={{ base: 'none', md: 'flex' }}
                    data-test-id='juiciest-link'
                    rightIcon={<ArrowForwardIcon />}
                    as={Link}
                    to='/the-juiciest'
                    sx={JuiciestButtonStyle}
                >
                    Вся подборка
                </Button>
            </Flex>
            <Grid
                templateColumns={{ base: 'repeat(4, 1fr)', ms: 'repeat(12, 1fr)' }}
                w='100%'
                gap='24px'
            >
                {data.recipes.map((recipe, index) => (
                    <GridItem key={index} colSpan={{ base: 4, sm: 6, xl: 12, '3xl': 6 }}>
                        <Box data-test-id={`food-card-${index}`}>
                            <CardJuiciest index={index} data={recipe} type='section' />
                        </Box>
                    </GridItem>
                ))}
            </Grid>
            <Button
                data-test-id='juiciest-link-mobile'
                display={{ base: 'flex', lg: 'none' }}
                rightIcon={<ArrowForwardIcon />}
                alignSelf='center'
                as={Link}
                to='/the-juiciest'
                sx={JuiciestButtonStyle}
            >
                Вся подборка
            </Button>
        </Flex>
    );
}
