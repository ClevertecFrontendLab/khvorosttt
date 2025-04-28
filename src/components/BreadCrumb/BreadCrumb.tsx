import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Link, useLocation, useParams } from 'react-router';

import { markerFood } from '~/data/consts';
import menuRecipes from '~/data/menuData.json';

import { BurgerMenuProps } from '../BurgerMenu/BurgerMenu';
import { BreadCrumbStyle } from './BreadCrumb.style';

export function BreadCrumb({ isOpen, toggleMenu }: BurgerMenuProps) {
    const location = useLocation();
    const paths = location.pathname.split('/').filter((x) => x);
    const { id } = useParams();
    return (
        <Breadcrumb
            spacing='8px'
            separator={<ChevronRightIcon color='gray.500' />}
            p='0px 20px'
            data-test-id='breadcrumbs'
            listProps={{
                style: {
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                    flexWrap: 'wrap',
                },
            }}
        >
            <BreadcrumbItem>
                <BreadcrumbLink
                    as={Link}
                    to='/'
                    sx={BreadCrumbStyle}
                    color={paths.length == 0 ? 'black' : 'rgba(0, 0, 0, 0.64)'}
                    onClick={() => {
                        isOpen && toggleMenu();
                    }}
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
                        onClick={() => {
                            isOpen && toggleMenu();
                        }}
                    >
                        {id && index === paths.length - 1
                            ? `${menuRecipes.find((item) => item.id === Number(id))?.title}`
                            : markerFood[linkPath] || linkPath}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
}
