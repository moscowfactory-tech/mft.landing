"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type Testimonial = {
  title: string;
  tag: string;
  quote: string;
  src: string;
};

type Colors = {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
};

type FontSizes = {
  name?: string;
  designation?: string;
  quote?: string;
};

type CircularTestimonialsProps = {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
  onLearnMore?: (index: number) => void;
};

const calculateGap = (width: number) => {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) {
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  }
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
};

export const CircularTestimonials = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
  onLearnMore,
}: CircularTestimonialsProps) => {
  const colorName = colors.name ?? "#f9fafb";
  const colorDesignation = colors.designation ?? "#818cf8";
  const colorTestimony = colors.testimony ?? "#d1d5db";
  const colorArrowBg = colors.arrowBackground ?? "#18181b";
  const colorArrowFg = colors.arrowForeground ?? "#f9fafb";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#6366f1";

  const fontSizeName = fontSizes.name ?? "1.5rem";
  const fontSizeQuote = fontSizes.quote ?? "1.125rem";

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const testimonialsLength = useMemo(
    () => testimonials.length,
    [testimonials]
  );

  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex, testimonials]
  );

  useEffect(() => {
    const handleResize = () => {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const clearAutoplay = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!autoplay || testimonialsLength <= 1) {
      clearAutoplay();
      return;
    }
    autoplayIntervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    }, 5000);
    return () => {
      clearAutoplay();
    };
  }, [autoplay, testimonialsLength]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    clearAutoplay();
  }, [testimonialsLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    clearAutoplay();
  }, [testimonialsLength]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      }
      if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleNext, handlePrev]);

  const getImageStyle = (index: number): React.CSSProperties => {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive = index === activeIndex;
    const isLeft =
      (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: "translateX(0px) translateY(0px) scale(1) rotateY(0deg)",
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      transform: "translateX(0px) translateY(0px) scale(0.7) rotateY(0deg)",
    };
  };

  return (
    <div className="w-full max-w-5xl px-4 py-12">
      <div className="grid gap-12 md:grid-cols-2 md:items-start">
        {/* Image carousel */}
        <div
          className="relative w-full h-80 md:h-96"
          ref={imageContainerRef}
          style={{ perspective: "1000px" }}
        >
          {testimonials.map((testimonial, index) => (
            <img
              key={testimonial.src}
              src={testimonial.src}
              alt={testimonial.title}
              className="absolute h-full w-full rounded-3xl object-cover shadow-2xl shadow-black/60"
              style={getImageStyle(index)}
            />
          ))}
        </div>

        {/* Animated content */}
        <div className="flex flex-col justify-between gap-10 md:pt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-4"
            >
              <p
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: colorDesignation }}
              >
                {activeTestimonial.tag}
              </p>
              <h3
                className="font-semibold tracking-tight leading-tight"
                style={{ color: colorName, fontSize: fontSizeName }}
              >
                {activeTestimonial.title}
              </h3>
              <motion.p
                className="leading-relaxed"
                style={{ color: colorTestimony, fontSize: fontSizeQuote }}
              >
                {activeTestimonial.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.22,
                      ease: "easeInOut",
                      delay: 0.018 * i,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-4 pt-2">
            <button
              type="button"
              onClick={handlePrev}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Предыдущий кейс"
              style={{ backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 transition-colors duration-200"
            >
              <ArrowLeft size={18} color={colorArrowFg} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Следующий кейс"
              style={{ backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 transition-colors duration-200"
            >
              <ArrowRight size={18} color={colorArrowFg} />
            </button>

            {onLearnMore && (
              <button
                type="button"
                onClick={() => onLearnMore(activeIndex)}
                className="ml-1 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Подробнее →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularTestimonials;
