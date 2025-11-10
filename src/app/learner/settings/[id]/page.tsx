"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getLearnerById } from '@/lib/learners';
import { ArrowLeft, User, Bell, Lock, Palette, Save, Shield } from 'lucide-react';

type SettingsType = {
  emailNotifications: boolean;
  courseUpdates: boolean;
  communityReplies: boolean;
  marketingEmails: boolean;
  weeklyDigest: boolean;
  showProfile: boolean;
  shareProgress: boolean;
  showAchievements: boolean;
  language: string;
  theme: string;
  autoplay: boolean;
  subtitles: boolean;
};

export default function SettingsPage() {
  const params = useParams();
  const learnerId = parseInt(params.id as string);
  
  // Default settings
  const defaultSettings: SettingsType = {
    emailNotifications: true,
    courseUpdates: true,
    communityReplies: true,
    marketingEmails: false,
    weeklyDigest: true,
    showProfile: true,
    shareProgress: true,
    showAchievements: true,
    language: 'en',
    theme: 'light',
    autoplay: true,
    subtitles: false,
  };

  const [settings, setSettings] = useState<SettingsType>(defaultSettings);
  const [isSaved, setIsSaved] = useState(false);

  // Load settings from localStorage after mount to avoid hydration mismatch
  useEffect(() => {
    const savedSettings = localStorage.getItem(`learner-settings-${learnerId}`);
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    }
  }, [learnerId]);
  
  const currentUser = getLearnerById(learnerId);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#FAF7F3] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">User Not Found</h1>
          <p className="text-gray-600 mb-4">The requested user could not be found.</p>
          <Link href="/learner/switch-user" className="text-[#094CA4] hover:underline">
            Switch User
          </Link>
        </div>
      </div>
    );
  }

  // Handle setting change
  const handleToggle = (key: keyof SettingsType) => {
    setSettings((prev: SettingsType) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSelectChange = (key: keyof SettingsType, value: string) => {
    setSettings((prev: SettingsType) => ({
      ...prev,
      [key]: value
    }));
  };

  // Save settings to localStorage
  const handleSave = () => {
    localStorage.setItem(`learner-settings-${learnerId}`, JSON.stringify(settings));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F3] py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/learner/profile/${currentUser.id}`}
            className="inline-flex items-center gap-2 text-[#094CA4] hover:underline font-medium mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and settings</p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#094CA4] to-[#0d6fd9] flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{currentUser.name}</h2>
              <p className="text-gray-600">{currentUser.email}</p>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <User className="h-5 w-5 text-[#094CA4]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Account Information</h3>
              <p className="text-sm text-gray-600">Manage your personal information</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Name</p>
                <p className="text-sm text-gray-600">{currentUser.name}</p>
              </div>
              <Link
                href={`/learner/profile/${currentUser.id}/edit`}
                className="text-sm text-[#094CA4] hover:underline font-medium"
              >
                Edit
              </Link>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Email</p>
                <p className="text-sm text-gray-600">{currentUser.email}</p>
              </div>
              <Link
                href={`/learner/profile/${currentUser.id}/edit`}
                className="text-sm text-[#094CA4] hover:underline font-medium"
              >
                Edit
              </Link>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Location</p>
                <p className="text-sm text-gray-600">{currentUser.location}</p>
              </div>
              <Link
                href={`/learner/profile/${currentUser.id}/edit`}
                className="text-sm text-[#094CA4] hover:underline font-medium"
              >
                Edit
              </Link>
            </div>
          </div>
        </div>

        {/* Email Preferences */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Bell className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Email Preferences</h3>
              <p className="text-sm text-gray-600">Control what emails you receive</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <ToggleSetting
              label="Email Notifications"
              description="Receive notifications about your account activity"
              checked={settings.emailNotifications}
              onChange={() => handleToggle('emailNotifications')}
            />
            <ToggleSetting
              label="Course Updates"
              description="Get notified when instructors add new content"
              checked={settings.courseUpdates}
              onChange={() => handleToggle('courseUpdates')}
            />
            <ToggleSetting
              label="Community Replies"
              description="Receive notifications when someone replies to your posts"
              checked={settings.communityReplies}
              onChange={() => handleToggle('communityReplies')}
            />
            <ToggleSetting
              label="Marketing Emails"
              description="Receive promotional offers and course recommendations"
              checked={settings.marketingEmails}
              onChange={() => handleToggle('marketingEmails')}
            />
            <ToggleSetting
              label="Weekly Digest"
              description="Get a summary of your learning progress every week"
              checked={settings.weeklyDigest}
              onChange={() => handleToggle('weeklyDigest')}
            />
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Privacy</h3>
              <p className="text-sm text-gray-600">Manage your privacy preferences</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <ToggleSetting
              label="Public Profile"
              description="Allow others to view your profile and learning activity"
              checked={settings.showProfile}
              onChange={() => handleToggle('showProfile')}
            />
            <ToggleSetting
              label="Share Learning Progress"
              description="Show your course progress on your profile"
              checked={settings.shareProgress}
              onChange={() => handleToggle('shareProgress')}
            />
            <ToggleSetting
              label="Show Achievements"
              description="Display your achievements and certificates publicly"
              checked={settings.showAchievements}
              onChange={() => handleToggle('showAchievements')}
            />
          </div>
        </div>

        {/* Learning Preferences */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <Palette className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Learning Preferences</h3>
              <p className="text-sm text-gray-600">Customize your learning experience</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Language */}
            <div>
              <label className="block font-medium text-gray-900 mb-2">Language</label>
              <select
                value={settings.language}
                onChange={(e) => handleSelectChange('language', e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#094CA4] focus:border-transparent text-gray-700"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="zh">中文</option>
              </select>
            </div>

            {/* Theme */}
            <div>
              <label className="block font-medium text-gray-900 mb-2">Theme</label>
              <select
                value={settings.theme}
                onChange={(e) => handleSelectChange('theme', e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#094CA4] focus:border-transparent text-gray-700"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto (System)</option>
              </select>
            </div>

            {/* Video Settings */}
            <ToggleSetting
              label="Autoplay Videos"
              description="Automatically play the next video in a course"
              checked={settings.autoplay}
              onChange={() => handleToggle('autoplay')}
            />
            <ToggleSetting
              label="Enable Subtitles"
              description="Show subtitles by default when available"
              checked={settings.subtitles}
              onChange={() => handleToggle('subtitles')}
            />
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <Lock className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Security</h3>
              <p className="text-sm text-gray-600">Manage your account security</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Password</p>
                <p className="text-sm text-gray-600">Last changed 3 months ago</p>
              </div>
              <button className="text-sm text-[#094CA4] hover:underline font-medium">
                Change Password
              </button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Add an extra layer of security</p>
              </div>
              <button className="text-sm text-[#094CA4] hover:underline font-medium">
                Enable
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {isSaved && (
            <div className="flex items-center gap-2 text-green-600">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">Settings saved successfully!</span>
            </div>
          )}
          {!isSaved && <div></div>}
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-[#094CA4] text-white rounded-xl hover:bg-[#073a85] transition-all font-semibold shadow-md"
          >
            <Save className="h-5 w-5" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// Toggle Setting Component
function ToggleSetting({ 
  label, 
  description, 
  checked, 
  onChange 
}: { 
  label: string; 
  description: string; 
  checked: boolean; 
  onChange: () => void;
}) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex-1">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-600 mt-0.5">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#094CA4] focus:ring-offset-2 ${
          checked ? 'bg-[#094CA4]' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}
