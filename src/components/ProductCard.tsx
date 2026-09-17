import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const showDark = mounted && resolvedTheme === "dark";
  const imageSrc = showDark && product.darkImages?.[0] 
    ? product.darkImages[0] 
    : (product.images?.[0] || "");

  return (
    <div className="group bg-card border border-border rounded overflow-hidden transition-shadow hover:shadow-lg">
      <div className="aspect-square bg-muted flex items-center justify-center p-8">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={product.name}
            className="max-w-full max-h-full object-contain"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-accent rounded flex items-center justify-center">
            <span className="font-heading text-lg text-muted-foreground uppercase tracking-wider text-center px-4">
              {product.name}
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <span className="text-xs font-heading uppercase tracking-wider text-primary font-semibold">
          {product.category}
        </span>
        <h3 className="font-heading text-lg font-bold mt-1 mb-2 text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.shortDescription}
        </p>
        <Button variant="outline" size="sm" asChild className="w-full">
          <Link to={`/products/${product.id}`}>
            View Product <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
