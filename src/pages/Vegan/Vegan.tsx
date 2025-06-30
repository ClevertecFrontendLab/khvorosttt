import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { Search } from '~/components/Search/Search';
import { TabsFood } from '~/components/TabsFood/TabsFood';
import { categoryI } from '~/interfaces/categoryI';
import { CategoryInfo } from '~/sections/CategoryInfoSection/CategoryInfo';
import { selectedCategories, selectedFilters } from '~/services/features/selectors';

export function Vegan() {
    const { categoryId, subcategoryId } = useParams();
    const navigate = useNavigate();
    const categories = useSelector(selectedCategories);
    const filters = useSelector(selectedFilters);
    const [cat, setCat] = useState<categoryI>();

    useEffect(() => {
        const category = categories.categories.find((cat) => cat.category === categoryId);
        if (!category) {
            navigate('/not-found');
            return;
        }
        setCat(category);
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
                <Search name={cat?.title || ''} description={cat?.description || ''} />
                {!filters.doFinding ? <TabsFood /> : null}
                <CategoryInfo />
            </Flex>
        </Box>
    );
}
