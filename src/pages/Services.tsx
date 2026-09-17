import { Link } from "react-router-dom";
import { Home, Building2, Wrench, AlertTriangle, ArrowRight, CheckCircle, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Home,
    title: "Domestic, Commercial and Industrial electrical installations",
    description:
      "We provide reliable electrical installation services across residential, commercial and industrial environments throughout Melbourne and Victoria. Our qualified electricians deliver safe, efficient and compliant installations ranging from lighting, power circuits and switchboards to specialised electrical systems. Whether the project is a small residential job or a large commercial installation, our team ensures all work is completed to the highest standards and in accordance with Australian electrical regulations.",
    features: [
      "Residential installations",
      "Commercial installations",
      "Industrial installations",
      "Lighting, power circuits and switchboards",
      "Specialised electrical systems",
      "Electrical installations completed in accordance with AS/NZ electrical standards and regulatory requirements",
    ],
  },
  {
    icon: Building2,
    title: "Electrical Maintenance",
    description:
      "Keeping electrical systems running safely and efficiently is essential for any property. We offer comprehensive electrical maintenance services including fault finding, repairs, upgrades and preventative maintenance. Our team responds quickly to identify issues, minimise downtime and ensure your electrical systems remain safe, compliant and operating reliably.",
    features: [
      "Fault finding",
      "Repairs",
      "Upgrades",
      "Preventative maintenance",
      "Fast response to reduce downtime",
      "Safety and compliance focused",
    ],
  },
  {
    icon: Wrench,
    title: "Electrical Roller Shutters / Blinds / Awnings",
    description:
      "We specialise in electrical installations for motorised roller shutters, outdoor blinds and awnings. With extensive experience in this industry, we work alongside manufacturers, installers and retailers to provide seamless electrical connections and system integration. Our electricians ensure each installation is completed efficiently and safely, allowing your automated shading or security systems to operate reliably and smoothly.",
    features: [
      "Motorised roller shutter electrical installations",
      "Outdoor blinds and awnings electrical installations",
      "System integration with manufacturers and installers",
      "Safe and efficient electrical connections",
      "Reliable and smooth automation performance",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Communications / Data / CCTV",
    description:
      "Homes and businesses rely on strong communication and security infrastructure. We provide professional installation of data cabling, network points and CCTV systems to ensure reliable connectivity and security coverage. Whether you're setting up a new network, expanding an existing system or installing surveillance cameras, we deliver neat, organised and high-performance solutions tailored to your needs.",
    features: [
      "Data cabling installation",
      "Network point installation",
      "CCTV system installation",
      "Reliable connectivity and coverage",
      "New setups and system expansions",
      "Neat and organised installations",
    ],
  },
  {
    icon: Radio,
    title: "New Homes / Renovations / Extensions",
    description:
      "We work closely with builders, developers and homeowners to deliver complete electrical solutions for new homes, renovations and extensions. From initial planning and rough-ins through to final fit-off and testing, our electricians ensure every stage of the project is completed safely and efficiently. We help design electrical layouts that suit the property while ensuring all installations meet modern standards and provide long-term reliability.",
    features: [
      "Electrical solutions for new homes",
      "Renovation electrical planning and execution",
      "Extension project electrical works",
      "Rough-ins, fit-off and testing",
      "Electrical layout design support",
      "Modern standards and long-term reliability",
    ],
  },
];

const Services = () => {
  return (
    <>
      <section className="bg-secondary section-padding">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-foreground mb-4">
            Electrical Services Melbourne
          </h1>
          <p className="text-secondary-foreground/70 max-w-xl mx-auto">
            Licensed electrical contracting services including installations, maintenance, and roller shutter automation systems across residential, commercial, and industrial projects.
          </p>
        </div>
      </section>

      {services.map((service, index) => (
        <section key={service.title} className={`section-padding ${index % 2 === 0 ? "bg-background" : "section-alt"}`}>
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start lg:items-center">
              <div className={index % 2 !== 0 ? "lg:order-2" : ""}>
                <div className="w-14 h-14 mb-6 bg-primary/10 rounded flex items-center justify-center">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">{service.title}</h2>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <Button asChild>
                  <Link to="/contact">Get a Quote <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </div>
              <div className={index % 2 !== 0 ? "lg:order-1" : ""}>
                <div className="bg-card border border-border rounded p-6">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-4">What's Included</h3>
                  <ul className="space-y-3">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-primary section-padding">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Need an Electrician in Melbourne?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            Contact us today for a free quote on any electrical service.
          </p>
          <Button variant="hero-outline" size="xl" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
            <Link to="/contact">Request a Quote</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Services;
