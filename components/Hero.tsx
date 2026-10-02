import Link from "next/link";

export default function Hero() {
  return (
    <section className="px-4 pt-5 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-xl border border-zinc-800 bg-[#17181c] lg:grid-cols-2">

        {/* Left Content */}
        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">

          {/* Eyebrow */}
          <p className="mb-3 text-[10px] font-black tracking-[0.16em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          {/* Heading */}
          <h1 className="max-w-2xl font-display text-4xl font-black uppercase leading-[0.9] tracking-tight text-white sm:text-5xl lg:text-6xl">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-xl text-sm leading-5 text-zinc-400 sm:text-[15px]">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          {/* CTA */}
          <div className="mt-6">
            <Link
              href="#library"
              className="inline-flex items-center gap-2 rounded-md bg-[#ccff00] px-5 py-3 text-[10px] font-black uppercase tracking-wide text-black transition hover:bg-[#d9ff4d]"
            >
              <span>Browse Workouts</span>

              {/* Arrow Icon */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M13 6L19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Right-side Hero Image */}
        <div className="relative hidden min-h-[330px] items-center justify-center lg:flex">
          <img
            src="/hero-workout.png"
            alt="Workout training illustration"
            className="h-[300px] w-[360px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}