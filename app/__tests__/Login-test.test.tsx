import { render, fireEvent, waitFor } from "@testing-library/react-native";
import useAuth from "@/firebase/hooks/useAuth";
import { useRouter } from "expo-router";
import LoginScreen from "@/app/index";

jest.mock("expo-router", () => ({ useRouter: jest.fn() }));
jest.mock("@/firebase/hooks/useAuth", () => jest.fn());

describe("Login Screen", () => {
  let loginMock: jest.Mock;
  let routerMock: { push: any; replace: any };

  beforeEach(() => {
    jest.clearAllMocks();
    loginMock = jest.fn();
    routerMock = { replace: jest.fn(), push: jest.fn() };

    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      login: loginMock,
      loading: false,
    });

    (useRouter as jest.Mock).mockReturnValue(routerMock);
  });

  it("should update email and password inputs", () => {
    const { getByTestId, getByDisplayValue } = render(<LoginScreen />);

    const emailInput = getByTestId("email-input");
    const passwordInput = getByTestId("password-input");

    fireEvent.changeText(emailInput, "user@example.com");
    fireEvent.changeText(passwordInput, "123456");

    expect(getByDisplayValue("user@example.com")).toBeTruthy();
    expect(getByDisplayValue("123456")).toBeTruthy();
  });

  it("should call login function and navigate on successful login", async () => {
    loginMock.mockResolvedValueOnce(undefined);
    const { getByText } = render(<LoginScreen />);

    fireEvent.press(getByText("Login"));

    await waitFor(() => expect(loginMock).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(routerMock.push).toHaveBeenCalledWith("/home/"));
  });

  it("should redirect if user is already logged in", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { uid: "123" },
      login: loginMock,
      loading: false,
    });

    render(<LoginScreen />);

    await waitFor(() =>
      expect(routerMock.replace).toHaveBeenCalledWith("/home/")
    );
  });

  it("should show loading screen when authentication is in progress", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      login: loginMock,
      loading: true,
    });

    const { getByTestId } = render(<LoginScreen />);
    expect(getByTestId("loading-indicator")).toBeTruthy();
  });
});
