import {
    Avatar,
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

import { useBookmarkRecipeMutation, useGetUserByIdQuery } from '~/api/authApi';
import { IMAGE_BASED_PATH } from '~/data/consts';
import { recipeI } from '~/interfaces/recipeI';
import { setNotification } from '~/services/features/notificationSlice';
import { getUserIdFromToken } from '~/services/utils';

import { CategoryMarker } from '../CategoryMarker/CategoryMarker';
import { BookmarkIcon } from '../Icons/Bookmark';
import { Interactions } from '../Interactions/Interactions';
import {
    CardBodyHeadingStyle,
    CardBodyStyle,
    CardImageStyle,
    CardStyle,
    MarkerInteractionsStyle,
    MarkerStyle,
    SaveButtonStyle,
} from './CardJuisiest.style';

export function CardJuiciest({
    data,
    index,
    type,
    refetch,
}: {
    data: recipeI;
    index: number;
    type?: string;
    refetch?: () => void;
}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [bookmarksRecipe] = useBookmarkRecipeMutation();
    const recomId = data.recommendedByuserId ? data.recommendedByuserId[0] : '';
    const currentUserId = getUserIdFromToken();
    const { data: reUser } = useGetUserByIdQuery(
        { userId: recomId, currentUserId: currentUserId || '' },
        { skip: !recomId },
    );

    const handleBookmarks = (id: string) => {
        bookmarksRecipe(id)
            .unwrap()
            .then(() => {
                refetch?.();
            })
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
        <Card sx={CardStyle} direction={{ sm: 'row' }}>
            <Image sx={CardImageStyle} src={`${IMAGE_BASED_PATH}${data.image}`} alt={data.title} />
            <Stack p={{ base: '8px 8px 4px 8px', lg: '20px 24px' }} w='100%' overflow='hidden'>
                <Flex sx={MarkerInteractionsStyle} alignItems='flex-start'>
                    <Flex wrap='wrap' gap='3px' direction={{ base: 'column', xl: 'row' }}>
                        <CategoryMarker style={MarkerStyle} data={data} />
                    </Flex>
                    <Flex position={{ base: 'absolute', lg: 'initial' }} left='160px'>
                        <Interactions {...data} />
                    </Flex>
                </Flex>
                <CardBody sx={CardBodyStyle}>
                    <Heading size='md' isTruncated sx={CardBodyHeadingStyle}>
                        {data.title}
                    </Heading>
                    <Hide below='lg'>
                        <Text whiteSpace='wrap' noOfLines={3} fontSize='14px' fontFamily='text'>
                            {data.description}
                        </Text>
                    </Hide>
                </CardBody>
                <CardFooter display='flex' gap='5px' p={0} justifyContent='flex-end' mt='auto'>
                    <Button sx={SaveButtonStyle} onClick={() => handleBookmarks(data._id)}>
                        <BookmarkIcon />
                        <Hide below='lg'>
                            <Text>Сохранить</Text>
                        </Hide>
                    </Button>
                    <Button
                        bg='black'
                        color='white'
                        p='0px 8px'
                        h={{ base: '24px', md: '32px' }}
                        data-test-id={`card-link-${index}`}
                        onClick={() => {
                            if (!data._id) return;
                            navigate(
                                type === 'section' ? `the-juiciest/${data._id}` : `${data._id}`,
                            );
                        }}
                    >
                        <Text>Готовить</Text>
                    </Button>
                </CardFooter>
            </Stack>
            {reUser && (
                <Flex
                    position='absolute'
                    left='10px'
                    bottom='20px'
                    color='#d7ff94'
                    p='4px 8px'
                    borderRadius='4px'
                    gap='3px'
                >
                    <Avatar
                        w='16px'
                        h='16px'
                        src={`${IMAGE_BASED_PATH}/${reUser.bloggerInfo.photoLink}`}
                    />
                    <Text fontSize='14px'>
                        {`${reUser.bloggerInfo.firstName} ${reUser.bloggerInfo.lastName}`}{' '}
                        рекомендует
                    </Text>
                </Flex>
            )}
        </Card>
    );
}
