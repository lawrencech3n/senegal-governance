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
import { extractionByYear } from "@/lib/data/extraction";

const data = extractionByYear.map((d) => ({
  year: d.year,
  total: d.totalExtractionUsdM,
  retained: Math.round(d.totalExtractionUsdM * d.localRetainedShare),
  exported: Math.round(d.totalExtractionUsdM * (1 - d.localRetainedShare)),
}));

export function ExtractionChart() {
  return (
    <div className="w-full h-[420px] border border-ink/15 bg-parchment/40 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 20, right: 30, bottom: 30, left: 10 }}>
          <CartesianGrid stroke="#1a181420" vertical={false} />
          <XAxis dataKey="year" stroke="#1a1814" tick={{ fontSize: 12 }} />
          <YAxis
            stroke="#1a1814"
            tick={{ fontSize: 12 }}
            label={{
              value: "USD millions (2020)",
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
          <Bar dataKey="exported" name="Value leaving Senegal" stackId="a" fill="#5c1a1a" />
          <Bar dataKey="retained" name="Value retained" stackId="a" fill="#6a7d5e" />
          <Line dataKey="total" name="Total extraction" stroke="#1a1814" strokeWidth={1.5} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
