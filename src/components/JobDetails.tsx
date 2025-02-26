import React from "react";
import { Job } from "../types/Job";

interface JobDetailsProps {
  jobDetails: Job;
  onClose: () => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ jobDetails, onClose }) => {
  if (!jobDetails) {
    return null; // Or display a loading state
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Job Title */}
        <h2 className="text-2xl font-bold text-gray-900">{jobDetails.title}</h2>

        {/* Job Details */}
        <div className="mt-4 space-y-3">
          <p>
            <strong className="text-gray-700">Company:</strong>{" "}
            <span className="text-gray-600">{jobDetails.company}</span>
          </p>
          <p>
            <strong className="text-gray-700">Location:</strong>{" "}
            <span className="text-gray-600">{jobDetails.location}</span>
          </p>
          <p>
            <strong className="text-gray-700">Description:</strong>{" "}
            <span className="text-gray-600">
              {jobDetails.description || "No description available."}
            </span>
          </p>
          <p>
            <strong className="text-gray-700">Required Skills:</strong>{" "}
            <span className="text-gray-600">
              {jobDetails.requiredSkills.join(", ")}
            </span>
          </p>
        </div>

        {/* Close Button */}
        <button
          className="w-full mt-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md transition-all"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
