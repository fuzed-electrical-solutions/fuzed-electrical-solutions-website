import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import ProductGallery from "@/components/ProductGallery";
import EnquiryForm from "@/components/EnquiryForm";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!product) {
    return (
      <div className="section-padding text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <Button asChild><Link to="/products">Back to Products</Link></Button>
      </div>
    );
  }

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);
  const showDark = mounted && resolvedTheme === "dark";
  const galleryImages = showDark && product.darkImages && product.darkImages.length > 0
    ? product.darkImages
    : product.images;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-muted py-4 px-4">
        <div className="container mx-auto">
          <Link to="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
        </div>
      </div>

      {/* Product Hero */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 360 Viewer */}
            <ProductGallery productName={product.name} images={galleryImages} />

            {/* Product Info */}
            <div>
              <span className="font-heading text-sm uppercase tracking-widest text-primary font-semibold mb-2 block">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{product.name}</h1>
              <p className="text-muted-foreground mb-6">{product.description}</p>
              <div className="mb-6">
                <h2 className="font-heading text-sm uppercase tracking-widest text-foreground mb-3">Key Features</h2>
                <ul className="space-y-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-6">
                <h2 className="font-heading text-sm uppercase tracking-widest text-foreground mb-3">Compatibility</h2>
                <ul className="space-y-2">
                  {product.compatibility.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button size="lg" asChild>
                <Link to="/contact">Enquire Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="section-padding section-alt">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Technical Specifications</h2>
          <div className="border border-border rounded overflow-hidden bg-background">
            <table className="w-full">
              <tbody>
                {Object.entries(product.specifications).map(([key, value], i) => (
                  <tr key={key} className={i % 2 === 0 ? "bg-background" : "bg-muted/50"}>
                    <td className="px-6 py-3 font-heading font-semibold text-sm uppercase tracking-wider text-foreground w-1/3">
                      {key}
                    </td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>


      {/* Enquiry Form */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Enquire About This Product
          </h2>
          <EnquiryForm productName={product.name} />
        </div>
      </section>

      {/* Related Products */}
      <section className="section-alt section-padding">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
