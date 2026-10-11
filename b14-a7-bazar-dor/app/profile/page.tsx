import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?redirected=1&callbackUrl=/profile");

  const { user } = session;

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-600 text-3xl text-white">
          {user.name?.[0]?.toUpperCase() ?? "U"}
        </div>
        <h1 className="mt-4 text-2xl font-bold">{user.name}</h1>
        <p className="text-slate-500">{user.email}</p>
        <Link
          href="/profile/update"
          className="btn mt-6 bg-green-600 text-white hover:bg-green-700"
        >
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}