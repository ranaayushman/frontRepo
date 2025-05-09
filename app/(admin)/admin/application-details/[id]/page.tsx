"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

type ApplicationStatus = "Pending" | "In Review" | "Completed";

const ApplicationDetailsPage = () => {
  const params = useParams();
  const id = params.id as string; // Extract id from params
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Log params for debugging
  console.log("Params:", params);
  console.log("Application ID:", id);

  // Fetch application details
  useEffect(() => {
    if (!id) {
      setError("No application ID provided");
      setLoading(false);
      return;
    }

    const fetchApplication = async () => {
      try {
        const res = await fetch(`/api/v1/application/${id}`);
        const data = await res.json();
        if (data.success && data.data) {
          setApplication(data.data);
        } else {
          setError(data.message || "Application not found");
          setApplication(null);
        }
      } catch (err) {
        console.error("Failed to fetch application:", err);
        setError("An error occurred while fetching application details");
        setApplication(null);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const getApplicationStatus = (app: Application): ApplicationStatus => {
    if (app.aadharCardURL && app.class12MarkSheetURL) return "Completed";
    if (app.class12marks) return "In Review";
    return "Pending";
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
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="bg-[#FAF9F6] container mx-auto px-4 py-8 mt-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Application Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="bg-red-50 border-red-200">
              <AlertDescription className="text-red-700">
                {error}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render application details
  if (!application) {
    return (
      <div className="bg-[#FAF9F6] container mx-auto px-4 py-8 mt-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Application Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10 text-gray-500">
              No application found.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <section className="bg-[#FAF9F6] mt-12">
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              Application Details: {application.name || "N/A"}
            </CardTitle>
            <CardDescription>
              View detailed information for application ID: {id}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Personal Information
                </h3>
                <p>
                  <strong>Name:</strong> {application.name || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {application.email || "N/A"}
                </p>
                <p>
                  <strong>Phone Number:</strong>{" "}
                  {application.phoneNumber || "N/A"}
                </p>
                <p>
                  <strong>Guardian Number:</strong>{" "}
                  {application.guardianNumber || "N/A"}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Academic Information
                </h3>
                <p>
                  <strong>Branch:</strong> {application.branch || "N/A"}
                </p>
                <p>
                  <strong>Class 12 Marks:</strong>{" "}
                  {application.class12marks || "N/A"}
                </p>
                <p>
                  <strong>Passing Year:</strong>{" "}
                  {application.passingYear || "N/A"}
                </p>
                <p>
                  <strong>Lateral Entry:</strong>{" "}
                  {application.lateralEntry ? "Yes" : "No"}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Address Information
                </h3>
                <p>
                  <strong>Address:</strong> {application.address || "N/A"}
                </p>
                <p>
                  <strong>City:</strong> {application.city || "N/A"}
                </p>
                <p>
                  <strong>State:</strong> {application.state || "N/A"}
                </p>
                <p>
                  <strong>Pin Code:</strong> {application.pinCode || "N/A"}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Application Status
                </h3>
                <p>
                  <strong>Status:</strong>{" "}
                  <Badge
                    variant={
                      getApplicationStatus(application) === "In Review"
                        ? "outline"
                        : getApplicationStatus(application) === "Pending"
                        ? "secondary"
                        : "default"
                    }
                  >
                    {getApplicationStatus(application)}
                  </Badge>
                </p>
                <p>
                  <strong>Applied On:</strong>{" "}
                  {getApplicationDate(application._id)}
                </p>
                <p>
                  <strong>User ID:</strong> {application.userId || "N/A"}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Documents</h3>
              <p>
                <strong>Aadhar Card:</strong>{" "}
                {application.aadharCardURL ? (
                  <a
                    href={application.aadharCardURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Document
                  </a>
                ) : (
                  "Not Uploaded"
                )}
              </p>
              <p>
                <strong>Class 12 Marksheet:</strong>{" "}
                {application.class12MarkSheetURL ? (
                  <a
                    href={application.class12MarkSheetURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Document
                  </a>
                ) : (
                  "Not Uploaded"
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ApplicationDetailsPage;
