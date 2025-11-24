"use client";

import { useState } from 'react';
import { X } from 'lucide-react';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (categoryData: {
    name: string;
    description: string;
    courseTypes: string[];
  }) => void;
}

export default function AddCategoryModal({ isOpen, onClose, onSave }: AddCategoryModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [courseTypes, setCourseTypes] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Category name is required';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!courseTypes.trim()) {
      newErrors.courseTypes = 'At least one course type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    // Split course types by comma and clean up
    const typesArray = courseTypes
      .split(',')
      .map(type => type.trim())
      .filter(type => type.length > 0);

    onSave({
      name: name.trim(),
      description: description.trim(),
      courseTypes: typesArray
    });

    // Reset form and close
    setName('');
    setDescription('');
    setCourseTypes('');
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">Add New Category</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Web Development"
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#094CA4] focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the category..."
              rows={4}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#094CA4] focus:border-transparent resize-none ${
                errors.description ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Course Types */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Types * (comma-separated)
            </label>
            <input
              type="text"
              value={courseTypes}
              onChange={(e) => setCourseTypes(e.target.value)}
              placeholder="e.g., Frontend, Backend, Full Stack, APIs"
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#094CA4] focus:border-transparent ${
                errors.courseTypes ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.courseTypes && (
              <p className="text-red-500 text-sm mt-1">{errors.courseTypes}</p>
            )}
            <p className="text-gray-500 text-sm mt-1">
              Enter course types separated by commas
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end gap-3 rounded-b-2xl border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-[#094CA4] hover:bg-[#073a85] text-white rounded-full font-medium transition-colors"
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
}
