// ThankYouDialog.tsx

"use client";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface FormFieldInterface {
  id: string;
  label: string;
  type: "text" | "number" | "select";
  options?: string[]; // For select type
  validation?: (value: string) => string | null;
}

interface ThankYouDialogProps<T> {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: T) => void;
  formFields: FormFieldInterface[];
}

export const ThankYouDialog = <T extends Record<string, any>>({
  show,
  onClose,
  onSubmit,
  formFields,
}: ThankYouDialogProps<T>) => {
  const [formData, setFormData] = React.useState<T>({} as T);
  const [consent, setConsent] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleChange = (fieldId: string, value: string) => {
    setFormData({ ...formData, [fieldId]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors: Record<string, string> = {};

    formFields.forEach((field) => {
      const value = formData[field.id];
      if (field.validation) {
        const error = field.validation(value);
        if (error) {
          newErrors[field.id] = error;
          valid = false;
        }
      }
    });

    if (!consent) {
      newErrors.consent = "You must consent to submit your data.";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thank You for Playing!</DialogTitle>
          <DialogDescription>
            To view your scores, please fill out the form below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {formFields.map((field) => (
            <div key={field.id}>
              <label
                htmlFor={field.id}
                className="block text-sm font-medium text-white"
              >
                {field.label}
              </label>
              {field.type === "select" ? (
                <select
                  id={field.id}
                  value={formData[field.id] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm appearance-none"
                  required
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  id={field.id}
                  value={formData[field.id] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm appearance-none"
                  required
                />
              )}
              {errors[field.id] && (
                <p className="text-red-500 text-sm mt-1">{errors[field.id]}</p>
              )}
            </div>
          ))}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="h-4 w-4 text-green-600 border-gray-300 rounded"
              required
            />
            <label htmlFor="consent" className="ml-2 block text-sm text-white">
              Do you consent to giving out your data?
            </label>
            {errors.consent && (
              <p className="text-red-500 text-sm mt-1">{errors.consent}</p>
            )}
          </div>
          <DialogFooter className="flex w-full justify-between">
            <Link href="/">
              <Button className="text-black bg-green-500 px-6 py-3 rounded-md hover:bg-green-600">
                Back to Home Page
              </Button>
            </Link>
            <Button
              type="submit"
              className="text-black bg-green-500 px-6 py-3 rounded-md hover:bg-green-600"
            >
              Submit and See Results
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
