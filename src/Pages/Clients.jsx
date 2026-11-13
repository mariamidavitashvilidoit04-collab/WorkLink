import { useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowUpRight, Building2, Mail, Search } from "lucide-react";
import { getCurrentUser, readUsers } from "../utils/auth";

export default function Clients() {
  const currentUser = getCurrentUser();
  const [search, setSearch] = useState("");

  const clients = useMemo(
    () => readUsers().filter((user) => user.role === "client"),
    [],
  );

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();

    return clients.filter((client) =>
      [
        client.name,
        client.company,
        client.industry,
        client.email,
        client.bio,
      ].some((value) =>
        String(value || "")
          .toLowerCase()
          .includes(query),
      ),
    );
  }, [search, clients]);

  if (currentUser?.role === "client") {
    return <Navigate to="/freelancers" replace />;
  }

  if (!currentUser) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h1 className="text-3xl font-bold text-[#263D2B]">
          დამკვეთების პროფილები
        </h1>

        <p className="mt-3 text-slate-500">
          დამკვეთების სანახავად შედი ფრილანსერის ანგარიშით.
        </p>

        <Link
          to="/login"
          className="mt-6 inline-block rounded-xl bg-[#52785A] px-5 py-3 font-semibold text-white"
        >
          შესვლა
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-10">
      <h1 className="text-3xl font-extrabold text-[#263D2B]">იპოვე დამკვეთი</h1>

      <p className="mt-2 text-slate-500">
        ფრილანსერებს შეუძლიათ ნახონ დამკვეთებისა და კომპანიების პროფილები.
      </p>

      <div className="mt-6 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3">
        <Search size={19} className="text-slate-400" />

        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="კომპანიის სახელი, სფერო ან ელფოსტა..."
          className="w-full py-3 outline-none"
        />
      </div>

      <p className="my-5 text-sm text-slate-500">შედეგები: {filtered.length}</p>

      {filtered.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((client) => (
            <article
              key={client.id}
              className="flex flex-col rounded-2xl border border-[#E2E9E1] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E1EADF] text-[#52785A]">
                <Building2 size={28} />
              </div>

              <h2 className="mt-4 text-lg font-bold text-[#263D2B]">
                {client.name}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {client.industry || "დამკვეთი / ბიზნესი"}
              </p>

              {client.bio && (
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                  {client.bio}
                </p>
              )}

              <div className="mt-auto border-t border-[#E2E9E1] pt-4">
                <p className="flex items-center gap-2 break-all text-xs text-slate-500">
                  <Mail size={14} />
                  {client.email}
                </p>

                <Link
                  to={`/clients/${client.id}`}
                  className="mt-4 inline-flex items-center gap-1 rounded-lg bg-[#52785A] px-3 py-2 text-sm font-semibold text-white hover:bg-[#3F6247]"
                >
                  პროფილი
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="rounded-2xl bg-[#F5F7F3] py-12 text-center text-slate-500">
          დამკვეთების პროფილები ჯერ არ არის დამატებული.
        </p>
      )}
    </main>
  );
}
