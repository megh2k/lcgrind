"use client";
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import HeatMap from "@uiw/react-heat-map";

export default function HeatMapComponent({ values }) {
  return (
    <HeatMap
      value={values}
      width={600}
      style={{ color: "#ad001d", "--rhm-rect-active": "red" }}
      startDate={new Date("2024/01/01")}
      panelColors={[
        "#f4decd",
        "#e4b293",
        "#d48462",
        "#c2533a",
        "#ad001d",
        "#6c0012",
      ]}
      rectRender={(props, data) => {
        return (
          <Tooltip
            title={`date: ${data.date} count: ${data.count || 0}`}
            placement="top"
          >
            <rect {...props} />
          </Tooltip>
        );
      }}
    />
  );
}
