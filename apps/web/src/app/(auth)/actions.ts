"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function getCredential(formData: FormData, name: string) {
  const value = formData.get(name);

  return typeof value === "string" ? value.trim() : "";
}

function redirectWithError(path: "/sign-in" | "/sign-up", message: string) {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

export async function signIn(formData: FormData) {
  const email = getCredential(formData, "email");
  const password = getCredential(formData, "password");

  if (!email || !password) {
    redirectWithError("/sign-in", "Email and password are required.");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirectWithError("/sign-in", error.message);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signUp(formData: FormData) {
  const email = getCredential(formData, "email");
  const password = getCredential(formData, "password");

  if (!email || !password) {
    redirectWithError("/sign-up", "Email and password are required.");
  }

  const origin = (await headers()).get("origin");
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: origin
      ? {
          emailRedirectTo: `${origin}/auth/confirm`,
        }
      : undefined,
  });

  if (error) {
    redirectWithError("/sign-up", error.message);
  }

  revalidatePath("/", "layout");
  redirect(
    `/sign-in?message=${encodeURIComponent("Check your email to confirm your account.")}`,
  );
}

export async function signOut() {
  const supabase = await createClient();

  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/sign-in");
}
