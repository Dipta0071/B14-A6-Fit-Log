export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-[#08090a]">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">

        {/* Brand */}
        <div className="flex items-center gap-3">

          {/* Logo icon */}
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#ccff00] text-black">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 8V16"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              <path
                d="M9 5V19"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              <path
                d="M15 5V19"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              <path
                d="M18 8V16"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              <path
                d="M3 12H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <span className="text-sm font-black tracking-tight text-white">
            FITLOG
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-zinc-600">
          © 2026 FitLog — Workout Library. Train hard,
          log honest.
        </p>
      </div>
    </footer>
  );
}