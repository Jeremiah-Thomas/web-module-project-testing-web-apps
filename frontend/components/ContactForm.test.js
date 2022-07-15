import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  render(<ContactForm />);
  const header = screen.queryByText(/contact form/i);

  expect(header).toBeInTheDocument();
  expect(header).toBeTruthy();
  expect(header).toHaveTextContent(/contact form/i);
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);

  const firstNameInput = screen.getByLabelText(/first name*/i);
  userEvent.type(firstNameInput, "abc");

  const firstNameError = screen.getByText(
    /error: firstname must have at least 5 characters./i
  );

  expect(firstNameError).toBeInTheDocument();
  expect(firstNameError).toBeTruthy();
  expect(firstNameError).toHaveTextContent(
    /error: firstname must have at least 5 characters./i
  );
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);

  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  const firstNameError = screen.getByText(
    /error: firstname must have at least 5 characters./i
  );

  const lastNameError = screen.getByText(
    /error: lastname is a required field./i
  );

  const emailError = screen.getByText(
    /error: email must be a valid email address./i
  );

  expect(firstNameError).toBeInTheDocument();
  expect(firstNameError).toBeTruthy();
  expect(firstNameError).toHaveTextContent(
    /error: firstname must have at least 5 characters./i
  );

  expect(lastNameError).toBeInTheDocument();
  expect(lastNameError).toBeTruthy();
  expect(lastNameError).toHaveTextContent(
    /error: lastname is a required field./i
  );

  expect(emailError).toBeInTheDocument();
  expect(emailError).toBeTruthy();
  expect(emailError).toHaveTextContent(
    /error: email must be a valid email address./i
  );
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);

  const firstNameInput = screen.getByLabelText(/first name*/i);
  const lastNameInput = screen.getByLabelText(/last name*/i);
  const submitButton = screen.getByRole("button");
  userEvent.type(firstNameInput, "abcde");
  userEvent.type(lastNameInput, "fghij");
  userEvent.click(submitButton);
  const emailError = screen.getByText(
    /error: email must be a valid email address./i
  );

  expect(emailError).toBeInTheDocument();
  expect(emailError).toBeTruthy();
  expect(emailError).toHaveTextContent(
    /error: email must be a valid email address./i
  );
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);

  const emailInput = screen.getByLabelText(/email*/i);
  userEvent.type(emailInput, "abc");

  const emailError = screen.getByText(
    /error: email must be a valid email address./i
  );

  expect(emailError).toBeInTheDocument();
  expect(emailError).toBeTruthy();
  expect(emailError).toHaveTextContent(
    /error: email must be a valid email address./i
  );
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);

  const firstNameInput = screen.getByLabelText(/first name*/i);
  const emailInput = screen.getByLabelText(/email*/i);
  const submitButton = screen.getByRole("button");

  userEvent.type(firstNameInput, "abcde");
  userEvent.type(emailInput, "my@my.com");
  userEvent.click(submitButton);

  const lastNameError = screen.getByText(
    /error: lastname is a required field./i
  );

  expect(lastNameError).toBeInTheDocument();
  expect(lastNameError).toBeTruthy();
  expect(lastNameError).toHaveTextContent(
    /error: lastname is a required field./i
  );
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);

  const firstNameInput = screen.getByLabelText(/first name*/i);
  const lastNameInput = screen.getByLabelText(/last name*/i);
  const emailInput = screen.getByLabelText(/email*/i);
  const submitButton = screen.getByRole("button");
  userEvent.type(firstNameInput, "abcde");
  userEvent.type(lastNameInput, "fghij");
  userEvent.type(emailInput, "my@my.com");
  userEvent.click(submitButton);

  const firstNameSubmit = screen.getByText(/first name:/i);
  const lastNameSubmit = screen.getByText(/last name:/i);
  const emailSubmit = screen.getByText(/email:/i);
  const messageSubmit = screen.queryByText(/message:/i);

  expect(firstNameSubmit).toBeInTheDocument();
  expect(lastNameSubmit).toBeInTheDocument();
  expect(emailSubmit).toBeInTheDocument();
  expect(messageSubmit).not.toBeInTheDocument();
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);

  const firstNameInput = screen.getByLabelText(/first name*/i);
  const lastNameInput = screen.getByLabelText(/last name*/i);
  const emailInput = screen.getByLabelText(/email*/i);
  const messageInput = screen.getByLabelText(/message/i);
  const submitButton = screen.getByRole("button");
  userEvent.type(firstNameInput, "abcde");
  userEvent.type(lastNameInput, "fghij");
  userEvent.type(emailInput, "my@my.com");
  userEvent.type(messageInput, "my message");
  userEvent.click(submitButton);

  const firstNameSubmit = screen.getByText(/first name:/i);
  const lastNameSubmit = screen.getByText(/last name:/i);
  const emailSubmit = screen.getByText(/email:/i);
  const messageSubmit = screen.queryByText(/message:/i);

  expect(firstNameSubmit).toBeInTheDocument();
  expect(lastNameSubmit).toBeInTheDocument();
  expect(emailSubmit).toBeInTheDocument();
  expect(messageSubmit).toBeInTheDocument();
});
