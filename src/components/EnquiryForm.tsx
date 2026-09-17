import { useState, useId } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, CheckCircle2, AlertCircle, X, UploadCloud, Mail, Phone } from "lucide-react";

interface EnquiryFormProps {
  productName?: string;
}

const DEFAULT_EMAIL = "fuzedelectricalsolutions@gmail.com";
const MAX_TOTAL_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB limit for FormSubmit

export default function EnquiryForm({ productName }: EnquiryFormProps) {
  const formId = useId();
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || DEFAULT_EMAIL;
  const customEndpoint = import.meta.env.VITE_FORM_ENDPOINT;
  const endpoint = customEndpoint || `https://formsubmit.co/ajax/${encodeURIComponent(contactEmail)}`;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    enquiryType: productName ? "product" : "service",
    serviceType: "",
    productType: productName || "",
    message: productName ? `I'd like to enquire about the ${productName}.` : "",
  });

  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const [submissionSummary, setSubmissionSummary] = useState<{ name: string; target: string } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const serviceOptions = [
    "Domestic, Commercial & Industrial Installations",
    "Electrical Maintenance",
    "Electrical Roller Shutters / Blinds / Awnings",
    "Communications / Data / CCTV",
    "New Homes / Renovations / Extensions",
  ];

  const productOptions = [
    "Single Channel Receiver Switch (AC304)",
    "Dual Channel Receiver Switch (AC305)",
    "RF Multi Channel Transmitter (AC123-16)",
    "Keyring Remote Control (AC116)",
    "RF Smoke Detector Transmitter (AC104)",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);

    const combined = [...attachments, ...newFiles];
    const totalSize = combined.reduce((acc, f) => acc + f.size, 0);

    if (totalSize > MAX_TOTAL_FILE_SIZEBYTES()) {
      toast.error("Total file size exceeds 10MB. Please choose smaller images.");
      return;
    }

    setAttachments(combined);
    // Reset file input value so user can re-select if needed
    e.target.value = "";
  };

  const removeAttachment = (indexToRemove: number) => {
    setAttachments((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const resetForm = () => {
    setSubmittedSuccessfully(false);
    setSubmissionSummary(null);
    setSubmitError(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      location: "",
      enquiryType: productName ? "product" : "service",
      serviceType: "",
      productType: productName || "",
      message: productName ? `I'd like to enquire about the ${productName}.` : "",
    });
    setAttachments([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.location.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (formData.enquiryType === "service" && !formData.serviceType) {
      toast.error("Please select a service type.");
      return;
    }

    if (formData.enquiryType === "product" && !formData.productType) {
      toast.error("Please select a product type.");
      return;
    }

    const selectedTarget = formData.enquiryType === "service" ? formData.serviceType : formData.productType;

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("name", formData.name.trim());
      payload.append("email", formData.email.trim());
      payload.append("phone", formData.phone.trim() || "Not provided");
      payload.append("quote_for", formData.enquiryType === "service" ? "Service" : "Product");
      payload.append("location", formData.location.trim());
      payload.append("enquiry_detail", selectedTarget);
      payload.append("message", formData.message.trim());

      // FormSubmit special configuration fields
      payload.append("_subject", `New Quick Quote Enquiry: ${formData.name.trim()} - ${selectedTarget}`);
      payload.append("_template", "table");
      payload.append("_captcha", "false");

      // Append file attachments
      attachments.forEach((file, index) => {
        const fieldName = attachments.length === 1 ? "attachment" : `attachment_${index + 1}`;
        payload.append(fieldName, file);
      });

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: payload,
      });

      const data = await response.json().catch(() => ({}));

      // FormSubmit returns { success: "true", message: "..." } or activation message
      if (response.ok && (data.success === "true" || data.success === true)) {
        setSubmittedSuccessfully(true);
        setSubmissionSummary({ name: formData.name, target: selectedTarget });
        toast.success("Quick quote enquiry submitted! We'll be in touch shortly.");
      } else if (data.message && typeof data.message === "string" && data.message.includes("Activation")) {
        // FormSubmit is pending initial activation email confirmation
        setSubmittedSuccessfully(true);
        setSubmissionSummary({ name: formData.name, target: selectedTarget });
        toast.success("Enquiry received! We will be in touch shortly.");
      } else {
        throw new Error(data.message || `Submission failed with status ${response.status}`);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Network error. Please try again.";
      setSubmitError(errorMessage);
      toast.error("Could not send enquiry automatically. Please reach us directly via phone or email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  function MAX_TOTAL_FILE_SIZEBYTES() {
    return MAX_TOTAL_FILE_SIZE_BYTES;
  }

  const mailtoHref = `mailto:${contactEmail}?subject=${encodeURIComponent(
    `Quick Quote Enquiry: ${formData.name || "Customer"} - ${
      formData.enquiryType === "service" ? formData.serviceType || "Service" : formData.productType || "Product"
    }`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nLocation: ${formData.location}\nType: ${
      formData.enquiryType
    }\nDetails: ${
      formData.enquiryType === "service" ? formData.serviceType : formData.productType
    }\n\nMessage:\n${formData.message}`
  )}`;

  if (submittedSuccessfully && submissionSummary) {
    return (
      <div className="bg-card border border-primary/30 rounded-lg p-8 text-center space-y-4 shadow-sm animate-fade-in">
        <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-heading font-bold text-foreground">Enquiry Received!</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Thank you, <span className="font-semibold text-foreground">{submissionSummary.name}</span>. Your enquiry for{" "}
          <span className="font-semibold text-foreground">{submissionSummary.target}</span> has been sent to Fuzed
          Electrical Solutions.
        </p>
        <p className="text-sm text-muted-foreground">
          We will review your details and contact you shortly with a quote.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
          <Button onClick={resetForm} variant="outline" className="w-full sm:w-auto">
            Submit Another Request
          </Button>
          <Button asChild variant="default" className="w-full sm:w-auto">
            <a href="tel:0409268774">
              <Phone className="w-4 h-4 mr-2" />
              Call 0409 268 774
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {submitError && (
        <div className="bg-destructive/10 border border-destructive/30 rounded p-4 text-sm text-foreground space-y-2">
          <div className="flex items-center gap-2 text-destructive font-semibold">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>Automatic submission error</span>
          </div>
          <p className="text-muted-foreground text-xs">
            We couldn't submit your form directly. You can send your quote request directly via your email app or give us
            a call:
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <Button size="sm" variant="default" asChild>
              <a href={mailtoHref}>
                <Mail className="w-4 h-4 mr-1" />
                Email Us Directly
              </a>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <a href="tel:0409268774">
                <Phone className="w-4 h-4 mr-1" />
                Call 0409 268 774
              </a>
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={`${formId}-name`}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-foreground mb-1 block"
          >
            Full Name *
          </label>
          <Input
            id={`${formId}-name`}
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your full name"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label
            htmlFor={`${formId}-email`}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-foreground mb-1 block"
          >
            Email *
          </label>
          <Input
            id={`${formId}-email`}
            required
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="your@email.com"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor={`${formId}-phone`}
          className="text-sm font-heading font-semibold uppercase tracking-wider text-foreground mb-1 block"
        >
          Phone
        </label>
        <Input
          id={`${formId}-phone`}
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="04XX XXX XXX"
          disabled={isSubmitting}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={`${formId}-enquiryType`}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-foreground mb-1 block"
          >
            Quote For *
          </label>
          <select
            id={`${formId}-enquiryType`}
            required
            value={formData.enquiryType}
            onChange={(e) =>
              setFormData({
                ...formData,
                enquiryType: e.target.value,
                serviceType: "",
                productType: productName || "",
              })
            }
            disabled={isSubmitting}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="service">Service</option>
            <option value="product">Product</option>
          </select>
        </div>
        <div>
          <label
            htmlFor={`${formId}-location`}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-foreground mb-1 block"
          >
            Location *
          </label>
          <Input
            id={`${formId}-location`}
            required
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Suburb / address"
            disabled={isSubmitting}
          />
        </div>

        {formData.enquiryType === "service" ? (
          <div className="md:col-span-2">
            <label
              htmlFor={`${formId}-serviceType`}
              className="text-sm font-heading font-semibold uppercase tracking-wider text-foreground mb-1 block"
            >
              Service *
            </label>
            <select
              id={`${formId}-serviceType`}
              required
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              disabled={isSubmitting}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Select a service</option>
              {serviceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="md:col-span-2">
            <label
              htmlFor={`${formId}-productType`}
              className="text-sm font-heading font-semibold uppercase tracking-wider text-foreground mb-1 block"
            >
              Product *
            </label>
            <select
              id={`${formId}-productType`}
              required
              value={formData.productType}
              onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
              disabled={isSubmitting}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Select a product</option>
              {productOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div>
        <label
          htmlFor={`${formId}-message`}
          className="text-sm font-heading font-semibold uppercase tracking-wider text-foreground mb-1 block"
        >
          Message *
        </label>
        <Textarea
          id={`${formId}-message`}
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="How can we help?"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label
          htmlFor={`${formId}-photos`}
          className="text-sm font-heading font-semibold uppercase tracking-wider text-foreground mb-1 block"
        >
          Upload Photos (Optional)
        </label>
        <div className="space-y-2">
          <Input
            id={`${formId}-photos`}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            disabled={isSubmitting}
            className="cursor-pointer file:cursor-pointer"
          />
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <UploadCloud className="w-3.5 h-3.5 inline-block" />
            Add site photos (max 10MB total) for a faster, more accurate quote.
          </p>

          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {attachments.map((file, idx) => (
                <span
                  key={`${file.name}-${idx}`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-muted text-xs text-foreground border border-border"
                >
                  <span className="truncate max-w-[180px]">{file.name}</span>
                  <span className="text-muted-foreground text-[10px]">
                    ({(file.size / 1024).toFixed(0)} KB)
                  </span>
                  <button
                    type="button"
                    onClick={() => removeAttachment(idx)}
                    disabled={isSubmitting}
                    className="text-muted-foreground hover:text-destructive transition-colors ml-1"
                    title="Remove file"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Submitting Quote Request...
          </>
        ) : (
          "Request Quick Quote"
        )}
      </Button>
    </form>
  );
}
