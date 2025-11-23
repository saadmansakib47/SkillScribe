"use client";

import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { FAQS, FAQ, FAQCategory } from '@/lib/admin/faqs';
import { FAQAccordion, FAQModal, FAQFilters } from '@/components/admin/faq-management';
import AdminLayout from '../adminLayout';

export default function FAQManagementPage() {
  const [faqs, setFaqs] = useState<FAQ[]>(FAQS);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<FAQCategory | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);

  const filteredFaqs = useMemo(() => {
    let filtered = [...faqs];

    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
      );
    }

    if (categoryFilter && categoryFilter !== 'all') {
      filtered = filtered.filter(faq => faq.category === categoryFilter);
    }

    filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    return filtered;
  }, [faqs, searchQuery, categoryFilter]);

  const handleCreateClick = () => {
    setEditingFaq(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (faq: FAQ) => {
    setEditingFaq(faq);
    setIsModalOpen(true);
  };

  const handleSaveFaq = (faqData: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingFaq) {
      setFaqs(prev => prev.map(faq =>
        faq.id === editingFaq.id
          ? {
            ...faq,
            ...faqData,
            updatedAt: new Date().toISOString().split('T')[0]
          }
          : faq
      ));
      alert('FAQ updated successfully!');
    } else {
      const newFaq: FAQ = {
        id: Math.max(...faqs.map(f => f.id)) + 1,
        ...faqData,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setFaqs(prev => [newFaq, ...prev]);
      alert('FAQ created successfully!');
    }

    setIsModalOpen(false);
    setEditingFaq(null);
  };

  const handleDeleteFaq = (id: number) => {
    const faq = faqs.find(f => f.id === id);
    if (!faq) return;

    if (confirm(`Are you sure you want to delete this FAQ: "${faq.question}"?`)) {
      setFaqs(prev => prev.filter(f => f.id !== id));
      alert('FAQ deleted successfully!');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFaq(null);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#FAF7F3] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-6 flex justify-end">
            <button
              onClick={handleCreateClick}
              className="flex items-center gap-2 px-6 py-3 bg-[#094CA4] text-white rounded-full hover:bg-[#073a85] transition-all font-semibold whitespace-nowrap"
            >
              <Plus className="h-5 w-5" />
              Create FAQ
            </button>
          </div>

          <div className="mb-6">
            <FAQFilters
              categoryFilter={categoryFilter}
              onCategoryChange={setCategoryFilter}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>

          <div className="mb-4 text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredFaqs.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{faqs.length}</span> FAQs
          </div>

          {filteredFaqs.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <FAQAccordion
                  key={faq.id}
                  faq={faq}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteFaq}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No FAQs Found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || categoryFilter !== 'all'
                  ? 'Try adjusting your filters to find what you are looking for.'
                  : 'Get started by creating your first FAQ.'}
              </p>
              {!searchQuery && categoryFilter === 'all' && (
                <button
                  onClick={handleCreateClick}
                  className="px-6 py-3 bg-[#094CA4] text-white rounded-full hover:bg-[#073a85] transition-all font-semibold"
                >
                  Create Your First FAQ
                </button>
              )}
            </div>
          )}

          <FAQModal
            isOpen={isModalOpen}
            faq={editingFaq}
            onClose={handleCloseModal}
            onSave={handleSaveFaq}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
