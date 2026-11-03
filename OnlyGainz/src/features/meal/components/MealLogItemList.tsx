import { MealLogItem } from "./MealLogItem";
type MealLogItemListProps = {
  data: MealLog[];
};

import type { MealLog } from "@/features/meal/types/MealLog";
export function MealLogItemList({ data }: MealLogItemListProps) {
  return (
    <>
      {data.map((log: MealLog) => (
        <MealLogItem
          key={log.id}
          mealId={""} // Replace with actual mealId if available
          log={log}
        />
      ))}
    </>
  );
}
