export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-indigo-400 font-bold">MFT</span>
          <span className="text-white/30 text-sm">Moscow Factory Tech</span>
        </div>
        <p className="text-white/20 text-sm">
          © {new Date().getFullYear()} Moscow Factory Tech. Все права защищены.
        </p>
        <div className="flex items-center gap-6">
          <a href="https://t.me/mft" className="text-white/30 hover:text-white/60 text-sm transition-colors">
            Telegram
          </a>
          <a href="mailto:hello@mft.ru" className="text-white/30 hover:text-white/60 text-sm transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
