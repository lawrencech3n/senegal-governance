"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { regionalComparison } from "@/lib/data/government";

export function RegionalCompareChart() {
  return (
    <figure className="grid md:grid-cols-2 gap-4">
      <div className="h-[360px] border border-ink/15 bg-parchment/40 p-4">
        <h4 className="font-serif text-lg text-ink mb-1">
          Successful coups since 1960
        </h4>
        <p className="text-xs text-ink/55 mb-2">
          Senegal: 0. Mali and Burkina Faso: 5–6 each.
        </p>
        <ResponsiveContainer width="100%" height="82%">
          <BarChart
            data={regionalComparison}
            margin={{ top: 5, right: 10, bottom: 40, left: 0 }}
            aria-label="Successful coups by country since 1960"
          >
            <CartesianGrid stroke="#1a181420" vertical={false} />
            <XAxis
              dataKey="country"
              stroke="#1a1814"
              tick={{ fontSize: 10 }}
              angle={-30}
              textAnchor="end"
              height={60}
            />
            <YAxis
              stroke="#1a1814"
              tick={{ fontSize: 11 }}
              allowDecimals={false}
              label={{
                value: "Number of coups",
                angle: -90,
                position: "insideLeft",
                style: { fontSize: 10, fill: "#1a1814aa" },
              }}
            />
            <Tooltip
              contentStyle={{
                background: "#f5f1e8",
                border: "1px solid #1a181430",
                fontSize: 12,
              }}
              formatter={(v: number) => [v, "Successful coups"]}
            />
            <Bar dataKey="coups" name="Successful coups">
              {regionalComparison.map((c, i) => (
                <Cell
                  key={i}
                  fill={c.country === "Senegal" ? "#5c1a1a" : "#a04525"}
                  fillOpacity={c.country === "Senegal" ? 1 : 0.5}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="h-[360px] border border-ink/15 bg-parchment/40 p-4">
        <h4 className="font-serif text-lg text-ink mb-1">
          Years with organized armed conflict
        </h4>
        <p className="text-xs text-ink/55 mb-2">
          UCDP threshold: ≥25 battle deaths in a year (1989–2024).
        </p>
        <ResponsiveContainer width="100%" height="82%">
          <BarChart
            data={regionalComparison}
            margin={{ top: 5, right: 10, bottom: 40, left: 0 }}
            aria-label="Years of armed conflict by country"
          >
            <CartesianGrid stroke="#1a181420" vertical={false} />
            <XAxis
              dataKey="country"
              stroke="#1a1814"
              tick={{ fontSize: 10 }}
              angle={-30}
              textAnchor="end"
              height={60}
            />
            <YAxis
              stroke="#1a1814"
              tick={{ fontSize: 11 }}
              allowDecimals={false}
              label={{
                value: "Years of conflict",
                angle: -90,
                position: "insideLeft",
                style: { fontSize: 10, fill: "#1a1814aa" },
              }}
            />
            <Tooltip
              contentStyle={{
                background: "#f5f1e8",
                border: "1px solid #1a181430",
                fontSize: 12,
              }}
              formatter={(v: number) => [v, "Years with conflict"]}
            />
            <Bar dataKey="yearsOfWar" name="Years of conflict">
              {regionalComparison.map((c, i) => (
                <Cell
                  key={i}
                  fill={c.country === "Senegal" ? "#5c1a1a" : "#a04525"}
                  fillOpacity={c.country === "Senegal" ? 1 : 0.5}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <figcaption className="md:col-span-2 text-xs text-ink/55">
        Senegal (dark red) sits at the low end on both measures — the empirical
        basis for calling it a regional outlier on political instability.
      </figcaption>
    </figure>
  );
}
