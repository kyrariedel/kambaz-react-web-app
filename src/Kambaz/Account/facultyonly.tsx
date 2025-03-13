import React from "react";
import { useSelector } from "react-redux";
import { isFaculty } from "./reducer"; // Adjust path as needed

// Component that only renders children if user has FACULTY role
const FacultyOnly = ({ children }) => {
  const hasFacultyRole = useSelector(isFaculty);
  
  if (!hasFacultyRole) {
    return null;
  }
  
  return <>{children}</>;
};

export default FacultyOnly;