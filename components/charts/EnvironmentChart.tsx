"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { envIndicators } from "@/lib/data/environment";

// Normalize each series to its 1900 value so they share a 0–100 scale.
const base = envIndicators[0];
const data = envIndicators.map((d) => ({
  year: d.year,
  forest: Math.round((d.forestCoverPct / base.forestCoverPct) * 100),
  mangrove: Math.round((d.mangroveKm2 / base.mangroveKm2) * 100),
  fish: Math.round((d.fishBiomassIndex / base.fishBiomassIndex) * 100),
  soil: Math.round((d.soilCarbonTHa / base.soilCarbonTHa) * 100),
}));

export function EnvironmentChart() {
  return (
    <div className="w-full h-[400px] border border-ink/15 bg-parchment/40 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, bottom: 30, left: 10 }}>
          <CartesianGrid stroke="#1a181420" vertical={false} />
          <XAxis dataKey="year" stroke="#1a1814" tick={{ fontSize: 12 }} />
          <YAxis
            stroke="#1a1814"
            tick={{ fontSize: 12 }}
            domain={[0, 110]}
            label={{
              value: "Indexed to 1900 = 100",
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
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <ReferenceLine x={1960} stroke="#5c1a1a" strokeDasharray="4 4" label={{ value: "Independence", fontSize: 11, fill: "#5c1a1a" }} />
          <Line dataKey="forest" name="Forest cover" stroke="#6a7d5e" strokeWidth={2} dot />
          <Line dataKey="mangrove" name="Mangrove area" stroke="#3d5a4a" strokeWidth={2} dot />
          <Line dataKey="fish" name="Fish biomass" stroke="#5c1a1a" strokeWidth={2} dot />
          <Line dataKey="soil" name="Soil carbon" stroke="#a04525" strokeWidth={2} dot />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
