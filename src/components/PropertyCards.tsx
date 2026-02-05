import { motion } from "framer-motion";
import { ArrowRight, Star, MapPin } from "lucide-react";
import diamondImage from "@/assets/property-diamond.jpg";
import resortImage from "@/assets/property-resort.jpg";
import sarigermeImage from "@/assets/property-sarigerme.jpg";

const properties = [
  {
    id: "diamond",
    name: "Diamond",
    tagline: "Urban Elegance",
    description: "A sophisticated retreat in the heart of Marmaris, where contemporary luxury meets timeless Turkish hospitality.",
    image: diamondImage,
    features: ["Adults Only", "Rooftop Lounge", "City Views"],
    rating: 4.9,
  },
  {
    id: "resort",
    name: "Resort",
    tagline: "Family Paradise",
    description: "An all-inclusive beachfront haven perfect for families seeking endless entertainment and relaxation.",
    image: resortImage,
    features: ["All Inclusive", "Private Beach", "Kids Club"],
    rating: 4.8,
  },
  {
    id: "sarigerme",
    name: "Sarıgerme",
    tagline: "Nature's Embrace",
    description: "An intimate eco-resort tucked away in pristine nature, offering serenity and sustainable luxury.",
    image: sarigermeImage,
    features: ["Eco-Friendly", "Spa Retreat", "Nature Trails"],
    rating: 4.9,
  },
];

export function PropertyCards() {
  return (
    <section id="accommodations" className="section-padding bg-background">
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
            Our Properties
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Three Unique <span className="text-gradient-gold">Experiences</span>
          </h2>
          <div className="divider-gold" />
          <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
            Each Green Nature property offers its own distinct character while sharing our 
            commitment to exceptional service and sustainable luxury.
          </p>
        </motion.div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-sm mb-6">
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={property.image}
                    alt={`Green Nature ${property.name}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Overlay */}
                <div className="image-overlay flex flex-col justify-end p-6">
                  <p className="text-ivory/90 text-sm mb-4">{property.description}</p>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-champagne text-sm font-medium"
                  >
                    Explore Property
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-midnight/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 text-champagne fill-champagne" />
                  <span className="text-ivory text-sm">{property.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="px-2">
                <p className="text-champagne text-xs tracking-[0.2em] uppercase mb-2">
                  {property.tagline}
                </p>
                <h3 className="font-display text-2xl text-foreground mb-3 group-hover:text-forest transition-colors">
                  Green Nature {property.name}
                </h3>
                
                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {property.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.id === "sarigerme" ? "Dalyan, Turkey" : "Marmaris, Turkey"}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
