import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-[#140087] px-6 py-12 mt-12">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold border-b-2 border-[#140087] pb-2">
          About Us
        </h1>

        <p className="text-lg leading-7 text-gray-700">
          Welcome to our{" "}
          <span className="font-semibold text-[#140087]">
            College Counseling Portal <span className="text-[#140087] font-bold">namankan.in</span>
          </span>
          , your trusted companion in making one of the most important decisions
          of your academic journey. We&apos;re dedicated to offering personalized,
          accurate, and expert counseling to students navigating the complex
          world of college admissions.
        </p>

        <div className="bg-[#f5f5ff] rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-2 text-[#140087]">
            Our Mission
          </h2>
          <p className="text-gray-800">
            Our mission is simple — to empower students with the knowledge and
            confidence needed to choose the right college and course. We aim to
            bridge the gap between ambition and opportunity by providing
            trustworthy advice and guidance tailored to each student’s unique
            background and goals.
          </p>
        </div>

        <div className="bg-[#f5f5ff] rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-2 text-[#140087]">
            What We Offer
          </h2>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            <li>Comprehensive guidance for college admissions</li>
            <li>
              Up-to-date information on courses, colleges, and eligibility
            </li>
            <li>Personalized counseling sessions and support</li>
            <li>Tools to track and manage your admission journey</li>
          </ul>
        </div>

        <div className="bg-[#140087] text-white rounded-xl p-6 text-center shadow-md">
          <h2 className="text-2xl font-bold mb-2">We&apos;re Here to Help</h2>
          <p className="mb-4">
            Whether you&apos;re confused about which college to choose, unsure about
            your eligibility, or simply need expert guidance — we&apos;re here for
            you.
          </p>
          <Link href={"/"}>
            <Button className="bg-white hover:bg-white/90 text-[#140087]">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
