import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import {
    Button,
    Flex,
    Hide,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    Switch,
    Text,
    VStack,
} from '@chakra-ui/react';

import { SearchIcon2 } from '../Icons/SearchIcon';
import {
    IconButtonStyle,
    MenuButtonStyle,
    SearchDescriptionStyle,
    SearchHeaderStyle,
} from './Search.style';

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
                    <Stack align='center' direction='row'>
                        <Text fontWeight={500} fontSize='16px' fontStyle='text'>
                            Исключить мои аллергены
                        </Text>
                        <Switch size='sm' />
                        <Menu>
                            <MenuButton
                                as={Button}
                                rightIcon={<ChevronDownIcon />}
                                sx={MenuButtonStyle}
                            >
                                Выберите из списка...
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Example 1</MenuItem>
                                <MenuItem>Example 2</MenuItem>
                                <MenuItem>Example 3</MenuItem>
                            </MenuList>
                        </Menu>
                    </Stack>
                </Hide>
            </VStack>
        </VStack>
    );
}
