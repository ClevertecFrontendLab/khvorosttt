import { Avatar, Card, CardBody, CardHeader, Heading, HStack, Stack, Text } from '@chakra-ui/react';

import { CardDescriptionStyle, CardEmailStyle, CardHeadingStyle } from './PostCard.style';

export type AuthorTypeInfo = {
    name: string;
    email: string;
    src: string;
    text: string;
};

export type AuthorType = {
    data: AuthorTypeInfo;
};

export function PostCard({ data }: AuthorType) {
    return (
        <Card overflow='hidden'>
            <CardHeader padding='16px 16px 8px 16px' w='100%'>
                <HStack w='100%'>
                    <Avatar name={data.name} src={data.src} />
                    <Stack gap='2px' w='100%' overflow='hidden'>
                        <Heading size='sm' sx={CardHeadingStyle} isTruncated>
                            {data.name}
                        </Heading>
                        <Text sx={CardEmailStyle}>{data.email}</Text>
                    </Stack>
                </HStack>
            </CardHeader>
            <CardBody padding='8px 16px 16px 16px' w='100%'>
                <Text sx={CardDescriptionStyle} isTruncated>
                    {data.text}
                </Text>
            </CardBody>
        </Card>
    );
}
