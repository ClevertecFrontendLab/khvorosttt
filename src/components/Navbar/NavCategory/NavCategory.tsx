import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Flex,
    Image,
    Text,
} from '@chakra-ui/react';
import { Link } from 'react-router';

import { categoryPath, markerFood, markFood } from '~/data/consts';

export type navCategoryType = {
    category: number;
    subCategory: string[];
};

export function NavCategory(data: navCategoryType) {
    return (
        <Accordion allowMultiple>
            <AccordionItem>
                <AccordionButton
                    as={Link}
                    to={categoryPath(data.category)}
                    data-test-id={data.category == 7 ? 'vegan-cuisine' : ''}
                >
                    <Flex alignItems='center' gap='5px'>
                        <Image src={markFood(data.category)} w='16px' h='16px' />
                        <Text fontSize='14px' textAlign='left' fontWeight={400}>
                            {markerFood[data.category]}
                        </Text>
                    </Flex>
                    <AccordionIcon ml='auto' />
                </AccordionButton>
                <AccordionPanel pb={4}>
                    {data.subCategory.map((subCategory) => (
                        <Text>{subCategory}</Text>
                    ))}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}
