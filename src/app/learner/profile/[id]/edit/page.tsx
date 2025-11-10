"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { getLearnerById } from '../../../../../lib/learners';
import { ArrowLeft, Save, X } from 'lucide-react';

export default function EditProfilePage() {
  const params = useParams();
  const router = useRouter();
  const learnerId = parseInt(params.id as string);
  const learner = getLearnerById(learnerId);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    skills: [] as string[],
    interests: [] as string[],
  });

  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (learner) {
      Promise.resolve().then(() => {
        setFormData({
          name: learner.name,
          email: learner.email,
          bio: learner.bio,
          location: learner.location,
          skills: [...learner.skills],
          interests: [...learner.interests],
        });
      });
    }
  }, [learner]);

  if (!learner) {
    return (
      <div className="min-h-screen bg-[#FAF7F3] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Learner Not Found</h1>
            <p className="text-gray-600 mb-6">The profile you&apos;re looking for doesn&apos;t exist.</p>
            <Link
              href="/learner/allcourses"
              className="inline-block px-6 py-3 bg-[#094CA4] text-white rounded-lg hover:bg-[#073a85] transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData(prev => ({ ...prev, interests: [...prev.interests, newInterest.trim()] }));
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(interest => interest !== interestToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert('Profile updated successfully! (Demo mode - changes are not persisted)');
      router.push(`/learner/profile/${learnerId}`);
    }, 1000);
  };

  const handleCancel = () => {
    router.push(`/learner/profile/${learnerId}`);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F3] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link
              href={`/learner/profile/${learnerId}`}
              className="p-2 rounded-lg hover:bg-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Header Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-md">
                  <Image
                    src={learner.avatar}
                    alt={learner.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 bg-[#094CA4] text-white rounded-full p-2 hover:bg-[#073a85] transition-colors"
                  onClick={() => alert('Avatar upload feature coming soon!')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 text-center md:text-left">
                <p className="text-sm text-gray-500">Profile Picture</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#094CA4] focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#094CA4] focus:border-transparent"
                />
              </div>

              {/* Location */}
              <div className="md:col-span-2">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#094CA4] focus:border-transparent"
                />
              </div>

              {/* Bio */}
              <div className="md:col-span-2">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us about yourself..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#094CA4] focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Skills</h3>
            
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                placeholder="Add a skill (e.g., JavaScript)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#094CA4] focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-[#094CA4] text-white rounded-full hover:bg-[#073a85] transition-colors"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-300 bg-gray-50 text-gray-700"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-red-600 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {formData.skills.length === 0 && (
                <p className="text-sm text-gray-500">No skills added yet</p>
              )}
            </div>
          </div>

          {/* Interests Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Interests</h3>
            
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInterest())}
                placeholder="Add an interest (e.g., Web Development)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#094CA4] focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleAddInterest}
                className="px-4 py-2 bg-[#094CA4] text-white rounded-full hover:bg-[#073a85] transition-colors"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.interests.map((interest, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-white"
                  style={{ backgroundColor: '#094CA4' }}
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => handleRemoveInterest(interest)}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {formData.interests.length === 0 && (
                <p className="text-sm text-gray-500">No interests added yet</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="w-full sm:w-auto px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#094CA4] text-white rounded-full hover:bg-[#073a85] transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
