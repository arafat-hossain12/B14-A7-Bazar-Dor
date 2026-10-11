import { Suspense } from "react";
import SignInForm from "./SignInForm";

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="skeleton mx-auto mt-12 h-96 w-full max-w-md" />}>
      <SignInForm />
    </Suspense>
  );
}