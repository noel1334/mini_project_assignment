"use client";

import React, { useState } from "react";
import JobList from "../components/JobList";
import JobDetails from "../components/JobDetails";
import { Job } from "../types/Job";
import { UserProvider } from "../context/UserContext";

const initialUserSkills = [
  "React",
  "Figma",
  "JavaScript",
  "CSS",
  "Next.js",
  "Networking",
  "Troubleshooting",
  "Windows Server",
  "Linux",
];

const Home: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const handleCloseDetails = () => {
    setSelectedJob(null);
  };

  return (
    <UserProvider initialSkills={initialUserSkills}>
      <div className="container mx-auto py-8 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <h1 className="text-2xl font-bold mb-4">
          AI-Powered Job Match Dashboard
        </h1>
        <JobList onViewDetails={handleViewDetails} />
        {/* Conditionally render JobDetails */}
        {selectedJob ? (
          <JobDetails jobDetails={selectedJob} onClose={handleCloseDetails} />
        ) : null}
      </div>
    </UserProvider>
  );
};

export default Home;
