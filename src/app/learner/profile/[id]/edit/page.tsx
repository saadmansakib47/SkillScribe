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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href={`/learner/profile/${learnerId}`}
              className="p-2.5 rounded-xl hover:bg-white border-2 border-transparent hover:border-gray-200 transition-all"
            >
              <ArrowLeft className="h-6 w-6 text-gray-700" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
              <p className="text-sm text-gray-500 mt-1">Update your personal information</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Header Card */}
          <div className="bg-white rounded-2xl shadow-md border-2 border-gray-200 p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 pb-8 border-b-2 border-gray-100">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-28 h-28 rounded-2xl overflow-hidden bg-gray-100 border-4 border-gray-200 shadow-md">
                  <Image
                    src={learner.avatar}
                    alt={learner.name}
                    width={112}
                    height={112}
                    className="object-cover w-full h-full"
                  />
                </div>
                <button
                  type="button"
                  className="absolute -bottom-2 -right-2 bg-[#094CA4] text-white rounded-xl p-3 hover:bg-[#073a85] transition-all shadow-lg hover:shadow-xl"
                  onClick={() => alert('Avatar upload feature coming soon!')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Profile Picture</h3>
                <p className="text-sm text-gray-500">JPG, PNG or GIF. Max size 2MB.</p>
                <p className="text-xs text-gray-400 mt-1">Click the edit button to change your avatar</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#094CA4] focus:border-[#094CA4] transition-all font-medium"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#094CA4] focus:border-[#094CA4] transition-all font-medium"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-bold text-gray-900 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#094CA4] focus:border-[#094CA4] transition-all font-medium"
                />
              </div>

              {/* Bio */}
              <div>
                <label htmlFor="bio" className="block text-sm font-bold text-gray-900 mb-2">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us about yourself, your interests, and learning goals..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#094CA4] focus:border-[#094CA4] resize-none transition-all font-medium"
                />
                <p className="text-xs text-gray-500 mt-2">{formData.bio.length} characters</p>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-white rounded-2xl shadow-md border-2 border-gray-200 p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Skills</h3>
              <p className="text-sm text-gray-500">Add your technical and professional skills</p>
            </div>
            
            <div className="flex gap-3 mb-6">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                placeholder="e.g., JavaScript, React, Python"
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#094CA4] focus:border-[#094CA4] transition-all font-medium"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-6 py-3 bg-[#094CA4] text-white rounded-xl hover:bg-[#073a85] transition-all font-semibold shadow-md hover:shadow-lg"
              >
                Add Skill
              </button>
            </div>

            <div className="min-h-[80px] bg-gray-50 rounded-xl p-4 border-2 border-gray-100">
              {formData.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border-2 border-gray-300 bg-white text-gray-700 hover:border-[#094CA4] transition-all"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="hover:text-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-sm text-gray-400 font-medium">No skills added yet. Add your first skill above!</p>
                </div>
              )}
            </div>
          </div>

          {/* Interests Section */}
          <div className="bg-white rounded-2xl shadow-md border-2 border-gray-200 p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Interests</h3>
              <p className="text-sm text-gray-500">What topics are you passionate about?</p>
            </div>
            
            <div className="flex gap-3 mb-6">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInterest())}
                placeholder="e.g., Web Development, Data Science"
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#094CA4] focus:border-[#094CA4] transition-all font-medium"
              />
              <button
                type="button"
                onClick={handleAddInterest}
                className="px-6 py-3 bg-[#094CA4] text-white rounded-xl hover:bg-[#073a85] transition-all font-semibold shadow-md hover:shadow-lg"
              >
                Add Interest
              </button>
            </div>

            <div className="min-h-[80px] bg-gray-50 rounded-xl p-4 border-2 border-gray-100">
              {formData.interests.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {formData.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white shadow-sm hover:shadow-md transition-all"
                      style={{ backgroundColor: '#094CA4' }}
                    >
                      {interest}
                      <button
                        type="button"
                        onClick={() => handleRemoveInterest(interest)}
                        className="hover:opacity-80 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-sm text-gray-400 font-medium">No interests added yet. Add your first interest above!</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="w-full sm:w-auto px-8 py-3.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold"
            >
              Cancel Changes
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#094CA4] text-white rounded-xl hover:bg-[#073a85] transition-all font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
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
