import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from "recharts";
import * as taskService from "../services/taskService";

const PIE_COLORS = ["#5B2D1D", "#C8A165", "#3B7D5D", "#B94A48", "#D9C3A7", "#8a5a3f"];

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    taskService.fetchAnalytics().then(({ analytics }) => {
      setData(analytics);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="grid md:grid-cols-3 gap-5">
        {Array.from({ length: 3 }).map((_, i) => <div key={i} className="luxe-skeleton h-32" />)}
        <div className="luxe-skeleton h-72 md:col-span-2" />
        <div className="luxe-skeleton h-72" />
      </div>
    );
  }

  const categoryData = Object.entries(data.byCategory).map(([name, value]) => ({ name, value }));
  const weeklyData = data.weekly.map((d) => ({
    day: new Date(d.date).toLocaleDateString("en-US", { weekday: "short" }),
    completed: d.completed,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Total tasks", value: data.total },
          { label: "Completed", value: data.completed },
          { label: "Completion rate", value: `${data.completionRate}%` },
          { label: "Overdue", value: data.overdue, danger: true },
        ].map((s) => (
          <div key={s.label} className="luxe-card p-6">
            <p className={`font-display text-4xl mb-1 ${s.danger && s.value > 0 ? "text-danger" : "text-brown-dark"}`}>{s.value}</p>
            <p className="text-sm text-ink/50">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="luxe-card p-6 lg:col-span-2">
          <h3 className="font-display text-lg text-brown-dark mb-6">Weekly completions</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={weeklyData}>
              <CartesianGrid vertical={false} stroke="rgba(91,45,29,0.08)" />
              <XAxis dataKey="day" tick={{ fill: "#2B2B2B", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fill: "#2B2B2B", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid rgba(91,45,29,0.1)", background: "#FFFDF9" }} />
              <Bar dataKey="completed" fill="#5B2D1D" radius={[8, 8, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="luxe-card p-6">
          <h3 className="font-display text-lg text-brown-dark mb-6">By category</h3>
          {categoryData.length === 0 ? (
            <p className="text-sm text-ink/45 text-center py-16">No tasks yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
                  {categoryData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid rgba(91,45,29,0.1)", background: "#FFFDF9" }} />
              </PieChart>
            </ResponsiveContainer>
          )}
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 justify-center">
            {categoryData.map((c, i) => (
              <div key={c.name} className="flex items-center gap-1.5 text-xs text-ink/55">
                <span className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                {c.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
