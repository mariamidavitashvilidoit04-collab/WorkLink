import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Star, Mail } from "lucide-react";
import { initialFreelancers } from "../Data/data";
import { getCurrentUser, readUsers } from "../utils/auth";

export default function FreelancerDetails() {
  const { id } = useParams();
  const currentUser = getCurrentUser();

  if (currentUser?.role === "freelancer") {
    return <Navigate to="/clients" replace />;
  }

  const registeredFreelancers = readUsers()
    .filter((user) => user.role === "freelancer")
    .map((user) => ({
      ...user,
      profession: user.profession || "ფრილანსერი",
      category: "Freelancer",
      skills: user.skills || [],
      avatar:
        user.avatar ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user.name,
        )}&background=E1EADF&color=263D2B`,
      bio: user.bio || "",
    }));

  const person = [...registeredFreelancers, ...initialFreelancers].find(
    (item) => String(item.id) === id,
  );

  if (!person) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h1 className="text-3xl font-bold text-[#263D2B]">
          ფრილანსერი ვერ მოიძებნა
        </h1>

        <Link to="/freelancers" className="mt-5 inline-block text-[#52785A]">
          ← ფრილანსერებთან დაბრუნება
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <Link
        to="/freelancers"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#52785A]"
      >
        <ArrowLeft size={17} />
        ყველა ფრილანსერი
      </Link>

      <section className="mt-6 rounded-3xl border border-[#E2E9E1] bg-white p-7 shadow-sm sm:p-10">
        <div className="flex flex-wrap items-center gap-5">
          <img
            src={person.avatar}
            alt={person.name}
            width="112"
            height="112"
            className="h-28 w-28 rounded-2xl object-cover"
          />

          <div>
            <h1 className="text-3xl font-bold text-[#263D2B]">{person.name}</h1>

            <p className="mt-1 text-slate-500">{person.profession}</p>

            <p className="mt-2 flex items-center gap-1 text-sm">
              {person.rating ? (
                <>
                  <Star size={16} className="fill-amber-400 text-amber-400" />
                  {person.rating}
                </>
              ) : (
                <span className="text-[#52785A]">ახალი პროფილი</span>
              )}
              {" · "}
              {person.category}
            </p>
          </div>
        </div>

        {person.bio && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-[#263D2B]">ჩემ შესახებ</h2>

            <p className="mt-2 whitespace-pre-wrap leading-7 text-slate-600">
              {person.bio}
            </p>
          </div>
        )}

        {person.rate && (
          <div className="mt-8 rounded-xl bg-[#F5F7F3] p-4">
            <p className="text-sm text-slate-500">საათობრივი ტარიფი</p>

            <p className="mt-1 text-2xl font-bold text-[#263D2B]">
              ${person.rate}/სთ
            </p>
          </div>
        )}

        {person.skills?.length > 0 && (
          <>
            <h2 className="mt-8 text-xl font-bold text-[#263D2B]">უნარები</h2>

            <div className="mt-3 flex flex-wrap gap-2">
              {person.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-[#E1EADF] px-4 py-2 text-sm font-medium text-[#36583D]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </>
        )}

        <div className="mt-8 rounded-2xl border border-[#DCE7DA] bg-[#F5F7F3] p-5">
          <h2 className="text-lg font-bold text-[#263D2B]">
            დაუკავშირდი ფრილანსერს
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            მისწერე ელფოსტაზე თანამშრომლობის შესახებ.
          </p>

          <a
            href={`mailto:${person.email}?subject=${encodeURIComponent(
              "WorkLink-ზე თანამშრომლობა",
            )}`}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#52785A] px-5 py-3 font-semibold text-white hover:bg-[#3F6247]"
          >
            <Mail size={18} />
            მისწერე ელფოსტაზე
          </a>

          <p className="mt-3 break-all text-sm text-[#456B4D]">
            {person.email}
          </p>
        </div>
      </section>
    </main>
  );
}
