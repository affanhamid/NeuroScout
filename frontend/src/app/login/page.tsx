"use client";

import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  // Handle redirection if the user is already logged in
  useEffect(() => {
    if (session) {
      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 1000); // Allow time to display the redirect message

      return () => clearTimeout(timer);
    }
  }, [session, router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const data = new FormData(event.target as HTMLFormElement);

    const result = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      action: isRegistering ? "register" : "login",
      redirect: false,
    });

    setIsLoading(false);

    if (!result?.ok) {
      setError(
        isRegistering
          ? result?.error || "Registration failed"
          : "Invalid email or password"
      );
    } else {
      router.push("/dashboard"); // Redirect directly without popups
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>; // Prevent flashing content while session is being fetched
  }

  if (session) {
    return (
      <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
        <h1>Welcome Back!</h1>
        <p>Redirecting you to your dashboard...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h1>{isRegistering ? "Sign Up" : "Login"}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" disabled={isLoading} style={{ marginTop: "1rem" }}>
          {isLoading
            ? isRegistering
              ? "Signing up..."
              : "Logging in..."
            : isRegistering
            ? "Sign Up"
            : "Login"}
        </button>
      </form>
      <p style={{ marginTop: "1rem" }}>
        {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          style={{
            background: "none",
            border: "none",
            color: "#0070f3",
            cursor: "pointer",
          }}
        >
          {isRegistering ? "Log in" : "Sign up"}
        </button>
      </p>
    </div>
  );
}
