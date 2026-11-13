import { Heart, Star, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function FreelancerCard({
  freelancer,
  isFavorite,
  onToggleFavorite,
}) {
  return (
    <article className="flex flex-col rounded-2xl border border-[#E2E9E1] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <img
          src={freelancer.avatar}
          alt={freelancer.name}
          width="64"
          height="64"
          loading="lazy"
          className="h-16 w-16 rounded-2xl object-cover"
        />
        <button
          type="button"
          onClick={() => onToggleFavorite(freelancer.id)}
          aria-label={isFavorite ? "რჩეულებიდან წაშლა" : "რჩეულებში დამატება"}
          className={`rounded-full p-2 ${isFavorite ? "bg-red-50 text-red-500" : "bg-[#F0F4EF] text-slate-500"}`}
        >
          <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
      <h3 className="mt-4 text-lg font-bold text-[#263D2B]">
        {freelancer.name}
      </h3>
      <p className="mt-1 text-sm text-slate-500">{freelancer.profession}</p>
      <div className="mt-3 flex items-center gap-1 text-sm">
        <Star size={16} className="fill-amber-400 text-amber-400" />
        <span className="font-semibold">{freelancer.rating}</span>
        <span className="text-slate-400">• {freelancer.category}</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {freelancer.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-[#EAF2E8] px-3 py-1 text-xs text-[#456B4D]"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-[#E2E9E1] pt-4">
        <p className="font-bold text-[#263D2B]">
          ${freelancer.rate}
          <span className="text-sm font-normal text-slate-500">/სთ</span>
        </p>
        <Link
          to={`/freelancers/${freelancer.id}`}
          className="flex items-center gap-1 rounded-lg bg-[#52785A] px-3 py-2 text-sm font-semibold text-white hover:bg-[#3F6247]"
        >
          პროფილი <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}
