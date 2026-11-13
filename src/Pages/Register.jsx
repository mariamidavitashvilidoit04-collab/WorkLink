import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../utils/schemas";
import { readUsers, USERS_KEY } from "../utils/auth";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: { role: "freelancer" },
  });

  const role = useWatch({ control, name: "role" });

  function onSubmit(data) {
    const users = readUsers();
    const email = data.email.trim().toLowerCase();

    if (users.some((user) => user.email.toLowerCase() === email)) {
      setError("email", {
        type: "manual",
        message: "ეს ელფოსტა უკვე რეგისტრირებულია.",
      });
      return;
    }

    const user = {
      id: crypto.randomUUID(),
      name: data.name.trim(),
      email,
      password: data.password,
      role: data.role,
      profession: data.profession?.trim() || "ფრილანსერი",
      company: data.company?.trim() || "",
      industry: data.industry?.trim() || "",
      bio: data.bio?.trim() || "",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));

    navigate("/login", {
      state: { registered: true, email },
    });
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-[#52785A]";

  const labelClass = "mt-4 block text-sm font-medium text-[#35463A]";

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#F5F7F3] px-4 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-3xl border border-[#E2E9E1] bg-white p-7 shadow-lg sm:p-9"
      >
        <h1 className="text-3xl font-extrabold text-[#263D2B]">
          შემოუერთდი WorkLink-ს
        </h1>

        <p className="mt-2 text-sm text-slate-500">აირჩიე ანგარიშის ტიპი.</p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {[
            { value: "freelancer", label: "ფრილანსერი" },
            { value: "client", label: "დამკვეთი / ბიზნესი" },
          ].map((item) => (
            <label
              key={item.value}
              className={`cursor-pointer rounded-xl border p-3 text-center text-sm font-semibold ${
                role === item.value
                  ? "border-[#52785A] bg-[#E1EADF] text-[#36583D]"
                  : "border-slate-200 text-slate-600"
              }`}
            >
              <input
                type="radio"
                value={item.value}
                {...register("role")}
                className="sr-only"
              />
              {item.label}
            </label>
          ))}
        </div>

        <p className="text-sm text-red-600">{errors.role?.message}</p>

        <label className={labelClass}>
          {role === "client" ? "კომპანიის სახელი" : "სრული სახელი"}
        </label>

        <input
          {...register("name")}
          placeholder={
            role === "client"
              ? "მაგ. Creative Studio"
              : "მაგ. Mariam Davitashvili"
          }
          className={inputClass}
        />

        <p className="mt-1 text-sm text-red-600">{errors.name?.message}</p>

        {role === "freelancer" ? (
          <>
            <label className={labelClass}>პროფესია</label>
            <input
              {...register("profession")}
              placeholder="მაგ. Frontend Developer"
              className={inputClass}
            />
            <p className="mt-1 text-sm text-red-600">
              {errors.profession?.message}
            </p>
          </>
        ) : (
          <>
            <label className={labelClass}>კომპანიის სფერო</label>
            <input
              {...register("industry")}
              placeholder="მაგ. IT, დიზაინი, მარკეტინგი"
              className={inputClass}
            />
            <p className="mt-1 text-sm text-red-600">
              {errors.industry?.message}
            </p>
          </>
        )}

        <label className={labelClass}>მოკლე აღწერა (არასავალდებულო)</label>

        <textarea
          {...register("bio")}
          rows={3}
          placeholder="მოგვიყევი შენს ან კომპანიის შესახებ..."
          className={inputClass}
        />

        <label className={labelClass}>ელფოსტა</label>
        <input
          type="email"
          {...register("email")}
          placeholder="name@example.com"
          className={inputClass}
        />

        <p className="mt-1 text-sm text-red-600">{errors.email?.message}</p>

        <label className={labelClass}>პაროლი</label>
        <input
          type="password"
          {...register("password")}
          placeholder="მინიმუმ 8 სიმბოლო"
          className={inputClass}
        />

        <p className="mt-1 text-sm text-red-600">{errors.password?.message}</p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-xl bg-[#52785A] p-3 font-semibold text-white hover:bg-[#3F6247] disabled:opacity-60"
        >
          რეგისტრაცია
        </button>

        <p className="mt-5 text-center text-sm text-slate-500">
          უკვე გაქვს ანგარიში?{" "}
          <Link to="/login" className="font-semibold text-[#52785A]">
            შესვლა
          </Link>
        </p>
      </form>
    </main>
  );
}
