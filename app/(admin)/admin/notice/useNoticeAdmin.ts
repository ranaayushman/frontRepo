import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { NoticeType } from "@/app/models/notice.model";

interface ApiError {
  message: string;
  status: number;
}

export const useNoticesAdmin = () => {
  const router = useRouter();
  const [notices, setNotices] = useState<NoticeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch all notices (admin sees both published and unpublished)
  const fetchNotices = useCallback(async () => {
    try {
      setLoading(true);
      const token = Cookies.get("token");
      if (!token) {
        setError("Please log in to view notices");
        router.push("/login?redirect=/admin/notices");
        return;
      }

      const response = await axios.get("/api/v1/notice", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;
      if (data.success && data.data) {
        setNotices(data.data);
        setError(null);
      } else {
        setError(data.message || "Failed to fetch notices");
        setNotices([]);
      }
    } catch (err: any) {
      console.error("Failed to fetch notices:", err);
      const status = err.response?.status;
      if (status === 401) {
        setError("Session expired. Please log in again.");
        router.push("/login?redirect=/admin/notices");
      } else if (status === 403) {
        setError("Access denied. Admin privileges required.");
      } else {
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching notices"
        );
      }
      setNotices([]);
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Create a new notice
  const createNotice = useCallback(
    async (notice: { title: string; description: string }) => {
      try {
        setLoading(true);
        const token = Cookies.get("token");
        if (!token) {
          setError("Please log in to perform this action");
          router.push("/login?redirect=/admin/notices");
          return;
        }

        const response = await axios.post("/api/v1/notice", notice, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data;
        if (data.success && data.data) {
          setNotices((prev) => [data.data, ...prev]);
          setSuccess("Notice created successfully");
          setError(null);
          setTimeout(() => setSuccess(null), 3000);
          return data.data;
        } else {
          setError(data.message || "Failed to create notice");
          setSuccess(null);
        }
      } catch (err: any) {
        console.error("Failed to create notice:", err);
        const status = err.response?.status;
        if (status === 401) {
          setError("Session expired. Please log in again.");
          router.push("/login?redirect=/admin/notices");
        } else if (status === 403) {
          setError("Access denied. Admin privileges required.");
        } else {
          setError(
            err.response?.data?.message ||
              "An error occurred while creating the notice"
          );
        }
        setSuccess(null);
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  // Update a notice (including isPublished)
  const updateNotice = useCallback(
    async (
      id: string,
      notice: { title: string; description: string; isPublished: boolean }
    ) => {
      try {
        setLoading(true);
        const token = Cookies.get("token");
        if (!token) {
          setError("Please log in to perform this action");
          router.push("/login?redirect=/admin/notices");
          return;
        }

        const response = await axios.put(
          "/api/v1/notices",
          { id, ...notice },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = response.data;
        if (data.success && data.data) {
          setNotices((prev) => prev.map((n) => (n._id === id ? data.data : n)));
          setSuccess("Notice updated successfully");
          setError(null);
          setTimeout(() => setSuccess(null), 3000);
          return data.data;
        } else {
          setError(data.message || "Failed to update notice");
          setSuccess(null);
        }
      } catch (err: any) {
        console.error("Failed to update notice:", err);
        const status = err.response?.status;
        if (status === 401) {
          setError("Session expired. Please log in again.");
          router.push("/login?redirect=/admin/notices");
        } else if (status === 403) {
          setError("Access denied. Admin privileges required.");
        } else if (status === 404) {
          setError("Notice not found.");
        } else {
          setError(
            err.response?.data?.message ||
              "An error occurred while updating the notice"
          );
        }
        setSuccess(null);
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  // Delete a notice
  const deleteNotice = useCallback(
    async (id: string) => {
      if (!window.confirm("Are you sure you want to delete this notice?")) {
        return;
      }

      try {
        setLoading(true);
        const token = Cookies.get("token");
        if (!token) {
          setError("Please log in to perform this action");
          router.push("/login?redirect=/admin/notices");
          return;
        }

        const response = await axios.delete("/api/v1/notice", {
          headers: { Authorization: `Bearer ${token}` },
          data: { id },
        });

        const data = response.data;
        if (data.success) {
          setNotices((prev) => prev.filter((n) => n._id !== id));
          setSuccess("Notice deleted successfully");
          setError(null);
          setTimeout(() => setSuccess(null), 3000);
        } else {
          setError(data.message || "Failed to delete notice");
          setSuccess(null);
        }
      } catch (err: any) {
        console.error("Failed to delete notice:", err);
        const status = err.response?.status;
        if (status === 401) {
          setError("Session expired. Please log in again.");
          router.push("/login?redirect=/admin/notices");
        } else if (status === 403) {
          setError("Access denied. Admin privileges required.");
        } else if (status === 404) {
          setError("Notice not found.");
        } else {
          setError(
            err.response?.data?.message ||
              "An error occurred while deleting the notice"
          );
        }
        setSuccess(null);
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  // Toggle isPublished status
  const togglePublish = useCallback(
    async (id: string, currentStatus: boolean) => {
      try {
        setLoading(true);
        const token = Cookies.get("token");
        if (!token) {
          setError("Please log in to perform this action");
          router.push("/login?redirect=/admin/notices");
          return;
        }

        const notice = notices.find((n) => n._id === id);
        if (!notice) {
          setError("Notice not found");
          return;
        }

        const response = await axios.put(
          "/api/v1/notice",
          {
            id,
            title: notice.title,
            description: notice.description,
            isPublished: !currentStatus,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = response.data;
        if (data.success && data.data) {
          setNotices((prev) => prev.map((n) => (n._id === id ? data.data : n)));
          setSuccess(
            `Notice ${
              !currentStatus ? "published" : "unpublished"
            } successfully`
          );
          setError(null);
          setTimeout(() => setSuccess(null), 3000);
        } else {
          setError(data.message || "Failed to update publish status");
          setSuccess(null);
        }
      } catch (err: any) {
        console.error("Failed to toggle publish status:", err);
        const status = err.response?.status;
        if (status === 401) {
          setError("Session expired. Please log in again.");
          router.push("/login?redirect=/admin/notices");
        } else if (status === 403) {
          setError("Access denied. Admin privileges required.");
        } else {
          setError(
            err.response?.data?.message ||
              "An error occurred while updating publish status"
          );
        }
        setSuccess(null);
      } finally {
        setLoading(false);
      }
    },
    [router, notices]
  );

  return {
    notices,
    loading,
    error,
    success,
    fetchNotices,
    createNotice,
    updateNotice,
    deleteNotice,
    togglePublish,
  };
};
