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
    const draftData = location.state?.draftData;
    const recipeData = location.state?.recipeData;
    const paths = location.pathname
        .replace(/^\/edit-(recipe|draft)/, '')
        .split('/')
        .filter((x) => x);

    const { id } = useParams();
    const { data: recipe } = useGetRecipeByIdQuery(id, { skip: id === undefined });

    const categoriesSavedData = useSelector(selectedCategories);

    const bloggerId = paths[1] === 'blogs' ? paths[2] : paths[0] === 'blogs' ? paths[1] : undefined;
    const currentUserId = getUserIdFromToken();

    const { data: blogger } = useGetUserByIdQuery(
        {
            userId: bloggerId ?? '',
            currentUserId: currentUserId ?? '',
        },
        { skip: !bloggerId },
    );

    if (location.pathname === '/not-found') {
        return null;
    }

    const subcategory =
        recipeData?.categoriesIds?.[0] &&
        categoriesSavedData.subcategories.find((c) => c._id === recipeData?.categoriesIds[0]);

    const category =
        subcategory?.rootCategoryId &&
        categoriesSavedData.categories.find((c) => c._id === subcategory.rootCategoryId);

    let breadcrumbItems: { path: string; title: string }[] = [];

    if (draftData) {
        breadcrumbItems = [{ path: `/${draftData._id}`, title: draftData.title }];
    } else if (location.pathname.startsWith('/edit-recipe') && category && subcategory) {
        breadcrumbItems = [
            {
                path: `/${category.category}/${subcategory.category}`,
                title: category.title || 'Категория',
            },
            {
                path: '',
                title: subcategory.title || 'Подкатегория',
            },
        ];
    } else {
        breadcrumbItems = paths.map((linkPath, index) => ({
            path: getPath(index),
            title: getBreadCrumbsTitle(linkPath, index) || linkPath,
        }));
    }

    function getPath(index: number) {
        if (draftData) return draftData._id;
        if (index === 0) {
            const category = categoriesSavedData.categories.find((c) => c.category === paths[0]);
            if (category?.subCategories?.[0]) {
                return `/${paths[0]}/${category.subCategories[0].category}`;
            } else return `/${paths[0]}`;
        }
        return `/${paths.slice(0, index + 1).join('/')}`;
    }

    function getBreadCrumbsTitle(path: string, index: number) {
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
    }

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
                    color={breadcrumbItems.length === 0 ? 'black' : 'rgba(0, 0, 0, 0.64)'}
                    onClick={() => {
                        isOpen && toggleMenu();
                    }}
                >
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>

            {breadcrumbItems.map(({ path, title }, index) => (
                <BreadcrumbItem key={index}>
                    <BreadcrumbLink
                        as={Link}
                        to={path}
                        sx={BreadCrumbStyle}
                        color={
                            index + 1 === breadcrumbItems.length ? 'black' : 'rgba(0, 0, 0, 0.64)'
                        }
                        onClick={() => {
                            isOpen && toggleMenu();
                        }}
                    >
                        {title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
}
