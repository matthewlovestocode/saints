import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { signUp } from "../actions";
import { getAuthMessage, type AuthSearchParams } from "../authParams";
import styles from "../auth.module.css";

export const metadata: Metadata = {
  title: "Sign Up",
};

type SignUpPageProps = {
  searchParams: AuthSearchParams;
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const { error, message } = await getAuthMessage(searchParams);

  return (
    <Container className={styles.page}>
      <section className={styles.panel}>
        <Link className={styles.backLink} href="/">
          Back to saints
        </Link>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Account</p>
          <h1>Sign up</h1>
          <p>Create an Orthodox Saints account.</p>
        </header>
        {message ? <p className={styles.notice}>{message}</p> : null}
        {error ? <p className={styles.error}>{error}</p> : null}
        <form className={styles.form} action={signUp}>
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
              autoComplete="new-password"
              id="password"
              minLength={6}
              name="password"
              required
              type="password"
            />
          </div>
          <button className={styles.button} type="submit">
            Sign up
          </button>
        </form>
        <p className={styles.footer}>
          Already have an account? <Link href="/sign-in">Sign in</Link>
        </p>
      </section>
    </Container>
  );
}
