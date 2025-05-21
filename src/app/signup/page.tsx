'use client';

import Link from "next/link";
import { useState } from "react";
import styles from "./index.module.css";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [tosAgreed, setTosAgreed] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        try {
            setError("");
            setLoading(true);

            // Validate inputs
            if (!email || !password || !confirmPassword) {
                setError("Please fill in all required fields");
                setLoading(false);
                return;
            }

            if (password !== confirmPassword) {
                setError("Passwords do not match");
                setLoading(false);
                return;
            }

            if (!tosAgreed) {
                setError("You must agree to the terms of service");
                setLoading(false);
                return;
            }

            const response = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    tos: tosAgreed,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Handle successful signup
                alert("Signup successful!");
                // Redirect to login page
                window.location.href = "/login";
            } else {
                // Handle signup error
                setError(data.message || "Unknown error occurred");
            }
        } catch (error) {
            console.error("Signup error:", error);
            setError("Failed to connect to server. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    Make <span className={styles.pinkSpan}>T3</span> Account
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
                    
                    <label className={styles.formLabel} htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    
                    <label className={styles.formCheckText} htmlFor="tos">
                        <input 
                            type="checkbox" 
                            name="tos" 
                            id="tos" 
                            checked={tosAgreed}
                            onChange={(e) => setTosAgreed(e.target.checked)}
                            required 
                        /> I agree to sell my soul
                    </label>
                    
                    <button 
                        type="button"
                        className={styles.formButton}
                        onClick={handleSignUp}
                        disabled={loading || !email || !password || !confirmPassword || !tosAgreed}
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                    
                    <div className={styles.formLinks}>
                        <Link href="/login">Already have an account? Log in</Link>
                        <Link href="https://github.com/LurckeA">View Creator</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}