"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-white/[0.02]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
            Связаться
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Обсудим проект?</h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Расскажите о вашей задаче — ответим в течение рабочего дня
          </p>
        </div>

        {status === "sent" ? (
          <div className="text-center p-12 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
            <div className="text-4xl mb-4">✓</div>
            <h3 className="text-xl font-semibold text-emerald-400 mb-2">Сообщение отправлено</h3>
            <p className="text-white/50">Свяжемся с вами в ближайшее время</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-white/40 mb-2">Имя</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/7 transition-all"
                  placeholder="Иван Иванов"
                />
              </div>
              <div>
                <label className="block text-sm text-white/40 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/7 transition-all"
                  placeholder="ivan@company.ru"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-white/40 mb-2">Расскажите о проекте</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/7 transition-all resize-none"
                placeholder="Какую задачу нужно решить? Какие сроки и бюджет?"
              />
            </div>

            {status === "error" && (
              <p className="text-red-400 text-sm">Ошибка отправки. Попробуйте ещё раз или напишите нам напрямую.</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-base transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25"
            >
              {status === "sending" ? "Отправляем..." : "Отправить заявку"}
            </button>

            <p className="text-center text-white/30 text-sm">
              Или напишите напрямую:{" "}
              <a href="mailto:hello@mft.ru" className="text-indigo-400 hover:text-indigo-300">
                hello@mft.ru
              </a>
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
