"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { exportDestinations2020 } from "@/lib/data/extraction";

const palette = ["#5c1a1a", "#a04525", "#c89c4a", "#6a7d5e", "#1a1814", "#8a7a52", "#3d5a4a"];

export function DestinationChart() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {exportDestinations2020.map((res) => (
        <div key={res.resource} className="border border-ink/15 bg-parchment/40 p-4">
          <h4 className="font-serif text-xl text-ink mb-2">{res.resource}</h4>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={res.destinations}
                  dataKey="pctExports"
                  nameKey="country"
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={80}
                  stroke="#f5f1e8"
                  strokeWidth={2}
                >
                  {res.destinations.map((_, i) => (
                    <Cell key={i} fill={palette[i % palette.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#f5f1e8",
                    border: "1px solid #1a181430",
                    fontSize: 12,
                  }}
                  formatter={(v: number) => `${v}%`}
                />
                <Legend
                  wrapperStyle={{ fontSize: 11 }}
                  iconSize={8}
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
}
