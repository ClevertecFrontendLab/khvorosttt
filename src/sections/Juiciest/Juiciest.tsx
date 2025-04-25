import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Flex, Grid, GridItem, Hide, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import { CardJuiciest } from '~/components/CardJuiciest/CardJuiciest';
import { recipeI } from '~/data/interface/data';

import { JuiciestButtonStyle, JuiciestSectionHeadingStyle } from './Juiciest.style';

interface JuiciestProps {
    title: string | null;
    data: recipeI[];
}

export function Juiciest({ title, data }: JuiciestProps) {
    return (
        <Flex flexDirection='column' gap='16px'>
            <Flex justifyContent='space-between' alignItems='center'>
                {title! ? (
                    <Text as='h3' sx={JuiciestSectionHeadingStyle}>
                        {title}
                    </Text>
                ) : null}

                <Hide below='lg'>
                    <Button
                        data-test-id='juiciest-link'
                        rightIcon={<ArrowForwardIcon />}
                        as={Link}
                        to='/the-juiciest'
                        sx={JuiciestButtonStyle}
                    >
                        Вся подборка
                    </Button>
                </Hide>
            </Flex>
            <Grid
                templateColumns={{ base: 'repeat(4, 1fr)', ms: 'repeat(12, 1fr)' }}
                w='100%'
                gap='24px'
            >
                {data.map((recipe, index) => (
                    <GridItem key={index} colSpan={{ base: 4, sm: 6, xl: 12, '3xl': 6 }}>
                        <CardJuiciest {...recipe} />
                    </GridItem>
                ))}
            </Grid>
            <Button
                data-test-id='juiciest-link-mobile'
                display={{ base: 'flex', lg: 'none' }}
                rightIcon={<ArrowForwardIcon />}
                alignSelf='center'
                as={Link}
                to='/the-juiciest'
                sx={JuiciestButtonStyle}
            >
                Вся подборка
            </Button>
        </Flex>
    );
}
