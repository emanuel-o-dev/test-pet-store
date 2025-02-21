import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react-native";
import PetForm from "@/components/PetForm";

describe("PetForm Component", () => {
  let mockSubmit: jest.Mock;
  let mockOnClose: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSubmit = jest.fn();
    mockOnClose = jest.fn();
  });

  it("should render input fields correctly", () => {
    const { getByPlaceholderText } = render(
      <PetForm onClose={mockOnClose} submit={mockSubmit} />
    );

    expect(getByPlaceholderText("Name")).toBeTruthy();
    expect(getByPlaceholderText("Age")).toBeTruthy();
  });

  it("should update the 'name' input field correctly", () => {
    const { getByPlaceholderText } = render(
      <PetForm onClose={mockOnClose} submit={mockSubmit} />
    );

    const nameInput = getByPlaceholderText("Name");
    fireEvent.changeText(nameInput, "Buddy");
    expect(nameInput.props.value).toBe("Buddy");
  });

  it("should update the 'selectedPet' picker value correctly", async () => {
    const submit = jest.fn();
    const onClose = jest.fn();

    render(<PetForm submit={submit} onClose={onClose} title="Create Pet" />);

    const picker = screen.getByTestId("pet-picker");

    expect(picker.props.selectedIndex).toBe(0); // 'dog' é o primeiro item na lista

    fireEvent(picker, "valueChange", "cat");

    expect(picker.props.selectedIndex).toBe(1); // 'cat' é o segundo item
  });

  it("should call submit function and reset form when submit button is pressed", async () => {
    const { getByTestId } = render(
      <PetForm onClose={mockOnClose} submit={mockSubmit} />
    );

    const submitButton = getByTestId("submit-button");
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: "",
        age: "",
        type: "",
      });
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it("should call onClose function after submission", async () => {
    const { getByTestId } = render(
      <PetForm onClose={mockOnClose} submit={mockSubmit} />
    );

    const submitButton = getByTestId("submit-button");
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
