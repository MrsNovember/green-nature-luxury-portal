import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight, Users } from "lucide-react";

const jobOpenings = [
  {
    id: 1,
    title: "Guest Relations Manager",
    department: "Front Office",
    location: "Diamond - Marmaris",
    type: "Full-time",
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Executive Chef",
    department: "Food & Beverage",
    location: "Resort - Marmaris",
    type: "Full-time",
    posted: "1 week ago",
  },
  {
    id: 3,
    title: "Spa Therapist",
    department: "Wellness",
    location: "Sarıgerme",
    type: "Full-time",
    posted: "3 days ago",
  },
  {
    id: 4,
    title: "Activities Coordinator",
    department: "Entertainment",
    location: "Resort - Marmaris",
    type: "Seasonal",
    posted: "5 days ago",
  },
];

const benefits = [
  "Competitive salary & bonuses",
  "Free staff meals",
  "Career development",
  "Staff accommodation",
];

export function CareerSection() {
  return (
    <section id="careers" className="section-padding bg-cream">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-champagne-dark text-sm tracking-[0.3em] uppercase mb-4">
              Careers
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              Join the Nature
              <br />
              <span className="text-gradient-gold">Family</span>
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-champagne-dark to-champagne mb-8" />
            
            <p className="text-muted-foreground leading-relaxed mb-8">
              At Green Nature Hotels, we believe our team members are the heart of our 
              hospitality. We're looking for passionate individuals who share our 
              commitment to excellence and creating unforgettable guest experiences.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              <h3 className="font-display text-xl text-foreground">Why Work With Us</h3>
              <div className="grid grid-cols-2 gap-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-champagne rounded-full" />
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-luxury"
            >
              View All Positions
            </motion.button>
          </motion.div>

          {/* Right - Job Listings */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-champagne-dark" />
                <span className="font-medium text-foreground">Open Positions</span>
              </div>
              <span className="text-sm text-muted-foreground">{jobOpenings.length} opportunities</span>
            </div>

            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group bg-background border border-border rounded-sm p-6 hover:border-champagne transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-4 h-4 text-champagne-dark" />
                      <span className="text-xs text-muted-foreground">{job.department}</span>
                    </div>
                    <h4 className="font-display text-lg text-foreground group-hover:text-forest transition-colors">
                      {job.title}
                    </h4>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs text-muted-foreground">{job.posted}</span>
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ x: 3 }}
                    >
                      <ArrowRight className="w-5 h-5 text-champagne-dark" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
