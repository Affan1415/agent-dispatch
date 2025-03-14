"use client";
import BlurredCircle from "@/components/BlurredCircle";
import { supabase } from "@/utils/supabase";
import React, { useState } from "react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business_name: "",
    features: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.from("contact_us_table").insert([
      {
        name: formData.name,
        email: formData.email,
        business_name: formData.business_name,
        features: formData.features,
        description: formData.description,
      },
    ]);

    if (error) {
      setMessage("Error submitting form. Please try again.");
      console.error(error);
    } else {
      setMessage("Form submitted successfully!");
      setFormData({
        name: "",
        email: "",
        business_name: "",
        features: "",
        description: "",
      });
    }

    setLoading(false);
  };
  return (
    <div className="flex flex-col items-center bg-black px-4 py-10 relative">
      <div className="absolute left-0 opacity-[0.8]  ">
        <BlurredCircle />
      </div>
      <div className="absolute right-0 opacity-[0.8] scale-x-[-1]  ">
        <BlurredCircle />
      </div>
      <div className="w-full max-w-screen-xl mx-auto z-50">
        {/* Main Content */}
        <div className="text-center flex items-center justify-center w-full flex-col gap-4">
          <h2 className="text-2xl md:text-3xl font-normal text-white">
            Custom AI Agent - Tailored to Your Needs
          </h2>
          <p className="mt-2 text-base md:text-lg font-normal text-[#ADADAD] max-w-3xl text-center">
            Need an AI agent built specifically for your business? Tell us what
            you need, and we’ll create a custom AI assistant designed to fit
            your exact workflow.
          </p>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-t  from-blue-800/10 to-purple-900/10 border border-teal-100/10 p-8 w-full max-w-[846px] mx-auto"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white text-center">
            Let’s Build Your AI
          </h3>
          <p className="mt-2 text-base md:text-lg font-normal text-[#D7D7D7]/80 text-center">
            Fill out the form below, and our team will reach out to discuss your
            requirements.
          </p>

          {/* Form Fields */}
          <div className="mt-6 w-full flex flex-col gap-6">
            {/* Two-column layout for Name & Email */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Name */}
              <div className="flex flex-col w-full">
                <label className="text-base md:text-lg text-white mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="h-16 w-full rounded-xl bg-white/10 px-4 text-white placeholder-[#6B7274] outline-none"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col w-full">
                <label className="text-base md:text-lg text-white mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Best email to reach you"
                  className="h-16 w-full rounded-xl bg-white/10 px-4 text-white placeholder-[#6B7274] outline-none"
                />
              </div>
            </div>

            {/* Two-column layout for Business Name & Features */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Business Name */}
              <div className="flex flex-col w-full">
                <label className="text-base md:text-lg text-white mb-2">
                  Business Name (Optional)
                </label>
                <input
                  name="business_name"
                  value={formData.business_name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Optional field"
                  className="h-16 w-full rounded-xl bg-white/10 px-4 text-white placeholder-[#6B7274] outline-none"
                />
              </div>

              {/* Features or Integrations */}
              <div className="flex flex-col w-full">
                <label className="text-base md:text-lg text-white mb-2">
                  Features or Integrations *
                </label>
                <input
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  type="text"
                  placeholder="List any specific tools or workflows"
                  className="h-16 w-full rounded-xl bg-white/10 px-4 text-white placeholder-[#6B7274] outline-none"
                />
              </div>
            </div>

            {/* Full-width Use Case textarea */}
            <div className="flex flex-col">
              <label className="text-base md:text-lg text-white mb-2">
                What do you need your AI agent to do? *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your use case"
                className="h-40 w-full rounded-xl bg-white/10 px-4 py-3 text-white placeholder-[#6B7274] outline-none resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="mt-8 sm:mt-6 bg-[#7B8CE5] px-4 sm:px-10 py-2 sm:py-3  text-white font-semibold hover:bg-blue-600 transition rounded-full"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>

            {message && (
              <p
                className={`mt-4 text-center ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}
              >
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
