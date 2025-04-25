import {
    Accordion,
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

import { categoryPath, markerFood, markFood } from '~/data/consts';

export type navCategoryType = {
    category: string;
    subCategory: string[];
};

export function NavCategory(data: navCategoryType) {
    const navigate = useNavigate();
    return (
        <Accordion allowMultiple>
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
                    _expanded={{ bg: '#c4ff61' }}
                    borderRadius={0}
                    onClick={() => navigate(`/${categoryPath(data.category)}`)}
                    data-test-id={data.category == 'vegan' ? 'vegan-cuisine' : ''}
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
                        <Flex padding='6px 8px 6px 52px' gap='10px' key={index}>
                            <Box w='1px' h='24px' borderRight='1px solid #c4ff61' />
                            <Text fontSize='16px' fontWeight={500} fontFamily='text'>
                                {subCategory}
                            </Text>
                        </Flex>
                    ))}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}
