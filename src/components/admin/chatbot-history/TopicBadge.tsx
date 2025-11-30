interface TopicBadgeProps {
  topic: string;
}

export default function TopicBadge({ topic }: TopicBadgeProps) {
  return (
    <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
      {topic}
    </span>
  );
}
