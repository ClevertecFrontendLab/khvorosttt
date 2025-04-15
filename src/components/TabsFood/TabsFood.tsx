import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { markerFood } from '~/data/consts';
import juiciest from '~/data/juiciest.json';

import { FoodDisplay } from '../FoodDisplay/FoodDisplay';
import {
    TabFoodIndicatorStyle,
    TabFoodListItemStyle,
    TabFoodListStyle,
    TabFoodStyle,
} from './TabFood.style';

export function TabsFood() {
    return (
        <Tabs sx={TabFoodStyle} w='100%'>
            <TabList sx={TabFoodListStyle}>
                {markerFood.map((name) => (
                    <Tab sx={TabFoodListItemStyle}>{name}</Tab>
                ))}
                <TabIndicator sx={TabFoodIndicatorStyle} />
            </TabList>
            <TabPanels>
                {markerFood.map((_) => (
                    <TabPanel p={0}>
                        <FoodDisplay data={juiciest} />
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
}
