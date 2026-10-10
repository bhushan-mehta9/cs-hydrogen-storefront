import {Star} from 'lucide-react';

export function Rating({
  value,
  size = 'w-4 h-4',
  className = '',
  showValue = true,
}) {
  return (
    <div
      className={`flex items-center gap-1 text-primary-700 dark:text-primary-300 ${className}`}
    >
      {Array.from({length: 5}, (_, index) => (
        <Star
          key={index}
          fill={index < Math.floor(value) ? 'currentColor' : 'none'}
          stroke="currentColor"
          className={`${size} ${
            index < Math.floor(value)
              ? 'text-primary-600'
              : 'text-local-border'
          }`}
        />
      ))}
      {showValue && (
        <span className="ml-1 text-sm text-local-muted">{value.toFixed(1)}</span>
      )}
    </div>
  );
}
