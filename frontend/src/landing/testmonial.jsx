import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import img from "../assets/bil.jpeg";

const testimonials = [
  { 
    id: 1, 
    name: "Eteng", 
    role: "Frontend Developer", 
    image: img, 
    text: "The 30 Days of Code Challenge With VickyJay helped me stay consistent. Building and posting my progress daily boosted my confidence as a developer!" 
  },
  { 
    id: 2, 
    name: "Eten", 
    role: "Software Engineer", 
    image: img, 
    text: "This challenge pushed me to code every day. The feedback I got from the community helped me refine my React projects and grow as a developer." 
  },
  { 
    id: 3, 
    name: "Anthony", 
    role: "Full Stack Developer", 
    image: img, 
    text: "Posting my projects daily kept me accountable. I improved my backend skills and learned how to structure APIs more efficiently." 
  },
  { 
    id: 4, 
    name: "Dominic", 
    role: "Mobile App Developer", 
    image: img, 
    text: "Through this challenge, I built my first mobile app in React Native. Sharing my progress daily kept me motivated to complete it!" 
  },
  { 
    id: 5, 
    name: "Grace", 
    role: "UI/UX Designer & Developer", 
    image: img, 
    text: "The challenge pushed me to turn my UI designs into functional web pages. Seeing my progress over 30 days was so rewarding!" 
  },
  { 
    id: 6, 
    name: "Samuel", 
    role: "AI & ML Enthusiast", 
    image: img, 
    text: "I used the 30 Days of Code Challenge to explore Python and AI. Sharing my progress on the platform helped me stay motivated and improve." 
  },
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerScreen, setItemsPerScreen] = useState(3); 

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) { // Mobile
        setItemsPerScreen(1);
      } else if (width < 1024) { // Tablet
        setItemsPerScreen(2);
      } else { // Laptop/desktop
        setItemsPerScreen(3);
      }
    };

    updateScreenSize(); 
    window.addEventListener("resize", updateScreenSize); 

    return () => window.removeEventListener("resize", updateScreenSize); 
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Ensure the testimonials always display in sets of `itemsPerScreen`
  const displayedTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerScreen);

  return (
    <div className="py-12 pb-20 text-center bg-black font-grotesk overflow-hidden">
      <h2 className="lg:text-2xl text-md text-white font-bold pb-8">What Our Users Say</h2>
      <div className="relative max-w-6xl mx-auto px-4 pt-4 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className={`grid gap-6 ${itemsPerScreen === 1 ? "grid-cols-1" : itemsPerScreen === 2 ? "grid-cols-2" : "grid-cols-3"}`}
          >
            {displayedTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className="p-6 bg-white shadow-md shadow-blue-900 rounded-2xl relative h-60 md:h-80 lg:h-60"
              >
                <FaQuoteLeft className="absolute top-4 left-4 text-gray-300 text-md" />
                <p className="text-gray-700 text-md italic px-4 mb-3 pb-8">{testimonial.text}</p>
                <FaQuoteRight className="absolute bottom-12 right-4 text-gray-300 text-md" />
                <div className="flex items-center gap-3 mt-4 absolute bottom-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full shadow-lg"
                  />
                  <div>
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-gray-500 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}