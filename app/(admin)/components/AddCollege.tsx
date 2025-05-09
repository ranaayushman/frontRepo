"use client";
import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trash2, Plus, Pencil, School } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Interfaces for type safety
interface Branch {
  id?: string | null; // Client-side ID
  _id?: string; // Server-side MongoDB ID
  name: string;
}

interface College {
  _id?: string; // Server-side MongoDB ID
  id?: string | null; // Client-side ID for UI compatibility
  name: string;
  branches: Branch[];
}

interface Notification {
  show: boolean;
  message: string;
  type: "success" | "error" | "";
}

function CollegeManager() {
  // State management with TypeScript types
  const [colleges, setColleges] = useState<College[]>([]);
  const [college, setCollege] = useState<College>({
    id: null,
    name: "",
    branches: [{ id: null, name: "" }],
  });
  const [notification, setNotification] = useState<Notification>({
    show: false,
    message: "",
    type: "",
  });
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [collegeToDelete, setCollegeToDelete] = useState<College | null>(null);
  const [branchDialogOpen, setBranchDialogOpen] = useState<boolean>(false);
  const [currentBranch, setCurrentBranch] = useState<Branch>({
    id: null,
    name: "",
  });
  const [branchEditMode, setBranchEditMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch colleges on mount
  useEffect(() => {
    fetchColleges();
  }, []);

  // Fetch colleges from API
  const fetchColleges = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/v1/colleges");
      if (response.data.success) {
        // Map server data to client format
        const collegesData = response.data.data.map((college: College) => ({
          ...college,
          id: college._id,
          branches: college.branches.map((branch) => ({
            ...branch,
            id: branch._id || branch.id || Date.now().toString(),
          })),
        }));
        setColleges(collegesData);
      } else {
        showNotification("Failed to fetch colleges", "error");
      }
    } catch (error) {
      handleAxiosError(error, "Failed to fetch colleges");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form when switching to add mode
  useEffect(() => {
    if (!isEditMode) {
      resetForm();
    }
  }, [isEditMode]);

  // Handler for college form changes
  const handleCollegeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setCollege((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Branch handlers
  const handleBranchChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    const updatedBranches = [...college.branches];
    updatedBranches[index] = {
      ...updatedBranches[index],
      [name]: value,
    };
    setCollege((prev) => ({
      ...prev,
      branches: updatedBranches,
    }));
  };

  const addBranch = (): void => {
    setCollege((prev) => ({
      ...prev,
      branches: [...prev.branches, { id: Date.now().toString(), name: "" }],
    }));
  };

  const removeBranch = (index: number): void => {
    const updatedBranches = college.branches.filter((_, i) => i !== index);
    setCollege((prev) => ({
      ...prev,
      branches: updatedBranches,
    }));
  };

  // Form submission handler
  const handleSubmit = async (): Promise<void> => {
    if (!college.name.trim()) {
      showNotification("College name is required", "error");
      return;
    }

    setIsLoading(true);
    try {
      // Prepare data, excluding client-generated IDs for branches
      const collegeData = {
        name: college.name,
        branches: college.branches
          .filter((branch) => branch.name.trim())
          .map((branch) => ({ name: branch.name })), // Send only name to server
      };

      if (isEditMode && college._id) {
        // Update existing college
        const response = await axios.put("/api/v1/colleges", {
          id: college._id,
          ...collegeData,
        });
        if (response.data.success) {
          setColleges((prev) =>
            prev.map((c) =>
              c._id === college._id
                ? {
                    ...response.data.data,
                    id: college._id,
                    branches: response.data.data.branches.map((b: Branch) => ({
                      ...b,
                      id: b._id,
                    })),
                  }
                : c
            )
          );
          showNotification(response.data.message, "success");
        } else {
          showNotification(
            response.data.message || "Failed to update college",
            "error"
          );
        }
      } else {
        // Add new college
        const response = await axios.post("/api/v1/colleges", collegeData);
        if (response.data.success) {
          setColleges((prev) => [
            ...prev,
            {
              ...response.data.data,
              id: response.data.data._id,
              branches: response.data.data.branches.map((b: Branch) => ({
                ...b,
                id: b._id,
              })),
            },
          ]);
          showNotification(response.data.message, "success");
        } else {
          showNotification(
            response.data.message || "Failed to add college",
            "error"
          );
        }
      }

      resetForm();
      setIsEditMode(false);
    } catch (error) {
      handleAxiosError(
        error,
        isEditMode ? "Failed to update college" : "Failed to add college"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form
  const resetForm = (): void => {
    setCollege({
      id: null,
      name: "",
      branches: [{ id: Date.now().toString(), name: "" }],
    });
  };

  // Edit college handler
  const handleEditCollege = (collegeToEdit: College): void => {
    setCollege({
      ...collegeToEdit,
      branches:
        collegeToEdit.branches.length > 0
          ? collegeToEdit.branches.map((b) => ({
              ...b,
              id: b._id || b.id,
            }))
          : [{ id: Date.now().toString(), name: "" }],
    });
    setIsEditMode(true);
  };

  // Delete college handlers
  const openDeleteDialog = (college: College): void => {
    setCollegeToDelete(college);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteCollege = async (): Promise<void> => {
    if (!collegeToDelete || !collegeToDelete._id) return;

    setIsLoading(true);
    try {
      const response = await axios.delete("/api/v1/colleges", {
        data: { id: collegeToDelete._id },
      });
      if (response.data.success) {
        setColleges((prev) =>
          prev.filter((c) => c._id !== collegeToDelete._id)
        );
        showNotification(response.data.message, "success");
      } else {
        showNotification(
          response.data.message || "Failed to delete college",
          "error"
        );
      }
      setIsDeleteDialogOpen(false);
      setCollegeToDelete(null);
    } catch (error) {
      handleAxiosError(error, "Failed to delete college");
    } finally {
      setIsLoading(false);
    }
  };

  // Branch management dialog handlers
  const openBranchDialog = (
    college: College,
    branch: Branch | null = null,
    isEdit: boolean = false
  ): void => {
    setSelectedCollege(college);
    setBranchEditMode(isEdit);
    setCurrentBranch(
      branch
        ? { ...branch, id: branch._id || branch.id }
        : { id: null, name: "" }
    );
    setBranchDialogOpen(true);
  };

  const saveBranch = async (): Promise<void> => {
    if (!currentBranch.name.trim()) {
      showNotification("Branch name is required", "error");
      return;
    }

    if (!selectedCollege || !selectedCollege._id) return;

    const updatedBranches = branchEditMode
      ? selectedCollege.branches.map((b) =>
          (b._id || b.id) === (currentBranch._id || currentBranch.id)
            ? currentBranch
            : b
        )
      : [
          ...selectedCollege.branches,
          { ...currentBranch, id: Date.now().toString() },
        ];

    setIsLoading(true);
    try {
      const response = await axios.put("/api/v1/colleges", {
        id: selectedCollege._id,
        branches: updatedBranches
          .filter((branch) => branch.name.trim())
          .map((branch) => ({ name: branch.name })), // Send only name to server
      });
      if (response.data.success) {
        setColleges((prev) =>
          prev.map((c) =>
            c._id === selectedCollege._id
              ? {
                  ...response.data.data,
                  id: c._id,
                  branches: response.data.data.branches.map((b: Branch) => ({
                    ...b,
                    id: b._id,
                  })),
                }
              : c
          )
        );
        showNotification(
          `Branch ${branchEditMode ? "updated" : "added"} successfully`,
          "success"
        );
      } else {
        showNotification(
          response.data.message || "Failed to update branch",
          "error"
        );
      }
      setBranchDialogOpen(false);
    } catch (error) {
      handleAxiosError(
        error,
        `Failed to ${branchEditMode ? "update" : "add"} branch`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBranch = async (
    collegeId: string,
    branchId: string
  ): Promise<void> => {
    const college = colleges.find((c) => c._id === collegeId);
    if (!college) return;

    const updatedBranches = college.branches.filter(
      (b) => (b._id || b.id) !== branchId
    );

    setIsLoading(true);
    try {
      const response = await axios.put("/api/v1/colleges", {
        id: collegeId,
        branches: updatedBranches.map((branch) => ({ name: branch.name })), // Send only name to server
      });
      if (response.data.success) {
        setColleges((prev) =>
          prev.map((c) =>
            c._id === collegeId
              ? {
                  ...response.data.data,
                  id: c._id,
                  branches: response.data.data.branches.map((b: Branch) => ({
                    ...b,
                    id: b._id,
                  })),
                }
              : c
          )
        );
        showNotification("Branch deleted successfully", "success");
      } else {
        showNotification(
          response.data.message || "Failed to delete branch",
          "error"
        );
      }
    } catch (error) {
      handleAxiosError(error, "Failed to delete branch");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Axios errors
  const handleAxiosError = (error: unknown, defaultMessage: string): void => {
    if (error instanceof AxiosError && error.response) {
      showNotification(error.response.data.message || defaultMessage, "error");
    } else {
      showNotification(defaultMessage, "error");
    }
  };

  // Notification handler
  const showNotification = (
    message: string,
    type: "success" | "error"
  ): void => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      3000
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-6">
      <Tabs defaultValue="list">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="list">College List</TabsTrigger>
          <TabsTrigger value="add">
            {isEditMode ? "Edit College" : "Add College"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <School className="h-6 w-6" />
                College Directory
              </CardTitle>
              <CardDescription>
                View, edit, or delete colleges and their branches.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {notification.show && (
                <Alert
                  className={`mb-4 ${
                    notification.type === "success"
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <AlertDescription
                    className={
                      notification.type === "success"
                        ? "text-green-700"
                        : "text-red-700"
                    }
                  >
                    {notification.message}
                  </AlertDescription>
                </Alert>
              )}

              {isLoading ? (
                <div className="text-center py-10 text-gray-500">
                  Loading colleges...
                </div>
              ) : colleges.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  No colleges found. Add your first college!
                </div>
              ) : (
                <div className="space-y-6">
                  {colleges.map((college) => (
                    <Card key={college._id} className="border border-gray-200">
                      <CardHeader className="bg-gray-50 pb-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle>{college.name}</CardTitle>
                          </div>
                          <div className="flex gap-2">
                            {/* <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditCollege(college)}
                              disabled={isLoading}
                            >
                              <Pencil size={16} className="mr-1" /> Edit
                            </Button> */}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => openDeleteDialog(college)}
                              disabled={isLoading}
                            >
                              <Trash2 size={16} className="mr-1" /> Delete
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium">
                            Branches ({college.branches.length})
                          </h3>
                          <Button
                            size="sm"
                            onClick={() => openBranchDialog(college)}
                            disabled={isLoading}
                          >
                            <Plus size={16} className="mr-1" /> Add Branch
                          </Button>
                        </div>

                        {college.branches.length > 0 ? (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Branch Name</TableHead>
                                <TableHead className="text-right">
                                  Actions
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {college.branches.map((branch) => (
                                <TableRow key={branch._id || branch.id}>
                                  <TableCell className="font-medium">
                                    {branch.name}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() =>
                                          openBranchDialog(
                                            college,
                                            branch,
                                            true
                                          )
                                        }
                                        disabled={isLoading}
                                      >
                                        <Pencil size={16} />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() =>
                                          college._id &&
                                          (branch._id || branch.id) &&
                                          deleteBranch(
                                            college._id,
                                            branch._id || branch.id!
                                          )
                                        }
                                        disabled={isLoading}
                                      >
                                        <Trash2 size={16} />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        ) : (
                          <div className="text-center py-4 text-gray-500 border rounded-md">
                            No branches added for this college yet.
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">
                {isEditMode ? "Edit College" : "Add New College"}
              </CardTitle>
              <CardDescription>
                {isEditMode
                  ? "Update the college and its branches."
                  : "Enter college name and add branches."}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {notification.show && (
                <Alert
                  className={`${
                    notification.type === "success"
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <AlertDescription
                    className={
                      notification.type === "success"
                        ? "text-green-700"
                        : "text-red-700"
                    }
                  >
                    {notification.message}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <h3 className="text-lg font-medium">College Information</h3>
                <div className="space-y-2">
                  <Label htmlFor="name">College Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={college.name}
                    onChange={handleCollegeChange}
                    placeholder="Enter college name"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Branches</h3>
                  <Button
                    type="button"
                    onClick={addBranch}
                    size="sm"
                    className="flex items-center gap-1"
                    disabled={isLoading}
                  >
                    <Plus size={16} /> Add Branch
                  </Button>
                </div>

                {college.branches.map((branch, index) => (
                  <Card
                    key={branch.id || index}
                    className="border border-gray-200"
                  >
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Branch #{index + 1}</h4>
                        {college.branches.length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeBranch(index)}
                            disabled={isLoading}
                          >
                            <Trash2 size={16} />
                          </Button>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`branch-name-${index}`}>
                          Branch Name
                        </Label>
                        <Input
                          id={`branch-name-${index}`}
                          name="name"
                          value={branch.name}
                          onChange={(e) => handleBranchChange(index, e)}
                          placeholder="e.g. Computer Science"
                          disabled={isLoading}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex justify-end gap-2">
              {isEditMode && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditMode(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              )}
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                disabled={isLoading}
              >
                Reset
              </Button>
              <Button type="button" onClick={handleSubmit} disabled={isLoading}>
                {isLoading
                  ? "Processing..."
                  : isEditMode
                  ? "Update College"
                  : "Save College"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete College Confirmation Dialog */}
      {isDeleteDialogOpen && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {collegeToDelete?.name}? This
                action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDeleteCollege}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Branch Management Dialog */}
      {branchDialogOpen && (
        <Dialog open={branchDialogOpen} onOpenChange={setBranchDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {branchEditMode ? "Edit Branch" : "Add New Branch"}
              </DialogTitle>
              <DialogDescription>
                {branchEditMode
                  ? `Update branch for ${selectedCollege?.name}`
                  : `Add a new branch to ${selectedCollege?.name}`}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="branch-name">Branch Name</Label>
                <Input
                  id="branch-name"
                  value={currentBranch.name}
                  onChange={(e) =>
                    setCurrentBranch({ ...currentBranch, name: e.target.value })
                  }
                  placeholder="e.g. Computer Science"
                  disabled={isLoading}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setBranchDialogOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button onClick={saveBranch} disabled={isLoading}>
                {isLoading
                  ? "Processing..."
                  : branchEditMode
                  ? "Update Branch"
                  : "Add Branch"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default CollegeManager;
