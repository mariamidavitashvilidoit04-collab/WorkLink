import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Users, BriefcaseBusiness, ArrowRight } from "lucide-react";
import { initialFreelancers, initialProjects } from "../Data/data";
import FreelancerCard from "../Components/FreelancerCard";
import ProjectCard from "../Components/ProjectCard";
import { readProjects } from "../utils/auth";

const categories = ["ყველა", "Development", "Design", "Marketing"];
function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ყველა");
  const [favorites, setFavorites] = useState(() =>
    readStorage("worklink-favorites", []),
  );
  const [projects] = useState(() => {
    const saved = readProjects([]);
    const savedIds = new Set(saved.map((project) => String(project.id)));
    return [
      ...saved,
      ...initialProjects.filter((project) => !savedIds.has(String(project.id))),
    ];
  });

  function toggleFavorite(id) {
    setFavorites((previous) => {
      const next = previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id];
      localStorage.setItem("worklink-favorites", JSON.stringify(next));
      return next;
    });
  }

  const filteredFreelancers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return initialFreelancers.filter((person) => {
      const matchesSearch = [
        person.name,
        person.profession,
        ...person.skills,
      ].some((value) => value.toLowerCase().includes(query));
      return (
        matchesSearch && (category === "ყველა" || person.category === category)
      );
    });
  }, [search, category]);

  return (
    <div>
      <section className="bg-[#E1EADF]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-block rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#456B4D]">
              შენი შემდეგი პროექტი აქ იწყება
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-[#263D2B] sm:text-5xl">
              იპოვე სწორი ადამიანი შენი იდეისთვის.
            </h1>
            <p className="mt-5 max-w-lg leading-7 text-slate-700">
              დაუკავშირდი პროფესიონალ ფრილანსერებს, იპოვე საინტერესო პროექტები
              და განავითარე შენი კარიერა WorkLink-თან ერთად.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/freelancers"
                className="rounded-xl bg-[#52785A] px-5 py-3 font-semibold text-white shadow-sm hover:bg-[#3F6247]"
              >
                იპოვე ფრილანსერი
              </Link>
              <Link
                to="/projects"
                className="rounded-xl border border-[#52785A] bg-white px-5 py-3 font-semibold text-[#456B4D]"
              >
                ნახე პროექტები
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-[#263D2B]">
              <span className="flex items-center gap-2">
                <Users size={19} /> ნიჭიერი სპეციალისტები
              </span>
              <span className="flex items-center gap-2">
                <BriefcaseBusiness size={19} /> საინტერესო პროექტები
              </span>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-xl sm:p-7">
            <p className="text-sm font-semibold text-[#52785A]">დაიწყე ძიება</p>
            <h2 className="mt-2 text-2xl font-bold text-[#263D2B]">
              რა გჭირდება დღეს?
            </h2>
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
              <Search className="shrink-0 text-slate-400" size={20} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="მაგ. React, დიზაინი..."
                className="w-full bg-transparent outline-none"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`rounded-full px-4 py-2 text-sm ${category === item ? "bg-[#52785A] text-white" : "bg-[#F0F4EF] text-[#456B4D] hover:bg-[#E1EADF]"}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <p className="mt-5 text-sm text-slate-500">
              ნაპოვნია {filteredFreelancers.length} ფრილანსერი
            </p>
            <Link
              to="/freelancers"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#52785A]"
            >
              ძიების შედეგების ნახვა <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#52785A]">
              აღმოაჩინე შესაძლებლობები
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#263D2B] sm:text-3xl">
              პოპულარული ფრილანსერები
            </h2>
          </div>
          <Link
            to="/freelancers"
            className="flex shrink-0 items-center gap-1 text-sm font-semibold text-[#52785A]"
          >
            ყველას ნახვა <ArrowRight size={17} />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredFreelancers.slice(0, 4).map((person) => (
            <FreelancerCard
              key={person.id}
              freelancer={person}
              isFavorite={favorites.includes(person.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
        {filteredFreelancers.length === 0 && (
          <p className="rounded-xl bg-slate-50 p-6 text-center text-slate-500">
            შესაბამისი ფრილანსერი ვერ მოიძებნა.
          </p>
        )}
      </section>

      <section className="bg-[#F5F7F3] py-14">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#52785A]">
                ახალი შესაძლებლობები
              </p>
              <h2 className="mt-2 text-2xl font-bold text-[#263D2B] sm:text-3xl">
                აქტიური პროექტები
              </h2>
            </div>
            <Link
              to="/projects"
              className="flex shrink-0 items-center gap-1 text-sm font-semibold text-[#52785A]"
            >
              ყველა პროექტი <ArrowRight size={17} />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
