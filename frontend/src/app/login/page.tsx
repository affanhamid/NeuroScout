"use client";

import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session, status } = useSession(); // Manage session state
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null); // Clear previous errors
    setIsLoading(true); // Show a loading state

    const data = new FormData(event.target as HTMLFormElement);

    const result = await signIn("credentials", {
      username: data.get("username"),
      password: data.get("password"),
      redirect: false, // Prevent automatic redirection
    });

    setIsLoading(false);

    if (!result?.ok) {
      setError("Invalid username or password"); // Display error message
    } else {
      router.push("/dashboard"); // Redirect to the dashboard
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>; // Prevent flashing content while session is being fetched
  }

  if (session) {
    router.push("/dashboard"); // Redirect if already logged in
    return null; // Prevent rendering while redirecting
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
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
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
