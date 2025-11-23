import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { FAQ, FAQCategory, getCategoryLabel } from '@/lib/admin/faqs';

interface FAQModalProps {
  isOpen: boolean;
  faq: FAQ | null;
  onClose: () => void;
  onSave: (faq: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const categories: FAQCategory[] = ['general', 'technical', 'billing', 'account', 'courses'];

export default function FAQModal({ isOpen, faq, onClose, onSave }: FAQModalProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState<FAQCategory>('general');
  const [errors, setErrors] = useState<{ question?: string; answer?: string }>({});

  useEffect(() => {
    if (faq) {
      setQuestion(faq.question);
      setAnswer(faq.answer);
      setCategory(faq.category);
    } else {
      setQuestion('');
      setAnswer('');
      setCategory('general');
    }
    setErrors({});
  }, [faq, isOpen]);

  const validateForm = () => {
    const newErrors: { question?: string; answer?: string } = {};

    if (!question.trim()) {
      newErrors.question = 'Question is required';
    }

    if (!answer.trim()) {
      newErrors.answer = 'Answer is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSave({
      question: question.trim(),
      answer: answer.trim(),
      category
    });

    // Reset form
    setQuestion('');
    setAnswer('');
    setCategory('general');
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b-2 border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">
            {faq ? 'Edit FAQ' : 'Create New FAQ'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Question */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Question <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter the FAQ question"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#094CA4] ${
                errors.question ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.question && (
              <p className="mt-1 text-sm text-red-600">{errors.question}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Category <span className="text-red-600">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as FAQCategory)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#094CA4]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {getCategoryLabel(cat)}
                </option>
              ))}
            </select>
          </div>

          {/* Answer */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Answer <span className="text-red-600">*</span>
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the detailed answer"
              rows={8}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#094CA4] resize-none ${
                errors.answer ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.answer && (
              <p className="mt-1 text-sm text-red-600">{errors.answer}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#094CA4] text-white rounded-full hover:bg-[#073a85] transition-all font-semibold"
            >
              {faq ? 'Update FAQ' : 'Create FAQ'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-all font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
