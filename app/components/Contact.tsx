"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Define the form data structure
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  phoneNumber: string;
  address: string;
}

interface AdmissionFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  buttonText?: string;
}

export function AdmissionForm({
  isOpen,
  setIsOpen,
  buttonText = "Submit Application",
}: AdmissionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const form = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      phoneNumber: "",
      address: "",
    },
  });

  const handleSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate API call
    try {
      // Replace this with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form submitted:", data);

      setSubmitStatus("success");
      form.reset();
      setTimeout(() => {
        setIsOpen(false);
        setSubmitStatus(null);
      }, 1500);
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Apply for College Admission</DialogTitle>
          <DialogDescription>
            Fill out the form below and our admission counselors will get back
            to you as soon as possible.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {submitStatus === "success" && (
            <div className="bg-green-50 p-4 rounded-md text-green-700">
              Application received! We'll contact you shortly to discuss
              admission details.
            </div>
          )}

          {submitStatus === "error" && (
            <div className="bg-red-50 p-4 rounded-md text-red-700">
              There was a problem submitting your application. Please try again.
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Your full name"
              {...form.register("name", { required: true })}
              className={form.formState.errors.name ? "border-red-500" : ""}
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-sm">Please enter your name</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              placeholder="Your Phone Number"
              {...form.register("phoneNumber", { required: true })}
              className={
                form.formState.errors.phoneNumber ? "border-red-500" : ""
              }
            />
            {form.formState.errors.phoneNumber && (
              <p className="text-red-500 text-sm">Please enter your number</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              {...form.register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
              className={form.formState.errors.email ? "border-red-500" : ""}
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm">
                Please enter a valid email address
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="subject">Preferred Course</Label>
            <Input
              id="subject"
              placeholder="e.g., Engineering, Medicine, Business"
              {...form.register("subject", { required: true })}
              className={form.formState.errors.subject ? "border-red-500" : ""}
            />
            {form.formState.errors.subject && (
              <p className="text-red-500 text-sm">
                Please enter your preferred course
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              placeholder="Please provide your address."
              rows={4}
              {...form.register("address", { required: true })}
              className={form.formState.errors.address ? "border-red-500" : ""}
            />
            {form.formState.errors.address && (
              <p className="text-red-500 text-sm">
                Please provide your address
              </p>
            )}
          </div>

          <DialogFooter className="sm:justify-between">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : buttonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
