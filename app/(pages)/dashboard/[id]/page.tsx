"use client";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const params = useParams();
  const router = useRouter();
  const userId = params.id;
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);

  const applyButton = () => {
    if (status === "authenticated" && session?.user?.id) {
      router.push(`/apply/${session.user.id}`);
    } else {
      signIn("google");
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated" && session?.user?.id !== userId) {
      router.push("/");
    } else if (status === "authenticated" && session?.user?.id === userId) {
      const fetchApplications = async () => {
        try {
          const res = await fetch(`/api/v1/application/${userId}`);
          const data = await res.json();
          if (data.success && data.data) {
            setApplications(data.data);
          } else {
            setApplications([]);
          }
        } catch (error) {
          console.error("Failed to fetch applications:", error);
          setApplications([]);
        } finally {
          setLoading(false);
          setLoadingApps(false);
        }
      };
      fetchApplications();
    }
  }, [status, session, userId]);

  const getInitials = () => {
    if (session?.user?.name) {
      return session.user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
    }
    return "U";
  };

  interface Application {
    _id: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
    branch?: string;
    class12marks?: number;
    aadharCardURL?: string;
    class12MarkSheetURL?: string;
  }

  type ApplicationStatus = "Pending" | "In Review" | "Completed";

  const getApplicationStatus = (app: Application | null): ApplicationStatus => {
    if (!app) return "Pending";
    if (app.aadharCardURL && app.class12MarkSheetURL) return "Completed";
    if (app.class12marks) return "In Review";
    return "Pending";
  };

  const getApplicationDate = (id: string) => {
    const timestamp = parseInt(id.substring(0, 8), 16) * 1000;
    return new Date(timestamp).toLocaleDateString();
  };

  if (status === "loading" || loading) {
    return (
      <div className="bg-[#FAF9F6] container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>

          <Skeleton className="h-[200px] w-full rounded-xl" />

          <div className="space-y-3">
            <Skeleton className="h-4 w-[300px]" />
            <Skeleton className="h-[100px] w-full rounded-lg" />
            <Skeleton className="h-[100px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-[#FAF9F6] mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={session?.user?.image || ""}
                alt={session?.user?.name || "User"}
              />
              <AvatarFallback>{getInitials()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{session?.user?.name}</h1>
              <p className="text-muted-foreground">{session?.user?.email}</p>
            </div>
          </div>
          <Button className="bg-[#140087] hover:bg-[#140060]">Edit Profile</Button>
        </div>

        <Tabs defaultValue="applications" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            {/* <TabsTrigger value="settings">Settings</TabsTrigger> */}
          </TabsList>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Your Applications</CardTitle>
                <CardDescription>
                  Track the status of your current applications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loadingApps ? (
                    [...Array(2)].map((_, i) => (
                      <Skeleton
                        key={i}
                        className="h-[120px] w-full rounded-lg"
                      />
                    ))
                  ) : applications.length > 0 ? (
                    applications.map((app) => (
                      <Card key={app._id}>
                        <CardHeader className="py-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">
                              {app.branch || "No Branch"} Program
                            </CardTitle>
                            <Badge
                              variant={
                                getApplicationStatus(app) === "In Review"
                                  ? "outline"
                                  : getApplicationStatus(app) === "Pending"
                                  ? "secondary"
                                  : getApplicationStatus(app) === "Completed"
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              {getApplicationStatus(app)}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3 pt-0">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <p className="text-sm text-muted-foreground">
                              Name: {app.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Email: {app.email}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Phone: {app.phoneNumber}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Applied on: {getApplicationDate(app._id)}
                            </p>
                            {app.class12marks && (
                              <p className="text-sm text-muted-foreground">
                                Class 12 Marks: {app.class12marks}
                              </p>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button
                            className="bg-[#140087] hover:bg-[#140060]"
                            size="sm"
                            onClick={() =>
                              router.push(`/application-details/${app._id}`)
                            }
                          >
                            View Details
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <p className="text-muted-foreground mb-4">
                        You haven't submitted any applications yet
                      </p>
                    </div>
                  )}
                  <div className="flex justify-center pt-4">
                    <Button className="bg-[#140087] hover:bg-[#140060]" onClick={applyButton}>Start New Application</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="bg-[#E6F0FA] rounded-lg shadow-md">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  {session?.user?.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#110072]">
                    Phone No.
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={session?.user?.phoneNumber || "Not provided"}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800"
                    />
                    <Button variant="ghost" size="sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path
                          fillRule="evenodd"
                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                  </div>
                </div> */}

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#110072]">
                    E-Mail
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="email"
                      value={session?.user?.email || "someone@gmail.com"}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800"
                    />
                    <Button variant="ghost" size="sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path
                          fillRule="evenodd"
                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#110072]">
                    Address Line
                  </label>
                  <input
                    type="text"
                    value="address line content"
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800"
                  />
                </div>
{/* 
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-purple-700">
                      State
                    </label>
                    <input
                      type="text"
                      value="Jammu and Kashmir"
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-purple-700">
                      District
                    </label>
                    <input
                      type="text"
                      value="Srinagar"
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800"
                    />
                  </div>
                </div> */}
              </CardContent>
            </Card>
          </TabsContent>

          {/* <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive email updates about your applications
                      </p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Password</h3>
                      <p className="text-sm text-muted-foreground">
                        Change your account password
                      </p>
                    </div>
                    <Button variant="outline">Update</Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-destructive">
                        Delete Account
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <Button variant="destructive">Delete</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}
        </Tabs>
      </div>
    </section>
  );
};

export default DashboardPage;
