"use client";

import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack";

const SERVICES = [
  {
    id: "service-1",
    title: "Веб-разработка",
    description: "Создаем современные веб-сайты и веб-приложения под задачи бизнеса.",
    items: [
      "Корпоративные сайты и порталы",
      "Интернет-магазины и маркетплейсы",
      "SaaS-платформы и веб-сервисы",
    ],
  },
  {
    id: "service-2",
    title: "Мобильные приложения",
    description: "Разрабатываем нативные и кросс-платформенные приложения для iOS и Android.",
    items: [
      "Нативные приложения (Swift, Kotlin)",
      "Кросс-платформенные (React Native, Flutter)",
      "Интеграция с API и внешними сервисами",
    ],
  },
  {
    id: "service-3",
    title: "No-code решения",
    description: "Быстро собираем рабочие продукты на современных no-code платформах.",
    items: [
      "Сайты и лендинги (Webflow, Tilda)",
      "Автоматизация процессов (Zapier, Make)",
      "Веб-приложения (Bubble, Adalo)",
    ],
  },
  {
    id: "service-4",
    title: "AI автоматизация",
    description: "Внедряем ИИ и нейросети в бизнес-процессы для экономии времени и ресурсов.",
    items: [
      "Чат-боты и голосовые ассистенты",
      "Прогнозная аналитика и обработка данных",
      "Компьютерное зрение и распознавание",
    ],
  },
  {
    id: "service-5",
    title: "Комплексные IT-решения",
    description: "Берем на себя полный цикл — от прототипа до масштабируемого продукта.",
    items: [
      "Прототипирование и быстрое создание MVP",
      "Разработка с учетом дальнейшего масштабирования",
      "Поддержка и развитие продукта после запуска",
    ],
  },
] as const;

export function ServicesSection() {
  return (
    <section id="services" className="w-full bg-black px-4 pb-16 pt-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid md:grid-cols-2 md:gap-10 lg:gap-16">
          <div className="md:sticky md:top-32 md:h-[60vh] flex flex-col justify-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
              Что мы делаем
            </p>
            <h2 className="mb-6 text-3xl md:text-4xl font-bold tracking-tight text-white">
              Чем мы{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                можем быть полезны вашему бизнесу
              </span>
            </h2>
            <p className="max-w-prose text-sm md:text-base text-zinc-300 leading-relaxed">
              Работаем со стартапами и крупным бизнесом: проектируем,
              запускаем и развиваем веб-сайты, приложения и комплексные
              цифровые решения под конкретные бизнес-цели.
            </p>
            <a
              href="https://t.me/mftmanager"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 self-start inline-flex items-center gap-2.5 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98]"
            >
              Обсудить проект
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z"/>
              </svg>
            </a>
          </div>
          <ContainerScroll className="min-h-[200vh] space-y-6 py-8">
            {SERVICES.map((service, index) => (
              <CardSticky
                key={service.id}
                index={index + 1}
                incrementY={64}
                incrementZ={6}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 md:p-8 shadow-lg shadow-black/60 backdrop-blur-md"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="my-4 text-xl md:text-2xl font-semibold tracking-tight text-white">
                    {service.title}
                  </h3>
                  <span className="text-2xl font-bold text-indigo-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-sm md:text-base text-zinc-300">{service.description}</p>
                <ul className="mt-4 space-y-1 text-sm text-zinc-300">
                  {service.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[5px] h-[3px] w-3 rounded-full bg-indigo-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardSticky>
            ))}
          </ContainerScroll>
        </div>
      </div>
    </section>
  );
}
