import { Box, Flex } from '@chakra-ui/react';

import { Search } from '~/components/Search/Search';
import { TabsFood } from '~/components/TabsFood/TabsFood';
import shortInfo from '~/data/vegan.json';
import { CategoryInfo } from '~/sections/CategoryInfoSection/CategoryInfo';

export function Vegan() {
    return (
        <Box w='100%' p='90px 0px'>
            <Flex flexDirection='column' gap='40px'>
                <Search
                    name='Веганская кухня'
                    description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
                />
                <TabsFood />
                <CategoryInfo
                    name={shortInfo.name}
                    description={shortInfo.description}
                    data={shortInfo.data}
                />
            </Flex>
        </Box>
    );
}
