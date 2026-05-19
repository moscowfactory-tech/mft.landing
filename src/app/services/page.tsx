"use client";

import { LimelightNav } from "@/components/ui/limelight-nav";
import { Component as EtheralHero } from "@/components/ui/etheral-shadow";
import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack";

const PROCESS_PHASES = [
  {
    id: "service-1",
    title: "Веб-разработка",
    description:
      "Создаем современные веб-сайты и веб-приложения под задачи бизнеса.",
    items: [
      "Корпоративные сайты и порталы",
      "Интернет-магазины и маркетплейсы",
      "SaaS-платформы и веб-сервисы",
    ],
  },
  {
    id: "service-2",
    title: "Мобильные приложения",
    description:
      "Разрабатываем нативные и кросс-платформенные приложения для iOS и Android.",
    items: [
      "Нативные приложения (Swift, Kotlin)",
      "Кросс-платформенные (React Native, Flutter)",
      "Интеграция с API и внешними сервисами",
    ],
  },
  {
    id: "service-3",
    title: "No-code решения",
    description:
      "Быстро собираем рабочие продукты на современных no-code платформах.",
    items: [
      "Сайты и лендинги (Webflow, Tilda)",
      "Автоматизация процессов (Zapier, Make)",
      "Веб-приложения (Bubble, Adalo)",
    ],
  },
  {
    id: "service-4",
    title: "AI автоматизация",
    description:
      "Внедряем ИИ и нейросети в бизнес-процессы для экономии времени и ресурсов.",
    items: [
      "Чат-боты и голосовые ассистенты",
      "Прогнозная аналитика и обработка данных",
      "Компьютерное зрение и распознавание",
    ],
  },
  {
    id: "service-5",
    title: "Комплексные IT-решения для стартапов",
    description:
      "Берем на себя полный цикл — от прототипа до масштабируемого продукта.",
    items: [
      "Прототипирование и быстрое создание MVP",
      "Разработка с учетом дальнейшего масштабирования",
      "Поддержка и развитие продукта после запуска",
    ],
  },
] as const;

export default function ServicesPage() {
  return (
    <main className="relative w-full min-h-screen bg-black">
      <div className="absolute inset-x-0 top-10 z-40 flex justify-center">
        <LimelightNav />
      </div>
      <section className="w-full min-h-screen">
        <div className="flex h-screen w-full items-center justify-center bg-black">
          <EtheralHero
            color="rgba(128, 128, 128, 1)"
            animation={{ scale: 100, speed: 90 }}
            noise={{ opacity: 1, scale: 1.2 }}
            sizing="fill"
            title={
              <h1 className="md:text-6xl text-4xl lg:text-7xl font-bold text-center text-white relative z-20">
                Наши услуги
              </h1>
            }
            subtitle={
              <p className="mt-4 max-w-xl text-center text-base text-zinc-200 md:text-lg mx-auto">
                Решаем сложные бизнес-задачи через продуктовую разработку и
                технологические решения.
              </p>
            }
            scrollTargetId="services-content"
          />
        </div>
      </section>
      <section
        id="services-content"
        className="w-full bg-black px-4 pb-16 pt-10"
      >
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid md:grid-cols-2 md:gap-10 lg:gap-16">
            <div className="md:sticky md:top-32 md:h-[60vh] flex flex-col justify-center">
              <h2 className="mb-6 mt-4 text-3xl md:text-4xl font-bold tracking-tight text-white">
                Чем мы{" "}
                <span className="text-indigo-400">
                  можем быть полезны вашему бизнесу
                </span>
              </h2>
              <p className="max-w-prose text-sm md:text-base text-zinc-300">
                Работаем со стартапами и крупным бизнесом: проектируем,
                запускаем и развиваем веб-сайты, приложения и комплексные
                цифровые решения под конкретные бизнес-цели.
              </p>
            </div>
            <ContainerScroll className="min-h-[200vh] space-y-6 py-8">
              {PROCESS_PHASES.map((phase, index) => (
                <CardSticky
                  key={phase.id}
                  index={index + 1}
                  incrementY={64}
                  incrementZ={6}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 md:p-8 shadow-lg shadow-black/60 backdrop-blur-md"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="my-4 text-xl md:text-2xl font-semibold tracking-tight text-white">
                      {phase.title}
                    </h3>
                    <span className="text-2xl font-bold text-indigo-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-zinc-300">
                    {phase.description}
                  </p>
                  {phase.items && (
                    <ul className="mt-4 space-y-1 text-sm text-zinc-300">
                      {phase.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-[5px] h-[3px] w-3 rounded-full bg-indigo-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardSticky>
              ))}
            </ContainerScroll>
          </div>
        </div>
      </section>
    </main>
  );
}
