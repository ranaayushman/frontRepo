"use client";

import { useParams } from "next/navigation";
import { Apply } from "./Apply";
import { useApplyForm } from "./useApplyForm";

const ApplyPage = () => {
  const params = useParams();
  const userId = params?.userId?.toString() || "";

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
      handleSubmit={handleSubmit}
    />
  );
};

export default ApplyPage;
