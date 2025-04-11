import food2 from '../assets/images/icons8-frying-pan-96 1.png';
import international from '../assets/images/icons8-international-food-96 1.png';
import salat from '../assets/images/icons8-баклажан-96 1.png';
import food1 from '../assets/images/icons8-кастрюля-96 2.png';
import veg from '../assets/images/icons8-лавровый-лист-96 1.png';
import desert from '../assets/images/icons8-хлеб-и-скалка-96 1.png';

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
