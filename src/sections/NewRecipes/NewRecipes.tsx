import 'swiper/swiper-bundle.css';

import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useGetNewestRecipesQuery } from '~/api/recipeApi';
import { CardNew } from '~/components/CardNew/CardNew';
import { Loader } from '~/components/Loader/Loader';
import { compareDate } from '~/data/comparators';
import { setNotification } from '~/services/features/notificationSlice';

import {
    newRecipeheaderStyle,
    siderButtonNextStyle,
    siderButtonPrevStyle,
} from './newRecipe.style';

export function NewRecipes() {
    const { data, isLoading, isError } = useGetNewestRecipesQuery();
    const dispatch = useDispatch();

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
        <Flex flexDirection='column' gap='24px'>
            <Text as='h3' sx={newRecipeheaderStyle}>
                Новые рецепты
            </Text>
            <Box
                overflow='hidden'
                w='100%'
                p='10px 0px'
                m={{ base: '0px', ms: '10px' }}
                position='relative'
            >
                <Swiper
                    style={{ width: '100%' }}
                    loop={true}
                    modules={[Navigation]}
                    navigation={{
                        nextEl: '.next-slide-btn',
                        prevEl: '.prev-slide-btn',
                    }}
                    data-test-id='carousel'
                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                            spaceBetween: 8,
                        },
                        768: {
                            slidesPerView: 4.4,
                            spaceBetween: 12,
                        },
                        1232: {
                            slidesPerView: 3.2,
                            spaceBetween: 12,
                        },
                        1700: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                    }}
                >
                    {data
                        ? data
                              .sort(compareDate)
                              .reverse()
                              .map((recipe, index) => (
                                  <SwiperSlide
                                      key={index}
                                      style={{ height: 'auto' }}
                                      data-test-id={`carousel-card-${index}`}
                                  >
                                      <Box
                                          key={index}
                                          flex='0 0 auto'
                                          w='100%'
                                          height='100%'
                                          mr={{ base: '0px', xl: '12px' }}
                                      >
                                          <CardNew {...recipe} />
                                      </Box>
                                  </SwiperSlide>
                              ))
                        : null}
                </Swiper>

                <IconButton
                    data-test-id='carousel-back'
                    className='prev-slide-btn'
                    icon={<ArrowBackIcon color='white' />}
                    aria-label='Предыдущий рецепт'
                    sx={siderButtonPrevStyle}
                />
                <IconButton
                    data-test-id='carousel-forward'
                    className='next-slide-btn'
                    icon={<ArrowForwardIcon color='white' />}
                    aria-label='Следующий рецепт'
                    sx={siderButtonNextStyle}
                />
            </Box>
        </Flex>
    );
}
