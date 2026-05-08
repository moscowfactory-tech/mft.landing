"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: "📱",
    title: "Мобильные приложения",
    description:
      "iOS и Android — нативная разработка и кросс-платформа на React Native и Flutter. Продукты, которые пользователи хотят использовать.",
    tags: ["React Native", "Flutter", "Swift", "Kotlin"],
  },
  {
    icon: "🌐",
    title: "Веб-платформы",
    description:
      "SaaS-продукты, корпоративные порталы, маркетплейсы и лендинги. Быстро, надёжно, с вниманием к деталям.",
    tags: ["Next.js", "React", "Node.js", "PostgreSQL"],
  },
  {
    icon: "🏗️",
    title: "Корпоративные системы",
    description:
      "ERP, CRM, внутренние инструменты для автоматизации бизнеса. Интегрируем с существующей инфраструктурой.",
    tags: ["Microservices", "API", "Integrations", "DevOps"],
  },
  {
    icon: "🎨",
    title: "UI/UX Дизайн",
    description:
      "Разрабатываем интерфейсы, которые конвертируют. Исследование, прототипирование, дизайн-система.",
    tags: ["Figma", "Research", "Prototyping", "Design System"],
  },
  {
    icon: "☁️",
    title: "DevOps & Инфраструктура",
    description:
      "CI/CD, облачная инфраструктура, мониторинг и масштабирование. Ваш продукт работает без сбоев.",
    tags: ["Docker", "K8s", "AWS", "CI/CD"],
  },
  {
    icon: "🤖",
    title: "AI-интеграции",
    description:
      "Встраиваем AI-возможности в ваши продукты: чат-боты, генерация контента, аналитика данных.",
    tags: ["LLM", "OpenAI", "RAG", "ML"],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll(".service-card");
    if (!cards) return;

    gsap.from(cards, {
      opacity: 0,
      y: 50,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardsRef.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
            Что мы делаем
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Услуги</h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Полный цикл разработки — от идеи до поддержки в продакшене
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <div
              key={service.title}
              className="service-card group relative p-6 rounded-2xl border border-white/5 bg-white/2 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-300 cursor-default"
            >
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3 className="text-lg font-semibold mb-3 group-hover:text-indigo-300 transition-colors">
                {service.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-md bg-white/5 text-white/40 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
