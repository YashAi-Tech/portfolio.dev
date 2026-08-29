import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export const Nav: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
  ];

  return (
    <nav aria-label="Primary" className="fixed left-1/2 top-6 z-50 -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full bg-background p-1.5 shadow-sm border border-foreground/8">
        <ul className="relative flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.href} className="relative">
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `focus-ring relative inline-flex cursor-pointer items-center justify-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300 ${
                    isActive ? 'text-foreground font-semibold' : 'text-foreground/60 hover:text-foreground'
                  }`
                }
              >
                <span className="relative z-10">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="focus-ring relative inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-background ring-1 ring-foreground/8 transition-colors hover:bg-foreground/5"
        >
          <span aria-hidden="true" className="relative h-4 w-4">
            <Sun
              className={`lucide lucide-sun absolute inset-0 h-4 w-4 text-foreground transition-all duration-300 ${
                theme === 'dark' ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
              }`}
              aria-hidden="true"
            />
            <Moon
              className={`lucide lucide-moon absolute inset-0 h-4 w-4 text-foreground transition-all duration-300 ${
                theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
              }`}
              aria-hidden="true"
            />
          </span>
        </button>
      </div>
    </nav>
  );
};
