import { Box, Flex, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import AuthBG from '~/assets/images/AuthBG.png';
import { NameIcon } from '~/components/Icons/Name';
import { PotIcon } from '~/components/Icons/Pot';

export function Auth() {
    const location = useLocation();
    const navigate = useNavigate();

    const currentTab = location.pathname.includes('/login') ? 0 : 1;

    const handleTabsChange = (index: number) => {
        navigate(index === 0 ? '/auth/login' : '/auth/signup');
    };
    return (
        <Flex h='100vh'>
            <Flex
                w={{ base: '100%', lg: '50%' }}
                bgGradient='linear(to-t, #29813F, #EAFFC7)'
                justifyContent='center'
                alignItems='center'
            >
                <Flex flexDirection='column' gap='48px'>
                    <Flex alignSelf='center' gap={2} w='256px' justifyContent='center'>
                        <PotIcon
                            w={{ base: '38px', lg: '65px' }}
                            h={{ base: '38px', lg: '64px' }}
                        />
                        <NameIcon
                            w={{ base: '131px', lg: '193px' }}
                            h={{ base: '30px', lg: '51px' }}
                            alignSelf='flex-end'
                        />
                    </Flex>
                    <Flex>
                        <Tabs index={currentTab} onChange={handleTabsChange}>
                            <TabList>
                                <Tab
                                    p='8px 24px'
                                    fontSize='16px'
                                    fontWeight={500}
                                    color='#134b00'
                                    fontFamily='text'
                                    _selected={{ color: '#207e00' }}
                                >
                                    Вход на сайт
                                </Tab>
                                <Tab
                                    p='8px 24px'
                                    fontSize='16px'
                                    fontWeight={500}
                                    color='#134b00'
                                    fontFamily='text'
                                    _selected={{ color: '#207e00' }}
                                >
                                    Регистрация
                                </Tab>
                            </TabList>
                            <TabIndicator
                                mt='-1.5px'
                                height='2px'
                                bg='green.500'
                                borderRadius='1px'
                            />
                            <TabPanels>
                                <TabPanel>{currentTab === 0 && <Outlet />}</TabPanel>
                                <TabPanel>{currentTab === 1 && <Outlet />}</TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Flex>
                </Flex>
            </Flex>
            <Box
                bgImage={AuthBG}
                h='100%'
                w='50%'
                display={{ base: 'none', lg: 'flex' }}
                bgPosition='center'
                bgRepeat='no-repeat'
                bgSize='cover'
            />
        </Flex>
    );
}
