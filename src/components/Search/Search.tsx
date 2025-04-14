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

interface SearchProps {
    name: string;
    description: string | null;
}

export function Search(data: SearchProps) {
    return (
        <VStack>
            <Text as='h2' fontWeight={700} fontSize={{ base: '24px', lg: '48px' }}>
                {data.name}
            </Text>
            {data.description! ? <Text>{data.description}</Text> : null}
            <Flex gap='15px'>
                <IconButton icon={<SearchIcon2 />} aria-label='search' />
                <InputGroup w={{ ms: '458px', base: '284px' }}>
                    <InputRightElement pointerEvents='none'>
                        <SearchIcon color='gray.400' />
                    </InputRightElement>
                    <Input type='text' placeholder='Название или ингредиент...' />
                </InputGroup>
            </Flex>
            <Hide below='lg'>
                <Stack align='center' direction='row'>
                    <Text>Исключить мои аллергены</Text>
                    <Switch size='sm' />
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant='outline'>
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
    );
}
