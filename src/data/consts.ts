import salat from '../assets/images/baklagan.png';
import desert from '../assets/images/bread.png';
import childTasty from '../assets/images/childTasty.png';
import drinks from '../assets/images/drinks.png';
import food2 from '../assets/images/fryingPan.png';
import gril from '../assets/images/gril.png';
import healthy from '../assets/images/healthy.png';
import sous from '../assets/images/healthy.png';
import international from '../assets/images/internationalFood.png';
import veg from '../assets/images/list.png';
import food1 from '../assets/images/pot.png';
import zakusk from '../assets/images/zakusk.png';

export const markerFood: string[] = [
    'Первые блюда',
    'Веганские блюда',
    'Десерты, выпечка',
    'Салаты',
    'Вторые блюда',
    'Национальные',
    'Детские блюда',
    'Блюда на гриле',
    'Закуски',
    'Лечебное питание',
    'Соусы',
    'Напитки',
];

export function markFood(marker: string) {
    switch (marker) {
        case 'Первые блюда':
            return food1;
        case 'Веганские блюда':
            return veg;
        case 'Десерты, выпечка':
            return desert;
        case 'Салаты':
            return salat;
        case 'Вторые блюда':
            return food2;
        case 'Национальные блюда':
            return international;
        case 'Детские блюда':
            return childTasty;
        case 'Блюда на гриле':
            return gril;
        case 'Закуски':
            return zakusk;
        case 'Лечебное питание':
            return healthy;
        case 'Соусы':
            return sous;
        case 'Домашние заготовки':
            return sous;
        case 'Напитки':
            return drinks;
    }
}

export function categoryPath(marker: string) {
    switch (marker) {
        case 'Первые блюда':
            return 'vegan-cuisine';
        case 'Веганские блюда':
            return 'vegan-cuisine';
        case 'Десерты, выпечка':
            return 'vegan-cuisine';
        case 'Салаты':
            return 'vegan-cuisine';
        case 'Вторые блюда':
            return 'vegan-cuisine';
        case 'Национальные блюда':
            return 'vegan-cuisine';
        case 'Детские блюда':
            return 'vegan-cuisine';
        case 'Блюда на гриле':
            return 'vegan-cuisine';
        case 'Закуски':
            return 'vegan-cuisine';
        case 'Лечебное питание':
            return 'vegan-cuisine';
        case 'Соусы':
            return 'vegan-cuisine';
        case 'Домашние заготовки':
            return 'vegan-cuisine';
        case 'Напитки':
            return 'vegan-cuisine';
    }
}
