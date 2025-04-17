"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdmissionForm } from "./Contact"; // Adjust the import path as needed

export default function FollowUp() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="my-10 flex flex-col items-center justify-center bg-white text-black">
      {/* Header Section */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">
          Get Direct Admission in Your Dream College – 2025
        </h1>
        <p className="text-2xl md:text-3xl font-bold">Admissions Now Open!</p>
        <Button
          className="bg-black text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-black/90 transition-colors cursor-pointer"
          size="lg"
          onClick={() => setIsFormOpen(true)}
        >
          Apply Now | Get Free Counseling
        </Button>
      </div>

      {/* Login Section */}
      {/* <div className="text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Login to Your Account
        </h2>
        <div className="flex w-full items-center justify-center space-x-4">
          <Input
            type="email"
            placeholder="mail@mail.com"
            className="w-64 border-gray-300 focus:ring-2 focus:ring-black"
          />
          <Button
            className="bg-black w-1/4 text-white px-6 py-2 rounded-lg font-semibold hover:bg-black/90 transition-colors cursor-pointer"
            size="default"
          >
            Login
          </Button>
        </div>
      </div> */}

      {/* Admission Form Dialog */}
      <AdmissionForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        buttonText="Get Free Counseling"
      />
    </div>
  );
}
