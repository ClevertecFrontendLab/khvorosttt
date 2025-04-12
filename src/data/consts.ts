import salat from '../assets/images/baklagan.png';
import desert from '../assets/images/bread.png';
import food2 from '../assets/images/fryingPan.png';
import international from '../assets/images/internationalFood.png';
import veg from '../assets/images/list.png';
import food1 from '../assets/images/pot.png';

export const markerFood: string[] = [
    'Первые блюда',
    'Веганские блюда',
    'Десерты, выпечка',
    'Салаты',
    'Вторые блюда',
    'Национальные',
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
    }
}
