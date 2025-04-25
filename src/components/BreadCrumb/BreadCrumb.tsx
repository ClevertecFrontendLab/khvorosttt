import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router';

import { BreadCrumbStyle } from './BreadCrumb.style';

const linkName: Record<string, string> = {
    'vegan-cuisine': 'Веганская кухня',
    'the-juiciest': 'Самое сочное',
};

export function BreadCrumb() {
    const location = useLocation();
    const paths = location.pathname.split('/').filter((x) => x);
    return (
        <Breadcrumb
            spacing='8px'
            separator={<ChevronRightIcon color='gray.500' />}
            p='0px 20px'
            data-test-id='breadcrumbs'
        >
            <BreadcrumbItem>
                <BreadcrumbLink
                    as={Link}
                    to='/'
                    sx={BreadCrumbStyle}
                    color={paths.length == 0 ? 'black' : 'rgba(0, 0, 0, 0.64)'}
                >
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>
            {paths.map((linkPath, index) => (
                <BreadcrumbItem key={index}>
                    <BreadcrumbLink
                        as={Link}
                        to={`/${paths.slice(0, index + 1).join('/')}`}
                        sx={BreadCrumbStyle}
                        color={index + 1 == paths.length ? 'black' : 'rgba(0, 0, 0, 0.64)'}
                    >
                        {linkName[linkPath] || linkPath}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
}
