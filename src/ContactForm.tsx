import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import Logo from "./assets/logo-white-min.png";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", whatsapp: "" });

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", email: "", whatsapp: "" };

    if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
      valid = false;
    }

    if (!formData.email.includes("@") || !formData.email.endsWith(".com")) {
      newErrors.email = "Email must be valid and end with .com";
      valid = false;
    }

    if (!/^\d{11}$/.test(formData.whatsapp)) {
      newErrors.whatsapp = "Must be a valid phone number";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (!validate()) {
      e.preventDefault();
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-[30px] shadow-xl px-6 sm:px-10 py-8 sm:py-10 w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-32 sm:w-40 h-14 sm:h-16 relative">
            <img
              src={Logo}
              alt="Logo"
              loading="lazy"
              className="w-full h-full object-contain absolute top-0 left-0"
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          action="https://formspree.io/f/xovepqgk"
          method="POST"
          className="space-y-4"
        >
          {/* Name */}
          <div className="relative">
            <div className="flex items-center bg-[#f0f2f5] rounded-full px-5 py-3">
              <FaUser className="text-gray-400 mr-3" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="bg-transparent w-full focus:outline-none"
                required
              />
            </div>
            <div className="text-sm text-red-500 h-4 mt-1">{errors.name}</div>
          </div>

          {/* Email */}
          <div className="relative">
            <div className="flex items-center bg-[#f0f2f5] rounded-full px-5 py-3">
              <FaEnvelope className="text-gray-400 mr-3" />
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent w-full focus:outline-none"
                required
              />
            </div>
            <div className="text-sm text-red-500 h-4 mt-1">{errors.email}</div>
          </div>

          {/* WhatsApp */}
          <div className="relative">
            <div className="flex items-center bg-[#f0f2f5] rounded-full px-5 py-3">
              <FaPhone className="text-gray-400 mr-3" />
              <input
                type="text"
                name="whatsapp"
                placeholder="Phone"
                maxLength={11}
                value={formData.whatsapp}
                onChange={handleChange}
                className="bg-transparent w-full focus:outline-none"
                required
              />
            </div>
            <div className="text-sm text-red-500 h-4 mt-1">
              {errors.whatsapp}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#fd7f0c] hover:bg-[#5a55c7] text-white font-semibold text-base sm:text-lg py-3 rounded-full transition flex justify-center items-center animate-bounce"
          >
            SEND <span className="ml-2 text-xl">→</span>
          </button>

          {/* Sent Message */}
          {submitted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-green-600 text-center"
            >
              SENT
            </motion.p>
          )}
        </form>

        {/* Decorative elements */}
        <div className=" absolute top-10 left-5 w-3 h-3 bg-yellow-300 rounded-full" />
        <div className=" absolute bottom-5 right-5 w-3 h-3 bg-yellow-300 rounded-full" />
        <div className=" absolute top-[40%] left-2 w-2 h-2 bg-black rotate-45" />
        <div className=" absolute bottom-[40%] right-2 w-2 h-2 bg-black rotate-45" />
        <div className=" absolute top-4 right-[0%] text-4xl text-blue-300">
          +
        </div>
        <div className=" absolute bottom-4 left-[0%] text-4xl text-blue-300">
          +
        </div>

        {/* Extra shapes */}
        <div className=" absolute top-16 right-8 w-4 h-4 bg-red-300 rounded-full animate-ping" />
        {/* <div className=" absolute top-20 left-5 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[17px] border-l-transparent border-r-transparent border-b-orange-400" /> */}
      </motion.div>
    </div>
  );
}
