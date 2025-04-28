import { SearchIcon } from '@chakra-ui/icons';
import {
    Flex,
    Hide,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    VStack,
} from '@chakra-ui/react';

import { Allergens } from '../Allergens/Allergens';
import { SearchIcon2 } from '../Icons/SearchIcon';
import { IconButtonStyle, SearchDescriptionStyle, SearchHeaderStyle } from './Search.style';

interface SearchProps {
    name: string;
    description: string | null;
}

export function Search(data: SearchProps) {
    return (
        <VStack gap={{ base: '16px', lg: '32px' }}>
            <VStack gap={{ base: '16px', lg: '12px' }}>
                <Text as='h2' sx={SearchHeaderStyle}>
                    {data.name}
                </Text>
                {data.description! ? (
                    <Text sx={SearchDescriptionStyle} align='center'>
                        {data.description}
                    </Text>
                ) : null}
            </VStack>
            <VStack gap='16px' maxW={{ base: '328px', md: 'none' }}>
                <Flex gap='15px'>
                    <IconButton icon={<SearchIcon2 />} aria-label='search' sx={IconButtonStyle} />
                    <InputGroup w={{ ms: '458px', base: '284px' }}>
                        <InputRightElement pointerEvents='none'>
                            <SearchIcon color='black' />
                        </InputRightElement>
                        <Input
                            type='text'
                            _placeholder={{
                                color: '#134b00',
                                fontWeight: 400,
                                fontSize: { md: '18px', lg: '14px' },
                            }}
                            placeholder='Название или ингредиент...'
                        />
                    </InputGroup>
                </Flex>
                <Hide below='lg'>
                    <Allergens type='' />
                </Hide>
            </VStack>
        </VStack>
    );
}
