import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { PencilIcon } from '~/components/Icons/Pencil';
import { noteI } from '~/interfaces/bloggerI';
import { Note } from '~/pages/Blogger/sections/Notes/Note/Note';

import { RecipeBoxStyle } from '../section.style';
import { NotesDrawer } from './NotesDrawer/NotesDrawer';

export interface NotesProps {
    notes: noteI[];
}

export function Notes({ notes }: NotesProps) {
    const [userNotes, setNotes] = useState<noteI[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        setNotes(notes);
    }, [notes]);

    const handleNoteCreated = (newNote: noteI) => {
        setNotes((prev) => [...prev, newNote]);
    };

    const handleNoteDeleted = (id: string) => {
        setNotes((prev) => prev.filter((note) => note._id !== id));
    };

    return (
        <Flex
            data-test-id='blog-notes-box'
            w='100%'
            flexDirection='column'
            bg='rgba(0, 0, 0, 0.04)'
            p='16px 24px'
            borderRadius='16px'
        >
            <Flex
                sx={RecipeBoxStyle}
                alignSelf='flex-start'
                justifyContent='space-between'
                w='100%'
                alignItems='center'
            >
                <Flex>
                    <Text as='span'>Заметки</Text>
                    <Text as='span' color='rgba(0, 0, 0, 0.48)' fontWeight={400}>
                        ({notes.length})
                    </Text>
                </Flex>
                <Button
                    variant='outline'
                    borderRadius='6px'
                    p='0px 12px'
                    border='1px solid rgba(0, 0, 0, 0.48)'
                    display='flex'
                    gap='10px'
                    onClick={onOpen}
                >
                    <PencilIcon />
                    <Text>Новая заметка</Text>
                </Button>
            </Flex>
            <Flex wrap='wrap' data-test-id='blogger-user-notes-grid' gap='16px'>
                {userNotes.map((note, index) => (
                    <Note
                        key={note._id}
                        note={note}
                        index={index}
                        type='user'
                        onNoteDeleted={handleNoteDeleted}
                    />
                ))}
            </Flex>
            <NotesDrawer isOpen={isOpen} onClose={onClose} onNoteCreated={handleNoteCreated} />
        </Flex>
    );
}
