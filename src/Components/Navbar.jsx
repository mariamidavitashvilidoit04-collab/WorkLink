import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, BriefcaseBusiness, LogOut, ExternalLink } from "lucide-react";
import {
  getCurrentUser,
  notifyAuthChange,
  TOKEN_KEY,
  USER_KEY,
} from "../utils/auth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(getCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    const syncUser = () => setUser(getCurrentUser());

    window.addEventListener("worklink-auth-change", syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("worklink-auth-change", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    setUser(null);
    notifyAuthChange();
    setOpen(false);
    navigate("/");
  }

  const links = [
    { to: "/", label: "მთავარი" },
    user?.role === "freelancer"
      ? { to: "/clients", label: "დამკვეთები" }
      : { to: "/freelancers", label: "ფრილანსერები" },
    { to: "/projects", label: "პროექტები" },
  ];

  const navClass = ({ isActive }) =>
    `block rounded-lg px-3 py-2 transition ${
      isActive
        ? "bg-[#E1EADF] font-semibold text-[#36583D]"
        : "text-[#46564A] hover:bg-[#F0F4EF]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#E2E9E1] bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 text-xl font-bold text-[#263D2B]"
        >
          <span className="rounded-xl bg-[#E1EADF] p-2 text-[#52785A]">
            <BriefcaseBusiness size={23} />
          </span>
          WorkLink
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navClass}>
              {link.label}
            </NavLink>
          ))}

          {user ? (
            <>
              <NavLink to="/profile" className={navClass}>
                პროფილი
              </NavLink>

              <button
                onClick={logout}
                className="rounded-lg px-3 py-2 text-[#A34F4F] hover:bg-red-50"
              >
                გამოსვლა
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navClass}>
                შესვლა
              </NavLink>

              <Link
                to="/register"
                className="rounded-xl bg-[#52785A] px-4 py-2.5 font-semibold text-white hover:bg-[#3F6247]"
              >
                რეგისტრაცია
              </Link>
            </>
          )}

          <a
            href="https://geolab.edu.ge/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 flex items-center gap-2 rounded-xl border border-[#DCE6DA] px-3 py-2"
          >
            <img
              src="https://geolab.edu.ge/wp-content/uploads/2025/02/Png-purple-only-white-bgGL-e1739432824779.png"
              alt="GeoLab"
              className="h-7 w-auto max-w-24 object-contain"
            />
          </a>
        </div>

        <button
          className="rounded-xl p-2 text-[#36583D] hover:bg-[#F0F4EF] md:hidden"
          aria-label={open ? "მენიუს დახურვა" : "მენიუს გახსნა"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-[#E2E9E1] bg-white p-4 shadow-lg md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={navClass}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}

            {user ? (
              <>
                <NavLink
                  to="/profile"
                  className={navClass}
                  onClick={() => setOpen(false)}
                >
                  პროფილი
                </NavLink>

                <button
                  onClick={logout}
                  className="flex items-center gap-2 rounded-lg p-3 text-left text-[#A34F4F]"
                >
                  <LogOut size={18} />
                  გამოსვლა
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={navClass}
                  onClick={() => setOpen(false)}
                >
                  შესვლა
                </NavLink>

                <NavLink
                  to="/register"
                  className={navClass}
                  onClick={() => setOpen(false)}
                >
                  რეგისტრაცია
                </NavLink>
              </>
            )}

            <a
              href="https://geolab.edu.ge/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center gap-2 rounded-lg border border-[#DCE6DA] p-3 text-sm font-semibold text-[#456B4D]"
            >
              GeoLab-ის ვებგვერდი
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
