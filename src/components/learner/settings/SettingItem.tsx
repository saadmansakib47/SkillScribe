import { ReactNode } from 'react';
import Link from 'next/link';

interface SettingItemProps {
  label: string;
  value: string | ReactNode;
  action?: ReactNode;
  actionLabel?: string;
  actionHref?: string;
}

export default function SettingItem({ label, value, action, actionLabel, actionHref }: SettingItemProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div>
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-600">{value}</p>
      </div>
      {action || (actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="text-sm text-[#094CA4] hover:underline font-medium"
        >
          {actionLabel}
        </Link>
      ) : actionLabel ? (
        <button className="text-sm text-[#094CA4] hover:underline font-medium">
          {actionLabel}
        </button>
      ) : null)}
    </div>
  );
}
