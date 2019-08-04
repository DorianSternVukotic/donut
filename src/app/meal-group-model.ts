import {MealModel} from './meal-model';

export interface MealGroupModel {
    groupName: string;
    meals: MealModel[];
}
