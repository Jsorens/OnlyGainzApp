// Test av hovedflyten: bruker logger inn via skjermen, API-et (Appwrite) er mocket.
import { Text } from "react-native";
import { fireEvent, render, screen } from "@testing-library/react-native";
import AuthProvider, { useAuth } from "@/features/contexts/AuthProvider";
import LoginScreen from "@/app/auth/login";
import { fakeSession, fakeUser } from "@/test-utils/appwrite-fixtures";

// Mocket Appwrite: ingen ekte nettverkskall.
jest.mock("@/lib/appwrite", () => ({
  account: {
    getSession: jest.fn(),
    get: jest.fn(),
    createEmailPasswordSession: jest.fn(),
  },
  teams: { listMemberships: jest.fn() },
  ADMIN_TEAM_ID: "admins",
}));
jest.mock("@/features/profile/api/profile-api", () => ({
  useProfileAPI: () => ({ createProfile: jest.fn() }),
}));
jest.mock("expo-router", () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

const { account, teams } = jest.requireMock("@/lib/appwrite");

// Første kjøring kan være treg (kompilering), så gi testen litt mer tid.
jest.setTimeout(30000);

// Viser hvem som er logget inn, slik at testen kan se resultatet.
function LoggedInAs() {
  const { user } = useAuth();
  return <Text>{user ? `Logged in as ${user.name}` : "Not logged in"}</Text>;
}

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, "log").mockImplementation(() => {});
  account.getSession.mockRejectedValue(new Error("no session")); // starter utlogget
  account.get.mockResolvedValue(fakeUser);
  teams.listMemberships.mockResolvedValue({ memberships: [] });
});

async function renderLogin() {
  await render(
    <AuthProvider>
      <LoginScreen />
      <LoggedInAs />
    </AuthProvider>,
  );
  await screen.findByText("Not logged in");
}

test("user can log in with email and password", async () => {
  account.createEmailPasswordSession.mockResolvedValue(fakeSession);
  await renderLogin();

  await fireEvent.changeText(
    screen.getByPlaceholderText("Enter your email..."),
    "test@test.no",
  );
  await fireEvent.changeText(screen.getByPlaceholderText("Password"), "password123");
  await fireEvent.press(screen.getByText("Login"));

  expect(await screen.findByText("Logged in as Ola")).toBeOnTheScreen();
  expect(account.createEmailPasswordSession).toHaveBeenCalledWith(
    "test@test.no",
    "password123",
  );
});

test("user stays logged out when the API rejects the login", async () => {
  account.createEmailPasswordSession.mockRejectedValue(new Error("Invalid credentials"));
  await renderLogin();

  await fireEvent.changeText(
    screen.getByPlaceholderText("Enter your email..."),
    "test@test.no",
  );
  await fireEvent.changeText(screen.getByPlaceholderText("Password"), "wrong");
  await fireEvent.press(screen.getByText("Login"));

  expect(account.createEmailPasswordSession).toHaveBeenCalled();
  expect(screen.getByText("Not logged in")).toBeOnTheScreen();
});
