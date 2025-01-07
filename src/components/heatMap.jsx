"use client";
import React from "react";
import HeatMap from "@uiw/react-heat-map";
import { startDate } from "@/constants/leetcode";

export default function HeatMapComponent({ values }) {

  console.log(values);
  return (
    <div>
      HeatMap
      <HeatMap
        value={values}
        width={725}
        style={{ color: "#ad001d", "--rhm-rect-active": "red" }}
        startDate={new Date("2024/01/01")}
        panelColors={{
          7: "#e4b293",
          14: "#d48462",
          21: "#c2533a",
          28: "#ad001d",
          35: "#6c0012",
        }}
      />
    </div>
  );
}
