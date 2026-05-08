"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Template {
  id: string;
  name: string;
  blocks: Block[];
}

interface Block {
  id: string;
  type: "text" | "price" | "list";
  label: string;
  value: string;
}

export default function NewProposalPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/templates")
      .then((r) => r.json())
      .then(setTemplates)
      .catch(() => {});
  }, []);

  const selectTemplate = (t: Template) => {
    setSelectedTemplate(t);
    setBlocks(t.blocks.map((b) => ({ ...b, value: b.value ?? "" })));
  };

  const updateBlock = (id: string, value: string) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, value } : b)));
  };

  const handleSave = async (download = false) => {
    if (!selectedTemplate || !clientName) return;
    setSaving(true);

    try {
      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          clientEmail,
          templateId: selectedTemplate.id,
          data: { blocks },
        }),
      });

      const { id } = await res.json();

      if (download) {
        const pdfRes = await fetch(`/api/pdf?id=${id}`);
        const blob = await pdfRes.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `КП_${clientName.replace(/\s+/g, "_")}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      }

      router.push("/admin/proposals");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Новое КП</h1>
        <p className="text-white/40 text-sm mt-1">Создание коммерческого предложения</p>
      </div>

      {/* Client info */}
      <div className="p-6 rounded-xl border border-white/5 bg-white/2 mb-6">
        <h2 className="font-semibold mb-4">Данные клиента</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/40 mb-2">Имя / Компания *</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
              placeholder="ООО «Компания»"
            />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-2">Email</label>
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
              placeholder="client@company.ru"
            />
          </div>
        </div>
      </div>

      {/* Template selection */}
      <div className="p-6 rounded-xl border border-white/5 bg-white/2 mb-6">
        <h2 className="font-semibold mb-4">Шаблон</h2>
        {templates.length === 0 ? (
          <p className="text-white/30 text-sm">
            Нет шаблонов.{" "}
            <a href="/admin/templates" className="text-indigo-400 hover:underline">
              Создайте шаблон
            </a>
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => selectTemplate(t)}
                className={`p-4 rounded-lg border text-left text-sm transition-all ${
                  selectedTemplate?.id === t.id
                    ? "border-indigo-500/50 bg-indigo-500/10 text-white"
                    : "border-white/5 text-white/50 hover:border-white/10 hover:text-white"
                }`}
              >
                <div className="font-medium">{t.name}</div>
                <div className="text-xs text-white/30 mt-1">{t.blocks.length} блоков</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Blocks editor */}
      {selectedTemplate && blocks.length > 0 && (
        <div className="p-6 rounded-xl border border-white/5 bg-white/2 mb-6">
          <h2 className="font-semibold mb-4">Содержание КП</h2>
          <div className="space-y-4">
            {blocks.map((block) => (
              <div key={block.id}>
                <label className="block text-xs text-white/40 mb-2">{block.label}</label>
                {block.type === "text" || block.type === "list" ? (
                  <textarea
                    rows={3}
                    value={block.value}
                    onChange={(e) => updateBlock(block.id, e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all resize-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={block.value}
                    onChange={(e) => updateBlock(block.id, e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                    placeholder="Например: 350 000 ₽"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => handleSave(false)}
          disabled={saving || !clientName || !selectedTemplate}
          className="px-5 py-2.5 rounded-lg border border-white/10 text-white text-sm font-medium hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          Сохранить черновик
        </button>
        <button
          onClick={() => handleSave(true)}
          disabled={saving || !clientName || !selectedTemplate}
          className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          {saving ? "Генерация..." : "Сохранить и скачать PDF"}
        </button>
      </div>
    </div>
  );
}
