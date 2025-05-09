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

// type ApplicationStatus = "Pending" | "In Review" | "Completed";

const UsersPage = () => {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch applications on mount
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch("/api/v1/apply");
        const data = await res.json();
        if (data.success && data.data) {
          setApplications(data.data);
        } else {
          setError(data.message || "Failed to fetch applications");
          setApplications([]);
        }
      } catch (err) {
        console.error("Failed to fetch applications:", err);
        setError("An error occurred while fetching applications");
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

//   const getApplicationStatus = (app: Application): ApplicationStatus => {
//     if (app.aadharCardURL && app.class12MarkSheetURL) return "Completed";
//     if (app.class12marks) return "In Review";
//     return "Pending";
//   };

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
                      {/* <TableHead>Status</TableHead> */}
                      <TableHead>Applied On</TableHead>
                      {/* <TableHead>Actions</TableHead> */}
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
                        {/* <TableCell>
                          <Badge
                            variant={
                              getApplicationStatus(app) === "In Review"
                                ? "outline"
                                : getApplicationStatus(app) === "Pending"
                                ? "secondary"
                                : "default"
                            }
                          >
                            {getApplicationStatus(app)}
                          </Badge>
                        </TableCell> */}
                        <TableCell>{getApplicationDate(app._id)}</TableCell>
                        {/* <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              router.push(`/admin/application-details/${app._id}`)
                            }
                          >
                            View Details
                          </Button>
                        </TableCell> */}
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
