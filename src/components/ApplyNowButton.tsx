"use client";

import React, { useState } from "react";
import Alert from "./Alert";

interface ApplyNowButtonProps {
  requiredSkills: string[];
  userSkills: string[];
  onApply: () => void;
}

const ApplyNowButton: React.FC<ApplyNowButtonProps> = ({
  requiredSkills,
  userSkills,
  onApply,
}) => {
  const [showAlert, setShowAlert] = useState(false);

  const missingSkills = requiredSkills.filter(
    (skill) => !userSkills.includes(skill)
  );

  const handleApplyClick = () => {
    if (missingSkills.length > 0) {
      setShowAlert(true);
    } else {
      onApply();
    }
  };

  const handleCloseAlert = () => setShowAlert(false);

  return (
    <div>
      <button onClick={handleApplyClick}>Apply Now</button>
      {showAlert && (
        <Alert
          message={`You are missing the following skills: ${missingSkills.join(
            ", "
          )}. Please upskill before applying.`}
          onClose={handleCloseAlert}
          type="warning" // Add the type prop here!
        />
      )}
    </div>
  );
};

export default ApplyNowButton;
