"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { regionalComparison } from "@/lib/data/government";

export function RegionalCompareChart() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="h-[340px] border border-ink/15 bg-parchment/40 p-4">
        <h4 className="font-serif text-lg text-ink mb-2">Coups since independence</h4>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={regionalComparison} margin={{ top: 5, right: 10, bottom: 30, left: 0 }}>
            <CartesianGrid stroke="#1a181420" vertical={false} />
            <XAxis dataKey="country" stroke="#1a1814" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" height={60} />
            <YAxis stroke="#1a1814" tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{ background: "#f5f1e8", border: "1px solid #1a181430", fontSize: 12 }}
            />
            <Bar dataKey="coups" name="Coups">
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

      <div className="h-[340px] border border-ink/15 bg-parchment/40 p-4">
        <h4 className="font-serif text-lg text-ink mb-2">Years of armed conflict</h4>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={regionalComparison} margin={{ top: 5, right: 10, bottom: 30, left: 0 }}>
            <CartesianGrid stroke="#1a181420" vertical={false} />
            <XAxis dataKey="country" stroke="#1a1814" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" height={60} />
            <YAxis stroke="#1a1814" tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{ background: "#f5f1e8", border: "1px solid #1a181430", fontSize: 12 }}
            />
            <Bar dataKey="yearsOfWar" name="Years of war">
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
    </div>
  );
}
