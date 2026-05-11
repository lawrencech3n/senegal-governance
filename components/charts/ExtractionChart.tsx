"use client";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { exportsByCategoryByYear } from "@/lib/data/extraction";

export function ExtractionChart() {
  return (
    <div className="w-full h-[420px] border border-ink/15 bg-parchment/40 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={exportsByCategoryByYear}
          margin={{ top: 20, right: 30, bottom: 30, left: 10 }}
        >
          <CartesianGrid stroke="#1a181420" vertical={false} />
          <XAxis dataKey="year" stroke="#1a1814" tick={{ fontSize: 12 }} />
          <YAxis
            stroke="#1a1814"
            tick={{ fontSize: 12 }}
            label={{
              value: "USD millions (current)",
              angle: -90,
              position: "insideLeft",
              style: { fontSize: 11, fill: "#1a1814aa" },
            }}
          />
          <Tooltip
            contentStyle={{
              background: "#f5f1e8",
              border: "1px solid #1a181430",
              fontFamily: "Inter, sans-serif",
              fontSize: 12,
            }}
            formatter={(value: number) => `$${value.toLocaleString()}M`}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
          <ReferenceLine x={1960} stroke="#5c1a1a" strokeDasharray="4 4" label={{ value: "Independence", fontSize: 11, fill: "#5c1a1a" }} />
          <Bar dataKey="foodUsdM" name="Food exports" stackId="a" fill="#c89c4a" />
          <Bar dataKey="agriRawUsdM" name="Agricultural raw materials" stackId="a" fill="#6a7d5e" />
          <Bar dataKey="oresMetalsUsdM" name="Ores & metals" stackId="a" fill="#a04525" />
          <Bar dataKey="fuelUsdM" name="Fuel exports" stackId="a" fill="#5c1a1a" />
          <Line dataKey="totalUsdM" name="Total merchandise exports" stroke="#1a1814" strokeWidth={1.5} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
