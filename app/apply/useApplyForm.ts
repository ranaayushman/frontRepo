"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface Branch {
  _id: string;
  name: string;
}

interface College {
  _id: string;
  name: string;
  branches: Branch[];
}

export type FormData = {
  name: string;
  guardianNumber: string;
  email: string;
  phoneNumber: string;
  collegeId: string;
  branchId: string;
  class12marks: string;
  address: string;
  state: string;
  city: string;
  pinCode: string;
  passingYear: string;
  lateralEntry: boolean;
};

export const useApplyForm = (userId: string) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [colleges, setColleges] = useState<College[]>([]);
  const [selectedCollegeId, setSelectedCollegeId] = useState<string>("");

  // Initialize form data from local storage if available
  const [formData, setFormData] = useState<FormData>(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("applyFormData");
      return savedData
        ? JSON.parse(savedData)
        : {
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
          };
    }
    return {
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
    };
  });

  // Save form data to local storage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("applyFormData", JSON.stringify(formData));
    }
  }, [formData]);

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

  const handleSelectChange = (value: string, name: keyof FormData) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "collegeId") {
      setSelectedCollegeId(value);
      setFormData((prev) => ({ ...prev, branchId: "" }));
    }
    setErrorMessage("");
  };

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
    // Clear local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("applyFormData");
    }
  };

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
      // Check authentication via cookie
      const token = Cookies.get("token");
      console.log("Token:", token); // Debug: Check if token is retrieved
      console.log("UserId:", userId); // Debug: Check if userId is present

      if (!userId || !token) {
        throw new Error("UNAUTHENTICATED");
      }

      // Proceed with form submission, including token in headers
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
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setSuccessMessage("Application submitted successfully!");
        setTimeout(() => resetForm(), 2000);
      } else {
        throw new Error(
          response.data.message || "Failed to submit application"
        );
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      if (error.message === "UNAUTHENTICATED") {
        throw error; // Let ApplyPage handle the redirect
      }
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

  return {
    formData,
    loading,
    errorMessage,
    successMessage,
    colleges,
    selectedCollegeId,
    indianStates,
    handleChange,
    handleSelectChange,
    handleSubmit,
  };
};