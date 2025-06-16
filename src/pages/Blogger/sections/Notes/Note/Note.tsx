import { Flex, Text } from '@chakra-ui/react';

import { noteI } from '~/interfaces/bloggerI';

import { formatingDate } from '../../utils';
import { DateStyle, NoteCardStyle, TextStyle } from './note.style';

interface NoteProps {
    note: noteI;
    index: number;
}

export function Note({ note, index }: NoteProps) {
    return (
        <Flex key={index} sx={NoteCardStyle}>
            <Text sx={DateStyle} data-test-id='notes-card-date'>
                {formatingDate(note.date, 3)}
            </Text>
            <Text data-test-id='notes-card-text' sx={TextStyle}>
                {note.text}
            </Text>
        </Flex>
    );
}
