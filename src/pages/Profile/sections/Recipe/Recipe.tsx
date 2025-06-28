import { Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

import { useGetUserRecipeBookmarksQuery } from '~/api/authApi';
import { Loader } from '~/components/Loader/Loader';
import { userI } from '~/interfaces/bloggerI';

import { DraftCard } from '../../components/DraftCard/DraftCard';
import { RecipeCard } from '../../components/RecipeCard/RecipeCard';
import { BoxStyle, LoadMoreStyle, RecipeBoxStyle } from './recipe.style';

export interface RecipeProps {
    user?: userI;
}

export function Recipe({ user }: RecipeProps) {
    const { data, isLoading, isSuccess } = useGetUserRecipeBookmarksQuery(user?._id || '', {
        refetchOnMountOrArgChange: true,
    });

    const safeDrafts = useMemo(() => user?.drafts || [], [user?.drafts]);
    const safeRecipes = useMemo(() => data?.recipes || [], [data?.recipes]);

    const [isReady, setIsReady] = useState(false);
    const [showLoadMore, setShowLoadMore] = useState(false);
    const [displayCount, setDisplayCount] = useState({
        drafts: 0,
        recipes: 0,
    });

    useEffect(() => {
        if (isSuccess && !isLoading) {
            const totalItems = safeDrafts.length + safeRecipes.length;
            const newDraftCount = Math.min(8, safeDrafts.length);
            const newRecipeCount = Math.max(0, 8 - safeDrafts.length);

            setDisplayCount({
                drafts: newDraftCount,
                recipes: newRecipeCount,
            });
            setShowLoadMore(totalItems > 8);
            setIsReady(true);
        }
    }, [isLoading, isSuccess, safeDrafts, safeRecipes]);

    const handleLoadMore = () => {
        setDisplayCount({
            drafts: safeDrafts.length,
            recipes: safeRecipes.length,
        });
        setShowLoadMore(false);
    };

    if (isLoading || !isReady) {
        return <Loader />;
    }

    return (
        <Flex data-test-id='user-profile-recipes' sx={BoxStyle}>
            <Flex sx={RecipeBoxStyle}>
                <Text as='span'>Мои рецепты</Text>
                <Text as='span' color='rgba(0, 0, 0, 0.48)' fontWeight={400}>
                    ({safeRecipes.length})
                </Text>
                {safeDrafts.length > 0 && (
                    <>
                        <Text as='span'>,</Text>
                        <Text as='span'>Черновики</Text>
                        <Text as='span' color='rgba(0, 0, 0, 0.48)' fontWeight={400}>
                            ({safeDrafts.length})
                        </Text>
                    </>
                )}
            </Flex>

            <Flex wrap='wrap' gap={{ base: '16px', '2xl': '24px' }} justifyContent='center'>
                {safeDrafts.slice(0, displayCount.drafts).map((draft, index) => (
                    <DraftCard key={`draft-${index}`} recipe={draft} index={index} />
                ))}

                {safeRecipes.slice(0, displayCount.recipes).map((recipe, index) => (
                    <RecipeCard
                        key={`recipe-${index}`}
                        recipe={recipe}
                        index={displayCount.drafts + index}
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
