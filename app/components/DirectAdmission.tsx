"use client";

const steps = [
  {
    number: "1",
    title: "Register",
    description:
      "Fill out the registration form with your details to begin the admission process.",
  },
  {
    number: "2",
    title: "Document Upload",
    description:
      "Upload the required documents such as academic certificates, ID proof, and photographs.",
  },
  {
    number: "3",
    title: "Confirm Admission",
    description:
      "Confirm your admission by following the instructions provided after document submission.",
  },
];

const DirectAdmission = () => {
  return (
    <section className="w-full bg-[#FAF9F6] py-16 px-16 md:px-20">
      <div className=" mx-auto">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-[#0c0121] mb-6">
          Direct Admission <br /> Process
        </h2>
        <p className="text-gray-600 max-w-2xl mb-12">
          A simple 3-step flow with icons for Register, Document Upload, and
          Confirm Admission. It mentions support for management quota and
          lateral entry if applicable.
        </p>

        {/* Steps */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12 relative">
          {/* Line */}
          <div className="hidden md:block absolute top-7 left-8 right-8 h-0.5 bg-gray-300" />

          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center text-center w-full md:w-1/3 relative"
            >
              {/* Number circle */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-600 text-white font-bold text-lg z-10">
                {step.number}
              </div>

              {/* Title and Description */}
              <div className="mt-8 bg-[#fdfdfd] p-6 rounded-md shadow-sm">
                <h3 className="text-xl font-bold text-black mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DirectAdmission;
