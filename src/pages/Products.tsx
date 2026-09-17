import { Link } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const Products = () => {
  return (
    <>
      <section className="bg-secondary section-padding">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-foreground mb-4">
            Roller Shutter Accessories
          </h1>
          <p className="text-secondary-foreground/70 max-w-xl mx-auto">
            Professional RF switches, receivers, transmitters, and safety devices designed for roller shutter and motorised shading control systems.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
