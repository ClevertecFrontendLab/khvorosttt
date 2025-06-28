import {
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
import { useNavigate } from 'react-router';

import imageIcon from '~/assets/images/BsFillImageFill.png';
import {
    CardBodyHeadingStyle,
    CardBodyStyle,
    CardImageStyle,
    CardNoneImageStyle,
    CardStyle,
    DraftCardButtonStyle,
    DraftTextStyle,
} from '~/components/CardJuiciest/CardJuisiest.style';
import { IMAGE_BASED_PATH } from '~/data/consts';
import { recipeI } from '~/interfaces/recipeI';

export interface DraftCardProps {
    recipe: recipeI;
    index: number;
}

export function DraftCard({ recipe, index }: DraftCardProps) {
    const navigate = useNavigate();
    return (
        <Card sx={CardStyle} direction={{ sm: 'row' }} data-test-id={`food-card-${index}`}>
            {recipe.image ? (
                <Image
                    sx={CardImageStyle}
                    src={`${IMAGE_BASED_PATH}${recipe.image}`}
                    alt={recipe.title}
                />
            ) : (
                <Flex sx={CardNoneImageStyle}>
                    <Image src={imageIcon} w='32px' h='32px' />
                </Flex>
            )}
            <Stack p={{ base: '8px 8px 4px 8px', lg: '20px 24px' }} w='100%' overflow='hidden'>
                <Flex justifyContent='right'>
                    <Text sx={DraftTextStyle}>Черновик</Text>
                </Flex>
                <CardBody sx={CardBodyStyle}>
                    <Heading size='md' isTruncated sx={CardBodyHeadingStyle}>
                        {recipe.title}
                    </Heading>
                    <Hide below='lg'>
                        <Text whiteSpace='wrap' noOfLines={3} fontSize='14px' fontFamily='text'>
                            {recipe.description}
                        </Text>
                    </Hide>
                </CardBody>
                <CardFooter display='flex' gap='5px' p={0} justifyContent='flex-end'>
                    <Button
                        sx={DraftCardButtonStyle}
                        data-test-id='profile-edit-button'
                        onClick={() => {
                            navigate(`/edit-draft/${recipe._id}`, {
                                state: {
                                    draftData: recipe,
                                },
                            });
                        }}
                    >
                        <Text>Редактировать</Text>
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
}
