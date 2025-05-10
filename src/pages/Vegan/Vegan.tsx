import { Box, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { Search } from '~/components/Search/Search';
import { TabsFood } from '~/components/TabsFood/TabsFood';
import { CategoryInfo } from '~/sections/CategoryInfoSection/CategoryInfo';
import { selectedCategories, selectedFilters } from '~/services/features/selectors';

export function Vegan() {
    const { categoryId, subcategoryId } = useParams();
    const navigate = useNavigate();
    const categories = useSelector(selectedCategories);
    const filters = useSelector(selectedFilters);

    useEffect(() => {
        const category = categories.categories.find((cat) => cat.category === categoryId);
        if (!category) {
            navigate('/not-found');
            return;
        }

        if (subcategoryId) {
            const hasSubcategory = category.subCategories?.some(
                (sub) => sub.category === subcategoryId,
            );
            if (!hasSubcategory) {
                navigate('/not-found');
            }
        }
    }, [categories, categoryId, subcategoryId, navigate]);

    if (!categories || categories.categories.length === 0) {
        return null;
    }

    return (
        <Box w='100%' p='90px 0px'>
            <Flex flexDirection='column' gap='40px'>
                <Search
                    name='Веганская кухня'
                    description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
                />
                {!filters.doFinding ? <TabsFood /> : null}
                <CategoryInfo />
            </Flex>
        </Box>
    );
}
