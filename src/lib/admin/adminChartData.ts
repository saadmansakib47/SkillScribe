// lib/adminChartData.ts

export const adminChartData = {
  "New Users": {
    "7d": [
      { date: "Mon", value: 14 },
      { date: "Tue", value: 11 },
      { date: "Wed", value: 18 },
      { date: "Thu", value: 15 },
      { date: "Fri", value: 22 },
      { date: "Sat", value: 28 },
      { date: "Sun", value: 19 },
    ],
    "14d": Array.from({ length: 14 }, (_, i) => ({
      date: `Day ${i + 1}`,
      value: Math.floor(8 + Math.random() * 25),
    })),
    "30d": Array.from({ length: 30 }, (_, i) => ({
      date: `Day ${i + 1}`,
      value: Math.floor(5 + Math.random() * 30),
    })),
    "90d": Array.from({ length: 90 }, (_, i) => ({
      date: `Day ${i + 1}`,
      value: Math.floor(3 + Math.random() * 35),
    })),
  },

  "Active Users": {
    "7d": [
      { date: "Mon", value: 130 },
      { date: "Tue", value: 135 },
      { date: "Wed", value: 140 },
      { date: "Thu", value: 150 },
      { date: "Fri", value: 160 },
      { date: "Sat", value: 170 },
      { date: "Sun", value: 180 },
    ],
    "14d": Array.from({ length: 14 }, (_, i) => ({
      date: `Day ${i + 1}`,
      value: Math.floor(110 + Math.random() * 80),
    })),
    "30d": Array.from({ length: 30 }, (_, i) => ({
      date: `Day ${i + 1}`,
      value: Math.floor(100 + Math.random() * 120),
    })),
    "90d": Array.from({ length: 90 }, (_, i) => ({
      date: `Day ${i + 1}`,
      value: Math.floor(90 + Math.random() * 150),
    })),
  },

  "Suspended Users": {
    "7d": [
      { date: "Mon", value: 1 },
      { date: "Tue", value: 0 },
      { date: "Wed", value: 2 },
      { date: "Thu", value: 1 },
      { date: "Fri", value: 1 },
      { date: "Sat", value: 2 },
      { date: "Sun", value: 1 },
    ],
    "14d": Array.from({ length: 14 }, (_, i) => ({
      date: `Day ${i + 1}`,
      value: Math.floor(Math.random() * 3),
    })),
    "30d": Array.from({ length: 30 }, (_, i) => ({
      date: `Day ${i + 1}`,
      value: Math.floor(Math.random() * 4),
    })),
    "90d": Array.from({ length: 90 }, (_, i) => ({
      date: `Day ${i + 1}`,
      value: Math.floor(Math.random() * 5),
    })),
  },

  "New Applications": {
    "7d": [
      { date: "Mon", value: 6 },
      { date: "Tue", value: 4 },
      { date: "Wed", value: 9 },
      { date: "Thu", value: 5 },
      { date: "Fri", value: 11 },
      { date: "Sat", value: 8 },
      { date: "Sun", value: 12 },
    ],
    "14d": Array.from({ length: 14 }, (_, i) => ({
      date: `Day ${i + 1}`,
      value: Math.floor(3 + Math.random() * 12),
    })),
    "30d": Array.from({ length: 30 }, (_, i) => ({
      date: `Day ${i + 1}`,
      value: Math.floor(2 + Math.random() * 14),
    })),
    "90d": Array.from({ length: 90 }, (_, i) => ({
      date: `Day ${i + 1}`,
      value: Math.floor(1 + Math.random() * 16),
    })),
  },

  Approved: {
    "7d": [
      { date: "Mon", value: 3 },
      { date: "Tue", value: 5 },
      { date: "Wed", value: 4 },
      { date: "Thu", value: 6 },
      { date: "Fri", value: 5 },
      { date: "Sat", value: 7 },
      { date: "Sun", value: 8 },
    ],
    "14d": Array.from({ length: 14 }, (_, i) => ({
      date: `Day ${i + 1}`,
      value: Math.floor(2 + Math.random() * 10),
    })),
    "30d": Array.from({ length: 30 }, (_, i) => ({
      date: `Day ${i + 1}`,
      value: Math.floor(2 + Math.random() * 12),
    })),
    "90d": Array.from({ length: 90 }, (_, i) => ({
      date: `Day ${i + 1}`,
      value: Math.floor(1 + Math.random() * 15),
    })),
  },

  Rejected: {
    "7d": [
      { date: "Mon", value: 1 },
      { date: "Tue", value: 1 },
      { date: "Wed", value: 0 },
      { date: "Thu", value: 2 },
      { date: "Fri", value: 1 },
      { date: "Sat", value: 1 },
      { date: "Sun", value: 2 },
    ],
    "14d": Array.from({ length: 14 }, (_, i) => ({
      date: `Day ${i + 1}`,
      value: Math.floor(Math.random() * 3),
    })),
    "30d": Array.from({ length: 30 }, (_, i) => ({
      date: `Day ${i + 1}`,
      value: Math.floor(Math.random() * 4),
    })),
    "90d": Array.from({ length: 90 }, (_, i) => ({
      date: `Day ${i + 1}`,
      value: Math.floor(Math.random() * 5),
    })),
  },
};
