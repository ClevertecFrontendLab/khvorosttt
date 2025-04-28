import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { markerFood } from '~/data/consts';
import menuCategory from '~/data/menuCategory.json';
import menuRecipes from '~/data/menuData.json';

import { useCategoryContext } from '../CategoryContext/CategoryContext';
import { FoodDisplay } from '../FoodDisplay/FoodDisplay';
import {
    TabFoodIndicatorStyle,
    TabFoodListItemStyle,
    TabFoodListStyle,
    TabFoodStyle,
} from './TabFood.style';

export function TabsFood() {
    const { category, subcategory, selectSubcategory, tabIndex } = useCategoryContext();
    return (
        <Tabs sx={TabFoodStyle} w='100%' index={tabIndex}>
            <TabList sx={TabFoodListStyle}>
                {menuCategory
                    .find((item) => item.category === category)
                    ?.subCategory.map((name, index) => (
                        <Tab
                            key={index}
                            sx={TabFoodListItemStyle}
                            onClick={() => selectSubcategory(name)}
                            data-test-id={subcategory === name ? `tab-${subcategory}-${index}` : ''}
                            aria-selected={tabIndex === index ? 'true' : 'false'}
                        >
                            {markerFood[name]}
                        </Tab>
                    ))}
                <TabIndicator sx={TabFoodIndicatorStyle} />
            </TabList>
            <TabPanels>
                {menuCategory
                    .find((item) => item.category === category)
                    ?.subCategory.map((_) => (
                        <TabPanel p={0}>
                            <FoodDisplay
                                data={menuRecipes.filter(
                                    (item) =>
                                        item.category.includes(category!) &&
                                        item.subcategory.includes(subcategory!),
                                )}
                            />
                        </TabPanel>
                    ))}
            </TabPanels>
        </Tabs>
    );
}
