import React from "react";
import {
  Cell,
  LabelList,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const colors = [
  "#003f5c",
  "#374c80",
  "#7a5195",
  "#bc5090",
  "#ef5675",
  "#ff764a",
  "#ffa600",
];

export default function ArtistPieChart({ data }) {
  return (
    <ResponsiveContainer height="80%" width="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey={"percentage"}
          nameKey={"artistName"}
          cx="50%"
          cy="50%"
          outerRadius={60}
          innerRadius={40}
          paddingAngle={10}
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={colors[i > 6 ? i % 7 : i]} />
          ))}
          <LabelList
            dataKey={"artistName"}
            position="right"
            style={{ fontSize: "10px" }}
          />
        </Pie>
        <Tooltip contentStyle={{ background: "#2a2a2a" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
