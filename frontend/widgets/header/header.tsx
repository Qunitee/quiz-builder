'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AppRoutes } from '@/shared/constants/app-routes.constant';
import { ThemeToggle } from '@/widgets/header/theme-toggle';
import './styles/header.scss';

const NavLinks = [
  { href: AppRoutes.Quizzes, label: 'Quizzes' },
  { href: AppRoutes.CreateQuiz, label: 'Create quiz' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-card">
      <nav className="mx-auto flex max-w-3xl items-center gap-4 px-4 py-3">
        <Link href={AppRoutes.Quizzes} className="font-semibold">
          Quiz Builder
        </Link>
        <div className="ml-auto flex items-center gap-1 text-sm sm:gap-3">
          {NavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="header-link"
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
