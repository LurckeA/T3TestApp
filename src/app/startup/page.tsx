import Link from "next/link";

import styles from "./index.module.css";

export default function StartUp() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    Account <span className={styles.pinkSpan}>Testing</span> App
                </h1>
                <div className={styles.signlogRow}>
                    <Link
                        className={styles.signUp}
                        href="/signup"
                    >
                        <h3 className={styles.acctitle}>Sign Up →</h3>
                        <div className={styles.accText}>
                            Create an account to start using the app.
                        </div>
                    </Link>
                    <Link
                        className={styles.logIn}
                        href="/      login"
                    >
                        <h3 className={styles.acctitle}>Login →</h3>
                        <div className={styles.accText}>
                            Login to your account to access the app.
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    );
}