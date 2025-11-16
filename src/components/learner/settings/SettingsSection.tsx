import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface SettingsSectionProps {
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function SettingsSection({
  icon: Icon,
  iconBgColor,
  iconColor,
  title,
  subtitle,
  children
}: SettingsSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-lg ${iconBgColor} flex items-center justify-center`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
