// Komponenttest: MealCard viser måltidstypen og navigerer riktig ved trykk.
import { fireEvent, render, screen } from "@testing-library/react-native";
import MealCard from "../MealCard";

const mockPush = jest.fn();
jest.mock("expo-router", () => ({
  useRouter: () => ({ push: mockPush }),
}));

beforeEach(() => mockPush.mockClear());

test("shows the meal type", async () => {
  await render(<MealCard mealType="Breakfast" />);
  expect(screen.getByText("Breakfast")).toBeOnTheScreen();
});

test("pressing the card opens the meal", async () => {
  await render(<MealCard mealType="Lunch" />);
  await fireEvent.press(screen.getByText("Lunch"));
  expect(mockPush).toHaveBeenCalledWith({
    pathname: "/meals/[mealId]",
    params: { mealId: "Lunch" },
  });
});

test("pressing + ADD FOOD opens the food list", async () => {
  await render(<MealCard mealType="Dinner" />);
  await fireEvent.press(screen.getByText("+ ADD FOOD"));
  expect(mockPush).toHaveBeenCalledWith({
    pathname: "/foods",
    params: { mealId: "Dinner" },
  });
});
