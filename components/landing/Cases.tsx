"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    tag: "Мобильное приложение",
    title: "Приложение для курьерской службы",
    description:
      "Разработали iOS и Android приложения для 500+ курьеров с offline-режимом, GPS-трекингом и push-уведомлениями.",
    metrics: [
      { value: "500+", label: "курьеров" },
      { value: "2x", label: "скорость обработки заказов" },
      { value: "4.8★", label: "оценка в App Store" },
    ],
    color: "from-indigo-500/20 to-violet-500/10",
    border: "border-indigo-500/20",
  },
  {
    tag: "Веб-платформа",
    title: "B2B маркетплейс стройматериалов",
    description:
      "Полноценная торговая платформа с каталогом 50 000+ товаров, личными кабинетами, аналитикой и интеграцией с 1С.",
    metrics: [
      { value: "50k+", label: "товаров в каталоге" },
      { value: "₽120M", label: "оборот за первый год" },
      { value: "300+", label: "поставщиков" },
    ],
    color: "from-cyan-500/20 to-blue-500/10",
    border: "border-cyan-500/20",
  },
  {
    tag: "Корпоративная система",
    title: "CRM для сети медицинских клиник",
    description:
      "Кастомная CRM-система для 15 клиник: расписание врачей, история пациентов, телемедицина и интеграция с МИС.",
    metrics: [
      { value: "15", label: "клиник в сети" },
      { value: "-40%", label: "времени на администрирование" },
      { value: "10k+", label: "пациентов в базе" },
    ],
    color: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/20",
  },
];

export default function Cases() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll(".case-card");
    if (!cards) return;

    gsap.from(cards, {
      opacity: 0,
      y: 60,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardsRef.current,
        start: "top 75%",
      },
    });
  }, []);

  return (
    <section id="cases" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
            Наши работы
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Кейсы</h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Проекты, которыми мы гордимся
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cases.map((c) => (
            <div
              key={c.title}
              className={`case-card relative p-8 rounded-2xl border ${c.border} bg-gradient-to-br ${c.color} backdrop-blur-sm`}
            >
              <span className="inline-block text-xs font-medium px-3 py-1 rounded-full border border-white/10 text-white/50 mb-6">
                {c.tag}
              </span>
              <h3 className="text-xl font-bold mb-4">{c.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                {c.description}
              </p>
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5">
                {c.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="text-xl font-bold text-white">{m.value}</div>
                    <div className="text-xs text-white/40 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
