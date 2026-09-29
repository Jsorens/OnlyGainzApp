// This represents a food. it contains servingsize, unit, and macros per servingsize.
export type Food = {
  id: string;
  name: string;

  calories: number;
  protein: number;
  carbs: number;
  fat: number;

  servingSize: number;
  servingUnit: "g" | "ml" | "piece";
};
