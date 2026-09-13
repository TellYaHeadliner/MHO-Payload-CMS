export default function Footer({
  brand = "myhealingosh",
  year = new Date().getFullYear(),
}) {
  const [prefix, suffix] = [brand.slice(0, 7), brand.slice(7)];

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 py-8 px-6 md:px-10" suppressHydrationWarning>
      <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        <a
          href="#"
          className="font-serif text-lg text-stone-100 tracking-tight"
        >
          {prefix}
          <span className="italic">{suffix}</span>.
        </a>

        <span className="font-mono text-[11px] tracking-widest uppercase text-stone-500">
          © {year} {prefix}{suffix}
        </span>
      </div>
    </footer>
  );
}