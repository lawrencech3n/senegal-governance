"use client";

import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import { regionalComparison } from "@/lib/data/government";
import { useTabListKeyboard } from "@/lib/useTabListKeyboard";

type Metric = "coups" | "yearsOfWar";

const metricConfig: Record<
  Metric,
  {
    label: string;
    shortLabel: string;
    unit: string;
    insight: (gap: number, avg: number, senegal: number) => string;
  }
> = {
  coups: {
    label: "Successful coups since 1960",
    shortLabel: "Coups",
    unit: "coups",
    insight: (gap, avg) =>
      gap >= avg
        ? `Senegal's zero coups vs. a ${avg.toFixed(1)} peer average — the widest governance gap in this comparison. Mali and Mauritania alone account for most of the regional total.`
        : `Senegal matches peers on coups but the comparison still shows divergence on conflict intensity.`,
  },
  yearsOfWar: {
    label: "Years with organized armed conflict (1989–2024)",
    shortLabel: "Conflict years",
    unit: "years",
    insight: (_gap, avg, senegal) =>
      `Senegal's ${senegal} conflict years vs. ${avg.toFixed(1)} regional average — violence concentrated in Casamance, not national collapse. The coup gap is larger than the conflict gap.`,
  },
};

export function StabilityOutlierChart() {
  const [metric, setMetric] = useState<Metric>("coups");
  const cfg = metricConfig[metric];
  const metrics = Object.keys(metricConfig) as Metric[];
  const metricIndex = metrics.indexOf(metric);
  const setMetricByIndex = (index: number) => setMetric(metrics[index]!);
  const onTabKeyDown = useTabListKeyboard(metrics.length, metricIndex, setMetricByIndex);

  const { avg, gap, senegalVal, sorted } = useMemo(() => {
    const peers = regionalComparison.filter((c) => c.country !== "Senegal");
    const senegal = regionalComparison.find((c) => c.country === "Senegal")!;
    const senegalVal = senegal[metric];
    const avg = peers.reduce((s, c) => s + c[metric], 0) / peers.length;
    const gap = avg - senegalVal;
    const sorted = [...regionalComparison].sort(
      (a, b) => b[metric] - a[metric],
    );
    return { avg, gap, senegalVal, sorted };
  }, [metric]);

  return (
    <figure className="border border-ink/15 bg-parchment/50 overflow-hidden">
      <header className="px-5 py-4 border-b border-ink/10">
        <h4 className="font-serif text-xl text-ink mb-1">
          The stability gap — Senegal vs. peers
        </h4>
        <p className="text-xs text-ink/60">
          Toggle the metric. The dashed line is the peer average (excluding
          Senegal). How far below it Senegal sits is the outlier this project
          explains.
        </p>
      </header>

      <div
        className="flex flex-wrap gap-2 px-5 pt-4"
        role="tablist"
        aria-label="Comparison metric"
        onKeyDown={onTabKeyDown}
      >
        {metrics.map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={metric === m}
            tabIndex={metric === m ? 0 : -1}
            onClick={() => setMetric(m)}
            className={`text-xs px-3 py-2 border transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust ${
              metric === m
                ? "bg-ink text-parchment border-ink"
                : "border-ink/30 text-ink/70 hover:border-ink"
            }`}
          >
            {metricConfig[m].shortLabel}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-[1fr_280px] gap-4 p-5">
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sorted}
              layout="vertical"
              margin={{ top: 5, right: 20, bottom: 5, left: 10 }}
              aria-label={`${cfg.label} by country`}
            >
              <CartesianGrid stroke="#1a181420" horizontal={false} />
              <XAxis
                type="number"
                stroke="#1a1814"
                tick={{ fontSize: 11 }}
                allowDecimals={false}
              />
              <YAxis
                type="category"
                dataKey="country"
                stroke="#1a1814"
                tick={{ fontSize: 11 }}
                width={90}
              />
              <Tooltip
                contentStyle={{
                  background: "#f5f1e8",
                  border: "1px solid #1a181430",
                  fontSize: 12,
                }}
                formatter={(v: number) => [v, cfg.shortLabel]}
              />
              <ReferenceLine
                x={avg}
                stroke="#c89c4a"
                strokeDasharray="6 4"
                strokeWidth={2}
                label={{
                  value: `Peer avg (${avg.toFixed(1)})`,
                  position: "insideTopRight",
                  fill: "#a04525",
                  fontSize: 10,
                }}
              />
              <Bar dataKey={metric} name={cfg.shortLabel} radius={[0, 2, 2, 0]}>
                {sorted.map((c) => (
                  <Cell
                    key={c.country}
                    fill={c.country === "Senegal" ? "#5c1a1a" : "#a04525"}
                    fillOpacity={c.country === "Senegal" ? 1 : 0.45}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <aside className="flex flex-col justify-center space-y-4 border border-ink/10 bg-parchment/80 p-4">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-rust mb-1">
              Senegal
            </div>
            <div className="font-serif text-5xl text-oxblood leading-none">
              {senegalVal}
            </div>
            <div className="text-xs text-ink/60 mt-1">{cfg.unit}</div>
          </div>
          <div className="border-t border-ink/10 pt-3">
            <div className="text-xs uppercase tracking-[0.2em] text-ink/50 mb-1">
              Gap from peer average
            </div>
            <div className="font-serif text-3xl text-rust">
              {gap >= 0 ? "−" : "+"}
              {Math.abs(gap).toFixed(1)}
            </div>
          </div>
          <p className="text-xs text-ink/75 leading-relaxed">
            {cfg.insight(gap, avg, senegalVal)}
          </p>
        </aside>
      </div>

      <figcaption className="px-5 pb-4 text-xs text-ink/55">
        Sources: CAM coups dataset; UCDP via Our World in Data (≥25 battle
        deaths/year). Peer set: Mali, Guinea, Guinea-Bissau, Mauritania, The
        Gambia, Burkina Faso.
      </figcaption>
    </figure>
  );
}
