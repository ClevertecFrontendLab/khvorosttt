import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Flex,
    Heading,
    Hide,
    Image,
    Stack,
    Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import {
    CardBodyHeadingStyle,
    CardBodyStyle,
    CardImageStyle,
    CardStyle,
    MarkerInteractionsStyle,
    MarkerStyle,
    RecipeCardButtonStyle,
} from '~/components/CardJuiciest/CardJuisiest.style';
import { CategoryMarker } from '~/components/CategoryMarker/CategoryMarker';
import { Interactions } from '~/components/Interactions/Interactions';
import { IMAGE_BASED_PATH } from '~/data/consts';
import { recipeI } from '~/interfaces/recipeI';

export interface RecipeCardProps {
    index: number;
    recipe: recipeI;
}

export function RecipeCard({ index, recipe }: RecipeCardProps) {
    const navigate = useNavigate();
    return (
        <Card sx={CardStyle} direction={{ sm: 'row' }} data-test-id={`food-card-${index}`}>
            <Image
                sx={CardImageStyle}
                src={`${IMAGE_BASED_PATH}${recipe?.image}`}
                alt={recipe?.title}
            />
            <Stack p={{ base: '8px 8px 4px 8px', lg: '20px 24px' }} w='100%' overflow='hidden'>
                <Flex sx={MarkerInteractionsStyle} alignItems='flex-start'>
                    <Flex wrap='wrap' gap='3px' direction={{ base: 'column', xl: 'row' }}>
                        <CategoryMarker style={MarkerStyle} data={recipe} />
                    </Flex>
                    <Flex position={{ base: 'absolute', lg: 'initial' }} left='160px'>
                        <Interactions {...recipe} />
                    </Flex>
                </Flex>
                <CardBody sx={CardBodyStyle}>
                    <Heading size='md' isTruncated sx={CardBodyHeadingStyle}>
                        {recipe?.title}
                    </Heading>
                    <Hide below='lg'>
                        <Text whiteSpace='wrap' noOfLines={3} fontSize='14px' fontFamily='text'>
                            {recipe?.description}
                        </Text>
                    </Hide>
                </CardBody>
                <CardFooter display='flex' gap='5px' p={0} justifyContent='flex-end'>
                    <Button
                        sx={RecipeCardButtonStyle}
                        data-test-id='profile-edit-button'
                        onClick={() => {
                            navigate(`/edit-recipe/${recipe?._id}`);
                        }}
                    >
                        <Text>Редактировать</Text>
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
}
