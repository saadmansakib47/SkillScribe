"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Search, MessageSquare, AlertTriangle, TrendingUp, Clock } from "lucide-react";
import AdminLayout from "@/app/admin/adminLayout";
import { chatbotConversations, chatbotStats, Conversation } from "@/lib/admin/chatbotData";
import StatisticCard from "@/components/admin/chatbot-history/StatisticCard";
import ChatModal from "@/components/admin/chatbot-history/ChatModal";

type SentimentFilter = "All" | "Positive" | "Negative";

export default function ChatbotHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sentimentFilter, setSentimentFilter] = useState<SentimentFilter>("All");
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  // Filter conversations
  const filteredConversations = useMemo(() => {
    return chatbotConversations.filter((conversation) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        conversation.learnerName.toLowerCase().includes(searchLower) ||
        conversation.learnerId.toLowerCase().includes(searchLower) ||
        conversation.course.toLowerCase().includes(searchLower);

      // Sentiment filter
      const matchesSentiment =
        sentimentFilter === "All" || conversation.sentiment === sentimentFilter;

      return matchesSearch && matchesSentiment;
    });
  }, [searchQuery, sentimentFilter]);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "Positive":
        return "text-green-600";
      case "Negative":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <AdminLayout>
      <div className="flex min-h-screen bg-[#FAF7F3]">
        <main className="flex-1 p-8">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Chatbot History</h1>
            <p className="text-gray-600 mt-2">View and analyze all learner-chatbot conversations</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatisticCard
              icon={<MessageSquare className="w-6 h-6 text-blue-600" />}
              label="Total Conversation"
              value={chatbotStats.totalConversations}
              bgColor="bg-blue-50"
            />
            <StatisticCard
              icon={<AlertTriangle className="w-6 h-6 text-orange-600" />}
              label="Flagged Issue"
              value={chatbotStats.flaggedIssues}
              bgColor="bg-orange-50"
            />
            <StatisticCard
              icon={<TrendingUp className="w-6 h-6 text-green-600" />}
              label="Average Satisfaction"
              value={chatbotStats.averageSatisfaction}
              bgColor="bg-green-50"
            />
            <StatisticCard
              icon={<Clock className="w-6 h-6 text-purple-600" />}
              label="Average Response Time"
              value={chatbotStats.averageResponseTime}
              bgColor="bg-purple-50"
            />
          </div>

          {/* Filters Section */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or email or course.."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <label className="text-sm text-gray-700 mr-2">Status:</label>
              <select
                value={sentimentFilter}
                onChange={(e) => setSentimentFilter(e.target.value as SentimentFilter)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[150px]"
              >
                <option value="All">All</option>
                <option value="Positive">Positive</option>
                <option value="Negative">Negative</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#E8F1FC]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Learner</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Course</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Topics</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Time Stamp</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Sentiment</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredConversations.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center">
                        <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No conversations found</h3>
                        <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                      </td>
                    </tr>
                  ) : (
                    filteredConversations.map((conversation) => (
                      <tr key={conversation.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Image
                              src={conversation.learnerAvatar}
                              alt={conversation.learnerName}
                              width={40}
                              height={40}
                              className="rounded-full object-cover flex-shrink-0"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{conversation.learnerName}</p>
                              <p className="text-sm text-gray-600">ID: {conversation.learnerId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{conversation.course}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {conversation.topics.map((topic, index) => (
                              <span
                                key={index}
                                className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full border border-blue-200"
                              >
                                {topic}
                              </span>
                            ))}
                            {conversation.topics.length > 2 && (
                              <span className="inline-block px-2 py-1 text-xs font-medium text-gray-600">
                                +{conversation.topics.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                          {conversation.timestamp}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-sm font-semibold ${getSentimentColor(conversation.sentiment)}`}>
                            {conversation.sentiment}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setSelectedConversation(conversation)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Chat Modal */}
      {selectedConversation && (
        <ChatModal
          isOpen={!!selectedConversation}
          onClose={() => setSelectedConversation(null)}
          messages={selectedConversation.messages}
          learnerName={selectedConversation.learnerName}
          course={selectedConversation.course}
        />
      )}
    </AdminLayout>
  );
}
