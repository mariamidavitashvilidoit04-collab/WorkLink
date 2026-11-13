import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginSchema } from "../utils/schemas";
import {
  notifyAuthChange,
  readUsers,
  TOKEN_KEY,
  USER_KEY,
} from "../utils/auth";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: location.state?.email || "",
    },
  });

  function onSubmit(data) {
    const email = data.email.trim().toLowerCase();

    const user = readUsers().find(
      (item) =>
        item.email.toLowerCase() === email && item.password === data.password,
    );

    if (!user) {
      alert("ელფოსტა ან პაროლი არასწორია.");
      return;
    }

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      profession: user.profession || "",
      company: user.company || "",
      industry: user.industry || "",
      bio: user.bio || "",
    };

    localStorage.setItem(USER_KEY, JSON.stringify(safeUser));
    localStorage.setItem(TOKEN_KEY, `demo-${user.id}`);

    notifyAuthChange();

    navigate(location.state?.from || "/profile", {
      replace: true,
    });
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#F5F7F3] px-4 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-3xl border border-[#E2E9E1] bg-white p-7 shadow-lg sm:p-9"
      >
        <h1 className="text-3xl font-extrabold text-[#263D2B]">
          კეთილი იყოს შენი დაბრუნება!
        </h1>

        <p className="mt-2 text-sm text-slate-500">შედი შენს ანგარიშში.</p>

        {location.state?.registered && (
          <p className="mt-4 rounded-xl bg-[#EAF2E8] p-3 text-sm text-[#36583D]">
            რეგისტრაცია წარმატებულია. ახლა შეგიძლია შეხვიდე.
          </p>
        )}

        <label className="mt-7 block text-sm font-medium">ელფოსტა</label>

        <input
          type="email"
          {...register("email")}
          placeholder="name@example.com"
          className="mt-2 w-full rounded-xl border border-slate-200 p-3"
        />

        <p className="mt-1 text-sm text-red-600">{errors.email?.message}</p>

        <label className="mt-5 block text-sm font-medium">პაროლი</label>

        <input
          type="password"
          {...register("password")}
          placeholder="შეიყვანე პაროლი"
          className="mt-2 w-full rounded-xl border border-slate-200 p-3"
        />

        <p className="mt-1 text-sm text-red-600">{errors.password?.message}</p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-xl bg-[#52785A] p-3 font-semibold text-white hover:bg-[#3F6247]"
        >
          შესვლა
        </button>

        <p className="mt-5 text-center text-sm text-slate-500">
          ჯერ არ გაქვს ანგარიში?{" "}
          <Link to="/register" className="font-semibold text-[#52785A]">
            რეგისტრაცია
          </Link>
        </p>
      </form>
    </main>
  );
}
