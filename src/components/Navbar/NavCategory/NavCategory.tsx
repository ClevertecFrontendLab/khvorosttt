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
import { useNavigate } from 'react-router';

import { useCategoryContext } from '~/components/CategoryContext/CategoryContext';
import { markerFood, markFood } from '~/data/consts';

export type navCategoryType = {
    category: string;
    subCategory: string[];
};

export function NavCategory(data: navCategoryType) {
    const navigate = useNavigate();
    const { category, selectCategory, subcategory, selectSubcategory } = useCategoryContext();
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
                    selectCategory(data.category);
                    navigate(`/${data.category}/${data.subCategory[0]}`);
                }}
                data-test-id={data.category === 'vegan' ? 'vegan-cuisine' : data.category}
            >
                <Flex alignItems='center' gap='5px'>
                    <Image src={markFood(data.category)} w='16px' h='16px' />
                    <Text fontSize='16px' textAlign='left' fontWeight={500}>
                        {markerFood[data.category]}
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
                            selectSubcategory(subCategory);
                        }}
                        data-test-id={subcategory === subCategory ? `${subcategory}-active` : ''}
                    >
                        <Box
                            w='1px'
                            h='24px'
                            borderRight={
                                category === data.category && subcategory === subCategory
                                    ? '4px solid #c4ff61'
                                    : '1px solid #c4ff61'
                            }
                        />
                        <Text fontSize='16px' fontWeight={500} fontFamily='text'>
                            {markerFood[subCategory]}
                        </Text>
                    </Flex>
                ))}
            </AccordionPanel>
        </AccordionItem>
    );
}
