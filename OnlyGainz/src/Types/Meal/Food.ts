// This represents a food. it contains servingsize, unit, and macros per servingsize.
import { Macros } from "./Macros";
export type Food = {
  id: string;
  name: string;

  macros: Macros;

  servingSize: number;
  servingUnit: "g" | "ml" | "piece";
};
