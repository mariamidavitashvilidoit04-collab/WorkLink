import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BriefcaseBusiness } from "lucide-react";
import { initialProjects } from "../Data/data";
import { readProjects } from "../utils/auth";

export default function ProjectDetails() {
  const { id } = useParams();
  const saved = readProjects([]);
  const savedIds = new Set(saved.map((item) => String(item.id)));
  const projects = [
    ...saved,
    ...initialProjects.filter((item) => !savedIds.has(String(item.id))),
  ];
  const project = projects.find((item) => String(item.id) === id);

  if (!project)
    return (
      <main className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h1 className="text-3xl font-bold text-[#263D2B]">
          პროექტი ვერ მოიძებნა
        </h1>
        <Link to="/projects" className="mt-5 inline-block text-[#52785A]">
          ← პროექტებთან დაბრუნება
        </Link>
      </main>
    );

  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#52785A]"
      >
        <ArrowLeft size={17} /> ყველა პროექტი
      </Link>
      <article className="mt-6 rounded-3xl border border-[#E2E9E1] bg-white p-7 shadow-sm sm:p-10">
        <div className="flex items-center gap-3">
          <span className="rounded-xl bg-[#E1EADF] p-3 text-[#52785A]">
            <BriefcaseBusiness size={25} />
          </span>
          <span className="rounded-full bg-[#EAF2E8] px-3 py-1 text-xs font-semibold text-[#456B4D]">
            {project.category}
          </span>
        </div>
        <h1 className="mt-6 text-3xl font-bold text-[#263D2B]">
          {project.title}
        </h1>
        <p className="mt-4 leading-7 text-slate-600">{project.description}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-[#F5F7F3] p-4">
            <p className="text-sm text-slate-500">ბიუჯეტი</p>
            <p className="mt-1 text-2xl font-bold text-[#263D2B]">
              ${Number(project.budget).toLocaleString("en-US")}
            </p>
          </div>
          <div className="rounded-xl bg-[#F5F7F3] p-4">
            <p className="text-sm text-slate-500">დამკვეთი</p>
            <p className="mt-1 font-semibold text-[#263D2B]">
              {project.client}
            </p>
          </div>
        </div>
        <p className="mt-8 text-sm leading-6 text-slate-500">
          განაცხადის გაგზავნა და დამკვეთთან მიმოწერა შემდეგ ეტაპზე შეიძლება
          დაემატოს backend-ის ინტეგრაციით.
        </p>
      </article>
    </main>
  );
}
