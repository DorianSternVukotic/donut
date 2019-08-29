export type TCart = { groupName: string; mealId: number; orderedCount: number };
export type TMealGroup = {
  groupName: string;
  meals: TMeal[];
};
export type TMeal = {
  id: number;
  name: string;
  displayPrice: number;
  image: string;
  description: string;
  selected: boolean;
  orderedCount: number;
};
