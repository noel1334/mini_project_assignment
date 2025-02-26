"use client";

import React, { useState, useEffect } from "react";
import JobItem from "./JobItem";
import { Job } from "../types/Job";

interface JobListProps {
  onViewDetails: (job: Job) => void;
}

const JobList: React.FC<JobListProps> = ({ onViewDetails }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/jobs.json");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Job[] = await response.json();
        setJobs(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} onViewDetails={onViewDetails} />
      ))}
    </div>
  );
};

export default JobList;
