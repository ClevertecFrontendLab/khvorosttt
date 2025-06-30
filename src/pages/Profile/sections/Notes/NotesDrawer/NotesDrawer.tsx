import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    FormControl,
    Textarea,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useCreateNoteMutation } from '~/api/authApi';
import { noteI } from '~/interfaces/bloggerI';
import { setNotification } from '~/services/features/notificationSlice';

import { schema } from './shema';

export interface NotesDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onNoteCreated: (newNote: noteI) => void;
}

export type NoteInputs = {
    text: string;
};

export function NotesDrawer({ isOpen, onClose, onNoteCreated }: NotesDrawerProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NoteInputs>({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    });
    const [createNote] = useCreateNoteMutation();
    const dispatch = useDispatch();

    const sendNoteRequest = (data: NoteInputs) => {
        createNote({ text: data.text })
            .unwrap()
            .then((createdNote) => {
                dispatch(
                    setNotification({
                        title: 'Заметка опубликована',
                        description: '',
                        typeN: 'success',
                    }),
                );
                onNoteCreated(createdNote);
                onClose();
            })
            .catch(() => {
                dispatch(
                    setNotification({
                        title: 'Ошибка сервера.',
                        description: 'Попробуйте позже.',
                        typeN: 'error',
                    }),
                );
                onClose();
            });
    };

    return (
        <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent
                p={{ base: '10px', lg: '32px' }}
                minW={{ base: '344px', lg: '463px' }}
                h='100%'
                display='flex'
                flexDirection='column'
                data-test-id='filter-drawer'
            >
                <DrawerCloseButton
                    right={{ base: '10px', lg: '32px' }}
                    top={{ base: '10px', lg: '32px' }}
                    bg='black'
                    color='white'
                    borderRadius='50px'
                />
                <DrawerHeader fontFamily='text' fontSize='24px' fontWeight={700} p='0px'>
                    Новая заметка
                </DrawerHeader>
                <form
                    onSubmit={handleSubmit(sendNoteRequest)}
                    style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                >
                    <DrawerBody flex='1' p='0px' mt='35px'>
                        <FormControl isInvalid={!!errors.text}>
                            <Textarea
                                {...register('text')}
                                onBlur={(e) => {
                                    e.target.value = e.target.value.trim();
                                }}
                                placeholder='Максимально 160 символов'
                                minH='96px'
                            />
                        </FormControl>
                    </DrawerBody>
                    <DrawerFooter p='0' pt='16px'>
                        <Button color='white' bg='black' type='submit' ml='auto'>
                            Опубликовать
                        </Button>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    );
}
