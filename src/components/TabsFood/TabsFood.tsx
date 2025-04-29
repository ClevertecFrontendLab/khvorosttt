import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { markerFood } from '~/data/consts';
import menuCategory from '~/data/menuCategory.json';
import { applyFilters } from '~/services/features/recipeSlice';
import { selectedFilters, selectedRecipes } from '~/services/features/selectors';

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
    const { filteredRecipe } = useSelector(selectedRecipes);
    const dispatch = useDispatch();
    const filters = useSelector(selectedFilters);
    useEffect(() => {
        dispatch(applyFilters({ category, subcategory, filters }));
    }, [category, subcategory, dispatch]);
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
                            data-test-id={`tab-${name}-${index}`}
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
                    ?.subCategory.map((_, index) => (
                        <TabPanel p={0} key={index}>
                            {index === tabIndex ? (
                                <FoodDisplay data={index === tabIndex ? filteredRecipe : []} />
                            ) : null}
                        </TabPanel>
                    ))}
            </TabPanels>
        </Tabs>
    );
}
