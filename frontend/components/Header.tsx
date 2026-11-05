'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/quizzes', label: 'Quizzes' },
  { href: '/create', label: 'Create quiz' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-black/10">
      <nav className="mx-auto flex max-w-3xl items-center gap-6 px-4 py-4">
        <Link href="/quizzes" className="font-semibold">
          Quiz Builder
        </Link>
        <div className="ml-auto flex gap-4 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href ? 'font-medium' : 'text-black/60'
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
