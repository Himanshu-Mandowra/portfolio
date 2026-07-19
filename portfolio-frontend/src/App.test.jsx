import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders portfolio hero copy", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /Himanshu Mandowra/i })).toBeInTheDocument();
});
