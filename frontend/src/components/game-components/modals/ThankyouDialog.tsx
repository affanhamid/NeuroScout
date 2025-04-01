"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ThankYouDialog = ({ redirectLink = "/" }: { redirectLink?: string }) => {
  const router = useRouter();

  useEffect(() => {
    if (redirectLink) {
      const timer = setTimeout(
        () => {
          router.push(redirectLink);
        },
        redirectLink.includes("test") ? 5000 : 3000
      );

      return () => clearTimeout(timer); // Cleanup timer on unmount
    } else {
      console.error("Invalid redirect link:", redirectLink);
    }
  }, [redirectLink, router]);

  return (
    <div className="bg-game-background absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <div className="text-white border-white border-2 rounded-xl w-1/2 h-1/2 flex flex-col items-center justify-center py-32">
        <h2 className="text-5xl text-center pb-10 flex flex-col gap-3">
          <span>Thank you for playing!</span>
          {redirectLink.includes("test") ? (
            <p className="text-xl pb-10">
              Uploading results and redirecting to organisation page...
            </p>
          ) : (
            <p className="text-xl pb-10">Redirecting to next game...</p>
          )}
        </h2>
      </div>
    </div>
  );
};

export default ThankYouDialog;
