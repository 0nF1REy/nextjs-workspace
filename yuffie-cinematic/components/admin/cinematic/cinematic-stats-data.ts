export type CinematicStats = {
  name: string;
  views: number;
  addedAt: string;
};

export const cinematicStatsData: CinematicStats[] = [
  { name: "Back to the Future", views: 1200, addedAt: "2025-10-01" },
  { name: "The Terminator", views: 950, addedAt: "2025-10-02" },
  { name: "The Breakfast Club", views: 800, addedAt: "2025-10-03" },
  { name: "Blade Runner", views: 700, addedAt: "2025-10-04" },
  { name: "The Goonies", views: 650, addedAt: "2025-10-05" },
];
