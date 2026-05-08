export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Дашборд</h1>
        <p className="text-white/40 text-sm mt-1">Moscow Factory Tech — внутренняя панель</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Всего предложений", value: "—", icon: "📄" },
          { label: "Отправлено", value: "—", icon: "✉️" },
          { label: "Шаблонов", value: "—", icon: "🗂️" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-6 rounded-xl border border-white/5 bg-white/2"
          >
            <div className="text-2xl mb-3">{stat.icon}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-white/40 text-sm mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-white/5 bg-white/2">
          <h2 className="font-semibold mb-4">Быстрые действия</h2>
          <div className="space-y-3">
            <a
              href="/admin/proposals/new"
              className="flex items-center gap-3 p-3 rounded-lg bg-indigo-600/10 border border-indigo-500/20 hover:bg-indigo-600/20 transition-all text-sm text-indigo-300"
            >
              <span>+</span> Создать КП
            </a>
            <a
              href="/admin/templates"
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/8 transition-all text-sm text-white/60"
            >
              <span>🗂️</span> Управление шаблонами
            </a>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-white/5 bg-white/2">
          <h2 className="font-semibold mb-4">Последние предложения</h2>
          <p className="text-white/30 text-sm">Пока нет предложений. Создайте первое КП.</p>
        </div>
      </div>
    </div>
  );
}
