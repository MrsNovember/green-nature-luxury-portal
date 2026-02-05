import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Leaf, Phone, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const properties = [
  { id: "diamond", name: "Diamond", location: "Marmaris" },
  { id: "resort", name: "Resort", location: "Marmaris" },
  { id: "sarigerme", name: "Sarıgerme", location: "Dalyan" },
];

const languages = [
  { code: "en", name: "English" },
  { code: "tr", name: "Türkçe" },
  { code: "de", name: "Deutsch" },
  { code: "ru", name: "Русский" },
];

const navLinks = [
  { name: "Accommodations", href: "#accommodations" },
  { name: "Experiences", href: "#experiences" },
  { name: "Dining", href: "#dining" },
  { name: "Spa & Wellness", href: "#spa" },
  { name: "Careers", href: "#careers" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPropertyDropdownOpen, setIsPropertyDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(properties[0]);
  const [selectedLang, setSelectedLang] = useState(languages[0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-midnight/95 backdrop-blur-lg shadow-lg py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                className="w-10 h-10 rounded-full bg-champagne flex items-center justify-center"
              >
                <Leaf className="w-5 h-5 text-forest-dark" />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-display text-xl text-ivory tracking-wide">
                  Green Nature
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-champagne">
                  Hotels & Resorts
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {/* Property Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsPropertyDropdownOpen(!isPropertyDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 border border-champagne/30 rounded-sm hover:border-champagne transition-colors"
                >
                  <span className="text-champagne text-sm font-medium">
                    {selectedProperty.name}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-champagne transition-transform ${isPropertyDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isPropertyDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-midnight/95 backdrop-blur-lg border border-champagne/20 rounded-sm overflow-hidden"
                    >
                      {properties.map((property) => (
                        <button
                          key={property.id}
                          onClick={() => {
                            setSelectedProperty(property);
                            setIsPropertyDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                            selectedProperty.id === property.id
                              ? "bg-champagne/20 text-champagne"
                              : "text-ivory hover:bg-champagne/10"
                          }`}
                        >
                          <span className="block font-medium">{property.name}</span>
                          <span className="block text-xs text-stone">{property.location}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Nav Links */}
              {navLinks.slice(0, 4).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="nav-link text-ivory/90 hover:text-champagne"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center gap-2 text-ivory/80 hover:text-champagne transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">{selectedLang.code.toUpperCase()}</span>
                </button>
                
                <AnimatePresence>
                  {isLangDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-32 bg-midnight/95 backdrop-blur-lg border border-champagne/20 rounded-sm overflow-hidden"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setSelectedLang(lang);
                            setIsLangDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                            selectedLang.code === lang.code
                              ? "bg-champagne/20 text-champagne"
                              : "text-ivory hover:bg-champagne/10"
                          }`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Phone */}
              <a href="tel:+902526002000" className="flex items-center gap-2 text-ivory/80 hover:text-champagne transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+90 252 600 2000</span>
              </a>

              {/* Book Now Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-luxury"
              >
                Book Now
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-ivory"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-forest-dark lg:hidden"
          >
            <div className="flex flex-col h-full pt-24 px-8">
              {/* Property Selector */}
              <div className="mb-8">
                <p className="text-champagne text-xs uppercase tracking-widest mb-4">Select Property</p>
                <div className="flex flex-col gap-2">
                  {properties.map((property) => (
                    <button
                      key={property.id}
                      onClick={() => setSelectedProperty(property)}
                      className={`px-4 py-3 text-left border rounded-sm transition-colors ${
                        selectedProperty.id === property.id
                          ? "border-champagne bg-champagne/10 text-ivory"
                          : "border-ivory/20 text-ivory/70"
                      }`}
                    >
                      <span className="block font-display text-lg">{property.name}</span>
                      <span className="block text-xs text-stone">{property.location}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-display text-2xl text-ivory hover:text-champagne transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>

              {/* Language & CTA */}
              <div className="mt-auto pb-8">
                <div className="flex gap-4 mb-6">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLang(lang)}
                      className={`text-sm ${
                        selectedLang.code === lang.code
                          ? "text-champagne"
                          : "text-ivory/60"
                      }`}
                    >
                      {lang.code.toUpperCase()}
                    </button>
                  ))}
                </div>
                <button className="btn-luxury w-full">
                  Book Your Stay
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
