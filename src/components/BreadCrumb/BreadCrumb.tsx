import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router';

import { useGetRecipeByIdQuery, useGetUserByIdQuery } from '~/api/authApi';
import { selectedCategories } from '~/services/features/selectors';
import { getUserIdFromToken } from '~/services/utils';

import { BurgerMenuProps } from '../BurgerMenu/BurgerMenu';
import { BreadCrumbStyle } from './BreadCrumb.style';

export function BreadCrumb({ isOpen, toggleMenu }: BurgerMenuProps) {
    const location = useLocation();
    const paths = location.pathname
        .replace(/^\/edit-recipe/, '')
        .split('/')
        .filter((x) => x);
    const { id } = useParams();
    const { data: recipe } = useGetRecipeByIdQuery(id, { skip: id === undefined });
    const categoriesSavedData = useSelector(selectedCategories);

    const bloggerId = paths[1] === 'blogs' ? paths[2] : paths[0] === 'blogs' ? paths[1] : undefined;
    const currentUserId = getUserIdFromToken();
    const { data: blogger } = useGetUserByIdQuery(
        {
            userId: bloggerId ? bloggerId : '',
            currentUserId: currentUserId ? currentUserId : '',
        },
        { skip: !bloggerId },
    );

    if (location.pathname === '/not-found') {
        return null;
    }

    const getBreadCrumbsTitle = (path: string, index: number) => {
        if (index === 0) {
            if (path === 'the-juiciest') return 'Самое сочное';
            if (path === 'profile') return 'Мой профиль';
            if (path === 'blogs') return 'Блоги';
            return categoriesSavedData.categories.find((item) => item.category === path)?.title;
        }
        if (index === 1 && paths[0] === 'blogs' && blogger) {
            return `${blogger.bloggerInfo.firstName} ${blogger.bloggerInfo.lastName} (@${blogger.bloggerInfo.login})`;
        }
        if (index === 1 && paths[0] === 'profile' && path === 'settings') {
            return 'Настройки';
        }
        if (id && index === paths.length - 1) {
            return recipe?.title;
        }
        if (index === 1) {
            return categoriesSavedData.subcategories.find((item) => item.category === path)?.title;
        }
    };

    const getPath = (index: number) => {
        if (index === 0) {
            const category = categoriesSavedData.categories.find((c) => c.category === paths[0]);
            if (category?.subCategories?.[0]) {
                return `/${paths[0]}/${category.subCategories[0].category}`;
            } else return `/${paths[0]}`;
        }
        return `/${paths.slice(0, index + 1).join('/')}`;
    };

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
                        to={getPath(index)}
                        sx={BreadCrumbStyle}
                        color={index + 1 == paths.length ? 'black' : 'rgba(0, 0, 0, 0.64)'}
                        onClick={() => {
                            isOpen && toggleMenu();
                        }}
                    >
                        {getBreadCrumbsTitle(linkPath, index)}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
}
