import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import FreelancerCard from "../Components/FreelancerCard";
import { initialFreelancers } from "../Data/data";
import { getCurrentUser, readUsers } from "../utils/auth";

export default function Freelancers() {
  const currentUser = getCurrentUser();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ყველა");

  const [favorites, setFavorites] = useState(() => {
    try {
      const value = JSON.parse(
        localStorage.getItem("worklink-favorites") || "[]",
      );
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  });

  const allFreelancers = useMemo(() => {
    const registeredFreelancers = readUsers()
      .filter((user) => user.role === "freelancer")
      .map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        profession: user.profession || "ფრილანსერი",
        category: "Freelancer",
        skills: user.skills || [],
        rate: user.rate || null,
        rating: null,
        avatar:
          user.avatar ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.name,
          )}&background=E1EADF&color=263D2B`,
        bio: user.bio || "",
      }));

    return [...registeredFreelancers, ...initialFreelancers];
  }, []);

  const categories = [
    "ყველა",
    "Development",
    "Design",
    "Marketing",
    "Freelancer",
  ];

  function toggleFavorite(id) {
    setFavorites((previous) => {
      const next = previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id];

      localStorage.setItem("worklink-favorites", JSON.stringify(next));

      return next;
    });
  }

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();

    return allFreelancers.filter((person) => {
      const matchesText = [
        person.name,
        person.profession,
        person.email,
        ...person.skills,
      ].some((value) => String(value).toLowerCase().includes(query));

      return (
        matchesText && (category === "ყველა" || person.category === category)
      );
    });
  }, [search, category, allFreelancers]);

  if (currentUser?.role === "freelancer") {
    return <Navigate to="/clients" replace />;
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-10">
      <h1 className="text-3xl font-extrabold text-[#263D2B]">
        იპოვე ფრილანსერი
      </h1>

      <p className="mt-2 text-slate-500">
        დამკვეთებს შეუძლიათ მოძებნონ ფრილანსერები და დაუკავშირდნენ მათ.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="სახელი, ელფოსტა, პროფესია ან უნარი..."
          className="min-w-0 rounded-xl border border-slate-200 p-3"
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white p-3"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <p className="my-5 text-sm text-slate-500">შედეგები: {filtered.length}</p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((person) => (
          <FreelancerCard
            key={person.id}
            freelancer={person}
            isFavorite={favorites.includes(person.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-slate-500">
          ფრილანსერები ვერ მოიძებნა.
        </p>
      )}
    </main>
  );
}
