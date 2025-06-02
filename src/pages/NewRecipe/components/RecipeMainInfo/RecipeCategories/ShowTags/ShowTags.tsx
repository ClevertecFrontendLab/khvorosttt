import { Box, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { selectedCategories } from '~/services/features/selectors';

import { BoxTagStyle } from './showTag.style';

export function ShowTags({ categoryIds }: { categoryIds: string[] }) {
    const categoriesData = useSelector(selectedCategories);
    const subcategories = categoriesData.subcategories;
    const selected = subcategories
        .filter((sub) => categoryIds.includes(sub._id))
        .map((sub) => sub.title);

    return (
        <Flex gap='8px'>
            {selected.slice(0, 2).map((c, index) => (
                <Box key={index} sx={BoxTagStyle}>
                    {c}
                </Box>
            ))}
            {selected.length > 2 && <Box sx={BoxTagStyle}>+{selected.length - 2}</Box>}
        </Flex>
    );
}
