import { useSelector } from "react-redux";
import { isFaculty } from "./reducer"; 

import { ReactNode } from "react";

const FacultyOnly = ({ children }: { children: ReactNode }) => {
  const hasFacultyRole = useSelector(isFaculty);
  
  if (!hasFacultyRole) {
    return null;
  }
  
  return <>{children}</>;
};

export default FacultyOnly;