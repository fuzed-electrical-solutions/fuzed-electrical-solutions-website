import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  productName: string;
  images?: string[];
}

export default function ProductGallery({ productName, images }: ProductGalleryProps) {
  // Placeholder images until real ones are provided
  const galleryImages = images && images.length > 0
    ? images
    : [
        `/placeholder.svg`,
        `/placeholder.svg`,
        `/placeholder.svg`,
        `/placeholder.svg`,
      ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true });
  const [emblaThumbRef, emblaThumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onSelect = useCallback(() => {
    if (!emblaMainApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    if (emblaThumbApi) {
      emblaThumbApi.scrollTo(emblaMainApi.selectedScrollSnap());
    }
  }, [emblaMainApi, emblaThumbApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    return () => { emblaMainApi.off("select", onSelect); };
  }, [emblaMainApi, onSelect]);

  const scrollPrev = useCallback(() => emblaMainApi?.scrollPrev(), [emblaMainApi]);
  const scrollNext = useCallback(() => emblaMainApi?.scrollNext(), [emblaMainApi]);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi]
  );

  const angleLabels = ["Front", "Side", "Back", "Detail"];

  return (
    <div className="space-y-3">
      {/* Main carousel */}
      <div className="relative group">
        <div className="overflow-hidden rounded bg-muted" ref={emblaMainRef}>
          <div className="flex">
            {galleryImages.map((src, i) => (
              <div key={i} className="flex-[0_0_100%] min-w-0">
                <div className="aspect-square flex items-center justify-center p-8">
                  <img
                    src={src}
                    alt={`${productName} — ${angleLabels[i] || `View ${i + 1}`}`}
                    className="max-w-full max-h-full object-contain"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-secondary/80 backdrop-blur-sm rounded-full flex items-center justify-center text-secondary-foreground opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-secondary/80 backdrop-blur-sm rounded-full flex items-center justify-center text-secondary-foreground opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {galleryImages.map((_, i) => (
            <button
              key={i}
              onClick={() => onThumbClick(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === selectedIndex
                  ? "bg-primary w-5"
                  : "bg-muted-foreground/40"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="overflow-hidden" ref={emblaThumbRef}>
        <div className="flex gap-2">
          {galleryImages.map((src, i) => (
            <button
              key={i}
              onClick={() => onThumbClick(i)}
              className={`flex-[0_0_22%] min-w-0 rounded border-2 transition-colors overflow-hidden ${
                i === selectedIndex
                  ? "border-primary"
                  : "border-white hover:border-white"
              }`}
            >
              <div className="aspect-square bg-muted flex items-center justify-center p-2">
                <img
                  src={src}
                  alt={`${productName} thumbnail ${i + 1}`}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <span className="block text-[10px] text-center text-muted-foreground py-1 font-heading uppercase tracking-wider">
                {angleLabels[i] || `View ${i + 1}`}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
