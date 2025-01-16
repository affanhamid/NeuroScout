"use client";

import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const data = new FormData(event.target as HTMLFormElement);

    const result = await signIn("credentials", {
      username: data.get("username"),
      password: data.get("password"),
      action: isRegistering ? "register" : "login",
      redirect: false,
    });

    setIsLoading(false);

    if (!result?.ok) {
      setError(
        isRegistering
          ? result?.error || "Registration failed"
          : "Invalid username or password"
      ); 
    } else {
      const redirectMessage = isRegistering
        ? "Registration successful! Redirecting to dashboard..."
        : "Login successful! Redirecting to dashboard...";
      setError(null);
      alert(redirectMessage);
      router.push("/dashboard");
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>; // Prevent flashing content while session is being fetched
  }

  if (session) {
    router.push("/dashboard"); 
    return null; 
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h1>{isRegistering ? "Sign Up" : "Login"}</h1>
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
