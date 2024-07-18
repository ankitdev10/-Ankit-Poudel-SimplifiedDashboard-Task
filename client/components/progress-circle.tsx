import React from "react";

const ProgressCircle = ({ progress }: { progress: number }) => {
  const radius = 70;
  const strokeWidth = 20;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = ((100 - progress) / 100) * circumference;
  const dashArray = `${circumference}px`;
  const dashOffset = `${progressOffset}px`;

  return (
    <svg width="40" height="30" viewBox="0 0 160 160">
      <circle
        r={radius}
        cx="80"
        cy="80"
        fill="transparent"
        stroke="#e0e0e0"
        strokeWidth={strokeWidth}
      />
      <circle
        r={radius}
        cx="80"
        cy="80"
        fill="transparent"
        stroke="red" // Change color as needed
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        strokeDashoffset={dashOffset}
      />
      <text x="80" y="90" textAnchor="middle" fontSize="40px" fill="black">
        {progress}%
      </text>
    </svg>
  );
};

export default ProgressCircle;
