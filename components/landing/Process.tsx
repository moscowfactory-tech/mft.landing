"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Бриф и анализ",
    description:
      "Созваниваемся, разбираем задачу, исследуем рынок и конкурентов. Фиксируем цели, аудиторию и метрики успеха.",
    duration: "1–3 дня",
  },
  {
    number: "02",
    title: "Проектирование",
    description:
      "Проектируем архитектуру, создаём прототипы и дизайн-концепцию. Согласуем всё с вами до начала разработки.",
    duration: "1–2 недели",
  },
  {
    number: "03",
    title: "Разработка",
    description:
      "Итерационная разработка спринтами по 2 недели. Еженедельные демо, прозрачный таск-трекер, быстрая обратная связь.",
    duration: "4–16 недель",
  },
  {
    number: "04",
    title: "Тестирование",
    description:
      "QA на каждом спринте: ручное и автоматизированное тестирование, нагрузочные тесты, проверка безопасности.",
    duration: "Параллельно",
  },
  {
    number: "05",
    title: "Запуск",
    description:
      "Деплой в продакшн, настройка мониторинга, обучение команды. Мягкий запуск с возможностью быстрого отката.",
    duration: "1–3 дня",
  },
  {
    number: "06",
    title: "Поддержка",
    description:
      "Техническая поддержка, обновления, новые фичи. Остаёмся на связи после запуска.",
    duration: "Постоянно",
  },
];

export default function Process() {
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = stepsRef.current?.querySelectorAll(".process-step");
    if (!items) return;

    gsap.from(items, {
      opacity: 0,
      x: -40,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: stepsRef.current,
        start: "top 75%",
      },
    });
  }, []);

  return (
    <section id="process" className="py-32 px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
            Как мы работаем
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Процесс</h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Прозрачный процесс без сюрпризов — вы всегда знаете, на каком этапе находится проект
          </p>
        </div>

        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="process-step group p-6 rounded-2xl border border-white/5 hover:border-indigo-500/20 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl font-bold text-white/5 group-hover:text-indigo-500/20 transition-colors">
                  {step.number}
                </span>
                <span className="text-xs text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded-full">
                  {step.duration}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
