import 'swiper/swiper-bundle.css';

import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CardNew } from '~/components/CardNew/CardNew';
import { useCategoryContext } from '~/components/CategoryContext/CategoryContext';
import { recipeI } from '~/data/interface/data';

import {
    newRecipeheaderStyle,
    siderButtonNextStyle,
    siderButtonPrevStyle,
} from './newRecipe.style';

interface NewRecipes {
    data: recipeI[];
}

export function NewRecipes({ data }: NewRecipes) {
    const navigate = useNavigate();
    const { selectCategory, selectSubcategory } = useCategoryContext();
    return (
        <Flex flexDirection='column' gap='24px'>
            <Text as='h3' sx={newRecipeheaderStyle}>
                Новые рецепты
            </Text>
            <Box overflow='hidden' w='100%' p='10px 0px' m='10px' position='relative'>
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
                            spaceBetween: 12,
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
                    {data.map((recipe, index) => (
                        <SwiperSlide
                            key={index}
                            style={{ height: 'auto' }}
                            data-test-id={`carousel-card-${index}`}
                            onClick={() => {
                                selectCategory(recipe.category[0]);
                                selectSubcategory(recipe.subcategory[0]);
                                navigate(
                                    `/${recipe.category[0]}/${recipe.subcategory[0]}/${recipe.id}`,
                                );
                            }}
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
                    ))}
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
