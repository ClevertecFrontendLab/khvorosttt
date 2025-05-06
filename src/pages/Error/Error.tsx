import { Flex, Image, Link, Text } from '@chakra-ui/react';

import error from '~/assets/images/ErrorPage.png';

import {
    ErrorContentContainerStyle,
    ErrorContentStyle,
    ErrorHeadingStyle,
    ErrorImageStyle,
    ErrorPageStyle,
    ErrorTextStyle,
} from './error.style';

export function ErrorPage() {
    return (
        <Flex sx={ErrorPageStyle}>
            <Flex sx={ErrorContentStyle}>
                <Image src={error} alt='error page' sx={ErrorImageStyle} />
                <Flex sx={ErrorContentContainerStyle}>
                    <Text as='h2' sx={ErrorHeadingStyle}>
                        Упс! Такой страницы нет
                    </Text>
                    <Text sx={ErrorTextStyle}>
                        Можете поискать другой рецепт{' '}
                        <Link href='/' data-test-id='error-page-go-home' textDecoration='underline'>
                            здесь
                        </Link>
                        .
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
}
