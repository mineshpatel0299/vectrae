"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { BRAND_GRADIENT } from "@/lib/brand";

const galleryImages = [
  "/images/gallery/img (1).png",
  "/images/gallery/img (2).png",
  "/images/gallery/img (3).png",
  "/images/gallery/img (4).png",
  "/images/gallery/img (5).png",
  "/images/gallery/img (6).png",
  "/images/gallery/img (7).png",
  "/images/gallery/img (8).png",
  "/images/gallery/img (9).png",
  "/images/gallery/img (10).png",
  "/images/gallery/img (11).png",
  "/images/gallery/img (12).png",
  "/images/gallery/img (13).png",
  "/images/gallery/img (14).png",
  "/images/gallery/img (15).png",
  "/images/gallery/img (16).png",
  "/images/gallery/img (17).png",
  "/images/gallery/img (18).png",
  "/images/gallery/img (19).png",
  "/images/gallery/img (20).png",
  "/images/gallery/img (21).png",
  "/images/gallery/img (22).png",
  "/images/gallery/img (23).png",
  "/images/gallery/img (24).png",
  "/images/gallery/img (25).png",
  "/images/gallery/img (26).png",
  "/images/gallery/img (27).png",
  "/images/gallery/img (28).png",
  "/images/gallery/img (29).png",
  "/images/gallery/img (30).png",
  "/images/gallery/img (31).png",
  "/images/gallery/img (32).png",
  "/images/gallery/img (33).png",
  "/images/gallery/img (34).png",
  "/images/gallery/img (35).png",
  "/images/gallery/img (36).png",
  "/images/gallery/img (37).png",
];

/*
 * Number of photos shown in each bento composition.
 */
const IMAGES_PER_SLIDE = 9;

