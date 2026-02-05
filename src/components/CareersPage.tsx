import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight, Users, Search, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CareerForm } from "./CareerForm";

interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string | null;
  requirements: string[] | null;
  created_at: string;
}

const departments = ["All Departments", "Front Office", "Food & Beverage", "Wellness", "Entertainment"];
const locations = ["All Locations", "Diamond - Marmaris", "Resort - Marmaris", "Sarıgerme"];

export function CareersPage() {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applyingForJob, setApplyingForJob] = useState<JobListing | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from("job_listings")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setJobs(data);
    }
    setLoading(false);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = 
      selectedDepartment === "All Departments" || job.department === selectedDepartment;
    const matchesLocation = 
      selectedLocation === "All Locations" || job.location === selectedLocation;
    
    return matchesSearch && matchesDepartment && matchesLocation;
  });

  const handleApply = (job: JobListing) => {
    setApplyingForJob(job);
    setShowApplicationForm(true);
  };

  const handleGeneralApply = () => {
    setApplyingForJob(null);
    setShowApplicationForm(true);
  };

  return (
    <section id="careers" className="section-padding bg-cream min-h-screen">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-champagne-dark text-sm tracking-[0.3em] uppercase mb-4">
            Careers
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Join the Nature
            <br />
            <span className="text-gradient-gold">Family</span>
          </h1>
          <div className="divider-gold" />
          <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
            At Green Nature Hotels, we believe our team members are the heart of our 
            hospitality. Discover your next career opportunity with us.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-background rounded-sm p-6 mb-8 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search positions..."
                className="w-full pl-12 pr-4 py-3 border border-border rounded-sm bg-background focus:border-champagne focus:outline-none transition-colors"
              />
            </div>

            {/* Department Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-border rounded-sm bg-background focus:border-champagne focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-border rounded-sm bg-background focus:border-champagne focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-5 h-5" />
            <span>{filteredJobs.length} position{filteredJobs.length !== 1 ? "s" : ""} available</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGeneralApply}
            className="btn-outline-luxury text-xs px-6 py-2 !border-forest !text-forest hover:!bg-forest hover:!text-ivory"
          >
            General Application
          </motion.button>
        </div>

        {/* Job Listings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Job Cards */}
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-2 border-champagne border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="bg-background rounded-sm p-12 text-center">
                <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-xl text-foreground mb-2">No positions found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filters, or submit a general application.
                </p>
                <button onClick={handleGeneralApply} className="btn-luxury">
                  Submit General Application
                </button>
              </div>
            ) : (
              filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedJob(job)}
                  className={`group bg-background border rounded-sm p-6 cursor-pointer transition-all duration-300 ${
                    selectedJob?.id === job.id
                      ? "border-champagne shadow-md"
                      : "border-border hover:border-champagne/50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full">
                          {job.department}
                        </span>
                        <span className="text-xs px-2 py-1 bg-champagne/10 text-champagne-dark rounded-full">
                          {job.type}
                        </span>
                      </div>
                      <h3 className="font-display text-xl text-foreground group-hover:text-forest transition-colors mb-2">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(job.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ x: 3 }}
                    >
                      <ArrowRight className="w-5 h-5 text-champagne-dark" />
                    </motion.div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Job Details Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <AnimatePresence mode="wait">
                {selectedJob ? (
                  <motion.div
                    key={selectedJob.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-background border border-border rounded-sm overflow-hidden"
                  >
                    <div className="bg-forest p-6">
                      <span className="text-champagne text-xs uppercase tracking-wider">
                        {selectedJob.department}
                      </span>
                      <h3 className="font-display text-2xl text-ivory mt-2">
                        {selectedJob.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-3 text-ivory/80 text-sm">
                        <MapPin className="w-4 h-4" />
                        {selectedJob.location}
                      </div>
                    </div>

                    <div className="p-6 space-y-6">
                      {selectedJob.description && (
                        <div>
                          <h4 className="font-display text-lg text-foreground mb-2">
                            About the Role
                          </h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {selectedJob.description}
                          </p>
                        </div>
                      )}

                      {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                        <div>
                          <h4 className="font-display text-lg text-foreground mb-3">
                            Requirements
                          </h4>
                          <ul className="space-y-2">
                            {selectedJob.requirements.map((req, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <div className="w-1.5 h-1.5 bg-champagne rounded-full mt-2 flex-shrink-0" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleApply(selectedJob)}
                        className="btn-luxury w-full"
                      >
                        Apply for This Position
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-secondary/50 rounded-sm p-8 text-center"
                  >
                    <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h4 className="font-display text-lg text-foreground mb-2">
                      Select a Position
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Click on a job listing to see more details and apply
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-forest-dark rounded-sm p-12 text-center"
        >
          <h3 className="font-display text-3xl text-ivory mb-4">
            Why Join Green Nature?
          </h3>
          <p className="text-ivory/70 max-w-2xl mx-auto mb-10">
            We offer more than just a job – we offer a career in one of Turkey's most 
            beautiful destinations with world-class hospitality standards.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { title: "Competitive Salary", desc: "Above-market compensation" },
              { title: "Free Meals", desc: "Staff dining facilities" },
              { title: "Career Growth", desc: "Training & development" },
              { title: "Staff Housing", desc: "Accommodation available" },
            ].map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="w-12 h-12 rounded-full bg-champagne/20 flex items-center justify-center mx-auto mb-3">
                  <div className="w-3 h-3 bg-champagne rounded-full" />
                </div>
                <h4 className="font-display text-ivory mb-1">{benefit.title}</h4>
                <p className="text-ivory/60 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Application Form Modal */}
      <AnimatePresence>
        {showApplicationForm && (
          <CareerForm
            jobId={applyingForJob?.id}
            jobTitle={applyingForJob?.title}
            onClose={() => {
              setShowApplicationForm(false);
              setApplyingForJob(null);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
