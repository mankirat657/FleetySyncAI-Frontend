import React from "react";
import {
  FiArrowUpRight,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiMail,
  FiHeart,
  FiCheckSquare,
  FiGitBranch,
  FiMessageCircle,
  FiUsers,
} from "react-icons/fi";
import { MdWorkspaces } from "react-icons/md";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden bg-[#0b0b0d] text-white">

      {/* Decorative glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-red-500/10 blur-[120px]" />

      {/* Top CTA */}
      <div className="relative mx-auto max-w-7xl px-6 pt-20 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] px-6 py-12 sm:px-10 lg:px-14">

          {/* Background decorations */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-red-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-red-500/5 blur-3xl" />

          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">

            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                <span className="text-sm font-medium text-red-400">
                  Built for teams that move fast
                </span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything your team needs.
                <span className="block bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent cursiveFont">
                  All in one workspace.
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-white/50 sm:text-base">
                Organize your projects, collaborate with your team and keep
                everything moving from one powerful workspace.
              </p>
            </div>

            <button
              type="button"
              className="group flex shrink-0 items-center gap-3 rounded-full bg-red-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all duration-300 hover:bg-red-400 hover:shadow-red-500/30"
            >
              Get Started
              <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>

          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8">

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">

          {/* Brand */}
          <div className="max-w-sm">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500 shadow-lg shadow-red-500/20">
                <MdWorkspaces className="h-6 w-6" />
              </div>

              <span className="text-xl font-bold tracking-tight">
                OrgSync<span className="bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent cursiveFont font-semibold">AI</span>
              </span>
            </div>

            <p className="mt-5 text-sm leading-6 text-white/45">
              A smarter workspace for modern teams. Plan, collaborate,
              communicate and manage your organization from one place.
            </p>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-2">

              <a
                href="#"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/50 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <FiGithub className="h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/50 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <FiTwitter className="h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/50 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <FiLinkedin className="h-4 w-4" />
              </a>

              <a
                href="mailto:hello@orgsync.ai"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/50 transition-all duration-300 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
              >
                <FiMail className="h-4 w-4" />
              </a>

            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Product
            </h3>

            <ul className="mt-5 space-y-3">

              <li>
                <a
                  href="#"
                  className="group flex items-center gap-1 text-sm text-white/45 transition-colors hover:text-white"
                >
                  <FiCheckSquare className="h-4 w-4 opacity-50" />
                  Task Management
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="group flex items-center gap-1 text-sm text-white/45 transition-colors hover:text-white"
                >
                  <FiGitBranch className="h-4 w-4 opacity-50" />
                  Projects
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="group flex items-center gap-1 text-sm text-white/45 transition-colors hover:text-white"
                >
                  <FiMessageCircle className="h-4 w-4 opacity-50" />
                  Communication
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="group flex items-center gap-1 text-sm text-white/45 transition-colors hover:text-white"
                >
                  <FiUsers className="h-4 w-4 opacity-50" />
                  Team Management
                </a>
              </li>

            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Company
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-white/45 transition-colors hover:text-white"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm text-white/45 transition-colors hover:text-white"
                >
                  Careers
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm text-white/45 transition-colors hover:text-white"
                >
                  Contact
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm text-white/45 transition-colors hover:text-white"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Resources
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-white/45 transition-colors hover:text-white"
                >
                  Documentation
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm text-white/45 transition-colors hover:text-white"
                >
                  Help Center
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm text-white/45 transition-colors hover:text-white"
                >
                  API
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm text-white/45 transition-colors hover:text-white"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-white/10" />

        {/* Bottom */}
        <div className="flex flex-col gap-5 text-sm sm:flex-row sm:items-center sm:justify-between">

          <p className="text-white/35">
            © {currentYear} OrgSyncAI. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5">

            <a
              href="#"
              className="text-white/35 transition-colors hover:text-white"
            >
              Privacy
            </a>

            <a
              href="#"
              className="text-white/35 transition-colors hover:text-white"
            >
              Terms
            </a>

            <a
              href="#"
              className="text-white/35 transition-colors hover:text-white"
            >
              Security
            </a>

            <span className="flex items-center gap-1 text-white/30">
              Made with
              <FiHeart className="h-3.5 w-3.5 text-red-500" />
              for teams
            </span>

          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;