import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, MapPin, Search } from "lucide-react";
import heroImage from "@/assets/hero-resort.jpg";

export function Hero() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [property, setProperty] = useState("all");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={heroImage}
          alt="Green Nature Hotels Resort"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-32 pb-40">
        <div className="max-w-4xl mx-auto text-center">
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-champagne text-sm md:text-base tracking-[0.3em] uppercase mb-6"
          >
            Welcome to Marmaris
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-ivory leading-tight mb-6"
          >
            Where Nature
            <br />
            <span className="text-gradient-gold">Meets Luxury</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-ivory/80 text-lg md:text-xl max-w-2xl mx-auto mb-4"
          >
            Experience the essence of Mediterranean hospitality at our three 
            exceptional properties nestled along the Turkish Riviera.
          </motion.p>

          {/* Decorative Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="divider-gold my-8"
          />
        </div>

        {/* Booking Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="max-w-5xl mx-auto mt-8"
        >
          <div className="bg-midnight/80 backdrop-blur-xl border border-champagne/20 rounded-sm p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
              {/* Property */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-champagne text-xs uppercase tracking-wider">
                  <MapPin className="w-3 h-3" />
                  Property
                </label>
                <select
                  value={property}
                  onChange={(e) => setProperty(e.target.value)}
                  className="w-full bg-transparent border-b border-ivory/30 pb-2 text-ivory focus:border-champagne focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="all" className="bg-midnight">All Properties</option>
                  <option value="diamond" className="bg-midnight">Diamond</option>
                  <option value="resort" className="bg-midnight">Resort</option>
                  <option value="sarigerme" className="bg-midnight">Sarıgerme</option>
                </select>
              </div>

              {/* Check In */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-champagne text-xs uppercase tracking-wider">
                  <Calendar className="w-3 h-3" />
                  Check In
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-transparent border-b border-ivory/30 pb-2 text-ivory focus:border-champagne focus:outline-none transition-colors cursor-pointer"
                />
              </div>

              {/* Check Out */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-champagne text-xs uppercase tracking-wider">
                  <Calendar className="w-3 h-3" />
                  Check Out
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-transparent border-b border-ivory/30 pb-2 text-ivory focus:border-champagne focus:outline-none transition-colors cursor-pointer"
                />
              </div>

              {/* Guests */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-champagne text-xs uppercase tracking-wider">
                  <Users className="w-3 h-3" />
                  Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-transparent border-b border-ivory/30 pb-2 text-ivory focus:border-champagne focus:outline-none transition-colors cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num} className="bg-midnight">
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-luxury flex items-center justify-center gap-2 h-full"
              >
                <Search className="w-4 h-4" />
                <span>Check Availability</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-champagne/50 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-champagne rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
