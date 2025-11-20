'use client';

import { format, startOfWeek, addDays, subDays } from 'date-fns';

interface Day {
  date: string; // YYYY-MM-DD
  count: number;
}

interface ActivityBoardProps {
  data: Day[];
}

const LEVELS = 4;

export default function ActivityBoard({ data }: ActivityBoardProps) {
  if (!data || data.length === 0) return null;

  // Sort contributions
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const firstDate = new Date(sortedData[0].date);
  const startDate = startOfWeek(firstDate, { weekStartsOn: 0 });
  const lastDate = new Date(sortedData[sortedData.length - 1].date);

  // Fill missing dates
  const paddedData: Day[] = [];
  let currentDate = startDate;
  while (currentDate <= lastDate) {
    const formattedDate = format(currentDate, 'yyyy-MM-dd');
    const existing = sortedData.find((d) => d.date === formattedDate);
    paddedData.push(existing || { date: formattedDate, count: 0 });
    currentDate = addDays(currentDate, 1);
  }

  // Group by weeks (columns)
  const weeks: Day[][] = [];
  for (let i = 0; i < paddedData.length; i += 7) {
    const week = paddedData.slice(i, i + 7);
    while (week.length < 7) {
      week.push({ date: 'padding-' + i + '-' + week.length, count: 0 });
    }
    weeks.push(week);
  }

  // Month labels (first day of month in each week)
  const monthLabels: { weekIndex: number; label: string }[] = [];
  const seenMonths: number[] = [];
  weeks.forEach((week, wIndex) => {
    week.forEach((day) => {
      if (!day.date.startsWith('padding-')) {
        const month = new Date(day.date).getMonth();
        if (!seenMonths.includes(month) && new Date(day.date).getDate() === 1) {
          seenMonths.push(month);
          monthLabels.push({ weekIndex: wIndex, label: format(new Date(day.date), 'MMM') });
        }
      }
    });
  });

  return (
    <div className="w-full flex flex-col gap-1">
      {/* Month labels */}
      <div className="flex gap-1 ml-8 text-xs text-gray-500">
        {weeks.map((_, wIndex) => {
          const month = monthLabels.find((m) => m.weekIndex === wIndex)?.label;
          return (
            <div key={wIndex} className="w-4 text-center">
              {month || ''}
            </div>
          );
        })}
      </div>

      <div className="flex gap-1">
        {/* Weekday labels — FIXED */}
        <div className="flex flex-col text-xs text-gray-500 mr-1">
          <div className="h-4 flex items-center">Mon</div>
          <div className="h-4" />
          <div className="h-4 flex items-center">Wed</div>
          <div className="h-4" />
          <div className="h-4 flex items-center">Fri</div>
          <div className="h-4" />
          <div className="h-4" />
        </div>

        {/* Contribution squares */}
        <div className="flex gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day) => {
                let level = 0;
                if (day.count > 0) level = Math.min(day.count, LEVELS);

                const color =
                  level === 0
                    ? 'bg-blue-50'
                    : level === 1
                    ? 'bg-blue-200'
                    : level === 2
                    ? 'bg-blue-400'
                    : 'bg-blue-600';

                return (
                  <div
                    key={day.date}
                    title={`${day.date.startsWith('padding-') ? '' : format(new Date(day.date), 'eee, yyyy-MM-dd')} — ${day.count} contributions`}
                    className={`w-4 h-4 rounded-sm ${color}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper function for testing/demo
export function generateActivityData(days: number = 365): Day[] {
  const today = new Date();
  const data: Day[] = [];
  for (let i = 0; i < days; i++) {
    const date = subDays(today, i);
    data.push({ date: format(date, 'yyyy-MM-dd'), count: Math.floor(Math.random() * 5) });
  }
  return data.reverse();
}
