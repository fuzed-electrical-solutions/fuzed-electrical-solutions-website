import { Phone, Mail, Clock, MapPin } from "lucide-react";
import EnquiryForm from "@/components/EnquiryForm";

const Contact = () => {
  return (
    <>
      <section className="bg-secondary section-padding">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-secondary-foreground/70 max-w-xl mx-auto">
            Get in touch for a quote on roller shutter accessories or electrical services.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div id="quick-quote">
              <h2 className="text-2xl font-bold text-foreground mb-2">Quick Quote Form</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Share your job details and upload photos for a faster, more accurate quote.
              </p>
              <EnquiryForm />
            </div>

            {/* Contact Details */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Contact Details</h2>
              <div className="space-y-6">
                {[
                  { icon: Mail, label: "Email", value: "fuzedelectricalsolutions@gmail.com", href: "mailto:fuzedelectricalsolutions@gmail.com" },
                  { icon: Phone, label: "Phone", value: "0409 268 774", href: "tel:0409268774" },
                  { icon: Clock, label: "Business Hours", value: "Monday - Friday: 6AM - 6PM\nSaturday: 6AM - 6PM\nSunday: Closed" },
                  { icon: MapPin, label: "Location", value: "Ravenhall, Victoria" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 p-4 bg-muted rounded">
                    <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground mb-1">
                        {item.label}
                      </h3>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors break-all min-w-0 block"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground whitespace-pre-line break-words">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
                <div className="p-4 bg-muted rounded">
                  <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground mb-2">
                    Business Credentials
                  </h3>
                  <p className="text-sm text-muted-foreground">Registered Electrical Contractor: 28042</p>
                  <p className="text-sm text-muted-foreground">Business Number: 58 624 535 584</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
