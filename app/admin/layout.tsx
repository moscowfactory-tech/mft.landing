import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Админ-панель — MFT",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#080810] text-white">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-56 shrink-0 border-r border-white/5 flex flex-col">
          <div className="p-5 border-b border-white/5">
            <span className="text-indigo-400 font-bold text-lg">MFT</span>
            <span className="text-white/30 text-xs ml-2">admin</span>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            <a
              href="/admin"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              <span>📊</span> Дашборд
            </a>
            <a
              href="/admin/proposals"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              <span>📄</span> Предложения
            </a>
            <a
              href="/admin/templates"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              <span>🗂️</span> Шаблоны
            </a>
          </nav>
          <div className="p-4 border-t border-white/5">
            <a
              href="/"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-white/30 hover:text-white/50 transition-all"
            >
              ← На сайт
            </a>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
