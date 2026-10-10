import {useEffect, useState} from 'react';
import {Monitor, Moon, Sun} from 'lucide-react';

const modes = [
  {value: 'light', icon: Sun, label: 'Light mode'},
  {value: 'dark', icon: Moon, label: 'Dark mode'},
  {value: 'system', icon: Monitor, label: 'System mode'},
];

export function LocalThemeToggle({className = ''}) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('local-theme');
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        setTheme(saved);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolved =
      theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;
    root.setAttribute('data-theme', resolved);
    try {
      localStorage.setItem('local-theme', theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const current = modes.find((m) => m.value === theme) || modes[0];
  const next = modes[(modes.indexOf(current) + 1) % modes.length];
  const Icon = next.icon;

  return (
    <button
      type="button"
      suppressHydrationWarning
      onClick={() => setTheme(next.value)}
      className={`flex items-center justify-center rounded-full p-2 hover:bg-local-sand transition-colors ${className}`}
      aria-label={`Switch to ${next.label}`}
      title={current.label}
    >
      <Icon size={20} aria-hidden="true" className="text-local-ink" />
    </button>
  );
}
