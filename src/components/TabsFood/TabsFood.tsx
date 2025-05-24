import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { useGetRecipeBySubcategoryQuery, useGetRecipeWithSearchQuery } from '~/api/recipeApi';
import { setNotification } from '~/services/features/notificationSlice';
import { selectedCategories, selectedFilters } from '~/services/features/selectors';

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
    const filters = useSelector(selectedFilters);
    const categoriesSavedData = useSelector(selectedCategories);
    const { subcategory, selectCategory, selectSubcategory, tabIndex } = useCategoryContext();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { categoryId: categoryParam, subcategoryId: subcategoryParam } = useParams<{
        categoryId: string;
        subcategoryId?: string;
    }>();

    const currentCategory = categoriesSavedData.categories.find(
        (item) => item.category === categoryParam,
    );

    const currentSubcategories = categoriesSavedData.subcategories.filter(
        (item) => item.rootCategoryId === currentCategory?._id,
    );

    useEffect(() => {
        if (currentCategory) {
            selectCategory(currentCategory._id);
        }
    }, [currentCategory, selectCategory]);

    useEffect(() => {
        if (subcategoryParam) {
            const subcategory = currentSubcategories.find(
                (sub) => sub.category === subcategoryParam,
            );
            if (subcategory) {
                selectSubcategory(subcategory._id);
            }
        } else if (currentSubcategories.length > 0) {
            navigate(`/${categoryParam}/${currentSubcategories[0].category}`, { replace: true });
        }
    }, [subcategoryParam, currentSubcategories, selectSubcategory, categoryParam, navigate]);

    const onlyAllergensActive =
        filters.selectedAllergens.length > 0 &&
        filters.searchQuery.trim().length < 3 &&
        filters.selectedCategories.length === 0 &&
        filters.selectedMeatType.length === 0 &&
        filters.selectedSideDishType.length === 0 &&
        filters.selectedAuthors.length === 0;

    const subcategoryQuery = useGetRecipeBySubcategoryQuery(
        { id: subcategory || '' },
        { skip: onlyAllergensActive, refetchOnMountOrArgChange: true },
    );

    console.log(subcategoryQuery);
    const allergensQuery = useGetRecipeWithSearchQuery(
        {
            limit: 8,
            page: 1,
            ids: filters.selectedCategories,
            meat: filters.selectedMeatType,
            allergens: filters.selectedAllergens,
            searchString: filters.searchQuery,
            garnish: filters.selectedSideDishType,
        },
        { skip: !onlyAllergensActive, refetchOnMountOrArgChange: true },
    );

    const { data, isFetching, isError } = useMemo(
        () => (onlyAllergensActive ? allergensQuery : subcategoryQuery),
        [onlyAllergensActive, allergensQuery, subcategoryQuery],
    );

    useEffect(() => {
        if (isError) {
            dispatch(
                setNotification({
                    title: 'Ошибка сервера',
                    description: 'Попробуйте поискать снова попозже',
                    typeN: 'error',
                }),
            );
        }
    }, [isError, dispatch]);

    const handleTabChange = (category: string) => {
        navigate(`/${categoryParam}/${category}`);
    };

    if (isFetching) {
        return <Loader />;
    }

    return (
        <Tabs sx={TabFoodStyle} w='100%' index={tabIndex}>
            <TabList sx={TabFoodListStyle}>
                {currentSubcategories.map((sub, index) => (
                    <Tab
                        key={sub._id}
                        sx={TabFoodListItemStyle}
                        onClick={() => handleTabChange(sub.category)}
                        data-test-id={`tab-${sub.category}-${index}`}
                        aria-selected={tabIndex === index ? 'true' : 'false'}
                    >
                        {sub.title}
                    </Tab>
                ))}
                <TabIndicator sx={TabFoodIndicatorStyle} />
            </TabList>
            <TabPanels>
                {currentSubcategories.map((sub, index) => (
                    <TabPanel p={0} key={sub._id}>
                        {tabIndex === index && (
                            <FoodDisplay
                                data={data?.recipes || []}
                                hasMore={false}
                                loadMore={() => {}}
                                isLoading={isFetching}
                            />
                        )}
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
}
