"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getLearnerById } from '@/lib/learners';
import { ArrowLeft, User, Bell, Lock, Palette, Save, Shield } from 'lucide-react';
import { SettingsSection, ToggleSetting, SettingItem } from '@/components/learner/settings';

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
        <SettingsSection
          icon={User}
          iconBgColor="bg-blue-100"
          iconColor="text-[#094CA4]"
          title="Account Information"
          subtitle="Manage your personal information"
        >
          <SettingItem
            label="Name"
            value={currentUser.name}
            actionLabel="Edit"
            actionHref={`/learner/profile/${currentUser.id}/edit`}
          />
          <SettingItem
            label="Email"
            value={currentUser.email}
            actionLabel="Edit"
            actionHref={`/learner/profile/${currentUser.id}/edit`}
          />
          <SettingItem
            label="Location"
            value={currentUser.location}
            actionLabel="Edit"
            actionHref={`/learner/profile/${currentUser.id}/edit`}
          />
        </SettingsSection>

        {/* Email Preferences */}
        <SettingsSection
          icon={Bell}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
          title="Email Preferences"
          subtitle="Control what emails you receive"
        >
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
        </SettingsSection>

        {/* Privacy Settings */}
        <SettingsSection
          icon={Shield}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          title="Privacy"
          subtitle="Manage your privacy preferences"
        >
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
        </SettingsSection>

        {/* Learning Preferences */}
        <SettingsSection
          icon={Palette}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
          title="Learning Preferences"
          subtitle="Customize your learning experience"
        >
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
        </SettingsSection>

        {/* Security */}
        <SettingsSection
          icon={Lock}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
          title="Security"
          subtitle="Manage your account security"
        >
          <SettingItem
            label="Password"
            value="Last changed 3 months ago"
            actionLabel="Change Password"
          />
          <SettingItem
            label="Two-Factor Authentication"
            value="Add an extra layer of security"
            actionLabel="Enable"
          />
        </SettingsSection>

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
