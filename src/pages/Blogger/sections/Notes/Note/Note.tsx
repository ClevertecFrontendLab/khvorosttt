import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { useDeleteNoteMutation } from '~/api/authApi';
import { noteI } from '~/interfaces/bloggerI';
import { setNotification } from '~/services/features/notificationSlice';

import { formatingDate } from '../../utils';
import { DateStyle, NoteCardStyle, TextStyle } from './note.style';

interface NoteProps {
    note: noteI;
    index: number;
    type: 'blog' | 'user';
    onNoteDeleted?: (id: string) => void;
}

export function Note({ note, index, type, onNoteDeleted }: NoteProps) {
    const [deleteNote] = useDeleteNoteMutation();
    const dispatch = useDispatch();

    const handleDelete = (id: string) => {
        deleteNote(id)
            .unwrap()
            .then(() => {
                if (onNoteDeleted) {
                    onNoteDeleted(id);
                }
                dispatch(
                    setNotification({
                        title: 'Заметка удалена',
                        description: '',
                        typeN: 'success',
                    }),
                );
            })
            .catch(() => {
                dispatch(
                    setNotification({
                        title: 'Ошибка сервера.',
                        description: 'Попробуйте позже',
                        typeN: 'error',
                    }),
                );
            });
    };

    return (
        <Flex key={index} sx={NoteCardStyle}>
            <Flex justifyContent='space-between' alignItems='center'>
                <Text sx={DateStyle} data-test-id='notes-card-date'>
                    {formatingDate(note.date, 3)}
                </Text>
                {type === 'user' && (
                    <IconButton
                        variant='ghost'
                        icon={<DeleteIcon />}
                        data-test-id='note-delete-button'
                        aria-label='Удалить заметку'
                        onClick={() => handleDelete(note._id)}
                    />
                )}
            </Flex>
            <Text data-test-id='notes-card-text' sx={TextStyle}>
                {note.text}
            </Text>
        </Flex>
    );
}
