import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGetRelevantQuery } from '~/api/recipeApi';
import { useCategoryContext } from '~/components/CategoryContext/CategoryContext';
import { Loader } from '~/components/Loader/Loader';
import { ShortCardFood } from '~/components/ShortCardFood/ShortCardFood';
import { ShortCardTitle } from '~/components/ShortCardFood/ShortCardTitle';
import { recipeI } from '~/data/interface/data';
import { categoryI } from '~/interfaces/categoryI';
import { setNotification } from '~/services/features/notificationSlice';
import { selectedCategories } from '~/services/features/selectors';

export type CategoryInfoType = {
    name: string;
    description: string;
    data: recipeI[];
};

export function CategoryInfo() {
    const { category } = useCategoryContext();
    const categoriesSavedData = useSelector(selectedCategories);
    const [randomCategory, setRandomCategory] = useState<categoryI>();
    const [randomSubcategoryIds, setRandomSubcategoryIds] = useState<string[]>([]);

    useEffect(() => {
        if (categoriesSavedData.categories.length > 0) {
            const randomIndex = Math.floor(Math.random() * categoriesSavedData.categories.length);
            const rCategory = categoriesSavedData.categories[randomIndex];
            const ids = rCategory.subCategories.map((sub) => sub._id);
            setRandomCategory(rCategory);
            setRandomSubcategoryIds(ids);
        }
    }, [category, categoriesSavedData.categories]);

    const { data, isLoading, isError } = useGetRelevantQuery(
        { limit: 5, ids: randomSubcategoryIds },
        { skip: !randomSubcategoryIds.length },
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (isError || !data) {
            dispatch(
                setNotification({
                    title: 'Ошибка сервера',
                    description: 'Попробуйте поискать снова попозже',
                    typeN: 'error',
                }),
            );
        }
    }, [data, isError, dispatch]);

    if (isLoading) {
        return <Loader />;
    }
    if (!data) {
        return null;
    }
    return (
        <Box display='flex' flexDirection='column' gap='24px' padding={{ base: '16px' }}>
            <Flex flexDirection={{ base: 'column', lg: 'row' }} alignItems='center' gap='10px'>
                <Text
                    as='h3'
                    fontWeight={500}
                    fontSize={{ '3xl': '48px', '2xl': '36px', base: '24px' }}
                    mr='auto'
                    fontFamily='text'
                >
                    {randomCategory?.title}
                </Text>
                <Text
                    ml='auto'
                    fontSize={{ lg: '16px', base: '14px' }}
                    fontWeight={500}
                    color='rgba(0, 0, 0, 0.64)'
                    maxW={{ xl: '578px', '3xl': '668px' }}
                    fontFamily='text'
                >
                    {randomCategory?.description}
                </Text>
            </Flex>
            <Grid
                templateColumns={{ base: 'repeat(4, 1fr)', md: 'repeat(12, 1fr)' }}
                w='100%'
                gap='24px'
            >
                <GridItem colSpan={{ base: 4, md: 4, '3xl': 3 }}>
                    <ShortCardFood {...data[0]} />
                </GridItem>
                <GridItem colSpan={{ base: 4, md: 4, '3xl': 3 }}>
                    <ShortCardFood {...data[1]} />
                </GridItem>
                <GridItem colSpan={{ base: 4, md: 4, '3xl': 6 }}>
                    <Flex flexDirection='column' gap='12px'>
                        {data && randomCategory ? (
                            <ShortCardTitle data={data[2]} category={randomCategory} />
                        ) : null}
                        {data && randomCategory ? (
                            <ShortCardTitle data={data[3]} category={randomCategory} />
                        ) : null}
                        {data && randomCategory ? (
                            <ShortCardTitle data={data[4]} category={randomCategory} />
                        ) : null}
                    </Flex>
                </GridItem>
            </Grid>
        </Box>
    );
}
