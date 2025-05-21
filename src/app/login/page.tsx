'use client';

import Link from "next/link";
import { useState } from "react";
import styles from "./index.module.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
            setError("");
            setLoading(true);
            
            // Validate inputs
            if (!email || !password) {
                setError("Please enter both email and password");
                return;
            }

            // Make API call to your login endpoint
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Login successful
                console.log("Login successful");
                
                // You might want to store the auth token or user data
                // For example:
                localStorage.setItem("authToken", data.token);
                
                // Redirect to dashboard or home page
                window.location.href = "/dashboard";
            } else {
                // Login failed - show error from server
                setError(data.message || "Invalid email or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Server error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    Log <span className={styles.pinkSpan}>In</span> Account
                </h1>
                <div className={styles.form}>
                    {error && <div className={styles.errorMessage}>{error}</div>}
                    
                    <label className={styles.formLabel} htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    
                    <label className={styles.formLabel} htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    
                    <button 
                        type="button" 
                        className={styles.formButton}
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                    
                    <div className={styles.formLinks}>
                        <Link href="/signup">Don't have an account? Sign up</Link>
                        <Link href="/forgot-password">Forgot password?</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}