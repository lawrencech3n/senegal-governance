"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import { senegalRegimes } from "@/lib/data/government";

// Build a year-by-year series of V-Dem score by regime.
const data: { year: number; vdem: number; leader: string }[] = [];
for (const r of senegalRegimes) {
  for (let y = r.start; y <= r.end; y++) {
    data.push({ year: y, vdem: r.vdemScore, leader: r.leader });
  }
}

export function RegimeChart() {
  return (
    <div className="w-full h-[360px] border border-ink/15 bg-parchment/40 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, bottom: 30, left: 10 }}>
          <CartesianGrid stroke="#1a181420" vertical={false} />
          <XAxis dataKey="year" stroke="#1a1814" tick={{ fontSize: 12 }} />
          <YAxis
            stroke="#1a1814"
            domain={[0, 1]}
            tick={{ fontSize: 12 }}
            label={{
              value: "V-Dem liberal democracy index",
              angle: -90,
              position: "insideLeft",
              style: { fontSize: 11, fill: "#1a1814aa" },
            }}
          />
          <Tooltip
            contentStyle={{
              background: "#f5f1e8",
              border: "1px solid #1a181430",
              fontSize: 12,
            }}
            formatter={(v: number) => v.toFixed(2)}
            labelFormatter={(y) => `Year ${y}`}
          />
          <ReferenceArea x1={1895} x2={1960} fill="#5c1a1a" fillOpacity={0.07} label={{ value: "Colonial", fontSize: 10, fill: "#5c1a1a" }} />
          <ReferenceLine x={1960} stroke="#5c1a1a" strokeDasharray="4 4" />
          <ReferenceLine x={2000} stroke="#1a1814" strokeDasharray="2 4" label={{ value: "First alternation", fontSize: 10, fill: "#1a1814" }} />
          <Line dataKey="vdem" stroke="#a04525" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
