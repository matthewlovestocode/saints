import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { signIn } from "../actions";
import { getAuthMessage, type AuthSearchParams } from "../authParams";
import styles from "../auth.module.css";

export const metadata: Metadata = {
  title: "Sign In | Orthodox Saints",
};

type SignInPageProps = {
  searchParams: AuthSearchParams;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { error, message } = await getAuthMessage(searchParams);

  return (
    <Container className={styles.page}>
      <section className={styles.panel}>
        <Link className={styles.backLink} href="/">
          Back to saints
        </Link>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Account</p>
          <h1>Sign in</h1>
          <p>Return to your Orthodox Saints account.</p>
        </header>
        {message ? <p className={styles.notice}>{message}</p> : null}
        {error ? <p className={styles.error}>{error}</p> : null}
        <form className={styles.form} action={signIn}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              autoComplete="email"
              id="email"
              name="email"
              required
              type="email"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              autoComplete="current-password"
              id="password"
              minLength={6}
              name="password"
              required
              type="password"
            />
          </div>
          <button className={styles.button} type="submit">
            Sign in
          </button>
        </form>
        <p className={styles.footer}>
          Need an account? <Link href="/sign-up">Sign up</Link>
        </p>
      </section>
    </Container>
  );
}
