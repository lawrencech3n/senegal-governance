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
import { vdemLibDemSenegal } from "@/lib/data/government";

export function RegimeChart() {
  return (
    <figure className="w-full border border-ink/15 bg-parchment/40 p-4">
      <figcaption className="sr-only">
        Line chart of Senegal V-Dem liberal democracy index from 1904 to 2024.
        Score rises after independence in 1960 and dips during authoritarian
        phases before recovering with elections.
      </figcaption>
      <div className="h-[360px]" role="img" aria-label="Senegal liberal democracy index over time">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={vdemLibDemSenegal}
            margin={{ top: 20, right: 30, bottom: 30, left: 10 }}
          >
            <CartesianGrid stroke="#1a181420" vertical={false} />
            <XAxis
              dataKey="year"
              stroke="#1a1814"
              tick={{ fontSize: 12 }}
              label={{ value: "Year", position: "insideBottom", offset: -20, fontSize: 11 }}
            />
            <YAxis
              stroke="#1a1814"
              domain={[0, 1]}
              tick={{ fontSize: 12 }}
              tickFormatter={(v) => v.toFixed(1)}
              label={{
                value: "Liberal democracy (0–1)",
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
              formatter={(v: number) => [`${v.toFixed(2)} / 1.00`, "Democracy index"]}
              labelFormatter={(y) => `Year ${y}`}
            />
            <ReferenceArea
              x1={1895}
              x2={1960}
              fill="#5c1a1a"
              fillOpacity={0.07}
              label={{ value: "Colonial", fontSize: 10, fill: "#5c1a1a" }}
            />
            <ReferenceLine
              x={1960}
              stroke="#5c1a1a"
              strokeDasharray="4 4"
              label={{ value: "Independence", fontSize: 10, fill: "#5c1a1a" }}
            />
            <ReferenceLine
              x={2000}
              stroke="#1a1814"
              strokeDasharray="2 4"
              label={{ value: "First alternation", fontSize: 10, fill: "#1a1814" }}
            />
            <Line
              dataKey="vdem"
              name="Liberal democracy index"
              stroke="#a04525"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-ink/55 mt-2">
        Read: democracy deepens after 1960 but plateaus well below full liberal
        democracy — stability without full institutional convergence.
      </p>
    </figure>
  );
}
