import { Link, Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";
import { UserRound, BriefcaseBusiness } from "lucide-react";

export default function Profile() {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/login" replace />;
  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <div className="rounded-3xl border border-[#E2E9E1] bg-white p-7 shadow-sm sm:p-10">
        <div className="flex flex-wrap items-center gap-4">
          <div className="rounded-2xl bg-[#E1EADF] p-4 text-[#52785A]">
            <UserRound size={34} />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#66866B]">
              WORKLINK ანგარიში
            </p>
            <h1 className="text-3xl font-bold text-[#263D2B]">{user.name}</h1>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-[#F5F7F3] p-4">
            <p className="text-sm text-slate-500">ელფოსტა</p>
            <p className="mt-1 font-semibold text-[#263D2B]">{user.email}</p>
          </div>
          <div className="rounded-xl bg-[#F5F7F3] p-4">
            <p className="text-sm text-slate-500">ანგარიშის ტიპი</p>
            <p className="mt-1 flex items-center gap-2 font-semibold text-[#263D2B]">
              <BriefcaseBusiness size={17} />
              {user.role === "client" ? "დამკვეთი / ბიზნესი" : "ფრილანსერი"}
            </p>
          </div>
        </div>
        <p className="mt-6 text-sm leading-6 text-slate-500">
          ეს არის დემო პროფილი. რეალურ პროექტში პროფილის დამატებითი ინფორმაცია
          და ავტორიზაცია სერვერზე უნდა ინახებოდეს.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to={user.role === "client" ? "/projects" : "/freelancers"}
            className="rounded-xl bg-[#52785A] px-5 py-3 font-semibold text-white"
          >
            {user.role === "client"
              ? "პროექტების ნახვა"
              : "ფრილანსერების ნახვა"}
          </Link>
          <Link
            to="/"
            className="rounded-xl border border-[#C8D6C7] px-5 py-3 font-semibold text-[#456B4D]"
          >
            მთავარი გვერდი
          </Link>
        </div>
      </div>
    </main>
  );
}
