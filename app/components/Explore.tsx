"use client";

import Image from "next/image";

export default function Explore() {
  return (
    <section className="w-full px-6 md:px-16 py-16 space-y-16">
      {/* Features Section */}
      <div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Explore Our Features
        </h2>
        <p className="text-gray-500 max-w-2xl mb-8">
          Discover the key features that make our 2025 College Admission Portal
          the best choice for your direct admission needs.
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

      {/* Testimonials Section */}
      <div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          What People Are Saying
        </h2>
        <p className="text-gray-500 max-w-2xl mb-8">
          Read what our satisfied students have to say about their experience
          with the 2025 College Admission Portal.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-6 rounded-lg flex gap-4 items-start">
            <Image
              src="/images/sara-johnson.jpg" // Replace with actual image path
              alt="Sara Johnson"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <div>
              <h4 className="font-bold">Sara Johnson</h4>
              <p className="text-gray-600 text-sm">
                I got direct admission to my dream college hassle-free thanks to
                the expert counseling provided by the portal.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg flex gap-4 items-start">
            <Image
              src="/images/alex-patel.jpg" // Replace with actual image path
              alt="Alex Patel"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <div>
              <h4 className="font-bold">Alex Patel</h4>
              <p className="text-gray-600 text-sm">
                The no entrance exams policy for selected colleges made the
                application process so much easier and stress-free.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg flex gap-4 items-start">
            <Image
              src="/images/emily-gupta.jpg"
              alt="Emily Gupta"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <div>
              <h4 className="font-bold">Emily Gupta</h4>
              <p className="text-gray-600 text-sm">
                I felt confident and supported throughout the entire admission
                process knowing that the support provided by the portal was 100%
                verified.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
