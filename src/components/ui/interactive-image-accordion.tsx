"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { GlowCard } from "@/components/ui/spotlight-card";

type CaseScreen = {
  src: string;
  alt: string;
};

type CaseResult = {
  label: string;
  value: string;
  icon?: "users" | "growth" | "loyalty" | "time" | "quality" | "automation";
};

type ImplementationItem = {
  title: string;
  description: string;
  bullets?: string[];
};

type AccordionItemData = {
  id: number;
  cardTitle: string;
  title: string;
  imageUrl: string;
  bgClass?: string;
  clientRequest: string[];
  challenge?: string;
  implementation: ImplementationItem[];
  screens?: CaseScreen[];
  results?: CaseResult[];
};

const ResultIconUsers = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ResultIconGrowth = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 17 9 11 13 15 21 7" />
    <polyline points="14 7 21 7 21 14" />
  </svg>
);

const ResultIconLoyalty = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-.9-.9a5.5 5.5 0 1 0-7.8 7.8l.9.9L12 21.3l7.8-7.9.9-.9a5.5 5.5 0 0 0 0-7.8Z" />
  </svg>
);

const ResultIconTime = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ResultIconQuality = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2 4 5v6c0 5.25 3.25 10 8 11 4.75-1 8-5.75 8-11V5Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const ResultIconAutomation = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 3.4 15a1.65 1.65 0 0 0-1.51-1H2a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 3.4 8a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8 3.4a1.65 1.65 0 0 0 1-1.51V2a2 2 0 0 1 4 0v.09A1.65 1.65 0 0 0 16 3.4a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 20.6 8a1.65 1.65 0 0 0 1.51 1H22a2 2 0 0 1 0 4h-.09A1.65 1.65 0 0 0 19.4 15Z" />
  </svg>
);

const getResultIcon = (icon?: CaseResult["icon"]) => {
  const commonProps = { className: "h-3.5 w-3.5 md:h-4 md:w-4" };
  switch (icon) {
    case "users":
      return <ResultIconUsers {...commonProps} />;
    case "growth":
      return <ResultIconGrowth {...commonProps} />;
    case "loyalty":
      return <ResultIconLoyalty {...commonProps} />;
    case "time":
      return <ResultIconTime {...commonProps} />;
    case "quality":
      return <ResultIconQuality {...commonProps} />;
    case "automation":
      return <ResultIconAutomation {...commonProps} />;
    default:
      return <ResultIconGrowth {...commonProps} />;
  }
};

