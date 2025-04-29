import { Flex, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';

import { rusName } from '~/data/consts';

export interface FilterTagsProps {
    filterType: string;
    items: string[];
    handleRemoveTag: (filterType: string, tag: string) => void;
}

export function FilterTags({ filterType, items, handleRemoveTag }: FilterTagsProps) {
    return (
        <Flex wrap='wrap' gap='4px'>
            {items.map((item: string) => (
                <Tag
                    key={item}
                    size='md'
                    borderRadius='full'
                    variant='solid'
                    colorScheme='green'
                    data-test-id='filter-tag'
                >
                    <TagLabel>{rusName(filterType, item)}</TagLabel>
                    <TagCloseButton onClick={() => handleRemoveTag(filterType, item)} />
                </Tag>
            ))}
        </Flex>
    );
}
