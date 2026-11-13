import { BriefcaseBusiness, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <article className="rounded-2xl border border-[#E2E9E1] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="rounded-xl bg-[#EAF2E8] p-3 text-[#52785A]">
          <BriefcaseBusiness size={23} />
        </div>
        <span className="rounded-full bg-[#EAF2E8] px-3 py-1 text-xs font-semibold text-[#456B4D]">
          {project.category}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-bold text-[#263D2B]">{project.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
        {project.description}
      </p>
      <p className="mt-3 text-sm text-slate-500">დამკვეთი: {project.client}</p>
      <div className="mt-5 flex items-center justify-between border-t border-[#E2E9E1] pt-4">
        <div>
          <p className="text-xs text-slate-500">ბიუჯეტი</p>
          <p className="text-xl font-bold text-[#263D2B]">
            ${Number(project.budget).toLocaleString("en-US")}
          </p>
        </div>
        <Link
          to={`/projects/${project.id}`}
          className="flex items-center gap-1 rounded-lg bg-[#52785A] px-3 py-2 text-sm font-semibold text-white hover:bg-[#3F6247]"
        >
          დეტალები <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}
