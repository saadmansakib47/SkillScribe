import { Conversation } from "@/lib/admin/chatbotData";
import TopicBadge from "./TopicBadge";

interface ConversationCardProps {
  conversation: Conversation;
  onViewDetails: () => void;
}

export default function ConversationCard({ conversation, onViewDetails }: ConversationCardProps) {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "Positive":
        return "text-green-600";
      case "Negative":
        return "text-red-600";
      case "Neutral":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-4">
        {/* Left Section: Avatar + Info */}
        <div className="flex items-start gap-4 flex-1">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-semibold flex-shrink-0">
            {conversation.learnerName.split(" ").map(n => n[0]).join("")}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="font-semibold text-gray-900">{conversation.learnerName}</h3>
                <p className="text-sm text-gray-600">{conversation.learnerId}</p>
              </div>
            </div>

            <p className="text-sm text-gray-700 mb-3">{conversation.course}</p>

            {/* Topics */}
            <div className="flex flex-wrap gap-2 mb-3">
              {conversation.topics.map((topic, index) => (
                <TopicBadge key={index} topic={topic} />
              ))}
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-600">{conversation.timestamp}</span>
                <span className={`font-semibold ${getSentimentColor(conversation.sentiment)}`}>
                  {conversation.sentiment}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Action Button */}
        <button
          onClick={onViewDetails}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap flex-shrink-0"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
