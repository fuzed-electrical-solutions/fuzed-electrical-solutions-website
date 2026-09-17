import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Facebook, FileText } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import logoForLightMode from "@/assets/fuzed-horizontal-logo-light.jpeg";
import logoForDarkMode from "@/assets/fuzed-horizontal-logo-dark.jpeg";
import fuzedHorizontalLogo from "@/assets/fuzed-horizontal-logo.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Products", path: "/products" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "FAQs", path: "/faqs" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { resolvedTheme } = useTheme();
  const location = useLocation();
  const headerLogo = mounted ? (resolvedTheme === "dark" ? logoForDarkMode : logoForLightMode) : logoForLightMode;
  const footerLogo = fuzedHorizontalLogo;

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-secondary text-secondary-foreground text-sm py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="tel:0409268774" className="flex items-center gap-1.5 font-medium hover:text-primary transition-colors">
              <Phone className="w-3.5 h-3.5" />
              0409 268 774
            </a>
          </div>
          <div className="flex items-center">
            <a
              href="https://www.facebook.com/fuzedelectricalsolutions1/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between lg:justify-normal h-20 lg:h-24 px-4 relative">
          {/* Mobile ThemeToggle (left) */}
          <div className="lg:hidden z-10">
            <ThemeToggle />
          </div>

          {/* Desktop Left Nav */}
          <nav className="hidden lg:flex items-center gap-8 w-1/3 justify-start">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-heading text-base font-bold uppercase tracking-wider transition-colors hover:text-primary ${
                  location.pathname === link.path ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Center Logo (Desktop + Mobile) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10">
            <Link to="/" onClick={handleLogoClick} className="flex items-center">
              <img
                src={headerLogo}
                alt="Fuzed Electrical Solutions"
                className={`h-10 lg:h-14 w-auto transition-all duration-300 ${
                  location.pathname !== "/" || isScrolled
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              />
            </Link>
          </div>

          {/* Desktop Right Nav / Button */}
          <div className="hidden lg:flex items-center gap-8 w-1/3 ml-auto justify-end">
            <nav className="flex items-center gap-8">
              {navLinks.slice(3).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-heading text-base font-bold uppercase tracking-wider transition-colors hover:text-primary ${
                    location.pathname === link.path ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <Button asChild size="lg">
                <Link to="/contact">Enquire Now</Link>
              </Button>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Toggle (right) */}
          <div className="lg:hidden z-10">
            <button
              className="p-2 text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden bg-background border-t border-border">
            <nav className="flex flex-col py-4 px-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`font-heading text-base font-semibold uppercase tracking-wider py-3 px-4 transition-colors hover:bg-muted rounded ${
                    location.pathname === link.path ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-4">
                <Link to="/contact" onClick={() => setMobileOpen(false)}>Enquire Now</Link>
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Content */}
      <main className="flex-1 pb-20 lg:pb-0">
        <div key={location.pathname} className="animate-fade-in">
          {children}
        </div>
      </main>

      {/* Sticky Mobile Call / Quote Actions */}
      <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
        <div className="grid grid-cols-2 gap-2 p-3">
          <a
            href="tel:0409268774"
            className="inline-flex items-center justify-center gap-2 rounded bg-primary px-4 py-3 text-sm font-heading font-semibold uppercase tracking-wider text-primary-foreground"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
          <Link
            to="/contact#quick-quote"
            className="inline-flex items-center justify-center gap-2 rounded border border-border bg-background px-4 py-3 text-sm font-heading font-semibold uppercase tracking-wider text-foreground"
          >
            <FileText className="w-4 h-4" />
            Quick Quote
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img src={footerLogo} alt="Fuzed Electrical Solutions" className="h-24 md:h-28 w-auto mb-4 object-contain" />
            </div>
            <div>
              <h4 className="font-heading text-base font-bold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/70">
                <li><Link to="/products" className="hover:text-primary transition-colors">All Products</Link></li>
                <li><Link to="/products/single-channel-receiver-switch" className="hover:text-primary transition-colors">Single Channel Receiver Switch</Link></li>
                <li><Link to="/products/dual-channel-receiver-switch" className="hover:text-primary transition-colors">Dual Channel Receiver Switch</Link></li>
                <li><Link to="/products/rf-multi-channel-transmitter" className="hover:text-primary transition-colors">RF Multi Channel Transmitter</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-base font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/70">
                <li><Link to="/services" className="hover:text-primary transition-colors">All Services</Link></li>
                <li><Link to="/services" className="hover:text-primary transition-colors">Domestic, Commercial & Industrial Installations</Link></li>
                <li><Link to="/services" className="hover:text-primary transition-colors">Electrical Maintenance</Link></li>
                <li><Link to="/services" className="hover:text-primary transition-colors">Electrical Roller Shutters / Blinds / Awnings</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-base font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/70">
                <li>Ravenhall, Victoria</li>
                <li>fuzedelectricalsolutions@gmail.com</li>
                <li>0409 268 774</li>
                <li>Mon - Fri: 6AM - 6PM | Sat: 6AM - 6PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary-foreground/10 mt-8 pt-8 text-sm text-secondary-foreground/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2026 Fuzed Electrical Solutions. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/faqs" className="hover:text-primary transition-colors">FAQs</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
