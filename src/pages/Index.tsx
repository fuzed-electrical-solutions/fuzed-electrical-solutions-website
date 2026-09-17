import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { ArrowRight, Shield, Zap, Settings, CheckCircle, Home, Building2, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import heroImage from "@/assets/hero-product.jpg";
import logoForLightMode from "@/assets/fuzed-horizontal-logo-light.jpeg";
import fuzedHorizontalLogo from "@/assets/fuzed-horizontal-logo.png";

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const heroLogo = mounted ? (resolvedTheme === "dark" ? fuzedHorizontalLogo : logoForLightMode) : logoForLightMode;

  const highlightProductIds = [
    "dual-channel-receiver-switch",
    "rf-multi-channel-transmitter",
    "rf-smoke-detector-transmitter",
  ];
  const highlightProducts = highlightProductIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is (typeof products)[number] => Boolean(product));

  return (
    <>
      {/* SEO */}
      <title>Fuzed Electrical Solutions — Professional Electricians & Roller Shutter Specialists Melbourne</title>

      {/* 1. Hero Section */}
      <section className="bg-background section-padding relative overflow-hidden">
        <div className="container mx-auto relative z-10 max-w-5xl flex flex-col items-center text-center">
          <div className="animate-fade-in flex flex-col items-center mb-12">
            <img
              src={heroLogo}
              alt="Fuzed Electrical Solutions"
              className="h-14 md:h-18 lg:h-20 w-auto mb-12 md:mb-16 object-contain"
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground text-balance">
              Powering Homes, Businesses & Roller Shutter Systems Across Melbourne
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              Professional electrical services, installations, maintenance and specialists in roller shutters, outdoor blinds and awnings across Melbourne.
            </p>
            <div className="flex justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">Enquire Now</Link>
              </Button>
            </div>
          </div>
          <div className="animate-fade-in w-full max-w-4xl mx-auto" style={{ animationDelay: "0.2s" }}>
            <img
              src={heroImage}
              alt="Roller shutter motor and accessories — professional product range by Fuzed Electrical Solutions"
              className="w-full rounded shadow-2xl border border-border"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* 2. Electrical Services Preview */}
      <section className="section-alt section-padding">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Electrical Services</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Professional electrical solutions across Melbourne and Victoria.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Home,
                title: "Domestic, Commercial & Industrial Installations",
                desc: "Safe, efficient and compliant electrical installations for homes, businesses and industrial sites. Coverage: Melbourne, Victoria.",
              },
              {
                icon: Building2,
                title: "Electrical Maintenance",
                desc: "Comprehensive fault finding, repairs, upgrades and preventative maintenance to keep systems reliable. Coverage: Melbourne, Victoria.",
              },
              {
                icon: Wrench,
                title: "Electrical Roller Shutters / Blinds / Awnings",
                desc: "Specialist electrical connections and integration for motorised shutter, blind and awning systems. Coverage: Melbourne, Victoria.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-card border border-border rounded p-6">
                <div className="w-12 h-12 mb-4 bg-primary/10 rounded flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-bold mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button size="lg" asChild>
              <Link to="/services">View All Services <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 3. Featured Products */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlightProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link to="/products">View All Products <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Our Accessories */}
      <section className="section-alt section-padding">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Why Choose Our Accessories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Settings,
                title: "Smart Integrated Control System",
                desc: "A unified 433.92 MHz RF ecosystem that delivers seamless, reliable control across shutters, blinds, awnings, and motorised systems.",
              },
              {
                icon: CheckCircle,
                title: "Effortless Multi-Channel Operation",
                desc: "Intuitively control single or multiple installations with flexible transmitter options designed for both home and commercial automation.",
              },
              {
                icon: Shield,
                title: "Intelligent Safety Integration",
                desc: "RF smoke detector compatibility enables automatic shutter activation during emergencies for enhanced protection and response.",
              },
              {
                icon: Zap,
                title: "Built for Demanding Conditions",
                desc: "Engineered for industrial-grade reliability with stable performance across extreme temperatures and long-term daily use.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <div className="w-14 h-14 mx-auto mb-4 bg-muted rounded flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-foreground" />
                </div>
                <h3 className="font-heading text-lg font-bold mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Compliance / Australian Standards */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Australian System Compatibility & Safety Aligned
              </h2>
              <p className="text-muted-foreground mb-6">
                Our accessories are designed and tested for compatibility with Australian and New Zealand electrical systems, ensuring reliable integration with standard roller shutter motor installations operating on 230V RF control environments.
              </p>
              <ul className="space-y-3">
                {[
                  "Compatible with standard 433.92 MHz RF control systems",
                  "Suitable for professional electrical installation environments",
                  "Designed for integration with tubular motor roller shutter systems",
                  "Backed by manufacturer warranty on all accessories",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-foreground">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-secondary text-secondary-foreground rounded p-10 text-center">
              <Shield className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="font-heading text-2xl font-bold mb-2">Quality Tested & Manufacturer Supported</h3>
              <p className="text-secondary-foreground/70">All products undergo factory performance testing and are backed by a 12-month manufacturer warranty to ensure dependable operation across residential and commercial applications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Final CTA Strip */}
      <section className="bg-primary section-padding">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            Contact us for a quote on roller shutter accessories or electrical services across Melbourne.
          </p>
          <Button variant="hero-outline" size="xl" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
            <Link to="/contact">Request a Quote</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Index;
