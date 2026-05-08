"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(headingRef.current, { opacity: 0, y: 60, duration: 1 })
      .from(subRef.current, { opacity: 0, y: 30, duration: 0.8 }, "-=0.5")
      .from(ctaRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.4");

    gsap.to(orb1Ref.current, {
      y: -30,
      x: 20,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(orb2Ref.current, {
      y: 25,
      x: -15,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1,
    });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Ambient orbs */}
      <div
        ref={orb1Ref}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none"
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-violet-600/15 blur-3xl pointer-events-none"
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Принимаем новые проекты
        </div>

        <h1
          ref={headingRef}
          className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6"
        >
          Создаём цифровые{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
            продукты
          </span>
          {" "}под ключ
        </h1>

        <p
          ref={subRef}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Разрабатываем мобильные приложения, веб-платформы и корпоративные системы.
          От идеи до запуска — без лишних слов.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25"
          >
            Обсудить проект
          </a>
          <a
            href="#cases"
            className="px-8 py-4 rounded-xl border border-white/10 hover:border-white/20 text-white/70 hover:text-white font-semibold text-base transition-all duration-200 hover:bg-white/5"
          >
            Посмотреть кейсы
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
