"use client";

import React from "react";

const Grid2X2Plus = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" strokeWidth="2" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" strokeWidth="2" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" strokeWidth="2" />
    <path
      d="M18 14v7M14.5 17.5h7"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function MinimalFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-12">
      <div className="mx-auto max-w-4xl bg-[radial-gradient(35%_80%_at_30%_0%,--theme(--color-foreground/.1),transparent)] md:border-x border-white/10">
        <div className="bg-border absolute inset-x-0 h-px w-full bg-white/10" />
        <div className="flex flex-col gap-5 p-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4">
            <a href="/" className="w-max opacity-60">
              <Grid2X2Plus className="size-8" />
            </a>
            <p className="max-w-sm font-mono text-sm text-zinc-400">
              Moscow Factory Tech — технологический партнёр для бизнеса.
              Создаём продукты от идеи до запуска.
            </p>
          </div>
          <a
            href="https://t.me/mftmanager"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start inline-flex items-center gap-2.5 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98] md:self-auto"
          >
            Обсудить проект
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z"/>
            </svg>
          </a>
        </div>
        <div className="bg-border absolute inset-x-0 h-px w-full bg-white/10" />
        <div className="flex flex-col gap-2 px-8 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-500">
            © Moscow Factory Tech. Все права защищены {year}
          </p>
          <div className="flex gap-4">
            <a href="/privacy" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
              Политика конфиденциальности
            </a>
            <a href="/personal-data" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
              Обработка персональных данных
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
