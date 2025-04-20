import { useSelector } from "react-redux";
import { isStudent } from "./reducer"; 

import { ReactNode } from "react";

const StudentOnly = ({ children }: { children: ReactNode }) => {
  const hasStudentRole = useSelector(isStudent);
  
  if (!hasStudentRole) {
    return null;
  }
  
  return <>{children}</>;
};

export default StudentOnly;