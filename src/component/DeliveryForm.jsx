import { useState } from "react";
import { toast } from "react-toastify";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaTimes,
} from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const DeliveryForm = ({ setIsVisible, onFormCompletion }) => {
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone1: "",
    phone2: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Nigeria",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isComplete = Object.values(formData).every(
      (field) => field.trim() !== ""
    );

    if (!isComplete) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    toast.success("Delivery information submitted successfully!");
    onFormCompletion(true, formData.email); // Notify parent that the form is complete
    setIsVisible(false); // Close the form
  };

  return (
    <div className="w-full max-w-2xl p-8 md:p-12 bg-white shadow-2xl rounded-lg relative mx-auto border border-gray-300 overflow-y-auto">
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-4 right-4 bg-slate-800 text-white hover:text-gray-200 transition duration-300 p-2 rounded-full"
      >
        <FaTimes size={20} />
      </button>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        Delivery Information
      </h2>
      <p className="text-sm text-gray-600 mb-8 text-center">
        Please provide accurate delivery details. Note: The price paid on the
        site covers only the item cost. Delivery charges are separate; our team
        will contact you regarding delivery fees.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb9b40] text-gray-800 placeholder-gray-200 transition duration-300"
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <FaEnvelope />
            </span>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb9b40] text-gray-800 placeholder-gray-200 transition duration-300"
              placeholder="you@example.com"
            />
          </div>
        </div>

        {/* Phone Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number 1<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FaPhoneAlt />
              </span>
              <input
                type="tel"
                name="phone1"
                value={formData.phone1}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb9b40] text-gray-800 placeholder-gray-200 transition duration-300"
                placeholder="08012345678"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number 2<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FaPhoneAlt />
              </span>
              <input
                type="tel"
                name="phone2"
                value={formData.phone2}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb9b40] text-gray-800 placeholder-gray-200 transition duration-300"
                placeholder="08087654321"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Street Address<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <FaMapMarkerAlt />
            </span>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb9b40] text-gray-800 placeholder-gray-200 transition duration-300"
              placeholder="123 Main St."
            />
          </div>
        </div>

        {/* City, State, Postal Code */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb9b40] text-gray-800 placeholder-gray-200 transition duration-300"
              placeholder="City"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb9b40] text-gray-800 placeholder-gray-200 transition duration-300"
              placeholder="State"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Postal Code<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb9b40] text-gray-800 placeholder-gray-200 transition duration-300"
              placeholder="Postal Code"
            />
          </div>
        </div>

        {/* Country (Read-only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            readOnly
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed text-gray-600"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-[#eb9b40] hover:bg-[#d88a32] text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Submit Delivery Info
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeliveryForm;
