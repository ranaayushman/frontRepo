"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import axios from "axios";

const ApplyPage = () => {
  const params = useParams();
  const userId = params?.userId || "";

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    guardianNumber: "",
    email: "",
    phoneNumber: "",
    branch: "",
    class12marks: "",
    address: "",
    state: "",
    city: "",
    pinCode: "",
    lateralEntry:false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage("");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      guardianNumber: "",
      email: "",
      phoneNumber: "",
      branch: "",
      class12marks: "",
      address: "",
      state: "",
      city: "",
      pinCode: "",
      lateralEntry:false,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post("/api/v1/apply", {
        userId,
        ...formData,
      });

      if (response.data.success) {
        setSuccessMessage("Application submitted successfully!");
        resetForm();
      } else {
        throw new Error(
          response.data.message || "Failed to submit application"
        );
      }
    } catch (error) {
      let message = "Something went wrong. Please try again.";
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 mt-12">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Personal Details */}
        <form onSubmit={handleSubmit}>
          <div className="bg-blue-100 shadow-md rounded-xl p-6">
            <h2 className="text-lg text-[#140087] font-semibold mb-4">
              Personal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="mb-2">Name</Label>
                <Input
                  name="name"
                  className="bg-white"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label className="mb-2">Email Address</Label>
                <Input
                  name="email"
                  className="bg-white"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label className="mb-2">Phone Number</Label>
                <Input
                  name="phoneNumber"
                  className="bg-white"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label className="mb-2">Guardian Phone Number</Label>
                <Input
                  name="guardianNumber"
                  className="bg-white"
                  value={formData.guardianNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label className="mb-2">Address</Label>
                <Textarea
                  name="address"
                  className="bg-white"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label className="mb-2">State</Label>
                <Input
                  name="state"
                  className="bg-white"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label className="mb-2">City</Label>
                <Input
                  name="city"
                  className="bg-white"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label className="mb-2">PIN Code</Label>
                <Input
                  name="pinCode"
                  className="bg-white"
                  value={formData.pinCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mt-6 text-right">
              <Button
                type="button"
                variant="default"
                className="bg-[#140087] hover:bg-[#140060] text-white"
              >
                Fill College Details
              </Button>
            </div>
          </div>

          {/* College Application */}
          <div className="bg-blue-100 shadow-md rounded-xl p-6 mt-8">
            <h2 className="text-lg font-semibold mb-4 text-[#140087]">
              Apply for College (2025–26)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="mb-2">Branch</Label>
                <Input
                  name="branch"
                  className="bg-white"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-end gap-2">
                <div className="flex-grow">
                  <Label className="mb-2">Class 12 Marks</Label>
                  <Input
                    name="class12marks"
                    className="bg-white"
                    value={formData.class12marks}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mt-6">
                  <Label className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="accent-[#140087] "
                      checked={formData.lateralEntry}

                    />
                    <span className="text-sm">Lateral Entry</span>
                  </Label>
                </div>
              </div>
            </div>

            <div className="mt-6 text-right">
              <Button
                type="submit"
                className="bg-[#140087] hover:bg-[#140060] text-white px-6 py-2"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Form"}
              </Button>
            </div>
          </div>

          {successMessage && (
            <div className="mt-4 text-green-700 bg-green-100 border border-green-400 rounded p-4">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mt-4 text-red-700 bg-red-100 border border-red-400 rounded p-4">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ApplyPage;
