import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ConfirmationModal from "components/ConfirmationModal/ConfirmationModal";

describe("ConfirmationModal", () => {
  const confirmationModalText = "text";
  const onConfirm = () => {};
  const closeModal = () => {};

  const testId = "confirmation-modal-test-id";

  it("should render", () => {
    expect(
      render(
        <ConfirmationModal
          confirmationModalText={confirmationModalText}
          onConfirm={onConfirm}
          closeModal={closeModal}
        />
      )
    ).toBeTruthy();
  });

  it("should be in HTML", () => {
    render(
      <ConfirmationModal
        confirmationModalText={confirmationModalText}
        onConfirm={onConfirm}
        closeModal={closeModal}
      />
    );

    const result = screen.getByTestId(testId);
    expect(result).toBeInTheDocument();
  });

  it("should be visible", () => {
    render(
      <ConfirmationModal
        confirmationModalText={confirmationModalText}
        onConfirm={onConfirm}
        closeModal={closeModal}
      />
    );

    const result = screen.getByTestId(testId);
    expect(result).toBeVisible();
  });
});
