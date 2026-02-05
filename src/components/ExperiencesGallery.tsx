import { motion } from "framer-motion";
import { Sparkles, UtensilsCrossed, TreePine } from "lucide-react";
import spaImage from "@/assets/experience-spa.jpg";
import gastronomyImage from "@/assets/experience-gastronomy.jpg";
import natureImage from "@/assets/experience-nature.jpg";

const experiences = [
  {
    id: "spa",
    title: "Spa & Wellness",
    subtitle: "Rejuvenation",
    description: "Indulge in ancient Turkish hammam traditions and modern wellness therapies at our award-winning spa facilities.",
    image: spaImage,
    icon: Sparkles,
    features: ["Turkish Hammam", "Signature Treatments", "Yoga & Meditation"],
  },
  {
    id: "gastronomy",
    title: "Gastronomy",
    subtitle: "Culinary Arts",
    description: "Savor the finest Mediterranean cuisine crafted by our executive chefs using locally-sourced ingredients.",
    image: gastronomyImage,
    icon: UtensilsCrossed,
    features: ["Fine Dining", "Aegean Cuisine", "Wine Cellar"],
  },
  {
    id: "nature",
    title: "Nature & Adventure",
    subtitle: "Exploration",
    description: "Discover the breathtaking natural beauty of the Turkish coast through curated excursions and activities.",
    image: natureImage,
    icon: TreePine,
    features: ["Hiking Trails", "Boat Excursions", "Water Sports"],
  },
];

export function ExperiencesGallery() {
  return (
    <section id="experiences" className="section-padding bg-forest-dark">
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
            The Gallery of
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ivory mb-6">
            Experiences
          </h2>
          <div className="divider-gold" />
          <p className="text-ivory/70 max-w-2xl mx-auto mt-6">
            Every moment at Green Nature Hotels is crafted to create unforgettable memories 
            that connect you with the soul of Marmaris.
          </p>
        </motion.div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                {/* Image */}
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Default Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-forest-dark/95 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center p-8 text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="mb-4"
                  >
                    <experience.icon className="w-10 h-10 text-champagne" />
                  </motion.div>
                  <p className="text-ivory/90 text-sm leading-relaxed mb-6">
                    {experience.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {experience.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs px-3 py-1 border border-champagne/30 text-champagne rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <button className="btn-outline-luxury mt-8 text-xs px-6 py-3">
                    Discover More
                  </button>
                </div>

                {/* Default Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transition-opacity duration-500 group-hover:opacity-0">
                  <p className="text-champagne text-xs tracking-[0.2em] uppercase mb-2">
                    {experience.subtitle}
                  </p>
                  <h3 className="font-display text-2xl text-ivory">
                    {experience.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
