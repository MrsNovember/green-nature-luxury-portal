import { motion } from "framer-motion";
import { 
  Leaf, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  Send
} from "lucide-react";
import { useState } from "react";

const properties = [
  {
    name: "Diamond",
    address: "İçmeler Mah. Kayabal Cad. No:1, 48720 Marmaris, Muğla",
    phone: "+90 252 455 5000",
  },
  {
    name: "Resort",
    address: "Siteler Mah. 151 Sok. No:15, 48700 Marmaris, Muğla",
    phone: "+90 252 417 6000",
  },
  {
    name: "Sarıgerme",
    address: "Sarıgerme Mah. Sarıgerme Cad. No:8, 48600 Ortaca, Muğla",
    phone: "+90 252 286 8000",
  },
];

const quickLinks = [
  { name: "About Us", href: "#about" },
  { name: "Our Properties", href: "#accommodations" },
  { name: "Experiences", href: "#experiences" },
  { name: "Dining", href: "#dining" },
  { name: "Spa & Wellness", href: "#spa" },
  { name: "Meetings & Events", href: "#events" },
  { name: "Careers", href: "#careers" },
  { name: "Press Room", href: "#press" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "#privacy" },
  { name: "Terms & Conditions", href: "#terms" },
  { name: "Cookie Policy", href: "#cookies" },
  { name: "Accessibility", href: "#accessibility" },
];

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription
    setEmail("");
  };

  return (
    <footer id="contact" className="bg-midnight text-ivory">
      {/* Newsletter Section */}
      <div className="border-b border-ivory/10">
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <p className="text-champagne text-sm tracking-[0.3em] uppercase mb-4">
              Stay Connected
            </p>
            <h3 className="font-display text-3xl md:text-4xl mb-6">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-ivory/60 mb-8">
              Be the first to receive exclusive offers, travel inspiration, and news from Green Nature Hotels.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ivory/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-ivory/5 border border-ivory/20 rounded-sm py-4 pl-12 pr-4 text-ivory placeholder:text-ivory/40 focus:border-champagne focus:outline-none transition-colors"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn-luxury flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-champagne flex items-center justify-center">
                <Leaf className="w-5 h-5 text-forest-dark" />
              </div>
              <div>
                <span className="font-display text-xl block">Green Nature</span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-champagne">Hotels & Resorts</span>
              </div>
            </div>
            <p className="text-ivory/60 text-sm leading-relaxed mb-6">
              Where the soul of Marmaris meets Mediterranean luxury. Three unique properties, 
              one commitment to exceptional hospitality.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full border border-ivory/20 flex items-center justify-center hover:border-champagne hover:bg-champagne/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Properties Column */}
          <div>
            <h4 className="font-display text-lg mb-6 text-champagne">Our Properties</h4>
            <div className="space-y-6">
              {properties.map((property) => (
                <div key={property.name} className="space-y-2">
                  <h5 className="font-medium">Green Nature {property.name}</h5>
                  <p className="text-ivory/50 text-xs flex items-start gap-2">
                    <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    {property.address}
                  </p>
                  <a 
                    href={`tel:${property.phone}`}
                    className="text-ivory/50 text-xs flex items-center gap-2 hover:text-champagne transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    {property.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg mb-6 text-champagne">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-ivory/60 text-sm hover:text-champagne transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Map */}
          <div>
            <h4 className="font-display text-lg mb-6 text-champagne">Find Us</h4>
            <div className="aspect-square rounded-sm overflow-hidden bg-ivory/5 mb-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25592.13073657547!2d28.25!3d36.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c0447a7a9d6d3d%3A0x4f3c0f2c9e8b7a6d!2sMarmaris%2C%20Mu%C4%9Fla%2C%20Turkey!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Green Nature Hotels Location"
              />
            </div>
            <p className="text-ivory/50 text-xs">
              Marmaris, on the turquoise coast of southwestern Turkey
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ivory/10">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-ivory/40 text-xs">
              © 2025 Green Nature Hotels. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {legalLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-ivory/40 text-xs hover:text-champagne transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
