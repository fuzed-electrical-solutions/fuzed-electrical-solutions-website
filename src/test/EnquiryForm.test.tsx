import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EnquiryForm from "@/components/EnquiryForm";

describe("EnquiryForm Component", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders all expected form fields", () => {
    render(<EnquiryForm />);

    expect(screen.getByLabelText(/full name \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/quote for \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/service \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message \*/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /request quick quote/i })).toBeInTheDocument();
  });

  it("pre-fills product details when productName prop is provided", () => {
    render(<EnquiryForm productName="Keyring Remote Control (AC116)" />);

    expect(screen.getByLabelText(/quote for \*/i)).toHaveValue("product");
    expect(screen.getByLabelText(/product \*/i)).toHaveValue("Keyring Remote Control (AC116)");
    expect(screen.getByLabelText(/message \*/i)).toHaveValue(
      "I'd like to enquire about the Keyring Remote Control (AC116)."
    );
  });

  it("handles successful form submission via API", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: "true", message: "Submitted successfully" }),
    });
    globalThis.fetch = fetchMock;

    render(<EnquiryForm />);

    fireEvent.change(screen.getByLabelText(/full name \*/i), { target: { value: "John Citizen" } });
    fireEvent.change(screen.getByLabelText(/email \*/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/location \*/i), { target: { value: "Melbourne" } });
    fireEvent.change(screen.getByLabelText(/service \*/i), {
      target: { value: "Domestic, Commercial & Industrial Installations" },
    });
    fireEvent.change(screen.getByLabelText(/message \*/i), { target: { value: "Need roller shutter wiring." } });

    fireEvent.click(screen.getByRole("button", { name: /request quick quote/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    const callArgs = fetchMock.mock.calls[0];
    expect(callArgs[0]).toContain("formsubmit.co/ajax/fuzedelectricalsolutions%40gmail.com");
    expect(callArgs[1].method).toBe("POST");

    await waitFor(() => {
      expect(screen.getByText(/enquiry received!/i)).toBeInTheDocument();
      expect(screen.getByText(/john citizen/i)).toBeInTheDocument();
    });
  });

  it("displays fallback error options if network submission fails", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("Network connection error"));
    globalThis.fetch = fetchMock;

    render(<EnquiryForm />);

    fireEvent.change(screen.getByLabelText(/full name \*/i), { target: { value: "Jane Smith" } });
    fireEvent.change(screen.getByLabelText(/email \*/i), { target: { value: "jane@example.com" } });
    fireEvent.change(screen.getByLabelText(/location \*/i), { target: { value: "Ravenhall" } });
    fireEvent.change(screen.getByLabelText(/service \*/i), {
      target: { value: "Electrical Maintenance" },
    });
    fireEvent.change(screen.getByLabelText(/message \*/i), { target: { value: "Switchboard inspection needed" } });

    fireEvent.click(screen.getByRole("button", { name: /request quick quote/i }));

    await waitFor(() => {
      expect(screen.getByText(/automatic submission error/i)).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /email us directly/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /call 0409 268 774/i })).toBeInTheDocument();
    });
  });
});
