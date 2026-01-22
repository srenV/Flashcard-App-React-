import React from "react";

// Small presentational card used by the statistics panel.
// Props:
// - `heading`: label shown above the value
// - `value`: numeric/statistic value
// - `color`: background color class for the icon area
// - `icon`: file name suffix for the icon image
export const StatisticCard = (props) => {
  return (
    <div className="flex w-full h-full border-2 border-r-4 border-b-4 rounded-2xl">
      <div className="w-[70%] flex flex-col items-start justify-center border-r p-5 gap-3">
        <span className="text-xl font-semibold">{props.heading}</span>
        <span className="text-5xl font-bold">{props.value}</span>
      </div>

      {/* Icon / color area */}
      <div
        className={`${props.color} w-[30%] flex items-center justify-center rounded-r-xl`}
      >
        <img src={`/icon-stats-${props.icon}`} alt={props.icon} />
      </div>
    </div>
  );
};
