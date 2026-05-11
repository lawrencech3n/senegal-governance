"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { exportComposition2020 } from "@/lib/data/extraction";

const palette = ["#5c1a1a", "#a04525", "#c89c4a", "#6a7d5e", "#1a1814", "#8a7a52", "#3d5a4a"];

export function DestinationChart() {
  return (
    <div className="border border-ink/15 bg-parchment/40 p-4">
      <h4 className="font-serif text-xl text-ink mb-2">Export composition (2020)</h4>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={exportComposition2020}
              dataKey="usdM"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={90}
              stroke="#f5f1e8"
              strokeWidth={2}
            >
              {exportComposition2020.map((_, i) => (
                <Cell key={i} fill={palette[i % palette.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#f5f1e8",
                border: "1px solid #1a181430",
                fontSize: 12,
              }}
              formatter={(v: number) => `$${v.toLocaleString()}M`}
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
  );
}
