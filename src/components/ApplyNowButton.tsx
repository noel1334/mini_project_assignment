"use client"; // Make sure this is a client component

import React, { useState } from "react"; // Import useState
import Alert from "./Alert"; // Import the Alert component

interface ApplyNowButtonProps {
  requiredSkills: string[];
  userSkills: string[];
  onApply: () => void; // Function to handle the "apply" action
}

const ApplyNowButton: React.FC<ApplyNowButtonProps> = ({
  requiredSkills,
  userSkills,
  onApply,
}) => {
  const missingSkills = requiredSkills.filter(
    (skill) => !userSkills.includes(skill)
  );
  const [showAlert, setShowAlert] = useState(false);

  const handleApplyClick = () => {
    if (missingSkills.length > 0) {
      setShowAlert(true);
    } else {
      onApply();
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div>
      {showAlert && (
        <Alert
          message={`You are missing the following skills: ${missingSkills.join(
            ", "
          )}. Please upskill before applying.`}
          onClose={handleCloseAlert}
        />
      )}
      <button
        className="bg-green-500 hover:bg-green-700 text-white mt- font-medium py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
        onClick={handleApplyClick}
      >
        Apply Now
      </button>
    </div>
  );
};

export default ApplyNowButton;
