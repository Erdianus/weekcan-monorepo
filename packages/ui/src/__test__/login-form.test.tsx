import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginForm from "@ui/pages/auth/login-form";

describe("Login Form", () => {
  it("should render username", async () => {
    render(<LoginForm />);
    expect(screen.getByLabelText("Username")).toBeDefined();
  });
});
