"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Cookies from "js-cookie";

interface Application {
  _id: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  guardianNumber?: string;
  branch?: string;
  class12marks?: string | null;
  aadharCardURL?: string | null;
  class12MarkSheetURL?: string | null;
  address?: string;
  pinCode?: string;
  state?: string;
  city?: string;
  passingYear?: string;
  lateralEntry?: boolean;
  userId?: string;
}

const UsersPage = () => {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch applications on mount
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          setError("Please log in to view applications");
          router.push("/login?redirect=/admin/dashboard");
          return;
        }

        const response = await axios.get("/api/v1/apply", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        if (data.success && data.data) {
          setApplications(data.data);
        } else {
          setError(data.message || "Failed to fetch applications");
          setApplications([]);
        }
      } catch (err: any) {
        console.error("Failed to fetch applications:", err);
        if (err.response?.status === 401) {
          setError("Session expired. Please log in again.");
          router.push("/login?redirect=/admin/dashboard");
        } else if (err.response?.status === 403) {
          setError("Access denied. Admin privileges required.");
        } else {
          setError(
            err.response?.data?.message ||
              "An error occurred while fetching applications"
          );
        }
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [router]);

  // Handle application deletion
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this application?")) {
      return;
    }

    try {
      const token = Cookies.get("token");
      if (!token) {
        setError("Please log in to perform this action");
        router.push("/login?redirect=/admin/dashboard");
        return;
      }

      const response = await axios.delete("/api/v1/apply", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { id }, // Send id in request body
      });

      const data = response.data;
      if (data.success) {
        setApplications((prev) => prev.filter((app) => app._id !== id));
        setSuccess("Application deleted successfully");
        setError(null);
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(data.message || "Failed to delete application");
        setSuccess(null);
      }
    } catch (err: any) {
      console.error("Failed to delete application:", err);
      if (err.response?.status === 401) {
        setError("Session expired. Please log in again.");
        router.push("/login?redirect=/admin/dashboard");
      } else if (err.response?.status === 403) {
        setError("Access denied. Admin privileges required.");
      } else if (err.response?.status === 404) {
        setError("Application not found.");
      } else {
        setError(
          err.response?.data?.message ||
            "An error occurred while deleting the application"
        );
      }
      setSuccess(null);
    }
  };

  const getApplicationDate = (id: string) => {
    const timestamp = parseInt(id.substring(0, 8), 16) * 1000;
    return new Date(timestamp).toLocaleDateString();
  };

  // Render loading state
  if (loading) {
    return (
      <div className="bg-[#FAF9F6] container mx-auto px-4 py-8 mt-12">
        <div className="flex flex-col space-y-6">
          <Skeleton className="h-10 w-[300px] rounded-md" />
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-[60px] w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-[#FAF9F6] mt-12">
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">All Applicants</CardTitle>
            <CardDescription>
              View details of all submitted applications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4 bg-red-50 border-red-200">
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert className="mb-4 bg-green-50 border-green-200">
                <AlertDescription className="text-green-700">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            {applications.length === 0 && !error ? (
              <div className="text-center py-10 text-gray-500">
                No applications found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Branch</TableHead>
                      <TableHead>Class 12 Marks</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Applied On</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((app) => (
                      <TableRow key={app._id}>
                        <TableCell className="font-medium">
                          {app.name || "N/A"}
                        </TableCell>
                        <TableCell>{app.email || "N/A"}</TableCell>
                        <TableCell>{app.phoneNumber || "N/A"}</TableCell>
                        <TableCell>{app.branch || "N/A"}</TableCell>
                        <TableCell>{app.class12marks || "N/A"}</TableCell>
                        <TableCell>{app.state || "N/A"}</TableCell>
                        <TableCell>{app.city || "N/A"}</TableCell>
                        <TableCell>{getApplicationDate(app._id)}</TableCell>
                        <TableCell>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(app._id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default UsersPage;
