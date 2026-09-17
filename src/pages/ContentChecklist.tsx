import { Printer, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
  {
    title: "Brand & General",
    items: [
      "Company logo (high-res, transparent background)",
      "Brand tagline or slogan",
      'Company description / "About Us" text',
    ],
  },
  {
    title: "Hero Section",
    items: [
      "Hero headline text",
      "Hero subheading / description",
      "Hero product image (high-res)",
    ],
  },
  {
    title: "Products",
    items: [
      "Full product list with names",
      "Product descriptions (short + detailed)",
      "Product images (multiple angles for 360° viewer)",
      "Product features (bullet points per product)",
      "Technical specifications per product (dimensions, voltage, etc.)",
      "Compatibility info per product",
      "Product categories",
    ],
  },
  {
    title: "Services",
    items: [
      "List of electrical services offered",
      "Service descriptions",
      "Service area / coverage details",
    ],
  },
  {
    title: "Contact Information",
    items: [
      "Business email address",
      "Phone number",
      "Business hours (weekdays, Saturday, Sunday)",
      "Business address / location",
      "Factory pickup details (if applicable)",
    ],
  },
  {
    title: "About Page",
    items: [
      "Company history / story",
      "Team member names, roles, and photos (if applicable)",
      "Licenses and certifications (e.g., electrician license number)",
    ],
  },
  {
    title: "FAQs",
    items: ["Frequently asked questions and answers"],
  },
  {
    title: "Compliance & Trust",
    items: [
      "Australian standards / certifications held",
      "Warranty details",
      "Any industry memberships or affiliations",
    ],
  },
  {
    title: "Social & Legal",
    items: [
      "Social media links (Instagram, Facebook, LinkedIn, etc.)",
      "Privacy policy / terms of service content",
      "ABN (Australian Business Number)",
    ],
  },
];

let counter = 0;

const ContentChecklist = () => {
  counter = 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header - hidden on print */}
      <div className="print:hidden bg-secondary section-padding">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-foreground mb-4">
            Website Content Checklist
          </h1>
          <p className="text-secondary-foreground/70 max-w-xl mx-auto mb-6">
            Print or save this checklist as a PDF to send to your client.
          </p>
          <Button size="lg" onClick={() => window.print()}>
            <Printer className="w-5 h-5 mr-2" /> Print / Save as PDF
          </Button>
        </div>
      </div>

      {/* Print header */}
      <div className="hidden print:block pt-8 pb-4 px-8">
        <h1 className="text-2xl font-bold text-center mb-1">
          Fuzed Electrical Solutions — Website Content Checklist
        </h1>
        <p className="text-sm text-center text-muted-foreground">
          Please provide the following content for your website. Tick each item when ready.
        </p>
      </div>

      {/* Checklist */}
      <div className="container mx-auto py-10 px-4 print:py-4 print:px-8">
        <div className="max-w-3xl mx-auto space-y-8 print:space-y-5">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-bold text-foreground mb-3 print:text-base print:mb-2 border-b border-border pb-2">
                {section.title}
              </h2>
              <ul className="space-y-2 print:space-y-1">
                {section.items.map((item) => {
                  counter++;
                  return (
                    <li key={item} className="flex items-start gap-3 print:gap-2">
                      <div className="w-5 h-5 border-2 border-muted-foreground rounded flex-shrink-0 mt-0.5 print:w-4 print:h-4" />
                      <span className="text-foreground print:text-sm">
                        <span className="text-muted-foreground font-mono text-sm mr-2">{counter}.</span>
                        {item}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Print footer */}
        <div className="hidden print:block mt-10 pt-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            Fuzed Electrical Solutions — Content Checklist
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContentChecklist;
