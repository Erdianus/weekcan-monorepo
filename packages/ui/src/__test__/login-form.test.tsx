import { render, screen } from "@testing-library/react";
import LoginForm from "@ui/pages/auth/login-form";
import { describe, expect, it } from "vitest";

describe("Login Form", () => {
  it("should render username", async () => {
    render(<LoginForm />);
    expect(screen.getByLabelText("Username")).toBeDefined();
  });
});
