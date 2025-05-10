import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGetRecipeBySubcategoryQuery } from '~/api/recipeApi';
import { setNotification } from '~/services/features/notificationSlice';
import { selectedCategories } from '~/services/features/selectors';

import { useCategoryContext } from '../CategoryContext/CategoryContext';
import { FoodDisplay } from '../FoodDisplay/FoodDisplay';
import { Loader } from '../Loader/Loader';
import {
    TabFoodIndicatorStyle,
    TabFoodListItemStyle,
    TabFoodListStyle,
    TabFoodStyle,
} from './TabFood.style';

export function TabsFood() {
    const categoriesSavedData = useSelector(selectedCategories);
    const { category, subcategory, selectSubcategory, tabIndex } = useCategoryContext();
    const currentSubcategories = categoriesSavedData.subcategories.filter(
        (item) => item.rootCategoryId === category,
    );
    const dispatch = useDispatch();
    const { data, isLoading, isError } = useGetRecipeBySubcategoryQuery({ id: subcategory });
    useEffect(() => {
        if (isError) {
            dispatch(
                setNotification({
                    title: 'Ошибка сервера',
                    description: 'Попробуйте поискать снова попозже',
                }),
            );
        }
    }, [isError, dispatch]);

    if (isLoading) {
        return <Loader />;
    }
    return (
        <Tabs sx={TabFoodStyle} w='100%' index={tabIndex}>
            <TabList sx={TabFoodListStyle}>
                {currentSubcategories.map((sub, index) => (
                    <Tab
                        key={index}
                        sx={TabFoodListItemStyle}
                        onClick={() => {
                            selectSubcategory(sub._id);
                        }}
                        data-test-id={`tab-${sub.category}-${index}`}
                        aria-selected={tabIndex === index ? 'true' : 'false'}
                    >
                        {sub.title}
                    </Tab>
                ))}
                <TabIndicator sx={TabFoodIndicatorStyle} />
            </TabList>
            <TabPanels>
                {currentSubcategories.map((_, index) => (
                    <TabPanel p={0} key={index}>
                        {tabIndex === index ? (
                            <FoodDisplay
                                data={data ? data.recipes : []}
                                hasMore={false}
                                loadMore={() => {}}
                                isLoading={isLoading}
                            />
                        ) : null}
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
}
