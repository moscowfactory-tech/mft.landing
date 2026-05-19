"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Category = "mobile" | "ai" | "automation" | "platforms";

type CaseEntry = {
  id: string;
  title: string;
  tag: string;
  category: Category;
  image: string;
  client: string;
  task: string;
  technologies: string[];
  details: string;
  developed: string[];
  features: string[];
  slides: string[];
};

const CASES: CaseEntry[] = [
  {
    id: "1",
    title: "Мобильное приложение TriMoTi для аудиогидов в музеях",
    tag: "Мобильное приложение",
    category: "mobile",
    image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=800&auto=format&fit=crop",
    client: "TriMoTi",
    task: "Дать небольшим музеям простой цифровой канал для запуска аудиоэкскурсий без сложной технической инфраструктуры.",
    technologies: ["React Native", "Node.js", "PostgreSQL", "Offline Audio Cache"],
    details: "Единая платформа для музейных аудиоэкскурсий: мобильное приложение для посетителей, контур управления материалами и сервис аналитики по использованию маршрутов. Решение помогло небольшим музеям запустить цифровые экскурсии без затрат на отдельные аудиоустройства.",
    developed: [
      "Мобильное приложение для iOS/Android с каталогом музеев и аудиомаршрутами",
      "Плеер аудиогидов с офлайн-режимом и сохранением прогресса по трекам",
      "Контентный модуль для загрузки экспонатов, аудиофайлов и описаний маршрутов",
      "Базовая аналитика прослушиваний для музейных команд и кураторов",
    ],
    features: [
      "Быстрый выбор музея и экскурсии по географии и тематике",
      "Офлайн-доступ к заранее загруженным аудиогидам",
      "Пошаговые маршруты по залам и карточки экспонатов с аудиокомментариями",
      "Поддержка обновлений контента без публикации новой версии приложения",
    ],
    slides: [
      "https://images.unsplash.com/photo-1569183602710-4ca1d4e2c7a5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "2",
    title: "Зеленопарк — мобильное приложение для посетителей ТЦ",
    tag: "Мобильное приложение · CRM",
    category: "mobile",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
    client: "Зеленопарк (ТЦ)",
    task: "Собрать в одном приложении ключевые сервисы для посетителей и повысить вовлечённость в акции торгового центра.",
    technologies: ["Flutter", "Node.js", "PostgreSQL", "Firebase Cloud Messaging"],
    details: "Цифровая экосистема для ТЦ: клиентское мобильное приложение, административный контур для маркетинга и интеграция с внутренними данными арендаторов. Приложение снизило разрозненность сервисов и сделало коммуникацию с посетителями централизованной и управляемой.",
    developed: [
      "Мобильное приложение для iOS/Android с каталогом арендаторов и интерактивной картой ТЦ",
      "Модуль акций и событий с сегментацией предложений по интересам посетителя",
      "Админ-панель для контент-менеджеров маркетинга и операционной команды ТЦ",
      "Интеграция с внутренними источниками данных для обновления карточек магазинов",
    ],
    features: [
      "Навигация по этажам и быстрый поиск магазинов по категориям",
      "Пуш-уведомления о персональных акциях, розыгрышах и сезонных кампаниях",
      "Карточки арендаторов с контактами, графиком работы и актуальными предложениями",
      "Лента событий ТЦ с анонсами, регистрацией и напоминаниями",
    ],
    slides: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "3",
    title: "СпортТабло — десктопная программа для соревнований",
    tag: "Десктопное приложение",
    category: "mobile",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop",
    client: "СпортТабло",
    task: "Заменить бумажные плакаты и ручной подсчёт очков на школьных турнирах.",
    technologies: ["Electron", "JavaScript", "Desktop UI", "Offline-first"],
    details: "Локальное приложение для отображения счёта, таймера и команд на проекторе или экране. Организаторы получили удобный инструмент вместо ручного подсчёта — проведение школьных соревнований стало быстрее и понятнее для зрителей.",
    developed: [
      "Десктопное приложение для управления матчем в реальном времени",
      "Модуль отображения счёта, таймера и состава команд",
      "Экранный режим для проектора и панели",
      "Профили турниров и сохранение настроек мероприятий",
    ],
    features: [
      "Быстрое управление матчем с клавиатуры и кнопок интерфейса",
      "Гибкая настройка длительности периодов и формата игры",
      "Крупная визуализация для спортивных залов",
      "Локальная работа без зависимости от интернета",
    ],
    slides: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "4",
    title: "ИИ аттестация сотрудников и оценка кандидатов",
    tag: "AI · HR Tech",
    category: "ai",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop",
    client: "Культура гостеприимства (20+ ресторанов)",
    task: "Автоматизировать оценку персонала и первичный отбор, убрав человеческий фактор и предвзятость.",
    technologies: ["Next.js", "Node.js", "TypeScript", "AI Transcription", "Assessment Analytics"],
    details: "Полноценная HR-платформа: загрузка материалов, транскрибация, AI-оценка по ролевым матрицам, рекомендации и управленческая аналитика. Платформа перевела оценку персонала из субъективного ручного процесса в структурируемый цифровой контур с едиными стандартами.",
    developed: [
      "Web-приложение (Next.js) с отдельными контурами для ролей и сценариев оценки",
      "Backend API на Node.js/Express + TypeScript с централизованной бизнес-логикой",
      "AI-модуль транскрибации аудио и экспертной оценки по критериям",
      "Модуль управления критериями, версиями и ролевыми наборами",
      "Модуль аналитики по оценкам, токенам, стоимости и качеству работы персонала",
      "Система авторизации и контроля доступа по разделам приложения",
    ],
    features: [
      "Загрузка аудиоинтервью и автоматическая транскрибация с хранением сегментов",
      "AI-оценка по структурированным критериям с итоговыми баллами и отчётами",
      "Раздельные assessment-flow для официантов, менеджеров и планёрок",
      "Версионирование наборов критериев без потери истории",
      "Журнал AI-запросов с токенами, стоимостью и длительностью",
      "Экспорт результатов в Excel для HR и операционных руководителей",
    ],
    slides: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "5",
    title: "VIP AI-менеджер для производителя красок Arhat Inks",
    tag: "AI · Голосовой AI",
    category: "ai",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop",
    client: "Arhat Inks (Узбекистан)",
    task: "Автоматизировать личные продажи и сервис для ключевых клиентов, интегрировав аудиосообщения и финансовые данные.",
    technologies: ["aiogram", "OpenAI", "FastAPI", "Google Sheets", "1C Integration", "PostgreSQL"],
    details: "Telegram-бот для приёма и обработки заказов с автоматизацией диалога, привязкой к данным дебиторки и управлением заказами без ручной рутины в чате. Платформа убрала ручное ведение заявок в мессенджере и перевела процесс в управляемый цифровой сценарий: от общения с клиентом до передачи в 1С.",
    developed: [
      "Telegram-бот на aiogram с мультиязычным диалогом (RU/UZ)",
      "AI-модуль обработки заказов через OpenAI с JSON-структурированием позиций",
      "Модуль транскрибации голосовых сообщений через Aisha STT",
      "Синхронизация данных клиентов/дебиторки/прайсов из Google Sheets",
      "Backend на FastAPI с веб-админкой для заказов и истории диалогов",
      "Интеграция с 1С для передачи заказов и контроля статусов",
    ],
    features: [
      "Приём заказов в Telegram в естественном диалоге, включая голосовые сообщения",
      "Поддержка RU/UZ интерфейса и настроек языка/валюты",
      "Автоматическое определение статуса клиента (regular/VIP) и персональные цены",
      "Подтягивание дебиторки, лимитов и прайсов из Google Sheets",
      "Веб-админка: заказы, статусы, история переписки",
      "Уведомление клиента в Telegram о результате обработки заказа",
    ],
    slides: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "6",
    title: "ИИ генерация этикеток с проверкой по ТР ТС",
    tag: "AI · Автоматизация",
    category: "ai",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=800&auto=format&fit=crop",
    client: "Ист Трейд",
    task: "Ускорить создание и перевод этикеток для ввозимой продукции, исключив человеческие ошибки при проверке норм.",
    technologies: ["Next.js", "FastAPI", "OCR", "RAG", "OpenAI", "PostgreSQL", "SVG"],
    details: "AI-платформа, которая распознаёт документ, переводит, структурирует поля, проверяет по регламентам ТР ТС и формирует готовый макет этикетки в SVG. Минимальная ручная рутина — от загрузки до готовой этикетки.",
    developed: [
      "Веб-интерфейс для загрузки и управления этикетками (Next.js)",
      "Backend на FastAPI с оркестрацией полного pipeline обработки",
      "Модуль OCR и извлечения текста из PDF/документов",
      "Модуль автоматического перевода на русский и определения языка",
      "Модуль валидации по ТР ТС с RAG-поиском по регламентам",
      "Модуль генерации и редактирования финальной этикетки в формате SVG",
    ],
    features: [
      "Поддержка входных форматов PDF, DOC/DOCX, XLS/XLSX",
      "Асинхронный pipeline: OCR → перевод → парсинг → валидация → генерация",
      "Проверка по ТР ТС 005/2011, 021/2011, 022/2011, 023/2011 и 029/2012",
      "RAG-проверка через OpenAI file search со ссылками на нормативные пункты",
      "Автоматическое исправление части несоответствий",
      "Генерация готового макета этикетки в SVG для печати",
    ],
    slides: [
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "7",
    title: "ИИ-чат-бот для Авито и сайта (металлопрокат)",
    tag: "AI · Чат-бот",
    category: "ai",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop",
    client: "Тримет",
    task: "Не терять заказы в выходные и отвечать на сложные технические вопросы о металле в любой точке касания.",
    technologies: ["LLM", "Avito API", "Node.js", "RAG", "CRM Integration"],
    details: "Многоканальный бот, база знаний по ассортименту, сценарии квалификации лидов и передача заявок менеджерам. Сервис сократил время ответа клиентам и снизил долю пропущенных обращений.",
    developed: [
      "Многоканальный чат-бот для Авито и сайта",
      "Backend-контур обработки запросов и lead-routing",
      "Интеграция с каталогом товаров и базой знаний",
      "Модуль аналитики диалогов и контроля качества ответов",
    ],
    features: [
      "Квалификация лидов в диалоге по готовому сценарию",
      "Автоматические ответы на типовые вопросы по ассортименту",
      "Передача релевантных заявок менеджерам в CRM",
      "История обращений и метрики эффективности в админ-панели",
    ],
    slides: [
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "8",
    title: "Чат-бот с остатками из 1С для оптовой компании",
    tag: "AI · Чат-бот",
    category: "ai",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800&auto=format&fit=crop",
    client: "Белтимпэкс",
    task: "Предоставить клиентам актуальную информацию по складу 24/7 без звонков менеджерам.",
    technologies: ["Telegram Bot", "1C Integration", "PostgreSQL", "Long Polling", "MAX Bot"],
    details: "Единая платформа: боты для клиентов, серверная бизнес-логика, интеграция с 1С и автоматическое обновление товарной базы из Яндекс.Диска. Клиенты получили доступ к остаткам и ценам в любое время без участия менеджера.",
    developed: [
      "Telegram-бот для авторизации пользователей и поиска ремней по остаткам",
      "MAX-бот как дополнительный канал с общей логикой и единой базой",
      "API-сервер для обмена с 1С (long polling, статусы заявок, скидки)",
      "Модуль поиска и подбора аналогов ремней",
      "Модуль импорта и обновления данных из Excel-файлов Яндекс.Диска",
      "Планировщик автообновления базы остатков и цен по расписанию",
    ],
    features: [
      "Верификация пользователя по номеру телефона через 1С",
      "Поддержка международных форматов телефонов (РФ/Казахстан/Беларусь/Армения/Киргизия)",
      "Персональные скидки клиентов из 1С, применяемые автоматически",
      "Интеллектуальный парсер запросов по ремням (разные форматы записи)",
      "Автоматический подбор аналогов по профилю и длине",
      "Мультиканальная архитектура (Telegram + MAX) с единым профилем пользователя",
    ],
    slides: [
      "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "9",
    title: "ИИ сканер чатов и авто-задачи в Битрикс24",
    tag: "Автоматизация · CRM",
    category: "automation",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=800&auto=format&fit=crop",
    client: "123-buh",
    task: "Ничего не потерять в мессенджерах: автоматическая фиксация задач и контроль выполнения.",
    technologies: ["Node.js", "TypeScript", "OpenAI", "Bitrix24 API", "ChatApp API", "PostgreSQL"],
    details: "Единая платформа: модуль приёма сообщений через ChatApp, AI-классификатор запросов, интеграция с Bitrix24, модуль формирования отчётов и контур логирования всех операций. Платформа убрала ручную обработку заявок и отчётности.",
    developed: [
      "Backend на Node.js + Express + TypeScript с модульной архитектурой",
      "AI-модуль классификации сообщений через OpenAI",
      "Интеграция с ChatApp API для приёма webhook и отправки ответов клиентам",
      "Интеграция с Bitrix24 API для автоматического создания задач",
      "Модуль генерации клиентских отчётов с cron-расписанием",
      "Web-интерфейс (Next.js): админ-панель мониторинга с фильтрами",
      "PostgreSQL + Prisma ORM, Docker-инфраструктура",
    ],
    features: [
      "Автоприём сообщений из Telegram/WhatsApp/Viber через ChatApp",
      "AI-классификация по категориям (счёт, акт сверки, платёж, закрывающие документы)",
      "Автоматическая постановка задач в Bitrix24 с определением ответственного",
      "Гибкое расписание отчётов: ежедневно/еженедельно/ежемесячно",
      "Сбор оценок клиентов через персональные feedback-ссылки",
      "Полное логирование операций по всем интеграциям",
    ],
    slides: [
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "10",
    title: "Распознавание заказов из файлов клиентов",
    tag: "Автоматизация · 1С",
    category: "automation",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop",
    client: "ООО Белтимпэкс",
    task: "Исключить ручной ввод заказов от клиентов, которые присылают свои бланки в произвольных форматах.",
    technologies: ["React", "FastAPI", "OpenAI", "PostgreSQL", "1С Integration"],
    details: "Doc2Order-платформа: загрузка данных, ИИ-парсинг, подбор товаров, ручная настройка и отправка в 1С. Сервис убрал ручную рутину при обработке заявок и превратил хаотичный вход в управляемый цифровой процесс.",
    developed: [
      "Веб-приложение (React) с личным доступом менеджеров по email-коду",
      "Backend на FastAPI с бизнес-логикой обработки документов и заказов",
      "ИИ-модуль парсинга документов/текста/изображений через OpenAI",
      "Интеграция с внешним API поиска ремней (основные результаты + аналоги)",
      "Контур интеграции с 1С для выгрузки заказов и статусов",
      "Хранение документов и заказов в PostgreSQL с историей изменений",
    ],
    features: [
      "Поддержка 3 типов ввода: файл, текст, изображение",
      "Форматы: PDF, DOC/DOCX, XLS/XLSX, PNG/JPG/JPEG",
      "Автоматическое извлечение позиций и количеств через OpenAI",
      "Автоматический поиск товаров по каждой позиции с аналогами",
      "Жизненный цикл заказа для 1С: pending → sent → confirmed / error",
      "Экспорт заказа в Excel, JSON и CSV",
    ],
    slides: [
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "11",
    title: "Cyberly — социальная сеть для людей с ампутациями",
    tag: "Веб-сервис · Комьюнити",
    category: "platforms",
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?q=80&w=800&auto=format&fit=crop",
    client: "Cyberly",
    task: "Создать безопасное комьюнити и полезную платформу для социализации людей с ТСР и их окружения.",
    technologies: ["Next.js 15", "Node.js + Express", "Socket.IO", "PostgreSQL", "Prisma ORM", "MinIO / S3", "Docker"],
    details: "Пользовательский портал, контентный frontend, backend API, социальная лента и сообщения, каталоги, рейтинги, административный контур и централизованное файловое хранилище — всё в единой платформе.",
    developed: [
      "Frontend на Next.js 15 с SSR/ISR-рендерингом",
      "Backend на Node.js + Express с REST API для всех модулей",
      "Модуль аутентификации и профилей (JWT, восстановление пароля)",
      "Социальный модуль: лента постов, комментарии, лайки, медиа-вложения",
      "Real-time диалоги через Socket.IO",
      "Модуль каталогов: врачи, фонды, работа, обучение, хобби",
      "Модуль рейтинга ТСР с отзывами и фильтрацией",
      "Админ-контур управления всеми сущностями платформы",
    ],
    features: [
      "JWT-авторизация с разграничением ролей и admin-endpoint'ами",
      "Real-time сообщения через Socket.IO",
      "Каталог специалистов по протезированию с геопоиском",
      "Рейтинги устройств с отзывами и лайками",
      "MinIO/S3 для хранения изображений, документов и видео",
      "Docker-окружение для стабильного развёртывания",
    ],
    slides: [
      "https://images.unsplash.com/photo-1576671081837-49000212a370?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "12",
    title: "Turnix — платформа для киберспортивных турниров",
    tag: "Игровая платформа",
    category: "platforms",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    client: "Turnix",
    task: "Упростить организацию турниров для комьюнити и небольших лиг.",
    technologies: ["Vue.js", "Go", "PostgreSQL", "WebSockets"],
    details: "Единый сервис для администраторов и участников: настройка турниров, регистрация команд, управление расписанием и контроль результатов. Платформа стандартизировала процесс и снизила операционную нагрузку на организаторов.",
    developed: [
      "Сервис управления турнирами и матчами",
      "Панель администратора для настройки сеток и этапов",
      "Модуль регистрации команд и участников",
      "Система фиксации результатов и турнирной статистики",
    ],
    features: [
      "Поддержка различных форматов турнирной сетки",
      "Автоматический пересчёт этапов после завершения матчей",
      "Прозрачное расписание и статусы игр для участников",
      "Мониторинг активности и эффективности турниров",
    ],
    slides: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "13",
    title: "ERP-система для детской школы танцев",
    tag: "Веб-сервис · ERP",
    category: "platforms",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=800&auto=format&fit=crop",
    client: "Детская школа танцев",
    task: "Автоматизировать ручной труд администраторов по составлению расписания и расчёту зарплат.",
    technologies: ["Node.js", "TypeScript", "Express", "React", "Vite", "PostgreSQL", "Docker"],
    details: "Веб-интерфейс для администраторов, backend API для управления расписанием и назначениями, модуль аналитики, контур управления эталонным расписанием и импорт данных из CSV.",
    developed: [
      "Backend на Node.js + TypeScript + Express с REST API",
      "Frontend на React + TypeScript + Vite для ежедневной работы администраторов",
      "Модуль недельного и дневного расписания по дням недели и залам",
      "Модуль назначения хореографов на конкретные даты занятий",
      "Модуль автоматического расчёта часов и заработной платы",
      "Модуль учёта отмен занятий с сохранением истории",
      "Аналитический модуль по месяцам, хореографам и залам",
    ],
    features: [
      "Расписание на неделю с учётом дат, залов и преподавателей",
      "Версионирование шаблона расписания (effective_from/effective_until)",
      "Защита от дублей назначений по class/date",
      "Оперативная отметка отменённых занятий с пересчётом рабочего времени",
      "Автоматический расчёт выплат по почасовым ставкам и KPI",
      "Docker-окружение для стабильного развёртывания",
    ],
    slides: [
      "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "14",
    title: "Промо-система розыгрышей для торговых центров",
    tag: "Веб-сервис · Промо",
    category: "platforms",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800&auto=format&fit=crop",
    client: "Check Promo",
    task: "Создать надёжную систему для маркетинговых акций с высокой нагрузкой (Black Friday, Новый год).",
    technologies: ["Promo Platform", "QR чеки", "White-label", "Analytics", "Admin Panel"],
    details: "Единый инструмент, который переводит офлайн-промо в цифровой формат: лендинг акции, личный кабинет, сканирование чеков, механика начисления баллов, кабинет промоутера и административная панель для быстрого запуска новых кампаний.",
    developed: [
      "Админ-панель для статистики и управления чеками",
      "Страница акции и личный кабинет пользователя",
      "Кабинет менеджера с аналитикой по пользователям и чекам",
      "Кабинет промоутера для работы в офлайн-точках",
    ],
    features: [
      "Вход по SMS с настраиваемыми полями регистрации",
      "White-label интерфейс: отдельный slug, логотип, цвета для каждой кампании",
      "Сканирование QR-кода с чека и загрузка фото как резервный сценарий",
      "Автоматическая обработка чеков, валидация и начисление баллов",
      "Инструмент розыгрышей с выбором победителей по участникам или загруженному списку",
      "Модерация чеков, проверка дублей и защита от мошенничества",
    ],
    slides: [
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
    ],
  },
];

const FILTERS: { label: string; value: "all" | Category; count: number }[] = [
  { label: "Все", value: "all", count: CASES.length },
  { label: "Мобильные приложения", value: "mobile", count: CASES.filter(c => c.category === "mobile").length },
  { label: "AI решения", value: "ai", count: CASES.filter(c => c.category === "ai").length },
  { label: "Автоматизация", value: "automation", count: CASES.filter(c => c.category === "automation").length },
  { label: "Платформы", value: "platforms", count: CASES.filter(c => c.category === "platforms").length },
];

const TAG_COLOR: Record<Category, string> = {
  mobile: "text-emerald-400",
  ai: "text-yellow-400",
  automation: "text-amber-400",
  platforms: "text-sky-400",
};

const TAG_BG: Record<Category, string> = {
  mobile: "bg-emerald-400/10 text-emerald-300",
  ai: "bg-yellow-400/10 text-yellow-300",
  automation: "bg-amber-400/10 text-amber-300",
  platforms: "bg-sky-400/10 text-sky-300",
};

// ─── Card ────────────────────────────────────────────────────────────────────

function CaseCard({ item, onClick }: { item: CaseEntry; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group text-left w-full rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden hover:border-zinc-600 transition-all duration-300 hover:shadow-xl hover:shadow-black/50"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
        <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm ${TAG_COLOR[item.category]}`}>
          {item.tag}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-indigo-300 transition-colors line-clamp-2">
          {item.title}
        </h3>
        <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed line-clamp-2">
          {item.client}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.technologies.slice(0, 3).map(t => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
              {t}
            </span>
          ))}
          {item.technologies.length > 3 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-500">
              +{item.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

// ─── Slider ──────────────────────────────────────────────────────────────────

function PhotoSlider({ slides }: { slides: string[] }) {
  const [index, setIndex] = useState(0);

  if (!slides.length) return null;

  const prev = () => setIndex(i => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex(i => (i + 1) % slides.length);

  return (
    <div className="relative w-full overflow-hidden rounded-xl aspect-video bg-zinc-900">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={slides[index]}
          alt={`Результат ${index + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        />
      </AnimatePresence>

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1 rounded-full transition-all duration-300 ${i === index ? "w-4 bg-white" : "w-1 bg-white/40"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Modal ───────────────────────────────────────────────────────────────────

function CaseModal({ item, onClose }: { item: CaseEntry; onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <motion.div
        className="relative w-full max-w-5xl max-h-[92vh] sm:max-h-[90vh] flex flex-col rounded-t-2xl sm:rounded-2xl overflow-hidden bg-[#0d0d12] border border-white/8 shadow-2xl shadow-black"
        initial={{ scale: 0.96, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 20 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header image strip */}
        <div className="relative h-48 shrink-0 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-[#0d0d12]/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-8 pb-6">
            <span className={`inline-block text-[10px] font-bold uppercase tracking-[0.18em] mb-2 ${TAG_COLOR[item.category]}`}>
              {item.tag}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">
              {item.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <div className="grid md:grid-cols-[220px_1fr] divide-y md:divide-y-0 md:divide-x divide-white/6">

            {/* Left sidebar */}
            <div className="px-6 py-7 space-y-7 md:sticky md:top-0 md:self-start">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 mb-1.5">Клиент</p>
                <p className="text-sm font-semibold text-white">{item.client}</p>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 mb-1.5">Задача</p>
                <p className="text-xs text-zinc-300 leading-relaxed">{item.task}</p>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 mb-2.5">Технологии</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.technologies.map(t => (
                    <span key={t} className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${TAG_BG[item.category]}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="px-7 py-7 space-y-8">

              {/* Details */}
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 mb-3">
                  Детали проекта
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">{item.details}</p>
              </div>

              {/* Developed */}
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 mb-3">
                  Что было разработано
                </h3>
                <ul className="space-y-2">
                  {item.developed.map(d => (
                    <li key={d} className="flex gap-3 text-sm text-zinc-300">
                      <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 mb-3">
                  Ключевые фичи
                </h3>
                <ul className="space-y-2">
                  {item.features.map(f => (
                    <li key={f} className="flex gap-3 text-sm text-zinc-300">
                      <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Slider */}
              {item.slides.length > 0 && (
                <div>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 mb-3">
                    Результаты работ
                  </h3>
                  <PhotoSlider slides={item.slides} />
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function CasesSection() {
  const [activeFilter, setActiveFilter] = useState<"all" | Category>("all");
  const [openedId, setOpenedId] = useState<string | null>(null);

  const filtered = activeFilter === "all"
    ? CASES
    : CASES.filter(c => c.category === activeFilter);

  const openedCase = openedId ? CASES.find(c => c.id === openedId) ?? null : null;

  return (
    <section id="cases" className="w-full bg-black">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-20 md:pt-24 md:pb-28">

        {/* Header */}
        <div className="mb-10 md:mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Наши работы
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Кейсы{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">внедрения наших решений</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm md:text-base text-zinc-400 leading-relaxed">
            14 реальных проектов — мобильные приложения, AI‑инструменты, автоматизация и платформы.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-1 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]">
          {FILTERS.map(f => (
            <button
              key={f.value}
              type="button"
              onClick={() => setActiveFilter(f.value)}
              className="relative shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200"
            >
              {activeFilter === f.value && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-indigo-600"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`relative ${activeFilter === f.value ? "text-white" : "text-zinc-400 hover:text-zinc-200"}`}>
                {f.label}
                <span className={`ml-1.5 text-xs ${activeFilter === f.value ? "text-yellow-200" : "text-zinc-600"}`}>
                  {f.count}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.93 }}
                transition={{ duration: 0.2 }}
              >
                <CaseCard item={item} onClick={() => setOpenedId(item.id)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {openedCase && (
          <CaseModal item={openedCase} onClose={() => setOpenedId(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
