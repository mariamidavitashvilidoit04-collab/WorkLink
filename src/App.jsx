import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

import Navbar from "./Components/Navbar";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Freelancers from "./Pages/Freelancers";
import Clients from "./Pages/Clients";
import Projects from "./Pages/Projects";
import FreelancerDetails from "./Pages/FreelancerDetails";
import ClientDetails from "./Pages/ClientDetails";
import ProjectDetails from "./Pages/ProjectDetails";
import Profile from "./Pages/Profile";

function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-[#66866B]">
        WorkLink
      </p>

      <h1 className="mt-3 text-5xl font-bold text-[#263D2B]">404</h1>

      <p className="mt-3 text-[#647267]">გვერდი ვერ მოიძებნა.</p>

      <Link
        to="/"
        className="mt-6 inline-block rounded-xl bg-[#52785A] px-5 py-3 font-semibold text-white"
      >
        მთავარ გვერდზე დაბრუნება
      </Link>
    </main>
  );
}

function Footer() {
  return (
    <footer className="mt-10 bg-[#263D2B] px-5 py-8 text-center text-sm text-[#EAF0E8]">
      <p>© 2026 WorkLink — Connect. Create. Grow.</p>

      <a
        href="https://geolab.edu.ge/"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto mt-4 inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 font-semibold text-white hover:bg-white/10"
      >
        <span className="rounded-md bg-white px-2 py-1">
          <img
            src="https://geolab.edu.ge/wp-content/uploads/2025/02/Png-purple-only-white-bgGL-e1739432824779.png"
            alt="GeoLab"
            className="h-8 w-auto max-w-28 object-contain"
          />
        </span>
        <ExternalLink size={14} />
      </a>
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/freelancers" element={<Freelancers />} />
        <Route path="/freelancers/:id" element={<FreelancerDetails />} />

        <Route path="/clients" element={<Clients />} />
        <Route path="/clients/:id" element={<ClientDetails />} />

        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
