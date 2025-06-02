import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router';

import { useGetRecipeByIdQuery } from '~/api/recipeApi';
import { selectedCategories } from '~/services/features/selectors';

import { BurgerMenuProps } from '../BurgerMenu/BurgerMenu';
import { BreadCrumbStyle } from './BreadCrumb.style';

export function BreadCrumb({ isOpen, toggleMenu }: BurgerMenuProps) {
    const location = useLocation();
    const paths = location.pathname.split('/').filter((x) => x);
    const { id } = useParams();
    const { data: recipe } = useGetRecipeByIdQuery(id, { skip: id === undefined });
    const categoriesSavedData = useSelector(selectedCategories);

    if (location.pathname === '/not-found') {
        return null;
    }

    const getBreadCrumbsTitle = (path: string, index: number) => {
        if (index === 0) {
            if (path === 'the-juiciest') return 'Самое сочное';
            return categoriesSavedData.categories.find((item) => item.category === path)?.title;
        } else if (id && index === paths.length - 1) {
            return recipe?.title;
        } else if (index === 1) {
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
