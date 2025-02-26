import React from "react";

interface MatchScoreProps {
  score: number;
}

const MatchScore: React.FC<MatchScoreProps> = ({ score }) => {
  let colorClass = "bg-red-500";
  if (score >= 80) {
    colorClass = "bg-green-500";
  } else if (score >= 50) {
    colorClass = "bg-yellow-500";
  }

  return (
    <div className="flex items-center">
      <div
        className={`h-3 rounded-full ${colorClass}`}
        style={{ width: `${score}%` }}
      ></div>
      <span className="ml-2 text-sm text-gray-700">{score}%</span>
    </div>
  );
};

export default MatchScore;
