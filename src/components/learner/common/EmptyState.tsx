import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    href: string;
    icon?: LucideIcon;
  };
  secondaryAction?: {
    label: string;
    href: string;
    icon?: LucideIcon;
  };
  footer?: ReactNode;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  footer
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-16 text-center"
    >
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mx-auto mb-6">
        <Icon className="h-16 w-16 text-[#094CA4]" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">{description}</p>
      
      {(primaryAction || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {primaryAction && (
            <Link
              href={primaryAction.href}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#094CA4] text-white rounded-xl hover:bg-[#073a85] transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              {primaryAction.icon && <primaryAction.icon className="h-5 w-5" />}
              {primaryAction.label}
            </Link>
          )}
          {secondaryAction && (
            <Link
              href={secondaryAction.href}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#094CA4] border-2 border-[#094CA4] rounded-xl hover:bg-blue-50 transition-all font-semibold text-lg"
            >
              {secondaryAction.icon && <secondaryAction.icon className="h-5 w-5" />}
              {secondaryAction.label}
            </Link>
          )}
        </div>
      )}

      {footer && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          {footer}
        </div>
      )}
    </motion.div>
  );
}
