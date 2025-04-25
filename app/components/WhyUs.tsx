"use client";

import Image from "next/image";

const features = [
  {
    title: "No Entrance Exams",
    description:
      "Selected colleges offer direct admissions without the need for entrance exams, making the process hassle-free.",
  },
  {
    title: "100% Verified Support",
    description:
      "Rest assured with our fully verified support system that ensures a smooth and reliable admission process.",
  },
  {
    title: "Expert Counselling",
    description:
      "Receive personalized guidance and support from experienced counselors to help you make informed decisions.",
  },
];

const WhyUs = () => {
  return (
    <section className="relative w-full py-20 px-4 md:px-20 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/img/whyus.jpg" // your image path
        alt="Why Choose Us Background"
        fill
        className="object-cover object-center z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Heading */}
        <div className="bg-yellow-600 text-white font-bold text-4xl md:text-5xl px-10 py-5 rounded-md mb-20">
          Why Choose Us?
        </div>

        {/* Cards */}
        <div className="relative w-full flex flex-col items-center">
          {/* Top 2 Cards */}
          <div className="flex flex-col md:flex-row justify-around gap-12 w-full">
            {/* First Card */}
            <div className="bg-white p-10 rounded-xl shadow-2xl max-w-md w-full md:mt-0 mt-6">
              <h3 className="text-2xl font-bold mb-4">{features[0].title}</h3>
              <p className="text-gray-700 text-base">
                {features[0].description}
              </p>
            </div>

            {/* Second Card */}
            <div className="bg-white p-10 rounded-xl shadow-2xl max-w-md w-full md:mt-0 mt-6">
              <h3 className="text-2xl font-bold mb-4">{features[1].title}</h3>
              <p className="text-gray-700 text-base">
                {features[1].description}
              </p>
            </div>
          </div>

          {/* Bottom Single Card */}
          <div className="mt-12">
            <div className="bg-white p-10 rounded-xl shadow-2xl max-w-md w-full mx-auto">
              <h3 className="text-2xl font-bold mb-4">{features[2].title}</h3>
              <p className="text-gray-700 text-base">
                {features[2].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
