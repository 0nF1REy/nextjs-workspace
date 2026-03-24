"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { cinematicStatsData } from "./cinematic-stats-data";

export function CinematicViewsBarChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={cinematicStatsData}
        margin={{ top: 16, right: 24, left: 0, bottom: 0 }}
        style={{ background: "#131b22", borderRadius: 8 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#222" />
        <XAxis
          dataKey="name"
          stroke="#888"
          tick={{ fill: "#fff", fontSize: 12 }}
        />
        <YAxis stroke="#888" tick={{ fill: "#fff", fontSize: 12 }} />
        <Tooltip
          labelFormatter={(name) => name}
          formatter={(value: number) => value.toLocaleString()}
          contentStyle={{
            background: "#0d1118",
            border: "1px solid #333",
            color: "#fff",
          }}
        />
        <Bar dataKey="views" fill="#ef4444" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
