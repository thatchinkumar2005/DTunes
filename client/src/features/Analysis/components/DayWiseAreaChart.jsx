import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function DayWiseAreaChart({ data }) {
  return (
    <ResponsiveContainer height="30%" width="100%">
      <AreaChart data={data} margin={{ right: 30 }}>
        <XAxis dataKey={"_id"} />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip contentStyle={{ background: "#2a2a2a" }} />
        <Area dataKey={"totalPlays"} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
