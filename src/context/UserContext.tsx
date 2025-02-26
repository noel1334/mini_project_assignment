"use client"; // VERY IMPORTANT

import React, { createContext, useState, useContext, useMemo } from "react"; // Import useMemo

interface UserContextType {
  userSkills: string[];
  setUserSkills: (skills: string[]) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
  initialSkills?: string[];
}

export const UserProvider: React.FC<UserProviderProps> = ({
  children,
  initialSkills = [],
}) => {
  const [userSkills, setUserSkills] = useState<string[]>(initialSkills);

  // Use useMemo to trim the skills only when initialSkills changes
  const trimmedUserSkills = useMemo(() => {
    return userSkills.map((skill) => skill.trim());
  }, [userSkills]);

  const value: UserContextType = {
    userSkills: trimmedUserSkills, // Use the trimmed skills
    setUserSkills: (skills: string[]) => {
      setUserSkills(skills.map((skill) => skill.trim())); // Trim when setting new skills
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
