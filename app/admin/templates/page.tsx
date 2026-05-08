import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function TemplatesPage() {
  let templates: Awaited<ReturnType<typeof prisma.template.findMany>> = [];

  try {
    templates = await prisma.template.findMany({
      include: { _count: { select: { proposals: true } } },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // DB not configured yet
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Шаблоны</h1>
          <p className="text-white/40 text-sm mt-1">Шаблоны коммерческих предложений</p>
        </div>
        <Link
          href="/admin/templates/new"
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
        >
          + Новый шаблон
        </Link>
      </div>

      {templates.length === 0 ? (
        <div className="text-center py-20 text-white/30">
          <div className="text-4xl mb-4">🗂️</div>
          <p className="text-lg mb-2">Нет шаблонов</p>
          <p className="text-sm mb-6">Создайте первый шаблон КП с нужными блоками</p>
          <Link
            href="/admin/templates/new"
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
          >
            Создать шаблон
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((t) => (
            <Link
              key={t.id}
              href={`/admin/templates/${t.id}`}
              className="p-5 rounded-xl border border-white/5 bg-white/2 hover:border-indigo-500/20 hover:bg-indigo-500/5 transition-all"
            >
              <h3 className="font-semibold mb-2">{t.name}</h3>
              <div className="flex items-center gap-4 text-xs text-white/30">
                <span>{Array.isArray(t.blocks) ? (t.blocks as unknown[]).length : 0} блоков</span>
                <span>{(t as { _count?: { proposals: number } })._count?.proposals ?? 0} КП</span>
              </div>
              <div className="text-xs text-white/20 mt-3">
                {new Date(t.createdAt).toLocaleDateString("ru-RU")}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
