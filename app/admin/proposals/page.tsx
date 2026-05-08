import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProposalsPage() {
  let proposals: Awaited<ReturnType<typeof prisma.proposal.findMany>> = [];

  try {
    proposals = await prisma.proposal.findMany({
      include: { template: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // DB not configured yet
  }

  const statusLabel: Record<string, string> = {
    draft: "Черновик",
    sent: "Отправлено",
    accepted: "Принято",
    declined: "Отклонено",
  };

  const statusColor: Record<string, string> = {
    draft: "bg-white/10 text-white/40",
    sent: "bg-blue-500/10 text-blue-400",
    accepted: "bg-emerald-500/10 text-emerald-400",
    declined: "bg-red-500/10 text-red-400",
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Предложения</h1>
          <p className="text-white/40 text-sm mt-1">Коммерческие предложения для клиентов</p>
        </div>
        <Link
          href="/admin/proposals/new"
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
        >
          + Создать КП
        </Link>
      </div>

      {proposals.length === 0 ? (
        <div className="text-center py-20 text-white/30">
          <div className="text-4xl mb-4">📄</div>
          <p className="text-lg mb-2">Нет предложений</p>
          <p className="text-sm">Создайте первое коммерческое предложение</p>
        </div>
      ) : (
        <div className="rounded-xl border border-white/5 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 bg-white/2">
                <th className="text-left px-6 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Клиент</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Шаблон</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Статус</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Дата</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {proposals.map((p) => (
                <tr key={p.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-sm">{p.clientName}</div>
                    {p.clientEmail && (
                      <div className="text-xs text-white/30 mt-0.5">{p.clientEmail}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-white/50">
                    {(p as { template?: { name: string } }).template?.name ?? "—"}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${statusColor[p.status] ?? statusColor.draft}`}>
                      {statusLabel[p.status] ?? p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-white/40">
                    {new Date(p.createdAt).toLocaleDateString("ru-RU")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/proposals/${p.id}`}
                      className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Открыть →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
