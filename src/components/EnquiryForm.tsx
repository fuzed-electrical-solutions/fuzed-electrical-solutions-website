import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface EnquiryFormProps {
  productName?: string;
}

export default function EnquiryForm({ productName }: EnquiryFormProps) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Quick quote enquiry submitted! We'll be in touch shortly.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      location: "",
      enquiryType: productName ? "product" : "service",
      serviceType: "",
      productType: productName || "",
      message: "",
    });
    setAttachments([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-heading font-semibold uppercase tracking-wider text-foreground mb-1 block">
            Full Name *
          </label>
          <Input
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="text-sm font-heading font-semibold uppercase tracking-wider text-foreground mb-1 block">
            Email *
          </label>
          <Input
            required
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="your@email.com"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-heading font-semibold uppercase tracking-wider text-foreground mb-1 block">
          Phone
        </label>
        <Input
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="04XX XXX XXX"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-heading font-semibold uppercase tracking-wider text-foreground mb-1 block">
            Quote For *
          </label>
          <select
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
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="service">Service</option>
            <option value="product">Product</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-heading font-semibold uppercase tracking-wider text-foreground mb-1 block">
            Location *
          </label>
          <Input
            required
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Suburb / address"
          />
        </div>
        {formData.enquiryType === "service" ? (
          <div className="md:col-span-2">
            <label className="text-sm font-heading font-semibold uppercase tracking-wider text-foreground mb-1 block">
              Service *
            </label>
            <select
              required
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
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
            <label className="text-sm font-heading font-semibold uppercase tracking-wider text-foreground mb-1 block">
              Product *
            </label>
            <select
              required
              value={formData.productType}
              onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
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
        <label className="text-sm font-heading font-semibold uppercase tracking-wider text-foreground mb-1 block">
          Message *
        </label>
        <Textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="How can we help?"
        />
      </div>
      <div>
        <label className="text-sm font-heading font-semibold uppercase tracking-wider text-foreground mb-1 block">
          Upload Photos
        </label>
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setAttachments(Array.from(e.target.files || []))}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Add site photos to help us provide a faster, more accurate quote.
          {attachments.length > 0 ? ` ${attachments.length} file(s) selected.` : ""}
        </p>
      </div>
      <Button type="submit" size="lg" className="w-full md:w-auto">
        Request Quick Quote
      </Button>
    </form>
  );
}
