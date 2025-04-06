import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import Logo from "/logo-white.png";
import Spinner from "/spinner.gif";
import { useNavigate } from "react-router-dom";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", whatsapp: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("whatsapp", formData.whatsapp);

    try {
      const response = await fetch("https://formspree.io/f/xovepqgk", {
        method: "POST",
        body: formDataToSend,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", whatsapp: "" });
        navigate("/success");
        localStorage.setItem("formSubmitted", "true");
        navigate("/success", { replace: true });
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("formSubmitted") === "true") {
      navigate("/success", { replace: true });
    }
  }, [navigate]);

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
          <div className="w-32 sm:w-40 h-14 sm:h-16 relative flex items-center justify-center rounded-md overflow-hidden">
            {!logoLoaded && (
              <img
                src={Spinner}
                alt="Loading..."
                className="w-full h-full object-contain"
              />
            )}
            <img
              src={Logo}
              alt="Logo"
              onLoad={() => setLogoLoaded(true)}
              style={{ display: logoLoaded ? "block" : "none" }}
              className="w-full h-full object-contain absolute top-0 left-0"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            disabled={loading}
            className="w-full bg-[#fd7f0c] hover:bg-[#5a55c7] text-white font-semibold text-base sm:text-lg py-3 rounded-full transition flex justify-center items-center animate-bounce"
          >
            {loading ? "Sending..." : "SEND"}{" "}
            <span className="ml-2 text-xl">→</span>
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
      </motion.div>
    </div>
  );
}
