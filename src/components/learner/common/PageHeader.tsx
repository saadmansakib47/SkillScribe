import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function PageHeader({ title, subtitle, className = '' }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`mb-8 ${className}`}
    >
      <h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>
      {subtitle && <p className="text-gray-600">{subtitle}</p>}
    </motion.div>
  );
}
