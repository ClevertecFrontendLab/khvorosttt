import { EditIcon } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { RecipeInputs } from '../../NewRecipe';

interface RecipeButtonsProps {
    onSaveDraft: (data: RecipeInputs) => Promise<void>;
}

export function RecipeButtons({ onSaveDraft }: RecipeButtonsProps) {
    const methods = useFormContext<RecipeInputs>();

    const handleSaveDraft = async () => {
        const isValid = await methods.trigger('title');
        if (isValid) {
            const formData = methods.getValues();
            await onSaveDraft(formData);
        }
    };
    return (
        <Flex
            flexDirection={{ base: 'column', md: 'row' }}
            alignContent='center'
            justifyContent='center'
            gap='20px'
        >
            <Button
                leftIcon={<EditIcon />}
                data-test-id='recipe-save-draft-button'
                border='1px solid rgba(0, 0, 0, 0.08)'
                borderRadius='6px'
                p='0px 24px'
                variant='outline'
                color='rgba(0, 0, 0, 0.8)'
                fontWeight={600}
                fontSize='18px'
                fontFamily='text'
                w={{ base: '328px', md: '246px' }}
                onClick={handleSaveDraft}
            >
                Сохранить черновик
            </Button>
            <Button
                type='submit'
                data-test-id='recipe-publish-recipe-button'
                border='1px solid rgba(0, 0, 0, 0.08)'
                borderRadius='6px'
                p='0px 24px'
                bg='black'
                color='white'
                fontWeight={600}
                fontSize='18px'
                fontFamily='text'
                w={{ base: '328px', md: '246px' }}
            >
                Опубликовать рецепт
            </Button>
        </Flex>
    );
}