export default function AboutGallery() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isLightboxImageLoaded, setIsLightboxImageLoaded] = useState(false);

  /*
   * Automatically divide all images into groups of 9.
   */
  const slides = useMemo(() => {
    const result: string[][] = [];

    for (let i = 0; i < galleryImages.length; i += IMAGES_PER_SLIDE) {
      result.push(galleryImages.slice(i, i + IMAGES_PER_SLIDE));
    }

    return result;
  }, []);

  const totalSlides = slides.length;
  const totalImages = galleryImages.length;
  const isLightboxOpen = lightboxIndex !== null;

  function goToSlide(index: number) {
    if (index === activeSlide) return;

    setDirection(index > activeSlide ? 1 : -1);
    setActiveSlide(index);
  }

  function nextSlide() {
    setDirection(1);

    setActiveSlide((current) =>
      current === totalSlides - 1 ? 0 : current + 1,
    );
  }

  function previousSlide() {
    setDirection(-1);

    setActiveSlide((current) =>
      current === 0 ? totalSlides - 1 : current - 1,
    );
  }

  function openLightbox(globalIndex: number) {
    setLightboxIndex(globalIndex);
  }

  function closeLightbox() {
    setLightboxIndex(null);
  }

  function nextLightboxImage() {
    setLightboxIndex((current) =>
      current === null ? current : (current + 1) % totalImages,
    );
  }

  function previousLightboxImage() {
    setLightboxIndex((current) =>
      current === null ? current : (current - 1 + totalImages) % totalImages,
    );
  }

  /*
   * Reset the loaded flag every time the lightbox target changes,
   * so the skeleton shows again for images that haven't rendered yet.
   */
  useEffect(() => {
    setIsLightboxImageLoaded(false);
  }, [lightboxIndex]);

  /*
   * Keyboard navigation — carousel when the lightbox is closed,
   * lightbox nav/close when it's open.
   */
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isLightboxOpen) {
        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowRight") nextLightboxImage();
        if (event.key === "ArrowLeft") previousLightboxImage();
        return;
      }

      if (event.key === "ArrowRight") {
        nextSlide();
      }

      if (event.key === "ArrowLeft") {
        previousSlide();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [totalSlides, isLightboxOpen, totalImages]);

  /*
   * Lock body scroll while the lightbox is open.
   */
  useEffect(() => {
    if (isLightboxOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [isLightboxOpen]);

  if (!slides.length) return null;

  return (
    <section
      id="gallery"
      className="relative isolate overflow-hidden bg-black py-20 sm:py-24 lg:py-32"
    >
      {/* ========================================================
          BACKGROUND
      ======================================================== */}

      <div
        aria-hidden
        className="pointer-events-none absolute -left-80 top-1/3 h-150 w-150 rounded-full bg-[#29B9F2]/[0.025] blur-[160px]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -right-80 bottom-0 h-150 w-150 rounded-full bg-[#25D9C7]/[0.025] blur-[160px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 sm:px-10 lg:px-16">
        {/* ======================================================
            BENTO CAROUSEL
        ====================================================== */}

        <div className="relative">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={activeSlide}
              custom={direction}
              initial={{
                opacity: 0,
                x: direction * 40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: direction * -40,
              }}
              transition={{
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <BentoGrid
                images={slides[activeSlide]}
                slideIndex={activeSlide}
                onImageClick={openLightbox}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ======================================================
            CAROUSEL CONTROLS
        ====================================================== */}

        <div className="mt-6 flex items-center justify-between">
          {/* Counter */}
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-xs font-medium tracking-[0.18em]"
              style={{
                color: "#29B9F2",
              }}
            >
              {String(activeSlide + 1).padStart(2, "0")}
            </span>

            <span className="h-px w-8 bg-white/10" />

            <span className="font-mono text-xs tracking-[0.18em] text-white/20">
              {String(totalSlides).padStart(2, "0")}
            </span>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to gallery slide ${index + 1}`}
                aria-current={activeSlide === index}
                onClick={() => goToSlide(index)}
                className="group flex h-8 items-center justify-center px-1"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-400 ${
                    activeSlide === index
                      ? "w-8"
                      : "w-1.5 bg-white/20 group-hover:bg-white/40"
                  }`}
                  style={
                    activeSlide === index
                      ? {
                          backgroundImage: BRAND_GRADIENT,
                        }
                      : undefined
                  }
                />
              </button>
            ))}
          </div>

          {/* Previous / Next */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous gallery slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/45 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next gallery slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/45 transition-all duration-300 hover:border-[#29B9F2]/30 hover:bg-[#29B9F2]/5 hover:text-[#29B9F2]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          SECTION DIVIDER
      ======================================================== */}

      <div
        className="absolute bottom-0 left-1/2 h-px w-[calc(100%-2rem)] max-w-[1450px] -translate-x-1/2"
        style={{
          backgroundImage: BRAND_GRADIENT,
          opacity: 0.1,
        }}
      />

      {/* ========================================================
          LIGHTBOX
      ======================================================== */}

      <AnimatePresence>
        {isLightboxOpen && lightboxIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close preview"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Counter */}
            <div
              className="absolute left-5 top-5 z-10 font-mono text-xs tracking-[0.18em] text-white/40"
              onClick={(event) => event.stopPropagation()}
            >
              {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
              {String(totalImages).padStart(2, "0")}
            </div>

            {/* Previous */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                previousLightboxImage();
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white sm:left-6"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                nextLightboxImage();
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white sm:right-6"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-4 h-[80vh] w-full max-w-5xl sm:mx-16"
              onClick={(event) => event.stopPropagation()}
            >
              {/* Skeleton loader */}
              {!isLightboxImageLoaded && (
                <div className="absolute inset-0 animate-pulse rounded-md bg-gradient-to-br from-white/[0.4] via-white/[0.03] to-transparent" />
              )}

              <Image
                src={galleryImages[lightboxIndex]}
                alt="Vectrae gallery preview"
                fill
                sizes="90vw"
                className={`object-contain transition-opacity duration-500 ${
                  isLightboxImageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setIsLightboxImageLoaded(true)}
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function BentoGrid({
  images,
  slideIndex,
  onImageClick,
}: {
  images: string[];
  slideIndex: number;
  onImageClick: (globalIndex: number) => void;
}) {
  const baseIndex = slideIndex * IMAGES_PER_SLIDE;

  return (
    <div
      className="
        grid
        grid-cols-2
        gap-2.5
        lg:grid-cols-12
        lg:grid-rows-[260px_260px_210px]
      "
    >
      {/* =======================================================
          LARGE FEATURE
      ======================================================= */}

      {images[0] && (
        <GalleryImage
          src={images[0]}
          alt="Vectrae office"
          onClick={() => onImageClick(baseIndex + 0)}
          className="
            col-span-2
            min-h-[360px]
            lg:col-span-4
            lg:row-span-2
            lg:min-h-0
          "
        />
      )}

      {/* =======================================================
          TOP RIGHT
      ======================================================= */}

      {images[1] && (
        <GalleryImage
          src={images[1]}
          alt="Vectrae office"
          onClick={() => onImageClick(baseIndex + 1)}
          className="
            col-span-2
            min-h-[220px]
            lg:col-span-4
            lg:min-h-0
          "
        />
      )}

      {images[2] && (
        <GalleryImage
          src={images[2]}
          alt="Vectrae team"
          onClick={() => onImageClick(baseIndex + 2)}
          className="
            col-span-2
            min-h-[220px]
            lg:col-span-4
            lg:min-h-0
          "
        />
      )}

      {/* =======================================================
          MIDDLE RIGHT
      ======================================================= */}

      {images[3] && (
        <GalleryImage
          src={images[3]}
          alt="Vectrae workspace"
          onClick={() => onImageClick(baseIndex + 3)}
          className="
            col-span-2
            min-h-[220px]
            lg:col-span-4
            lg:min-h-0
          "
        />
      )}

      {images[4] && (
        <GalleryImage
          src={images[4]}
          alt="Vectrae meeting room"
          onClick={() => onImageClick(baseIndex + 4)}
          className="
            col-span-2
            min-h-[220px]
            lg:col-span-4
            lg:min-h-0
          "
        />
      )}

      {/* =======================================================
          BOTTOM ROW
      ======================================================= */}

      {images[5] && (
        <GalleryImage
          src={images[5]}
          alt="Vectrae team"
          onClick={() => onImageClick(baseIndex + 5)}
          className="
            col-span-1
            min-h-[220px]
            lg:col-span-3
            lg:min-h-0
          "
        />
      )}

      {images[6] && (
        <GalleryImage
          src={images[6]}
          alt="Vectrae team event"
          onClick={() => onImageClick(baseIndex + 6)}
          className="
            col-span-1
            min-h-[220px]
            lg:col-span-3
            lg:min-h-0
          "
        />
      )}

      {images[7] && (
        <GalleryImage
          src={images[7]}
          alt="Vectrae office"
          onClick={() => onImageClick(baseIndex + 7)}
          className="
            col-span-1
            min-h-[220px]
            lg:col-span-3
            lg:min-h-0
          "
        />
      )}

      {images[8] && (
        <GalleryImage
          src={images[8]}
          alt="Vectrae collaboration"
          onClick={() => onImageClick(baseIndex + 8)}
          className="
            col-span-1
            min-h-[220px]
            lg:col-span-3
            lg:min-h-0
          "
        />
      )}
    </div>
  );
}

/* =============================================================
   IMAGE COMPONENT
============================================================= */

function GalleryImage({
  src,
  alt,
  className = "",
  onClick,
}: {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open preview: ${alt}`}
      className={`group relative overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#071014] text-left cursor-zoom-in ${className}`}
    >
      {/* Skeleton loader */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/[0.2] via-white/[0.02] to-transparent" />
      )}

      <Image
        src={src}
        alt={alt}
        fill
        sizes="
          (max-width: 640px) 50vw,
          (max-width: 1024px) 50vw,
          33vw
        "
        onLoad={() => setIsLoaded(true)}
        className={`
          object-cover
          transition-all
          duration-700
          ease-[cubic-bezier(0.16,1,0.3,1)]
          group-hover:scale-[1.045]
          ${isLoaded ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* Extremely subtle hover overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/[0.06]" />

      {/* Subtle Vectrae accent */}
      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-32
          w-32
          rounded-full
          bg-[#29B9F2]/10
          opacity-0
          blur-3xl
          transition-opacity
          duration-700
          group-hover:opacity-100
        "
      />

      {/* Hover border */}
      <div className="pointer-events-none absolute inset-0 rounded-[14px] border border-[#29B9F2]/0 transition-colors duration-500 group-hover:border-[#29B9F2]/20" />
    </button>
  );
}
