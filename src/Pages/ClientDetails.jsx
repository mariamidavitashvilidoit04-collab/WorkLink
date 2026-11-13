import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Building2, Mail } from "lucide-react";
import { getCurrentUser, readUsers } from "../utils/auth";

export default function ClientDetails() {
  const { id } = useParams();
  const currentUser = getCurrentUser();

  if (currentUser?.role === "client") {
    return <Navigate to="/freelancers" replace />;
  }

  const client = readUsers().find(
    (user) => String(user.id) === id && user.role === "client",
  );

  if (!client) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h1 className="text-3xl font-bold text-[#263D2B]">
          დამკვეთი ვერ მოიძებნა
        </h1>

        <Link to="/clients" className="mt-5 inline-block text-[#52785A]">
          ← დამკვეთებთან დაბრუნება
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <Link
        to="/clients"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#52785A]"
      >
        <ArrowLeft size={17} />
        ყველა დამკვეთი
      </Link>

      <section className="mt-6 rounded-3xl border border-[#E2E9E1] bg-white p-7 shadow-sm sm:p-10">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#E1EADF] text-[#52785A]">
            <Building2 size={38} />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#66866B]">
              დამკვეთის პროფილი
            </p>

            <h1 className="text-3xl font-bold text-[#263D2B]">{client.name}</h1>

            <p className="mt-1 text-slate-500">
              {client.industry || "დამკვეთი / ბიზნესი"}
            </p>
          </div>
        </div>

        {client.bio && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-[#263D2B]">ჩვენ შესახებ</h2>

            <p className="mt-2 whitespace-pre-wrap leading-7 text-slate-600">
              {client.bio}
            </p>
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-[#DCE7DA] bg-[#F5F7F3] p-5">
          <h2 className="text-lg font-bold text-[#263D2B]">
            დაუკავშირდი დამკვეთს
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            დაუკავშირდი ელფოსტით და შესთავაზე შენი მომსახურება.
          </p>

          <a
            href={`mailto:${client.email}?subject=${encodeURIComponent(
              "WorkLink-ზე თანამშრომლობა",
            )}`}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#52785A] px-5 py-3 font-semibold text-white hover:bg-[#3F6247]"
          >
            <Mail size={18} />
            მისწერე ელფოსტაზე
          </a>

          <p className="mt-3 break-all text-sm text-[#456B4D]">
            {client.email}
          </p>
        </div>
      </section>
    </main>
  );
}
