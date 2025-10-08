"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { format } from "date-fns";

type ViewData = {
  date: string;
  views: number;
};

const data: ViewData[] = [
  { date: "2025-10-01", views: 1200 },
  { date: "2025-10-02", views: 1800 },
  { date: "2025-10-03", views: 1500 },
  { date: "2025-10-04", views: 2100 },
  { date: "2025-10-05", views: 1700 },
  { date: "2025-10-06", views: 2300 },
  { date: "2025-10-07", views: 2000 },
];

export function ViewsChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        data={data}
        margin={{ top: 16, right: 24, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#222" />
        <XAxis
          dataKey="date"
          tickFormatter={(date) => format(new Date(date), "dd/MM")}
          stroke="#888"
        />
        <YAxis stroke="#888" />
        <Tooltip
          labelFormatter={(date) => format(new Date(date), "dd/MM/yyyy")}
          contentStyle={{
            background: "#0d1118",
            border: "1px solid #333",
            color: "#fff",
          }}
        />
        <Line
          type="monotone"
          dataKey="views"
          stroke="#38bdf8"
          strokeWidth={3}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
