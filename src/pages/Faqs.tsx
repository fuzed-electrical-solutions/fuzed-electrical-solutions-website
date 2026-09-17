import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqSections = [
  {
    title: "Services & Capabilities",
    items: [
      {
        q: "What types of electrical work do you specialise in?",
        a: "We provide a wide range of electrical services across domestic, commercial and industrial environments. Our team specialises in electrical installations, maintenance, communications and data cabling, CCTV systems, new homes, renovations and extensions. We also have extensive expertise in electrical installations for motorised roller shutters, outdoor blinds and awnings.",
      },
      {
        q: "Do you provide electrical services for roller shutters and motorised blinds?",
        a: "Yes. Fuzed Electrical Solutions specialises in electrical installations for motorised roller shutters, outdoor blinds and awnings. We regularly work with manufacturers, installers and retailers across Melbourne to provide safe and efficient electrical connections for these systems.",
      },
      {
        q: "Do you work on both residential and commercial properties?",
        a: "Yes. We provide electrical services for residential homes, commercial properties and industrial facilities. Our team has experience working across a wide range of electrical environments.",
      },
    ],
  },
  {
    title: "Service Area & Availability",
    items: [
      {
        q: "Do you service all areas of Melbourne?",
        a: "Yes. Fuzed Electrical Solutions services Melbourne and surrounding areas across Victoria. Our team and fleet of vehicles allow us to respond to jobs across a wide range of locations efficiently.",
      },
      {
        q: "How quickly can an electrician attend my job?",
        a: "Our team operates across Melbourne and surrounding areas with multiple vehicles on the road each day. In many cases we can attend jobs quickly depending on scheduling and location.",
      },
      {
        q: "What happens if there is an urgent electrical issue?",
        a: "If you experience an urgent electrical issue, our team will do our best to respond promptly and provide assistance as quickly as possible to ensure the situation is handled safely.",
      },
    ],
  },
  {
    title: "Quotes & Project Process",
    items: [
      {
        q: "Do you offer quotes before starting work?",
        a: "Yes. We provide clear and transparent pricing before commencing work wherever possible. Once we understand the scope of the job, we can provide an accurate quote so there are no surprises.",
      },
      {
        q: "What information do I need to provide for a quote?",
        a: "To provide an accurate quote, we usually need basic information such as the type of work required, the location of the property, photos if available and any relevant job details. This helps us understand the scope of work and provide the most accurate pricing possible.",
      },
      {
        q: "Do you work with builders and contractors?",
        a: "Yes. We regularly work alongside builders, installers, manufacturers and other contractors across Melbourne. Our team is experienced in coordinating with other trades to ensure projects run smoothly and efficiently.",
      },
    ],
  },
  {
    title: "Licensing, Safety & Compliance",
    items: [
      {
        q: "Are your electricians licensed and insured?",
        a: "Yes. All work carried out by Fuzed Electrical Solutions is completed by fully licensed and qualified electricians and is performed in accordance with Australian electrical standards and regulations.",
      },
      {
        q: "Do you provide electrical certificates for your work?",
        a: "Yes. Where required, we provide Certificates of Electrical Safety (COES) for work completed, ensuring installations meet Victorian regulatory requirements.",
      },
      {
        q: "Why should I choose Fuzed Electrical Solutions?",
        a: "Our business is built on reliability, professionalism and strong communication. With years of experience servicing Melbourne and a team capable of handling both small and large projects, we focus on delivering safe, high-quality electrical work that clients can rely on.",
      },
    ],
  },
];

const Faqs = () => {
  return (
    <>
      <section className="bg-secondary section-padding">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-secondary-foreground/70 max-w-xl mx-auto">
            Find answers to common questions about our products, services, and policies.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl">
          {faqSections.map((section) => (
            <div key={section.title} className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">{section.title}</h2>
              <Accordion type="single" collapsible className="border border-border rounded overflow-hidden">
                {section.items.map((item, i) => (
                  <AccordionItem key={i} value={`${section.title}-${i}`} className="border-b border-border last:border-b-0">
                    <AccordionTrigger className="px-6 py-4 text-left font-heading font-semibold text-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-sm text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          <div className="text-center mt-12 p-8 bg-muted rounded">
            <h3 className="font-heading text-xl font-bold text-foreground mb-3">Still Have Questions?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Can't find what you're looking for? Get in touch and we'll help.
            </p>
            <Button asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faqs;
