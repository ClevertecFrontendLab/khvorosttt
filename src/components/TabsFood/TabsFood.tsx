import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { markerFood } from '~/data/consts';
import juiciest from '~/data/juiciest.json';
import { Juiciest } from '~/sections/Juiciest/Juiciest';

export function TabsFood() {
    return (
        <Tabs>
            <TabList>
                {markerFood.map((name) => (
                    <Tab>{name}</Tab>
                ))}
            </TabList>
            <TabPanels>
                {markerFood.map((_) => (
                    <TabPanel>
                        <Juiciest data={juiciest} />
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
}
