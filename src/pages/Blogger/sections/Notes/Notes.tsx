import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { noteI } from '~/interfaces/bloggerI';

import { Note } from './Note/Note';
import { ButtonStyle, NotesCountStyle, NotesStyle } from './notes.style';

interface NotesProps {
    notes: noteI[];
}

export function Notes({ notes }: NotesProps) {
    const [showAll, setShowAll] = useState(false);
    const [visibleCount, setVisibleCount] = useState(8);

    useEffect(() => {
        if (showAll) setVisibleCount(notes.length);
        else setVisibleCount(3);
    }, [showAll, notes.length]);

    return (
        <Flex id='#notes' data-test-id='blog-notes-box' sx={NotesStyle}>
            <Flex gap='8px'>
                <Text fontFamily='text' fontWeight={400} fontSize={{ base: '20px', lg: '36px' }}>
                    Заметки
                </Text>
                <Text data-test-id='blogger-user-notes-count' sx={NotesCountStyle}>
                    ({notes.length})
                </Text>
            </Flex>
            <Flex gap='16px' data-test-id='blogger-user-notes-grid' justifyContent='center'>
                {notes.map((note, index) => (
                    <Box display={!showAll && index >= visibleCount ? 'none' : 'block'}>
                        <Note note={note} index={index} />
                    </Box>
                ))}
            </Flex>
            {notes.length > 3 && (
                <Button
                    variant='ghost'
                    data-test-id='blogger-user-notes-button'
                    onClick={() => setShowAll(true)}
                    sx={ButtonStyle}
                >
                    {showAll ? 'Свернуть' : 'Показать больше'}
                </Button>
            )}
        </Flex>
    );
}
