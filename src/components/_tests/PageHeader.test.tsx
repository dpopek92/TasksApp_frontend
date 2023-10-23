import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PageHeader from "components/PageHeader/PageHeader";

describe("PageHeader", () => {
  const title = "title";
  const testId = "page-header-test-id";

  it("should render", () => {
    expect(render(<PageHeader title={title} />)).toBeTruthy();
  });

  it("should be in HTML", () => {
    render(<PageHeader title={title} />);

    const result = screen.getByTestId(testId);
    expect(result).toBeInTheDocument();
  });

  it("should be visible", () => {
    render(<PageHeader title={title} />);

    const result = screen.getByTestId(testId);
    expect(result).toBeVisible();
  });

  it("should have title in content", () => {
    render(<PageHeader title={title} />);

    const result = screen.getByTestId(testId);
    expect(result).toHaveTextContent("title");
  });
});
