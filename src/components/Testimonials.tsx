import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Isabella Martinez",
    location: "London, UK",
    text: "An absolutely breathtaking experience. The attention to detail at Green Nature Diamond exceeded every expectation. The staff made us feel like royalty from the moment we arrived.",
    property: "Diamond",
    rating: 5,
    date: "January 2025",
  },
  {
    id: 2,
    name: "Hans & Greta Weber",
    location: "Munich, Germany",
    text: "Our family has visited many resorts around the Mediterranean, but Green Nature Resort stands apart. The kids club is exceptional, and we finally got the relaxation we needed.",
    property: "Resort",
    rating: 5,
    date: "December 2024",
  },
  {
    id: 3,
    name: "Alexei Volkov",
    location: "Moscow, Russia",
    text: "Sarıgerme is a hidden gem. The connection to nature, the sustainable practices, and the absolute tranquility made this the perfect escape from city life.",
    property: "Sarıgerme",
    rating: 5,
    date: "November 2024",
  },
  {
    id: 4,
    name: "Sophie Laurent",
    location: "Paris, France",
    text: "The spa experience was transformative. After a week at Green Nature, I returned home feeling completely renewed. The Turkish hammam ritual is not to be missed.",
    property: "Diamond",
    rating: 5,
    date: "October 2024",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-champagne text-sm tracking-[0.3em] uppercase mb-4">
            Guest Stories
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            What They Say
          </h2>
          <div className="divider-gold" />
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 z-10"
          >
            <div className="w-16 h-16 rounded-full bg-champagne flex items-center justify-center">
              <Quote className="w-8 h-8 text-midnight" />
            </div>
          </motion.div>

          {/* Card */}
          <div className="bg-secondary/50 rounded-sm pt-16 pb-12 px-8 md:px-16 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-champagne fill-champagne" />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-display text-xl md:text-2xl text-foreground leading-relaxed mb-8">
                  "{testimonials[currentIndex].text}"
                </p>

                {/* Author */}
                <div>
                  <p className="font-display text-lg text-foreground">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {testimonials[currentIndex].location}
                  </p>
                  <p className="text-champagne text-xs mt-2">
                    Green Nature {testimonials[currentIndex].property} • {testimonials[currentIndex].date}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 md:-mx-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prev}
                className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:border-champagne hover:text-champagne transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={next}
                className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:border-champagne hover:text-champagne transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-champagne"
                    : "bg-muted hover:bg-champagne/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
