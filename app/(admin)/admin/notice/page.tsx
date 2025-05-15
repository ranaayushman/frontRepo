"use client";
import React, { useEffect, useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useNoticesAdmin } from "./useNoticeAdmin";
import { NoticeType } from "@/app/models/notice.model";

const NoticesAdmin = () => {
  const {
    notices,
    loading,
    error,
    success,
    fetchNotices,
    createNotice,
    updateNotice,
    deleteNotice,
    togglePublish,
  } = useNoticesAdmin();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<NoticeType | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isPublished: false,
  });
  const [formError, setFormError] = useState<string | null>(null);

  // Fetch notices on mount
  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  // Open dialog for creating or editing
  const openDialog = (notice?: NoticeType) => {
    if (notice) {
      setEditingNotice(notice);
      setFormData({
        title: notice.title,
        description: notice.description,
        isPublished: notice.isPublished,
      });
    } else {
      setEditingNotice(null);
      setFormData({ title: "", description: "", isPublished: false });
    }
    setFormError(null);
    setIsDialogOpen(true);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      setFormError("Title and description are required");
      return;
    }

    try {
      if (editingNotice) {
        await updateNotice(editingNotice._id!, {
          title: formData.title,
          description: formData.description,
          isPublished: formData.isPublished,
        });
      } else {
        await createNotice({
          title: formData.title,
          description: formData.description,
        });
      }
      setIsDialogOpen(false);
    } catch (err) {
      setFormError("Failed to save notice");
    }
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
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">Manage Notices</CardTitle>
                <CardDescription>
                  Create, update, or delete notices for the platform.
                </CardDescription>
              </div>
              <Button onClick={() => openDialog()}>Add Notice</Button>
            </div>
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

            {notices.length === 0 && !error ? (
              <div className="text-center py-10 text-gray-500">
                No notices found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Published</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notices.map((notice) => (
                      <TableRow key={notice._id}>
                        <TableCell className="font-medium">
                          {notice.title || "N/A"}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {notice.description || "N/A"}
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={notice.isPublished}
                            onCheckedChange={() =>
                              togglePublish(notice._id!, notice.isPublished)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          {new Date(notice.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openDialog(notice)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteNotice(notice._id!)}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Dialog for creating/editing notices */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingNotice ? "Edit Notice" : "Create Notice"}
              </DialogTitle>
              <DialogDescription>
                {editingNotice
                  ? "Update the notice details."
                  : "Add a new notice to the platform."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter notice title"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter notice description"
                  rows={4}
                />
              </div>
              {editingNotice && (
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isPublished"
                    checked={formData.isPublished}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isPublished: checked })
                    }
                  />
                  <label htmlFor="isPublished" className="text-sm font-medium">
                    Published
                  </label>
                </div>
              )}
              {formError && (
                <Alert className="bg-red-50 border-red-200">
                  <AlertDescription className="text-red-700">
                    {formError}
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {editingNotice ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default NoticesAdmin;
