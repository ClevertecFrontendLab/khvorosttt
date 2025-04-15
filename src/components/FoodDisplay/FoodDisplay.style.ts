import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const FoodDisplayStyle: SystemStyleObject = {
    templateColumns: { base: 'repeat(4, 1fr)', ms: 'repeat(12, 1fr)' },
    w: '100%',
    gap: '24px',
};

export const ButtonMoreStyle: SystemStyleObject = {
    bg: '#b1ff2e',
    variant: 'solid',
    p: '0px 16px',
    fontSize: '16px',
    fontWeight: 600,
    alignSelf: 'center',
};
