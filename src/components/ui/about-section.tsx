"use client";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { Sparkles } from "@/components/ui/sparkles";
import { GlowCard } from "@/components/ui/spotlight-card";

function useCountUp(target: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(target);
    };

    requestAnimationFrame(animate);
  }, [trigger, target, duration]);

  return count;
}

function StatCounter({
  value,
  suffix,
  label,
  delay = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => setTriggered(true), delay);
    return () => clearTimeout(timer);
  }, [isInView, delay]);

  const count = useCountUp(value, 1800, triggered);

  return (
    <div ref={ref} className="text-center">
      <div className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent text-4xl font-bold md:text-5xl lg:text-7xl tabular-nums">
        {count}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-zinc-400">{label}</div>
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="relative w-full bg-black">
      <div className="mx-auto w-full max-w-4xl px-4 pt-32 pb-0">

        {/* О нас */}
        <div className="mb-20">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
            О нас
          </p>

          <h2 className="text-3xl font-bold leading-[1.15] text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Комплексная разработка{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              IT&#8209;продуктов
            </span>
            <br className="hidden md:block" />
            {" "}под ключ
          </h2>

          <div className="mt-10 h-px w-full bg-zinc-800" />

          <p className="mt-10 text-lg text-zinc-400 leading-relaxed max-w-2xl">
            От стартапов до корпораций — мы подходим к каждой задаче
            индивидуально, выстраивая долгосрочные партнёрские отношения
            и обеспечивая поддержку на всех этапах работы.
          </p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-3 gap-4 sm:flex sm:items-center sm:justify-between">
          <StatCounter value={50} suffix="+" label="Клиентов по всему миру" delay={0} />
          <div className="hidden sm:block h-12 w-px bg-zinc-700 shrink-0" />
          <StatCounter value={5} suffix="+" label="Лет опыта" delay={150} />
          <div className="hidden sm:block h-12 w-px bg-zinc-700 shrink-0" />
          <StatCounter value={24} suffix="/7" label="Техническая поддержка" delay={300} />
        </div>

        {/* Почему мы */}
        <div className="mt-24 border-t border-white/8 pt-20">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
              Наш подход
            </p>
            <h3 className="text-4xl font-bold text-white md:text-5xl">
              Почему мы?
            </h3>
            <p className="mx-auto mt-5 max-w-xl text-base text-zinc-400 md:text-lg leading-relaxed">
              Собственная команда, полный цикл и прозрачный процесс —
              без посредников и сюрпризов.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <GlowCard glowColor="purple" size="sm" customSize className="bg-black/60">
              <div className="flex h-full flex-col p-4">
                <h4 className="text-2xl font-bold text-white leading-tight">
                  Штатные специалисты
                </h4>
                <div className="mt-4 h-px w-8 bg-indigo-500" />
                <p className="mt-5 text-base text-zinc-400 leading-relaxed">
                  Собственный штат разработчиков, обученных внутри компании
                  и работающих по единой методологии, обеспечивает стабильное
                  качество и предсказуемый результат.
                </p>
              </div>
            </GlowCard>
            <GlowCard glowColor="blue" size="sm" customSize className="bg-black/60">
              <div className="flex h-full flex-col p-4">
                <h4 className="text-2xl font-bold text-white leading-tight">
                  Фокус на результате
                </h4>
                <div className="mt-4 h-px w-8 bg-indigo-500" />
                <p className="mt-5 text-base text-zinc-400 leading-relaxed">
                  Берём на себя полный цикл: от идеи и архитектуры до
                  запуска и поддержки. Говорим на языке бизнеса,
                  а не только технологий.
                </p>
              </div>
            </GlowCard>
            <GlowCard glowColor="green" size="sm" customSize className="bg-black/60">
              <div className="flex h-full flex-col p-4">
                <h4 className="text-2xl font-bold text-white leading-tight">
                  Личный кабинет
                </h4>
                <div className="mt-4 h-px w-8 bg-indigo-500" />
                <p className="mt-5 text-base text-zinc-400 leading-relaxed">
                  Личный кабинет позволяет в режиме онлайн видеть ход
                  проекта: этапы, статусы задач и ключевые сроки
                  в одном месте.
                </p>
              </div>
            </GlowCard>
          </div>
        </div>

      </div>

      {/* Sparkles divider */}
      <div className="relative mt-20 h-64 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,var(--gradient-color),transparent_70%)] before:opacity-40" />
        <div className="absolute -left-1/2 top-1/2 z-10 aspect-[1/0.7] w-[200%] rounded-[100%] border-t border-zinc-900/20 bg-white dark:border-white/20 dark:bg-zinc-900" />
        <Sparkles className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]" />
      </div>
    </section>
  );
}
