"use client";
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import HeatMap from "@uiw/react-heat-map";

export default function HeatMapComponent({ values }) {
  return (
    <div className="border border-[#333] flex justify-center my-8">
      <HeatMap
        value={values}
        width={800}
        style={{ color: "#ad001d", "--rhm-rect-active": "red" }}
        startDate={new Date("2024/01/01")}
        rectRender={(props, data) => {
          const matchingValue = values.find((val) => val.date === data.date);

          const activeUsers = matchingValue?.activeUsers || {};
          const count = matchingValue?.count || 0;

          const activeUsersDetails = Object.entries(activeUsers)
            .map(([username, userCount]) => `${username}: ${userCount}`)
            .join("\n");

          return (
            <Tooltip
              title={`date: ${data.date} count: ${count} \n${activeUsersDetails}`}
              placement="top"
            >
              <rect {...props} />
            </Tooltip>
          );
        }}
      />
    </div>
  );
}
