"use client";

import { ArrowRight } from "lucide-react";

const STEPS = [
  { id: 1, label: "Рассчитываем предварительную смету" },
  { id: 2, label: "Заключаем договор" },
  { id: 3, label: "Вносите предоплату 50%" },
  { id: 4, label: "Реализуем проект" },
  { id: 5, label: "Проверяете работу и оплачиваете оставшиеся 50%" },
];

export function ProcessSection() {
  return (
    <section id="process" className="w-full bg-black">
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-8">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Процесс
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Как мы{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              работаем?
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-zinc-400 md:text-base leading-relaxed">
            Вся работа разделена на микромодули, что позволяет гибко управлять
            процессом разработки.
          </p>
        </div>

        {/* Cards row */}
        <div className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-0">
          {STEPS.map((step, i) => (
            <div key={step.id} className="flex md:flex-row md:flex-1 items-stretch">
              {/* Card */}
              <div className="relative flex-1 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 md:p-6 transition-colors duration-300 hover:border-zinc-700 hover:bg-zinc-900">
                {/* Big background number */}
                <span className="pointer-events-none absolute -right-2 -top-4 select-none text-[7rem] font-black leading-none text-indigo-400/20">
                  {step.id}
                </span>

                {/* Label */}
                <p className="relative text-sm font-semibold leading-snug text-white md:text-sm lg:text-base">
                  {step.label}
                </p>
              </div>

              {/* Arrow between cards */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:flex items-center px-1 text-indigo-400/50 shrink-0">
                  <ArrowRight size={16} />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
