import { Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

import { recipeI } from '~/interfaces/recipeI';

import { RecipeCard } from '../../components/RecipeCard/RecipeCard';
import { BoxStyle, LoadMoreStyle, RecipeBoxStyle } from '../section.style';

export interface BookmarksProps {
    recipes: recipeI[];
}

export function Bookmarks({ recipes: initialRecipes }: BookmarksProps) {
    const [localRecipes, setLocalRecipes] = useState<recipeI[]>([]);
    const safeRecipes = useMemo(() => localRecipes, [localRecipes]);
    const [showLoadMore, setShowLoadMore] = useState(false);
    const [displayCount, setDisplayCount] = useState(8);

    useEffect(() => {
        setLocalRecipes(initialRecipes ?? []);
    }, [initialRecipes]);

    const handleLoadMore = () => {
        setDisplayCount(safeRecipes.length);
        setShowLoadMore(false);
    };

    const handleRemoveBookmark = (recipeId: string) => {
        setLocalRecipes((prev) => prev.filter((recipe) => recipe._id !== recipeId));
    };

    useEffect(() => {
        setShowLoadMore(safeRecipes.length > 8);
    }, [safeRecipes]);

    return (
        <Flex data-test-id='user-profile-bookmarks' sx={BoxStyle}>
            <Flex sx={RecipeBoxStyle} alignSelf='flex-start'>
                <Text as='span'>Мои закладки</Text>
                <Text as='span' color='rgba(0, 0, 0, 0.48)' fontWeight={400}>
                    ({safeRecipes.length})
                </Text>
            </Flex>
            <Flex wrap='wrap' gap={{ base: '16px', '2xl': '24px' }} justifyContent='center'>
                {safeRecipes.slice(0, displayCount).map((recipe, index) => (
                    <RecipeCard
                        key={`recipe-${recipe._id}`}
                        recipe={recipe}
                        index={index}
                        type='bookmark'
                        onRemoveBookmark={handleRemoveBookmark}
                    />
                ))}
            </Flex>

            {showLoadMore && (
                <Button sx={LoadMoreStyle} onClick={handleLoadMore} data-test-id='load-more-button'>
                    загрузить ещё
                </Button>
            )}
        </Flex>
    );
}
