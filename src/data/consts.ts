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

export function markFood(marker: number) {
    switch (marker) {
        case 0:
            return food1;
        case 1:
            return veg;
        case 2:
            return desert;
        case 3:
            return salat;
        case 4:
            return food2;
        case 5:
            return international;
        case 6:
            return childTasty;
        case 7:
            return gril;
        case 8:
            return zakusk;
        case 9:
            return healthy;
        case 10:
            return sous;
        case 11:
            return drinks;
    }
}

export function categoryPath(marker: number) {
    switch (marker) {
        case 0:
            return 'vegan-cuisine';
        case 1:
            return 'vegan-cuisine';
        case 2:
            return 'vegan-cuisine';
        case 3:
            return 'vegan-cuisine';
        case 4:
            return 'vegan-cuisine';
        case 5:
            return 'vegan-cuisine';
        case 6:
            return 'vegan-cuisine';
        case 7:
            return 'vegan-cuisine';
        case 8:
            return 'vegan-cuisine';
        case 9:
            return 'vegan-cuisine';
        case 10:
            return 'vegan-cuisine';
        case 11:
            return 'vegan-cuisine';
    }
}
