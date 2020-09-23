import React from "react";
import { ResponsivePie } from "@nivo/pie";

const data = [
  {
    id: "Not Coverage",
    label: "Not Coverage",
    value: 5,
    color: "hsl(82, 70%, 50%)",
  },

  {
    id: "Coverage",
    label: "Coverage",
    value: 95,
    color: "hsl(5, 70%, 50%)",
  },
];

const CMatrixPieChart = () => (
  <ResponsivePie
    data={data}
    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
    innerRadius={0.6}
    padAngle={0.75}
    fit={false}
    enableRadialLabels={false}
    enableSlicesLabels={false}
    cornerRadius={3}
    colors={{ scheme: "nivo" }}
    borderWidth={4}
    borderColor={{ from: "color", modifiers: [["opacity", 0.2]] }}
    animate={true}
    // motionStiffness={90}
    // motionDamping={15}
    isInteractive={false}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[
      {
        match: {
          id: "Coverage",
        },
        id: "dots",
      },
    ]}
  />
);

export default CMatrixPieChart;
