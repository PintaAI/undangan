"use client";

import { useState } from "react";
import { weddingData } from "@/lib/data";

export default function Rsvp() {
  const [formData, setFormData] = useState({
    fullName: "",
    attendance: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      attendance: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("RSVP Form Data:", formData);
    setIsSubmitted(true);
    
    // Reset form after submission
    setFormData({
      fullName: "",
      attendance: "",
      message: ""
    });
  };

  if (isSubmitted) {
    return (
      <section className="py-16 px-4 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Thank You!</h2>
          <p className="text-lg text-gray-600 mb-8">
            Your RSVP has been received. We're excited to celebrate with you!
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Submit Another RSVP
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {weddingData.rsvp.title}
          </h2>
          <p className="text-lg text-gray-600">
            Please let us know if you'll be able to join us for our special day
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="space-y-8">
            {/* Full Name Input */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your full name"
              />
            </div>

            {/* Attendance Status Radio Buttons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Will you be attending? *
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="attendance"
                    value="attending"
                    checked={formData.attendance === "attending"}
                    onChange={handleRadioChange}
                    required
                    className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500"
                  />
                  <span className="ml-3 text-gray-700 group-hover:text-pink-600 transition-colors">
                    Attending
                  </span>
                </label>
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="attendance"
                    value="not-attending"
                    checked={formData.attendance === "not-attending"}
                    onChange={handleRadioChange}
                    required
                    className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500"
                  />
                  <span className="ml-3 text-gray-700 group-hover:text-pink-600 transition-colors">
                    Not Attending
                  </span>
                </label>
              </div>
            </div>

            {/* Message to Couple */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message to the Couple
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Share your well wishes or any special messages..."
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Submit RSVP
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}