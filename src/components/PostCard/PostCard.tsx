import { Avatar, Card, CardBody, CardHeader, Heading, HStack, Stack, Text } from '@chakra-ui/react';

import { bloggerI } from '~/interfaces/bloggerI';

import { CardDescriptionStyle, CardEmailStyle, CardHeadingStyle } from './PostCard.style';

export type PostCardProps = {
    data: bloggerI;
};

export function PostCard({ data }: PostCardProps) {
    return (
        <Card
            overflow='hidden'
            h={{ base: '152px', lg: '160px', '3xl': '184px' }}
            data-test-id='blogs-card'
        >
            <CardHeader padding='16px 16px 8px 16px' w='100%'>
                <HStack w='100%'>
                    <Avatar name={`${data.firstName} ${data.lastName}`} />
                    <Stack gap='2px' w='100%' overflow='hidden'>
                        <Heading
                            size='sm'
                            sx={CardHeadingStyle}
                            isTruncated
                            data-test-id='blogs-card-name'
                        >
                            {data.firstName} {data.lastName}
                        </Heading>
                        <Text sx={CardEmailStyle} data-test-id='blogs-card-login'>
                            @{data.login}
                        </Text>
                    </Stack>
                </HStack>
            </CardHeader>
            <CardBody padding='8px 16px 16px 16px' w='100%'>
                <Text sx={CardDescriptionStyle} isTruncated data-test-id='blogs-card-notes-text'>
                    {data.notes.length ? data.notes[0].text : ''}
                </Text>
            </CardBody>
        </Card>
    );
}
