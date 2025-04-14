import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Flex, Grid, GridItem, Hide, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import { CardJuiciest } from '~/components/CardJuiciest/CardJuiciest';
import { CardNewType } from '~/components/CardNew/CardNew';

interface JuiciestProps {
    data: CardNewType[];
}

export function Juiciest({ data }: JuiciestProps) {
    return (
        <Flex flexDirection='column' gap='16px'>
            <Flex justifyContent='space-between' alignItems='center'>
                <Text
                    as='h3'
                    fontWeight={500}
                    fontSize={{ '3xl': '48px', '2xl': '36px', base: '24px' }}
                >
                    Самое сочное
                </Text>
                <Hide below='lg'>
                    <Button
                        data-test-id='juiciest-link'
                        rightIcon={<ArrowForwardIcon />}
                        bg='#b1ff2e'
                        variant='solid'
                        p='0px 16px'
                        fontSize='16px'
                        fontWeight={600}
                        as={Link}
                        to='/juiciest-link'
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
                {data.map((item, index) => (
                    <GridItem key={index} colSpan={{ base: 4, sm: 6, xl: 12, '3xl': 6 }}>
                        <CardJuiciest data={item.data} />
                    </GridItem>
                ))}
            </Grid>
            <Button
                data-test-id='juiciest-link-mobile'
                display={{ base: 'flex', lg: 'none' }}
                rightIcon={<ArrowForwardIcon />}
                bg='#b1ff2e'
                variant='solid'
                p='0px 16px'
                fontSize='16px'
                fontWeight={600}
                alignSelf='center'
                as={Link}
                to='/juiciest-link'
            >
                Вся подборка
            </Button>
        </Flex>
    );
}
