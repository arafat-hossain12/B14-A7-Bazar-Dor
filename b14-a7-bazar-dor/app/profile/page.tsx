import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import SignOutButton from "../components/SignOutButton";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?redirected=1&callbackUrl=/profile");

  const { user } = session;

  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <div>
        <h1 className="text-3xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm text-ink/70">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-6">
        <div className="flex items-center gap-4">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt="" className="size-20 rounded-2xl object-cover" />
          ) : (
            <span className="flex size-20 items-center justify-center rounded-2xl bg-brand text-3xl font-semibold text-brand-content">
              {user.name?.[0]?.toUpperCase() ?? "U"}
            </span>
          )}
          <div>
            <p className="text-xl font-semibold">{user.name}</p>
            <p className="text-ink/70">{user.email}</p>
          </div>
        </div>
        <SignOutButton />
      </div>

      <div className="rounded-2xl border border-line bg-surface p-6">
        <h2 className="text-lg font-semibold">তথ্য</h2>
        <p className="mt-4 text-sm text-ink/70">নাম</p>
        <p className="mb-5 font-medium">{user.name}</p>
        <Link
          href="/profile/update"
          className="flex h-10 w-full items-center justify-center rounded-lg border border-brand-strong bg-brand text-sm font-semibold text-brand-content shadow-[0_3px_1px_rgba(5,137,62,0.3)] hover:bg-brand-strong"
        >
          আপডেট
        </Link>
      </div>
    </div>
  );
}