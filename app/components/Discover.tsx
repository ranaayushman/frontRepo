import React from "react";

const Discover = () => {
  return (
    <section className="w-full px-6 md:px-16 py-16 space-y-16">
      <div>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Discover Your Path
        </h2>
        <p className="text-gray-500 max-w-2xl mb-8">
          Explore a world of opportunities and secure your future with ease.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold text-2xl mb-2">Expert Counseling</h3>
            <p className="text-gray-600">
              Receive personalized guidance and support from experienced
              counselors to help you make informed decisions.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold text-2xl mb-2">No Entrance Exams</h3>
            <p className="text-gray-600">
              Selected colleges offer direct admissions without the need for
              entrance exams, making the process hassle-free.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold text-2xl mb-2">100% Verified Support</h3>
            <p className="text-gray-600">
              Rest assured with our fully verified support system that ensures a
              smooth and reliable admission process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discover;
