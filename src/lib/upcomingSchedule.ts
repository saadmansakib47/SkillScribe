// lib/upcomingSchedule.ts
export type ScheduleEvent = {
  id: string;
  title: string;
  description?: string;
  date: string; // ISO format: "2025-11-06T08:30"
  endDate: string;
  participants: number;
  meetingLink: string;
};

export const upcomingSchedules: ScheduleEvent[] = [
  {
    id: "1",
    title: "UI Designers Roadmap to Career",
    description: "A deep dive into UI design pathways.",
    date: "2025-11-09T08:30",
    endDate: "2025-11-09T10:00",
    participants: 135,
    meetingLink: "meet.google.com/dkje-fdf-yhf",
  },
  {
    id: "2",
    title: "Design Chitchat with Students",
    description: "A casual conversation about design",
    date: "2025-11-10T22:00",
    endDate: "2025-11-10T23:00",
    participants: 80,
    meetingLink: "meet.google.com/abc-xyz-def",
  },
  {
    id: "3",
    title: "Auto Layout in Figma",
    date: "2025-11-11T22:00",
    endDate: "2025-11-11T23:00",
    participants: 92,
    meetingLink: "meet.google.com/qwe-rty-uio",
  },
  {
    id: "4",
    title: "Prototyping with Framer",
    description: "Exploring motion-based UI design.",
    date: "2025-11-13T20:30",
    endDate: "2025-11-13T22:00",
    participants: 115,
    meetingLink: "meet.google.com/fgh-jkl-mno",
  },
];
