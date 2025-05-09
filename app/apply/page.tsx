"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Branch {
  _id: string;
  name: string;
}

interface College {
  _id: string;
  name: string;
  branches: Branch[];
}

const ApplyPage = () => {
  const params = useParams();
  const userId = params?.userId || "";

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [colleges, setColleges] = useState<College[]>([]);
  const [selectedCollegeId, setSelectedCollegeId] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    guardianNumber: "",
    email: "",
    phoneNumber: "",
    collegeId: "",
    branchId: "",
    class12marks: "",
    address: "",
    state: "",
    city: "",
    pinCode: "",
    passingYear: "",
    lateralEntry: false,
  });

  // List of Indian states
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi (NCT)",
  ];

  // Fetch colleges and branches from API
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get<{ success: boolean; data: College[] }>(
          "/api/v1/colleges"
        );
        if (response.data.success) {
          setColleges(response.data.data);
        } else {
          throw new Error("Failed to fetch colleges");
        }
      } catch (error) {
        console.error("Failed to fetch colleges:", error);
        setErrorMessage("Failed to load colleges. Please try again.");
      }
    };
    fetchColleges();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrorMessage("");
  };

  // Handle Select change
  const handleSelectChange = (value: string, name: keyof typeof formData) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "collegeId") {
      setSelectedCollegeId(value);
      setFormData((prev) => ({ ...prev, branchId: "" }));
    }
    setErrorMessage("");
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      guardianNumber: "",
      email: "",
      phoneNumber: "",
      collegeId: "",
      branchId: "",
      class12marks: "",
      address: "",
      state: "",
      city: "",
      pinCode: "",
      passingYear: "",
      lateralEntry: false,
    });
    setSelectedCollegeId("");
  };

  // Validate form
  const validateForm = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Invalid email format");
      return false;
    }
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      setErrorMessage("Phone number must be 10 digits");
      return false;
    }
    if (
      parseFloat(formData.class12marks) > 100 ||
      parseFloat(formData.class12marks) < 0
    ) {
      setErrorMessage("Class 12 marks must be between 0 and 100");
      return false;
    }
    if (!formData.collegeId) {
      setErrorMessage("Please select a college");
      return false;
    }
    if (!formData.branchId) {
      setErrorMessage("Please select a branch");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post("/api/v1/apply", {
        userId: userId || null,
        name: formData.name,
        guardianNumber: formData.guardianNumber,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        collegeId: formData.collegeId,
        branchId: formData.branchId,
        class12marks: formData.class12marks,
        address: formData.address,
        pinCode: formData.pinCode,
        state: formData.state,
        city: formData.city,
        passingYear: formData.passingYear,
        lateralEntry: formData.lateralEntry,
      });

      if (response.data.success) {
        setSuccessMessage("Application submitted successfully!");
        setTimeout(() => resetForm(), 2000);
      } else {
        throw new Error(response.data.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Submission error:", error);
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
        {successMessage && (
          <div className="text-green-700 bg-green-100 border border-green-400 rounded p-4">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="text-red-700 bg-red-100 border border-red-400 rounded p-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Personal Details */}
          <div className="bg-blue-100 shadow-md rounded-xl p-6">
            <h2 className="text-lg text-[#140087] font-semibold mb-4">
              Personal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="mb-2">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  className="bg-white"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="mb-2">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className="bg-white"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber" className="mb-2">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  className="bg-white"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="guardianNumber" className="mb-2">
                  Guardian Phone Number
                </Label>
                <Input
                  id="guardianNumber"
                  name="guardianNumber"
                  type="tel"
                  className="bg-white"
                  value={formData.guardianNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address" className="mb-2">
                  Address
                </Label>
                <Textarea
                  id="address"
                  name="address"
                  className="bg-white"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="state" className="mb-2">
                  State
                </Label>
                <Select
                  name="state"
                  value={formData.state}
                  onValueChange={(value: string) =>
                    handleSelectChange(value, "state")
                  }
                  required
                >
                  <SelectTrigger id="state" className="bg-white w-full">
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="city" className="mb-2">
                  City
                </Label>
                <Input
                  id="city"
                  name="city"
                  className="bg-white"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="pinCode" className="mb-2">
                  PIN Code
                </Label>
                <Input
                  id="pinCode"
                  name="pinCode"
                  type="number"
                  className="bg-white"
                  value={formData.pinCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* College Application */}
          <div className="bg-blue-100 shadow-md rounded-xl p-6 mt-8">
            <h2 className="text-lg font-semibold mb-4 text-[#140087]">
              Apply for College (2025–26)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="collegeId" className="mb-2">
                  College
                </Label>
                <Select
                  name="collegeId"
                  value={formData.collegeId}
                  onValueChange={(value: string) =>
                    handleSelectChange(value, "collegeId")
                  }
                  required
                >
                  <SelectTrigger id="collegeId" className="bg-white w-full">
                    <SelectValue placeholder="Select a college" />
                  </SelectTrigger>
                  <SelectContent>
                    {colleges.map((college) => (
                      <SelectItem key={college._id} value={college._id}>
                        {college.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="branchId" className="mb-2">
                  Branch
                </Label>
                <Select
                  name="branchId"
                  value={formData.branchId}
                  onValueChange={(value: string) =>
                    handleSelectChange(value, "branchId")
                  }
                  required
                  disabled={!selectedCollegeId}
                >
                  <SelectTrigger id="branchId" className="bg-white w-full">
                    <SelectValue placeholder="Select a branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCollegeId &&
                      colleges
                        .find((college) => college._id === selectedCollegeId)
                        ?.branches.map((branch) => (
                          <SelectItem key={branch._id} value={branch._id}>
                            {branch.name}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end gap-2">
                <div className="flex-grow">
                  <Label htmlFor="class12marks" className="mb-2">
                    Class 12 Marks
                  </Label>
                  <Input
                    id="class12marks"
                    name="class12marks"
                    type="number"
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
                      name="lateralEntry"
                      className="accent-[#140087]"
                      checked={formData.lateralEntry}
                      onChange={handleChange}
                    />
                    <span className="text-sm">Lateral Entry</span>
                  </Label>
                </div>
              </div>
              <div>
                <Label htmlFor="passingYear" className="mb-2">
                  Passing Year of Class 12
                </Label>
                <Input
                  id="passingYear"
                  name="passingYear"
                  type="number"
                  className="bg-white"
                  value={formData.passingYear}
                  onChange={handleChange}
                  min="2000"
                  max="2025"
                  required
                />
              </div>
            </div>

            <div className="mt-6 text-right">
              <Button
                type="submit"
                className="bg-[#140087] hover:bg-[#140060] text-white px-6 py-2"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8v8h-8z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit Form"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyPage;