import { act, renderHook } from "@testing-library/react-native";
import { MealsProvider, useMeals } from "@/features/contexts/MealsContext";

// Gjør at testene IKKE bruker databasen.
// API-funksjonene gjør ingenting, de sender bare måltidet tilbake.
jest.mock("@/features/meal/api/meals-api", () => ({
  useMealsAPI: () => ({
    getMealLogs: async () => [],
    logMeal: async (meal: any) => ({ ...meal, id: "meal1" }),
    deleteMeal: async () => {},
    editMeal: async (meal: any) => meal,
  }),
}));
const mockUser = { $id: "user1" };

jest.mock("@/features/contexts/AuthProvider", () => ({
  useAuth: () => ({ user: mockUser }),
}));
jest.mock("@/lib/appwrite", () => ({ account: {} }));

// Test data for the meals context tests.
const egg = {
  id: "food1",
  name: "Egg",
  servingSize: 1,
  servingUnit: "piece" as const,
  macros: { calories: 70, protein: 6, carbs: 0, fat: 5 },
};

// Helper function to set up the meals context hook for testing.
async function setup() {
  return await renderHook(() => useMeals(), { wrapper: MealsProvider });
}

test("the list is empty initially", async () => {
  const { result } = await setup();
  expect(result.current.meals).toHaveLength(0);
});

test("addFood adds a meal to the list", async () => {
  // Arrange (setup the hook and initial state)
  const { result } = await setup();

  // Act
  await act(() => result.current.addFood(egg, 1, "Breakfast"));

  // Assert (verify that the meal was added correctly)
  expect(result.current.meals).toHaveLength(1);
  expect(result.current.meals[0].type).toBe("Breakfast");
});

test("removeFood removes the meal from the list", async () => {
  // Arrange
  const { result } = await setup();

  // Act
  await act(() => result.current.addFood(egg, 1, "Breakfast"));
  await act(() => result.current.removeFood("meal1"));

  // Assert
  expect(result.current.meals).toHaveLength(0);
});

test("getMeals only returns meals of the correct type", async () => {
  // Arrange
  const { result } = await setup();
  // Act
  await act(() => result.current.addFood(egg, 1, "Breakfast"));
  // Assert
  expect(result.current.getMeals("Breakfast", new Date())).toHaveLength(1);
  expect(result.current.getMeals("Lunch", new Date())).toHaveLength(0);
});

test("getMacros returns correct macros", async () => {
  // Arrange
  const { result } = await setup();
  // Act
  await act(() => result.current.addFood(egg, 2, "Breakfast"));
  // Assert
  expect(result.current.getMacros().calories).toBe(140); // 70 × 2
  expect(result.current.getMacros().protein).toBe(12);
  expect(result.current.getMacros().carbs).toBe(0);
  expect(result.current.getMacros().fat).toBe(10);
});
