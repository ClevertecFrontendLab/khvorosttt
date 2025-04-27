import { Card, CardBody, Flex, Image, Stack, Text } from '@chakra-ui/react';

import { stepI } from '~/data/interface/data';

import { ImageStyle, StepDescriptionStyle, StepNameStyle } from './StepsCooking.style';

export function StepsCooking({ data }: { data: stepI[] }) {
    return (
        <Flex direction='column' gap='20px'>
            <Text fontStyle='text' fontWeight={500} fontSize={{ base: '24px', lg: '48px' }}>
                Шаги приготовления
            </Text>
            {data.map((step, index) => (
                <Card
                    key={index}
                    variant='outline'
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                >
                    {step.image ? (
                        <Image src={step.image} alt={`step ${step.stepNumber}`} sx={ImageStyle} />
                    ) : null}

                    <Stack>
                        <CardBody p='8px 8px 4px 8px'>
                            <Text
                                bg={
                                    data.length === step.stepNumber
                                        ? '#ffffd3'
                                        : 'rgba(0, 0, 0, 0.06)'
                                }
                                sx={StepNameStyle}
                            >
                                Шаг {step.stepNumber}
                            </Text>
                            <Text sx={StepDescriptionStyle} noOfLines={3}>
                                {step.description}
                            </Text>
                        </CardBody>
                    </Stack>
                </Card>
            ))}
        </Flex>
    );
}