const accordionItems: AccordionItemData[] = [
  {
    id: 1,
    cardTitle: "ТРЦ «Зеленопарк»",
    title: "Мобильное приложение и CRM для ТРЦ «Зеленопарк»",
    imageUrl:
      "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?q=80&w=1974&auto=format&fit=crop",
    bgClass:
      "bg-gradient-to-b from-emerald-500/25 via-emerald-900/40 to-black",
    clientRequest: [
      "Дать пользователям возможность покупать товары всех арендаторов ТРЦ в одной корзине.",
      "Сканировать чеки и получать бонусные баллы за покупки.",
      "Тратить баллы на подарки от ТРЦ, бронировать киносеансы и отслеживать акции.",
      "Заказывать товары с доставкой или самовывозом из ТРЦ.",
    ],
    challenge:
      "Синхронизировать мобильное приложение с устаревшей базой CsCart на основном сайте, чтобы корзина, цены и остатки обновлялись в режиме, близком к реальному времени.",
    implementation: [
      {
        title: "СИНХРОНИЗИРОВАЛИ БАЗЫ ДАННЫХ",
        description:
          "Разработали шлюз между CsCart и мобильным приложением, чтобы товары, цены и акции автоматически обновлялись на всех платформах. Больше никаких расхождений в ассортименте.",
      },
      {
        title: "АВТОМАТИЗИРОВАЛИ УПРАВЛЕНИЕ КОНТЕНТОМ",
        description:
          "Внедрили CRM‑систему, где маркетологи ТРЦ могут самостоятельно управлять контентом без участия разработчиков:",
        bullets: [
          "Запускать акции и розыгрыши.",
          "Управлять бонусной программой.",
          "Менять расписание кинотеатра или убирать разделы из приложения — изменения вступают в силу мгновенно, без обновлений со стороны пользователей.",
        ],
      },
      {
        title: "ПОСТРОИЛИ СИСТЕМУ ЛОЯЛЬНОСТИ",
        description:
          "Реализовали алгоритмы проверки чеков и начисления баллов: система анализирует покупки, блокирует попытки подделки и хранит прозрачную историю операций для каждого пользователя.",
      },
      {
        title: "СОБРАЛИ ЕДИНЫЙ МАРКЕТПЛЕЙС",
        description:
          "Все товары арендаторов, включая меню фуд‑корта, доступны в приложении. Пользователь может оплатить заказ онлайн, выбрать самовывоз или доставку, а в личном кабинете видеть историю заказов, чеков и бонусов.",
      },
    ],
    screens: [
      {
        src: "/cases/zelenopark-screen-1.png",
        alt: "Зеленопарк — экран витрины и категорий товаров",
      },
      {
        src: "/cases/zelenopark-screen-2.png",
        alt: "Зеленопарк — корзина и выбор способов доставки",
      },
      {
        src: "/cases/zelenopark-screen-3.png",
        alt: "Зеленопарк — личный кабинет и бонусная программа",
      },
    ],
    results: [
      {
        label: "Ежедневная аудитория приложения",
        value: "> 16 000 пользователей",
        icon: "users",
      },
      {
        label: "Рост среднего чека",
        value: "+15%",
        icon: "growth",
      },
      {
        label: "Повышение лояльности",
        value: "+25%",
        icon: "loyalty",
      },
    ],
  },
  {
    id: 2,
    cardTitle: "AI‑контент для e‑commerce",
    title: "AI‑генерация контента для e‑commerce",
    imageUrl:
      "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop",
    bgClass:
      "bg-gradient-to-b from-indigo-500/25 via-indigo-900/40 to-black",
    clientRequest: [
      "Ускорить выпуск контента для тысяч товарных карточек без потери качества.",
    ],
    implementation: [
      {
        title: "АВТОМАТИЗИРОВАЛИ ПОДГОТОВКУ КОНТЕНТА",
        description:
          "Собрали пайплайн генерации описаний и промо‑изображений для большого каталога товаров с контролем качества и модерацией.",
      },
    ],
    results: [
      {
        label: "Скорость подготовки карточек товара",
        value: "x4 быстрее",
        icon: "time",
      },
      {
        label: "Снижение ручной работы контент‑отдела",
        value: "−60%",
        icon: "automation",
      },
      {
        label: "Рост заполненности каталога",
        value: "+30% SKU с полным описанием",
        icon: "growth",
      },
    ],
  },
  {
    id: 3,
    cardTitle: "Чат‑бот с RAG",
    title: "Чат‑бот с локальным RAG для службы поддержки",
    imageUrl:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1974&auto=format&fit=crop",
    bgClass: "bg-gradient-to-b from-sky-500/25 via-sky-900/40 to-black",
    clientRequest: [
      "Снизить нагрузку на линию поддержки и сократить время ответа на типовые вопросы.",
    ],
    implementation: [
      {
        title: "ЗАПУСТИЛИ ЧАТ‑БОТА С RAG",
        description:
          "Построили чат‑бота, который отвечает на вопросы клиентов на основе внутренней базы знаний и документов (подход Retrieval‑Augmented Generation). Бот опирается на актуальные данные и не «придумывает» ответы.",
      },
    ],
    results: [
      {
        label: "Снижение нагрузки на операторов",
        value: "до 40% диалогов обрабатывает бот",
        icon: "users",
      },
      {
        label: "Среднее время ответа",
        value: "< 5 секунд",
        icon: "time",
      },
      {
        label: "Удовлетворённость клиентов",
        value: "4.6/5 по итогам опросов",
        icon: "loyalty",
      },
    ],
  },
  {
    id: 4,
    cardTitle: "AI‑агент для внутренних процессов",
    title: "AI‑агент для автоматизации внутренних процессов",
    imageUrl:
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2090&auto=format&fit=crop",
    bgClass:
      "bg-gradient-to-b from-violet-500/25 via-violet-900/40 to-black",
    clientRequest: [
      "Сократить ручную рутину в операционных процессах и сборе отчётности.",
    ],
    implementation: [
      {
        title: "ВНЕДРИЛИ AI‑АГЕНТА В ОПЕРАЦИОННУЮ РУТИНУ",
        description:
          "Реализовали агента, который создаёт задачи, собирает данные из разных систем и уведомляет команду о ключевых событиях, снимая большую часть ручной работы.",
      },
    ],
    results: [
      {
        label: "Экономия времени операционной команды",
        value: "до 20 часов в неделю",
        icon: "time",
      },
      {
        label: "Скорость подготовки отчётности",
        value: "вместо 2 дней — 2 часа",
        icon: "automation",
      },
      {
        label: "Количество ручных ошибок",
        value: "снижение на 70%",
        icon: "quality",
      },
    ],
  },
  {
    id: 5,
    cardTitle: "Компьютерное зрение",
    title: "Компьютерное зрение для контроля качества",
    imageUrl:
      "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop",
    bgClass:
      "bg-gradient-to-b from-amber-500/25 via-amber-900/40 to-black",
    clientRequest: [
      "Автоматизировать визуальный контроль качества и снизить количество дефектной продукции.",
    ],
    implementation: [
      {
        title: "АВТОМАТИЗИРОВАЛИ ВИЗУАЛЬНЫЙ КОНТРОЛЬ",
        description:
          "Внедрили систему компьютерного зрения для выявления дефектов на изображениях в режиме, близком к реальному времени, с последующим разбором аномалий командой качества.",
      },
    ],
    results: [
      {
        label: "Снижение дефектной продукции",
        value: "до −30%",
        icon: "quality",
      },
      {
        label: "Скорость проверки единицы товара",
        value: "менее 0.5 секунды",
        icon: "time",
      },
      {
        label: "Объём выборочного контроля",
        value: "100% партии вместо выборки",
        icon: "automation",
      },
    ],
  },
];

