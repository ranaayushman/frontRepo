import React from "react";

const Discover = () => {
  return (
    <section className="w-full px-6 md:px-16 py-16 bg-[#FAF9F6] ">
      {/* Heading */}
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Discover Your Path
        </h2>
        <p className="text-gray-500 max-w-2xl">
          Explore a world of opportunities and secure your future with ease.
        </p>
      </div>

      {/* Grid Sections */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Quick Links */}
        <div className="bg-[#F8F8F8] p-6 rounded-lg">
          <h3 className="font-bold text-xl mb-4">Quick Links Section</h3>
          <ul className="text-gray-600 space-y-1 text-sm">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Admission process</li>
          </ul>
        </div>

        {/* Social Media & Contact */}
        <div className="bg-[#F8F8F8] p-6 rounded-lg">
          <h3 className="font-bold text-xl mb-4">Social Media & Contact</h3>
          <ul className="text-gray-600 text-sm space-y-1">
            <li>- Email: support@admissions.com</li>
            <li>- Call/WhatsApp: +91-xxxxxxxxxx</li>
          </ul>
          <p className="font-bold text-lg mt-6">Follow us:</p>
          {/* You can add icons or links here later */}
        </div>

        {/* Why Choose Us */}
        <div className="bg-[#F8F8F8] p-6 rounded-lg">
          <h3 className="font-bold text-xl mb-4">Why Choose Us</h3>
          <ul className="text-gray-600 text-sm space-y-1">
            <li>- Trusted by 10k+ students</li>
            <li>- Verified admission partners</li>
            <li>- End-to-end support</li>
            <li>- Personalized mentorship</li>
            <li>- Admission tracking portal</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Discover;
