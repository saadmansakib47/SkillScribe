"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getInstructorById, Instructor } from "../../../../../lib/instructors";
import { ArrowLeft, Save, X } from "lucide-react";

export default function EditInstructorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const instructorId = parseInt(params.id as string);
  const instructor = getInstructorById(instructorId);

  const [formData, setFormData] = useState<Partial<Instructor>>({
    name: "",
    bio: "",
    location: "",
    expertise: [] as string[],
    social: {},
  });

  const [newExpertise, setNewExpertise] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (instructor) {
      Promise.resolve().then(() => {
        setFormData({
          name: instructor.name,
          bio: instructor.bio,
          location: instructor.location,
          expertise: [...instructor.expertise],
          social: { ...instructor.social },
        });
      });
    }
  }, [instructor]);

  if (!instructor) {
    return (
      <div className="min-h-screen bg-[#FAF7F3] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Instructor Not Found</h1>
            <p className="text-gray-600 mb-6">The profile you&apos;re looking for doesn&apos;t exist.</p>
            <Link
              href="/instructor/allcourses"
              className="inline-block px-6 py-3 bg-[#094CA4] text-white rounded-lg hover:bg-[#073a85] transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddExpertise = () => {
    if (newExpertise.trim() && !formData.expertise?.includes(newExpertise.trim())) {
      setFormData((prev) => ({
        ...prev,
        expertise: [...(prev.expertise || []), newExpertise.trim()],
      }));
      setNewExpertise("");
    }
  };

  const handleRemoveExpertise = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      expertise: prev.expertise?.filter((e) => e !== item),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert("Profile updated successfully! (Demo mode - changes are not persisted)");
      router.push(`/instructor/profile/${instructorId}`);
    }, 1000);
  };

  const handleCancel = () => {
    router.push(`/instructor/profile/${instructorId}`);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F3] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href={`/instructor/profile/${instructorId}`}
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
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-md border-2 border-gray-200 p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 pb-8 border-b-2 border-gray-100">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-28 h-28 rounded-2xl overflow-hidden bg-gray-100 border-4 border-gray-200 shadow-md">
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    width={112}
                    height={112}
                    className="object-cover w-full h-full"
                  />
                </div>
                <button
                  type="button"
                  className="absolute -bottom-2 -right-2 bg-[#094CA4] text-white rounded-xl p-3 hover:bg-[#073a85] transition-all shadow-lg hover:shadow-xl"
                  onClick={() => alert("Avatar upload coming soon!")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Profile Picture</h3>
                <p className="text-sm text-gray-500">JPG, PNG or GIF. Max size 2MB.</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#094CA4] focus:border-[#094CA4] transition-all font-medium"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us about your teaching experience and expertise..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#094CA4] focus:border-[#094CA4] resize-none transition-all font-medium"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#094CA4] focus:border-[#094CA4] transition-all font-medium"
                />
              </div>
            </div>
          </div>

          {/* Expertise Section */}
          <div className="bg-white rounded-2xl shadow-md border-2 border-gray-200 p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expertise</h3>
              <p className="text-sm text-gray-500">Add your areas of expertise</p>
            </div>

            <div className="flex gap-3 mb-6">
              <input
                type="text"
                value={newExpertise}
                onChange={(e) => setNewExpertise(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddExpertise())}
                placeholder="e.g., Data Science, Machine Learning"
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#094CA4] focus:border-[#094CA4] transition-all font-medium"
              />
              <button
                type="button"
                onClick={handleAddExpertise}
                className="px-6 py-3 bg-[#094CA4] text-white rounded-xl hover:bg-[#073a85] transition-all font-semibold shadow-md hover:shadow-lg"
              >
                Add
              </button>
            </div>

            <div className="min-h-[80px] bg-gray-50 rounded-xl p-4 border-2 border-gray-100">
              {formData.expertise && formData.expertise.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {formData.expertise.map((item, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border-2 border-gray-300 bg-white text-gray-700 hover:border-[#094CA4] transition-all"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => handleRemoveExpertise(item)}
                        className="hover:text-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 font-medium">No expertise added yet.</p>
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
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#094CA4] text-white rounded-xl hover:bg-[#073a85] transition-all font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
