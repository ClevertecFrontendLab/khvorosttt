import { Button, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { CardJuiciest } from '~/components/CardJuiciest/CardJuiciest';
import { recipeI } from '~/interfaces/recipeI';

interface UserRecipeProps {
    recipes: recipeI[];
    refetch?: () => void;
}

export function UserRecipe({ recipes, refetch }: UserRecipeProps) {
    const [showAll, setShowAll] = useState(false);
    const [visibleCount, setVisibleCount] = useState(8);
    useEffect(() => {
        if (showAll) setVisibleCount(recipes.length);
        else setVisibleCount(8);
    }, [showAll, recipes.length]);
    return (
        <Flex flexDirection='column' w='100%' alignItems='center' gap='16px'>
            <Flex wrap='wrap' data-test-id='recipe-card-list' gap='24px' justifyContent='center'>
                {recipes
                    ?.slice(0, visibleCount)
                    .map((recipe, index) => (
                        <CardJuiciest data={recipe} index={index} type='' refetch={refetch} />
                    ))}
            </Flex>
            {!showAll && (
                <Button
                    p='0px 16px'
                    w='152px'
                    h='40px'
                    borderRadius='6px'
                    bg='#b1ff2e'
                    onClick={() => setShowAll(true)}
                    data-test-id='load-more-button'
                >
                    Загрузить ещё
                </Button>
            )}
        </Flex>
    );
}
