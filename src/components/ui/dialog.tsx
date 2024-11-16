import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const HomeButton = React.forwardRef(() => {
  return (
    <Link
      className="fixed top-5 left-10 text-white flex items-center gap-2 text-xl z-[60] cursor-pointer pointer-events-auto group"
      href="/"
    >
      <ArrowLeftIcon className="w-10 h-10 text-red-700 group-hover:-translate-x-3 transition-transform font-bold" />
    </Link>
  );
});

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-transparent backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <HomeButton />
    <DialogPrimitive.Content
      ref={ref}
      onInteractOutside={(event) => event.preventDefault()} // Prevent closing when clicking outside
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid max-w-3xl w-max translate-x-[-50%] translate-y-[-50%] gap-6 rounded-lg border border-zinc-200 bg-zinc-900 p-8 shadow-lg duration-200 data-[state=open]:fade-in data-[state=closed]:fade-out pointer-events-auto",
        className,
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-2 text-center", className)}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col sm:flex-row mt-6", className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-3xl font-bold text-white mt-5", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-lg text-zinc-400", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
