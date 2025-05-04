import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    Image,
    Text,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { useCategoryContext } from '~/components/CategoryContext/CategoryContext';
import { IMAGE_BASED_PATH } from '~/data/consts';
import { categoryI, subCategoryI } from '~/interfaces/categoryI';
import { applyFilters } from '~/services/features/recipeSlice';
import { selectedFilters } from '~/services/features/selectors';

export type navCategoryType = {
    category: categoryI;
    subCategory: subCategoryI[];
};

export function NavCategory(data: navCategoryType) {
    const navigate = useNavigate();
    const { category, selectCategory, subcategory, selectSubcategory } = useCategoryContext();
    const dispatch = useDispatch();
    const filters = useSelector(selectedFilters);
    return (
        <AccordionItem
            sx={{
                _expanded: {
                    bg: '#c4ff61',
                },
            }}
            border='none'
            borderRadius={0}
        >
            <AccordionButton
                _expanded={{ bg: '#eaffc7' }}
                borderRadius={0}
                onClick={() => {
                    selectCategory(data.category.title);
                    navigate(
                        `/${data.category.category}/${data.category.subCategories[0].category}`,
                    );
                    dispatch(applyFilters({ category, subcategory, filters }));
                }}
                data-test-id={data.category.title === 'vegan' ? 'vegan-cuisine' : data.category}
            >
                <Flex alignItems='center' gap='5px'>
                    <Image src={`${IMAGE_BASED_PATH}${data.category.icon}`} w='16px' h='16px' />
                    <Text fontSize='16px' textAlign='left' fontWeight={500}>
                        {data.category.title}
                    </Text>
                </Flex>
                <AccordionIcon ml='auto' />
            </AccordionButton>
            <AccordionPanel pb={4} pl={0}>
                {data.subCategory.map((subCategory, index) => (
                    <Flex
                        padding='6px 8px 6px 52px'
                        gap='10px'
                        key={index}
                        onClick={() => {
                            selectSubcategory(subCategory.title);
                            navigate(`/${data.category.category}/${subCategory.category}`);
                            dispatch(applyFilters({ category, subcategory, filters }));
                        }}
                        data-test-id={
                            subcategory === subCategory.title ? `${subcategory}-active` : ''
                        }
                    >
                        <Box
                            w='1px'
                            h='24px'
                            borderRight={
                                category === data.category.title &&
                                subcategory === subCategory.title
                                    ? '4px solid #c4ff61'
                                    : '1px solid #c4ff61'
                            }
                        />
                        <Text fontSize='16px' fontWeight={500} fontFamily='text'>
                            {subCategory.title}
                        </Text>
                    </Flex>
                ))}
            </AccordionPanel>
        </AccordionItem>
    );
}
