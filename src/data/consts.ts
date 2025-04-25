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

export const markerFood: Record<string, string> = {
    vegan: 'Веганская кухня',
    'second-dish': 'Вторые блюда',
    'first-dish': 'Первые блюда',
    desert: 'Десерты, выпечка',
    salads: 'Салаты',
    national: 'Национальные блюда',
    children: 'Детские блюда',
    grill: 'Блюда на гриле',
    snacks: 'Закуски',
    therapeutic: 'Лечебное питание',
    sous: 'Соусы',
    drinks: 'Напитки',
    'home-food': 'Домашние заготовки',
};

export function markFood(marker: string) {
    switch (marker) {
        case 'first-dish':
            return food1;
        case 'vegan':
            return veg;
        case 'desert':
            return desert;
        case 'salads':
            return salat;
        case 'second-dish':
            return food2;
        case 'national':
            return international;
        case 'children':
            return childTasty;
        case 'grill':
            return gril;
        case 'snacks':
            return zakusk;
        case 'therapeutic':
            return healthy;
        case 'sous':
            return sous;
        case 'home-food':
            return sous;
        case 'drinks':
            return drinks;
    }
}

export function categoryPath(marker: string) {
    switch (marker) {
        case 'first-dish':
            return 'vegan-cuisine';
        case 'vegan':
            return 'vegan-cuisine';
        case 'desert':
            return 'vegan-cuisine';
        case 'salads':
            return 'vegan-cuisine';
        case 'second-dish':
            return 'vegan-cuisine';
        case 'national':
            return 'vegan-cuisine';
        case 'children':
            return 'vegan-cuisine';
        case 'grill':
            return 'vegan-cuisine';
        case 'snacks':
            return 'vegan-cuisine';
        case 'therapeutic':
            return 'vegan-cuisine';
        case 'sous':
            return 'vegan-cuisine';
        case 'home-food':
            return 'vegan-cuisine';
        case 'drinks':
            return 'vegan-cuisine';
    }
}
