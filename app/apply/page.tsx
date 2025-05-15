"use client";

import { useParams, useRouter } from "next/navigation";
import { Apply } from "./Apply";
import { useApplyForm } from "./useApplyForm";
import Cookies from "js-cookie";

const ApplyPage = () => {
  const params = useParams();
  const router = useRouter();
  // Prefer userId from cookie, fallback to params
  const userId = Cookies.get("userId") || params?.userId?.toString() || "";

  const {
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
  } = useApplyForm(userId);

  // Wrap handleSubmit to catch UNAUTHENTICATED error and redirect
  const wrappedHandleSubmit = async (e: React.FormEvent) => {
    try {
      await handleSubmit(e);
    } catch (error: any) {
      if (error.message === "UNAUTHENTICATED") {
        // Save current URL for redirect after login
        const redirectUrl = encodeURIComponent(`/apply/${userId}`);
        router.push(`/login?redirect=${redirectUrl}`);
      }
    }
  };

  return (
    <Apply
      formData={formData}
      loading={loading}
      errorMessage={errorMessage}
      successMessage={successMessage}
      colleges={colleges}
      selectedCollegeId={selectedCollegeId}
      indianStates={indianStates}
      handleChange={handleChange}
      handleSelectChange={handleSelectChange}
      handleSubmit={wrappedHandleSubmit}
    />
  );
};

export default ApplyPage;