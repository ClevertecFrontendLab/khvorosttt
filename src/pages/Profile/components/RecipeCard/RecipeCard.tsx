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
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { useBookmarkRecipeMutation } from '~/api/authApi';
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
import { DeleteBookmarkIcon } from '~/components/Icons/DeleteBookmark';
import { Interactions } from '~/components/Interactions/Interactions';
import { IMAGE_BASED_PATH } from '~/data/consts';
import { recipeI } from '~/interfaces/recipeI';
import { setNotification } from '~/services/features/notificationSlice';

export interface RecipeCardProps {
    index: number;
    recipe: recipeI;
    type: 'recipe' | 'bookmark';
    onRemoveBookmark?: (id: string) => void;
}

export function RecipeCard({ index, recipe, type, onRemoveBookmark }: RecipeCardProps) {
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
                    {type === 'recipe' ? (
                        <EditButton _id={recipe?._id || ''} recipe={recipe} />
                    ) : (
                        <DeleteBookmarkButton _id={recipe?._id || ''} onRemove={onRemoveBookmark} />
                    )}
                </CardFooter>
            </Stack>
        </Card>
    );
}

export interface ButtonProps {
    _id: string;
    recipe?: recipeI;
    onRemove?: (id: string) => void;
}

export function EditButton({ _id, recipe }: ButtonProps) {
    const navigate = useNavigate();
    return (
        <Button
            sx={RecipeCardButtonStyle}
            data-test-id='profile-edit-button'
            onClick={() => {
                navigate(`/edit-recipe/${_id}`, {
                    state: {
                        recipeData: recipe,
                    },
                });
            }}
        >
            <Text>Редактировать</Text>
        </Button>
    );
}

export function DeleteBookmarkButton({ _id, onRemove }: ButtonProps) {
    const dispatch = useDispatch();
    const [bookmarksRecipe, { isLoading }] = useBookmarkRecipeMutation();

    const handleBookmarks = () => {
        bookmarksRecipe(_id)
            .unwrap()
            .then(() => onRemove?.(_id))
            .catch(() => {
                dispatch(
                    setNotification({
                        title: 'Ошибка сервера',
                        description: 'Попробуйте немного позже',
                        type: 'error',
                    }),
                );
            });
    };

    return (
        <Button
            sx={RecipeCardButtonStyle}
            onClick={handleBookmarks}
            isLoading={isLoading}
            data-test-id='profile-edit-button'
        >
            <Hide below='lg'>
                <DeleteBookmarkIcon />
            </Hide>
            <Text>Убрать из сохранённых</Text>
        </Button>
    );
}
