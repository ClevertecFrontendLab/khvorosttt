import { EditIcon, TimeIcon } from '@chakra-ui/icons';
import { Button, Flex, IconButton, Image, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { useDeleteRecipeMutation } from '~/api/authApi';
import { MarkerStyle } from '~/components/CardNew/CardNew.style';
import { CategoryMarker } from '~/components/CategoryMarker/CategoryMarker';
import { BookmarkIcon } from '~/components/Icons/Bookmark';
import { DeleteIcon } from '~/components/Icons/DeleteIcon';
import { LikeSmileIcon } from '~/components/Icons/LikeSmile';
import { Interactions } from '~/components/Interactions/Interactions';
import { IMAGE_BASED_PATH } from '~/data/consts';
import { recipeI } from '~/interfaces/recipeI';
import { setNotification } from '~/services/features/notificationSlice';
import { getUserIdFromToken } from '~/services/utils';

import {
    ButtonStyle,
    RecipeDescriptionStyle,
    RecipeHeadingStyle,
    RecipeImageStyle,
    TimeStyle,
} from './RecipeDescription.style';

export function RecipeDescription(data: recipeI) {
    const userId = getUserIdFromToken();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [deleteRecipe] = useDeleteRecipeMutation();

    const handleDelete = (id: string) => {
        deleteRecipe(id)
            .unwrap()
            .then(() => {
                dispatch(
                    setNotification({
                        title: 'Рецепт успешно удален',
                        description: '',
                        typeN: 'success',
                    }),
                );
                navigate('/');
            })
            .catch(() => {
                dispatch(
                    setNotification({
                        title: 'Ошибка сервера',
                        description: 'Не удалось удалить рецепт',
                        typeN: 'error',
                    }),
                );
            });
    };

    return (
        <Flex sx={RecipeDescriptionStyle}>
            <Flex
                direction={{ base: 'column', ms: 'row' }}
                gap={{ base: '16px', '2xl': '24px' }}
                p='0px 10px'
            >
                <Image src={`${IMAGE_BASED_PATH}${data.image}`} sx={RecipeImageStyle} />
                <Flex direction='column' justifyContent='space-between' gap='24px'>
                    <Flex direction='column' gap='24px'>
                        <Flex justifyContent='space-between'>
                            <Flex wrap='wrap' gap='5px'>
                                <CategoryMarker style={MarkerStyle} data={data} />
                            </Flex>
                            <Flex alignSelf='self-start'>
                                <Interactions {...data} />
                            </Flex>
                        </Flex>
                        <Flex direction='column' gap='24px'>
                            <Text as='h1' sx={RecipeHeadingStyle}>
                                {data.title}
                            </Text>
                            <Text fontSize='14px' fontFamily='text'>
                                {data.description}
                            </Text>
                        </Flex>
                    </Flex>
                    <Flex
                        justifyContent='center'
                        direction={{ base: 'column', md: 'row', xl: 'column', '2xl': 'row' }}
                        gap='12px'
                    >
                        <Flex sx={TimeStyle}>
                            <TimeIcon />
                            <Text fontFamily='text' fontSize='14px'>
                                {data.time} минут
                            </Text>
                        </Flex>
                        {data.authorId === userId ? (
                            <Flex gap='16px'>
                                <IconButton
                                    icon={<DeleteIcon color='black' />}
                                    aria-label='Удалить рецепт'
                                    variant='ghost'
                                    onClick={() => handleDelete(data._id)}
                                    data-test-id='recipe-delete-button'
                                />
                                <Button
                                    leftIcon={<EditIcon />}
                                    data-test-id='recipe-save-draft-button'
                                    border='1px solid rgba(0, 0, 0, 0.08)'
                                    borderRadius='6px'
                                    p='0px 24px'
                                    variant='outline'
                                    color='rgba(0, 0, 0, 0.8)'
                                    fontWeight={600}
                                    fontSize='18px'
                                    fontFamily='text'
                                    w={{ base: '328px', md: '246px' }}
                                    onClick={() => {}}
                                >
                                    Редактировать рецепт
                                </Button>
                            </Flex>
                        ) : (
                            <Flex gap='16px'>
                                <Button
                                    leftIcon={<LikeSmileIcon />}
                                    colorScheme='gray'
                                    variant='outline'
                                    sx={ButtonStyle}
                                >
                                    Оценить рецепт
                                </Button>
                                <Button
                                    bg='#b1ff2e'
                                    color='#000'
                                    leftIcon={<BookmarkIcon />}
                                    sx={ButtonStyle}
                                >
                                    Сохранить в закладки
                                </Button>
                            </Flex>
                        )}
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
