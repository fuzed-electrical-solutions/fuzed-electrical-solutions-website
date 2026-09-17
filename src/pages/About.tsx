import { Shield, Target, Eye, CheckCircle } from "lucide-react";

const About = () => {
  return (
    <>
      <section className="bg-secondary section-padding">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-foreground mb-4">
            About Fuzed Electrical Solutions
          </h1>
          <p className="text-secondary-foreground/70 max-w-xl mx-auto">
            Family-run electrical contracting services across Melbourne and greater Victoria.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            Fuzed Electrical Solutions is a family-run electrical contracting business proudly servicing Melbourne and greater Victoria. We provide reliable, professional electrical solutions across the domestic, commercial and industrial sectors.
          </p>
          <p className="text-muted-foreground mb-4">
            Our team delivers a wide range of services including electrical installations, maintenance and specialist electrical work for electric roller shutters, outdoor blinds and awnings. We also provide communications, data and CCTV installations, as well as electrical services for new homes, renovations and extensions.
          </p>
          <p className="text-muted-foreground mb-4">
            With extensive expertise in the electric roller shutter industry, Fuzed Electrical Solutions has become a trusted provider for retailers, manufacturers and installers throughout Victoria. We supply electrical installations for new shutter systems, as well as servicing, troubleshooting and tailored electrical solutions to ensure systems operate safely and efficiently.
          </p>
          <p className="text-muted-foreground mb-4">
            As a family-operated business, we take pride in delivering prompt, punctual and highly professional service. Our team is committed to quality workmanship, clear communication and reliable service across every project we undertake.
          </p>
          <p className="text-muted-foreground">
            Whether it's a residential installation, a commercial project or specialised shutter electrical work, Fuzed Electrical Solutions has the experience, capability and team to deliver the job efficiently and to the highest standard.
          </p>
        </div>
      </section>

      {/* Company Profile */}
      <section className="section-alt section-padding">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground mb-6">Why Clients Choose Fuzed Electrical Solutions</h2>
          <p className="text-muted-foreground mb-4">
            Fuzed Electrical Solutions is a Melbourne-based electrical company built on reliability, quality workmanship and strong industry relationships. As a family-run business, we take pride in delivering professional electrical services with a strong focus on communication, efficiency and customer satisfaction.
          </p>
          <p className="text-muted-foreground mb-4">
            Over the years, we have developed extensive experience across domestic, commercial and industrial electrical work, servicing clients throughout Melbourne and greater Victoria. Through consistent service and a commitment to high standards, we have built long-term relationships with builders, manufacturers, retailers and homeowners who rely on us for dependable electrical solutions.
          </p>
          <p className="text-muted-foreground mb-4">
            A major area of expertise for our team is electrical installations for motorised roller shutters, outdoor blinds and awnings. Having worked alongside many leading suppliers and installers in the industry, we have developed streamlined processes that allow us to deliver efficient, reliable installations across a high volume of projects.
          </p>
          <p className="text-muted-foreground">
            Our purpose is simple - to provide safe, professional and high-quality electrical services while maintaining the level of reliability and communication that our clients expect. With a skilled team and a fleet servicing locations across Victoria, Fuzed Electrical Solutions continues to grow while maintaining the values that the business was built on.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Mission & Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Target,
                title: "Our Mission",
                desc: "To deliver reliable electrical services and roller shutter control solutions that ensure safe, efficient, and professional installations across all sectors.",
              },
              {
                icon: Eye,
                title: "Our Vision",
                desc: "To be Melbourne’s most trusted electrical contractor for reliable service, quality workmanship, and long-term client partnerships.",
              },
              {
                icon: Shield,
                title: "Our Standard",
                desc: "Every project is completed with a strong focus on safety, reliability, and compliance with Australian electrical installation practices, backed by professional workmanship.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 bg-card border border-border rounded">
                <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-bold mb-3 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground mb-6">Compliance & Certifications</h2>
          <ul className="space-y-4">
            {[
              "Registered Electrical Contractor: 28042",
              "Business Number: 58 624 535 584",
              "All installations performed in compliance with Australian electrical safety regulations",
              "Public liability and professional indemnity insured",
              "Manufacturer warranty provided on supplied accessories and components",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default About;