type AccordionItemProps = {
  item: AccordionItemData;
  isActive: boolean;
  onMouseEnter: () => void;
  onOpen: () => void;
};

const AccordionItem = ({
  item,
  isActive,
  onMouseEnter,
  onOpen,
}: AccordionItemProps) => {
  return (
    <div
      className={`relative h-[320px] md:h-[450px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out ${
        isActive ? "w-[300px] md:w-[440px]" : "w-[60px] md:w-[80px]"
      }`}
      onMouseEnter={onMouseEnter}
      onClick={onOpen}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-2xl",
          item.bgClass ?? "bg-gradient-to-b from-zinc-900 via-zinc-950 to-black"
        )}
      />
      <div className="absolute inset-0 rounded-2xl border border-white/5" />

      <span
        className={`absolute text-white text-sm md:text-lg font-semibold whitespace-nowrap transition-all duration-300 ease-in-out ${
          isActive
            ? "bottom-3 left-1/2 -translate-x-1/2 rotate-0"
            : "bottom-24 left-1/2 -translate-x-1/2 rotate-90"
        }`}
      >
        {item.cardTitle}
      </span>

      {isActive && item.results && (
        <div className="absolute inset-x-4 top-6 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-200">
              Результаты
            </span>
          </div>
            <div className="mt-1 flex flex-col gap-2">
            {item.results.map((result) => (
              <div
                key={result.label}
                className="flex items-start gap-2 rounded-2xl border border-white/10 bg-black/70 px-3 py-2 text-[11px] md:text-xs text-zinc-200 shadow-md shadow-black/50"
              >
                <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300">
                  {getResultIcon(result.icon)}
                </span>
                <div>
                  <span className="block text-zinc-400">{result.label}</span>
                  <span className="block font-semibold text-white">
                    {result.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState<number>(3);
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const openedItem =
    openedIndex !== null ? accordionItems[openedIndex] : null;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenedIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section className="w-full bg-black">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 py-12 md:flex-row md:py-20">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-white">
            Кейсы{" "}
            <span className="text-indigo-400">
              внедрения наших решений
            </span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-zinc-300 max-w-xl mx-auto md:mx-0">
            Здесь мы собрали реальные проекты, где комбинируем веб‑разработку,
            AI‑инструменты и интеграции. Каждый кейс — пример того, как мы
            решаем конкретные бизнес‑задачи клиентов.
          </p>
        </div>

        <div className="w-full md:w-1/2">
          <div className="flex flex-row items-center justify-center gap-3 overflow-x-auto rounded-2xl bg-zinc-900/60 p-4">
            {accordionItems.map((item, index) => (
              <AccordionItem
                key={item.id}
                item={item}
                isActive={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
                onOpen={() => setOpenedIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {openedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={() => setOpenedIndex(null)}
        >
          <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[40px] p-[2px] bg-gradient-to-br from-indigo-500/40 via-emerald-500/30 to-amber-400/40 shadow-2xl shadow-black/80">
            <div
              className="relative rounded-[36px] border border-white/10 bg-gradient-to-br from-[#050816] via-[#020617] to-[#020617] p-6 md:p-10"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpenedIndex(null)}
                className="absolute right-4 top-4 text-sm text-zinc-400 hover:text-zinc-100"
                aria-label="Закрыть описание кейса"
              >
                ✕
              </button>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
                {openedItem.title}
              </h3>
              <div className="mt-6 space-y-6 text-sm md:text-base leading-relaxed text-zinc-300">
                {openedItem.clientRequest?.length ? (
                  <div className="space-y-3">
                    <h4 className="inline-flex items-center gap-2 rounded-full bg-indigo-500/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-indigo-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-300" />
                      Запрос клиента
                    </h4>
                    <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/15 via-black to-black px-4 py-3">
                      <ul className="list-disc space-y-1 pl-5">
                        {openedItem.clientRequest.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}

                {openedItem.challenge ? (
                  <div className="space-y-3">
                    <h4 className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                      Главный вызов
                    </h4>
                    <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/15 via-black to-black px-4 py-3">
                      <p>{openedItem.challenge}</p>
                    </div>
                  </div>
                ) : null}

                {openedItem.implementation?.length ? (
                  <div className="space-y-3">
                    <h4 className="inline-flex items-center gap-2 rounded-full bg-violet-500/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-violet-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
                      Что мы реализовали
                    </h4>
                    <div className="mt-1 grid gap-3 md:grid-cols-2">
                      {openedItem.implementation.map((impl, index) => (
                        <GlowCard
                          key={impl.title}
                          glowColor={index % 2 === 0 ? "purple" : "blue"}
                          customSize
                          className="h-full w-full rounded-2xl border border-white/10 bg-black/80 p-4 md:p-5 text-sm text-zinc-50"
                        >
                          <div className="flex h-full flex-col gap-2 items-start">
                            <p className="text-sm md:text-base font-semibold tracking-tight text-white">
                              {impl.title}
                            </p>
                            <p className="text-xs md:text-sm text-zinc-300">
                              {impl.description}
                            </p>
                            {impl.bullets && impl.bullets.length > 0 && (
                              <ul className="mt-1 space-y-1 text-xs md:text-sm text-zinc-200">
                                {impl.bullets.map((bullet) => (
                                  <li
                                    key={bullet}
                                    className="flex gap-2"
                                  >
                                    <span className="mt-[6px] h-[3px] w-3 rounded-full bg-indigo-400" />
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </GlowCard>
                      ))}
                    </div>
                  </div>
                ) : null}

                {openedItem.screens?.length ? (
                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                      Экраны приложения
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {openedItem.screens.map((screen) => (
                        <div
                          key={screen.src}
                          className="overflow-hidden rounded-xl border border-zinc-800 bg-black/40"
                        >
                          <img
                            src={screen.src}
                            alt={screen.alt}
                            className="h-32 w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
