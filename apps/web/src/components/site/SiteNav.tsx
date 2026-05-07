import Link from "next/link";
import { signOut } from "@/app/(auth)/actions";
import { hasSupabaseConfig } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import styles from "./site.module.css";

export async function SiteNav() {
  const user = await getUser();

  return (
    <header className={styles.nav}>
      <Link className={styles.brand} href="/">
        Orthodox Saints
      </Link>
      <nav className={styles.links} aria-label="Primary navigation">
        <Link href="/">Saints</Link>
        {user ? (
          <form action={signOut}>
            <button type="submit">Sign out</button>
          </form>
        ) : (
          <>
            <Link href="/sign-in">Sign in</Link>
            <Link className={styles.primaryLink} href="/sign-up">
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

async function getUser() {
  if (!hasSupabaseConfig()) {
    return null;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
