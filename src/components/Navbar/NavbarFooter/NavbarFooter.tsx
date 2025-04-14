import { Button, Flex, Text } from '@chakra-ui/react';

import { OutIcon } from '~/components/Icons/Out';

import { LawStyle, NavbarFooterStyle, OutButtonStyle, VersionStyle } from './NavbarFooter.style';

export function NavbarFooter() {
    return (
        <Flex sx={NavbarFooterStyle}>
            <Text sx={VersionStyle}>Версия программы 03.25</Text>
            <Text sx={LawStyle}>
                Все права защищены,{`\n`} ученический файл,{`\n`} &copy;Клевер Технолоджи, 2025
            </Text>
            <Button leftIcon={<OutIcon />} onClick={() => {}} sx={OutButtonStyle}>
                Выход
            </Button>
        </Flex>
    );
}
