"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
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

  const applications = [
    {
      id: 1,
      program: "Summer Internship",
      status: "In Review",
      date: "2025-03-12",
    },
    {
      id: 2,
      program: "Graduate Program",
      status: "Pending",
      date: "2025-04-01",
    },
  ];

  useEffect(() => {
    // Check if user is authenticated
    if (status === "unauthenticated") {
      router.push("/"); // Redirect to home if not logged in
      return;
    }

    // Check if user is trying to access their own dashboard
    if (status === "authenticated" && session?.user?.id) {
      if (session.user.id !== userId) {
        router.push("/");
      } else {
        // Simulate loading data
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    }
  }, [status, session, userId, router]);

  // Get user initials for avatar fallback
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

  // Loading state
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
    <section className="bg-[#FAF9F6]">
      <div className=" container mx-auto px-4 py-8">
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
          <Button>Edit Profile</Button>
        </div>

        <Tabs defaultValue="applications" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-3">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Your Applications</CardTitle>
                <CardDescription>
                  Track the status of your current applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                {applications.length > 0 ? (
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <Card key={app.id}>
                        <CardHeader className="py-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">
                              {app.program}
                            </CardTitle>
                            <Badge
                              variant={
                                app.status === "In Review"
                                  ? "outline"
                                  : app.status === "Pending"
                                  ? "secondary"
                                  : app.status === "Accepted"
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              {app.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3 pt-0">
                          <p className="text-sm text-muted-foreground">
                            Application Date:{" "}
                            {new Date(app.date).toLocaleDateString()}
                          </p>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <p className="text-muted-foreground mb-4">
                      You haven't submitted any applications yet
                    </p>
                    <Button>Start New Application</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Your personal and contact information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Personal Details</h3>
                    <Separator className="mb-3" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Full Name
                        </p>
                        <p>{session?.user?.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Email Address
                        </p>
                        <p>{session?.user?.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">User ID</p>
                        <p className="text-sm">{userId}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-1">Additional Information</h3>
                    <Separator className="mb-3" />
                    <p className="text-muted-foreground">
                      No additional information provided
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Complete Your Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
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
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default DashboardPage;
