import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router';

const linkName: Record<string, string> = {
    'vegan-cuisine': 'Веганская кухня',
    'juiciest-link': 'Самое сочное',
};

export function BreadCrumb() {
    const location = useLocation();
    const paths = location.pathname.split('/').filter((x) => x);
    return (
        <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
            <BreadcrumbItem>
                <BreadcrumbLink as={Link} to='/'>
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>
            {paths.map((linkPath, index) => (
                <BreadcrumbItem key={index}>
                    <BreadcrumbLink as={Link} to={`/${paths.slice(0, index + 1).join('/')}`}>
                        {linkName[linkPath] || linkPath}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
}
