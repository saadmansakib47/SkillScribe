import { useState } from 'react';
import { ChevronDown, Edit2, Trash2 } from 'lucide-react';
import { FAQ, getCategoryLabel, getCategoryColor } from '@/lib/admin/faqs';

interface FAQAccordionProps {
  faq: FAQ;
  onEdit: (faq: FAQ) => void;
  onDelete: (id: number) => void;
}

export default function FAQAccordion({ faq, onEdit, onDelete }: FAQAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4 flex-1 text-left">
          <ChevronDown
            className={`h-5 w-5 text-gray-600 transition-transform flex-shrink-0 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-lg">{faq.question}</h3>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(
              faq.category
            )} flex-shrink-0`}
          >
            {getCategoryLabel(faq.category)}
          </span>
        </div>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="px-6 py-4 border-t-2 border-gray-200 bg-gray-50">
          <div className="mb-4">
            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
          </div>

          {/* Metadata */}
          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <span>Created: {new Date(faq.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              <span>Updated: {new Date(faq.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onEdit(faq)}
              className="flex items-center gap-2 px-4 py-2 bg-[#094CA4] text-white rounded-full hover:bg-[#073a85] transition-all font-semibold text-sm whitespace-nowrap"
            >
              <Edit2 className="h-4 w-4" />
              Edit
            </button>
            <button
              onClick={() => onDelete(faq.id)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all font-semibold text-sm whitespace-nowrap"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
