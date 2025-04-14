import { Avatar, Card, CardBody, CardHeader, Heading, HStack, Stack, Text } from '@chakra-ui/react';

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
                        <Heading
                            size='sm'
                            overflow='hidden'
                            fontWeight={500}
                            fontSize={{ base: '16', lg: '18px' }}
                            fontStyle='text'
                            isTruncated
                        >
                            {data.name}
                        </Heading>
                        <Text
                            color='rgba(0, 0, 0, 0.64)'
                            fontWeight={400}
                            fontSize={{ base: '12px', lg: '14px' }}
                            fontStyle='text'
                        >
                            {data.email}
                        </Text>
                    </Stack>
                </HStack>
            </CardHeader>
            <CardBody padding='8px 16px 16px 16px' w='100%'>
                <Text
                    noOfLines={3}
                    fontSize='14px'
                    fontFamily='text'
                    overflow='hidden'
                    isTruncated
                    whiteSpace='normal'
                >
                    {data.text}
                </Text>
            </CardBody>
        </Card>
    );
}
