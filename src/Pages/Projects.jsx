import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, X } from "lucide-react";
import ProjectCard from "../Components/ProjectCard";
import { initialProjects } from "../Data/data";
import { getCurrentUser, readProjects } from "../utils/auth";

function getAllProjects() {
  const saved = readProjects([]);
  const savedIds = new Set(saved.map((project) => String(project.id)));
  return [
    ...saved,
    ...initialProjects.filter((project) => !savedIds.has(String(project.id))),
  ];
}

export default function Projects() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ყველა");
  const [projects, setProjects] = useState(getAllProjects);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Development",
    budget: "",
  });
  const navigate = useNavigate();
  const user = getCurrentUser();

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    return projects.filter(
      (project) =>
        (project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query)) &&
        (category === "ყველა" || project.category === category),
    );
  }, [projects, search, category]);

  function openCreateForm() {
    if (!user) {
      navigate("/login", { state: { from: "/projects" } });
      return;
    }
    if (user.role !== "client") {
      alert("პროექტის დამატება მხოლოდ დამკვეთის ანგარიშით არის შესაძლებელი.");
      return;
    }
    setShowForm(true);
  }

  function addProject(event) {
    event.preventDefault();
    const title = form.title.trim();
    const description = form.description.trim();
    const budget = Number(form.budget);
    if (!title || !description || !Number.isFinite(budget) || budget <= 0)
      return;

    const project = {
      id: crypto.randomUUID(),
      title,
      description,
      category: form.category,
      budget,
      client: user.name,
      clientId: user.id,
    };
    const next = [project, ...projects];
    setProjects(next);
    localStorage.setItem("worklink-projects", JSON.stringify(next));
    setForm({
      title: "",
      description: "",
      category: "Development",
      budget: "",
    });
    setShowForm(false);
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#263D2B]">პროექტები</h1>
          <p className="mt-2 text-slate-500">
            აღმოაჩინე პროექტები და ახალი შესაძლებლობები.
          </p>
        </div>
        <button
          onClick={openCreateForm}
          className="flex items-center gap-2 rounded-xl bg-[#52785A] px-4 py-3 font-semibold text-white hover:bg-[#3F6247]"
        >
          <Plus size={18} /> პროექტის დამატება
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={addProject}
          className="mt-7 rounded-2xl border border-[#DCE6DA] bg-[#F7F9F5] p-5 sm:p-7"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#263D2B]">ახალი პროექტი</h2>
            <button
              type="button"
              aria-label="ფორმის დახურვა"
              onClick={() => setShowForm(false)}
              className="rounded-lg p-2 hover:bg-white"
            >
              <X size={20} />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-[#35463A]">
              პროექტის სახელი
              <input
                required
                maxLength={80}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3"
                placeholder="მაგ. ვებგვერდის შექმნა"
              />
            </label>
            <label className="text-sm font-medium text-[#35463A]">
              კატეგორია
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3"
              >
                <option>Development</option>
                <option>Design</option>
                <option>Marketing</option>
              </select>
            </label>
            <label className="text-sm font-medium text-[#35463A] sm:col-span-2">
              აღწერა
              <textarea
                required
                maxLength={1000}
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3"
                placeholder="აღწერე რა სამუშაო უნდა შესრულდეს"
              />
            </label>
            <label className="text-sm font-medium text-[#35463A]">
              ბიუჯეტი (USD)
              <input
                required
                type="number"
                min="1"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3"
                placeholder="500"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-5 rounded-xl bg-[#52785A] px-5 py-3 font-semibold text-white hover:bg-[#3F6247]"
          >
            გამოქვეყნება
          </button>
        </form>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="მოძებნე პროექტი..."
          className="rounded-xl border border-slate-200 p-3 outline-none focus:border-[#52785A]"
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white p-3"
        >
          {["ყველა", "Development", "Design", "Marketing"].map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <p className="my-5 text-sm text-slate-500">
        ნაპოვნია {filtered.length} პროექტი
      </p>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="py-12 text-center text-slate-500">
          პროექტები ვერ მოიძებნა.
        </p>
      )}
      <p className="mt-8 text-xs leading-5 text-slate-400">
        შენიშვნა: პროექტები ინახება ამ ბრაუზერის localStorage-ში. სხვადასხვა
        მოწყობილობას შორის გაზიარებისთვის საჭიროა backend.
      </p>
      <Link to="/profile" className="sr-only">
        პროფილი
      </Link>
    </main>
  );
}
