"use client"; // IMPORTANT

import React, { useState, useCallback } from "react";
import MatchScore from "./MatchScore";
import Alert from "./Alert";
import { Job } from "../types/Job";
import { useUser } from "../context/UserContext";

interface JobItemProps {
  job: Job;
  onViewDetails: (job: Job) => void;
  onJobApplied?: (job: Job) => void;
}

const JobItem: React.FC<JobItemProps> = ({
  job,
  onViewDetails,
  onJobApplied,
}) => {
  const { userSkills } = useUser();
  const [showAlert, setShowAlert] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);

  const handleApply = useCallback(async () => {
    setIsApplying(true);
    setApplyError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call

      console.log("Successfully applied to job:", job.id);
      setHasApplied(true);
      onJobApplied?.(job);
    } catch (error) {
      console.error("Error applying to job:", error);
      setApplyError("Failed to apply. Please try again.");
    } finally {
      setIsApplying(false);
    }
  }, [job, onJobApplied]);

  const handleCloseAlert = () => setShowAlert(false);

  const trimmedRequiredSkills = job.requiredSkills.map((skill) => skill.trim());
  const missingSkills = trimmedRequiredSkills.filter(
    (skill) => !userSkills.includes(skill)
  );
  const hasMissingSkills = missingSkills.length > 0;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col h-full border border-gray-200">
      {/* Job Title & Company Info */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 break-words">
          {job.title}
        </h3>
        <p className="text-gray-500 text-sm mt-1">{job.company}</p>
        <p className="text-gray-600 text-sm">{job.location}</p>
        <p className="text-gray-600 text-sm font-medium">{job.salary}</p>
      </div>

      {/* Match Score */}
      <div className="mt-4">
        <MatchScore score={job.matchScore} />
      </div>

      {/* Alerts */}
      {showAlert && (
        <Alert
          message={`Missing skills: ${missingSkills.join(
            ", "
          )}. Consider upskilling!`}
          onClose={handleCloseAlert}
          type="warning"
        />
      )}

      {applyError && (
        <Alert
          message={applyError}
          onClose={() => setApplyError(null)}
          type="error"
        />
      )}

      {/* Action Buttons */}
      <div className="mt-4 flex space-x-3">
        <button
          className={`w-full py-2 rounded-lg text-white font-medium transition-all duration-300 ${
            hasApplied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 shadow-md hover:shadow-lg"
          }`}
          onClick={() =>
            hasMissingSkills ? setShowAlert(true) : handleApply()
          }
          disabled={hasApplied || isApplying}
        >
          {isApplying ? "Applying..." : hasApplied ? "Applied" : "Apply Now"}
        </button>

        <button
          className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          onClick={() => onViewDetails(job)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default JobItem;
