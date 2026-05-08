"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"],
  },
  {
    label: "Mobile",
    items: ["React Native", "Flutter", "Swift", "Kotlin", "Expo"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Python", "Go", "NestJS", "FastAPI"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"],
  },
  {
    label: "Cloud & DevOps",
    items: ["Docker", "Kubernetes", "AWS", "Nginx", "GitHub Actions"],
  },
  {
    label: "AI",
    items: ["OpenAI", "LangChain", "Whisper", "Stable Diffusion", "Ollama"],
  },
];

export default function Stack() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rows = containerRef.current?.querySelectorAll(".stack-row");
    if (!rows) return;

    gsap.from(rows, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section id="stack" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
            Технологии
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Наш стек</h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Используем проверенные технологии и следим за индустрией
          </p>
        </div>

        <div ref={containerRef} className="space-y-4">
          {categories.map((cat) => (
            <div key={cat.label} className="stack-row flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.02]">
              <span className="text-xs font-medium text-indigo-400 w-24 shrink-0 uppercase tracking-wider">
                {cat.label}
              </span>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="text-sm px-3 py-1.5 rounded-lg bg-white/5 text-white/60 border border-white/5 hover:border-indigo-500/30 hover:text-white hover:bg-indigo-500/5 transition-all duration-200 cursor-default"
                  >
                    {item}
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
