import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as db from "./Database";
import { FormControl, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import FacultyOnly from "./Account/facultyonly";

export default function Dashboard(
  { courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse }: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void; }) {
      const { currentUser } = useSelector((state: any) => state.accountReducer);
      const [enrollmentsData, setEnrollmentsData] = useState(db.enrollments);
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const [showAllCourses, setShowAllCourses] = useState(false);

      const toggleEnrollmentsView = () => {
        setShowAllCourses(!showAllCourses);
      };

      const handleEnrollment = (courseId: string) => {
        const isEnrolled = isUserEnrolled(courseId);

        if (isEnrolled) {
          // Unenroll
          const updatedEnrollments = enrollmentsData.filter(
            enrollment => 
              !(enrollment.user === currentUser._id && 
                enrollment.course === courseId)
          );
          setEnrollmentsData(updatedEnrollments);
        } else {
          // Enroll
          const newEnrollment = {
            _id: uuidv4(),
            user: currentUser._id,
            course: courseId
          };
          setEnrollmentsData([...enrollmentsData, newEnrollment]);
        }
      };

      const isUserEnrolled = (courseId: string) => {
        return enrollmentsData.some(
          (enrollment: any) => 
            enrollment.user === currentUser._id && 
            enrollment.course === courseId
        );
      };

      const handleCourseNavigation = (event: React.MouseEvent, courseId: string) => {
        event.preventDefault();
        if (isUserEnrolled(courseId)) {
          navigate(`/Kambaz/Courses/${courseId}/Home`);
        }
      };

      const displayedCourses = showAllCourses 
        ? courses 
        : courses.filter((course) => 
            isUserEnrolled(course._id)
          );

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 id="wd-dashboard-published">
          {showAllCourses ? "All Courses" : "My Courses"} ({displayedCourses.length})
        </h2>
        <Button 
          className="btn btn-primary" 
          id="wd-enrollments"
          onClick={toggleEnrollmentsView}
        >
          Enrollments
        </Button>
      </div>

      <FacultyOnly>
        <h5>New Course
          <button 
            className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={addNewCourse}
          > 
            Add 
          </button>
          <button 
            className="btn btn-warning float-end me-2"
            onClick={updateCourse} 
            id="wd-update-course-click"
          >
            Update
          </button>
        </h5><br />
        <FormControl 
          value={course.name} 
          className="mb-2" 
          onChange={(e) => setCourse({ ...course, name: e.target.value })} 
        />
        <FormControl 
          value={course.description} 
          rows={3} 
          onChange={(e) => setCourse({ ...course, description: e.target.value })} 
        />
        <hr />
      </FacultyOnly>

      <div className="row" id="wd-dashboard-courses">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {displayedCourses.map((course) => (
            <div key={course._id} className="col" style={{ width: "300px" }}>
              <div className="card">
                <div 
                  onClick={(event) => handleCourseNavigation(event, course._id)}
                  className="wd-dashboard-course-link text-decoration-none text-dark" 
                  style={{ cursor: "pointer" }}
                >
                  <img src={course.image} alt={course.name} width="100%" height={160} />
                  <h5 id="course-header"> {course.name} {course.number}</h5>
                  <div>{course.description}</div>
                  <div className="card-btns d-flex justify-content-between mt-2 p-2"> 
                    {isUserEnrolled(course._id) ? (
                      <>
                        <Button className="btn btn-primary">
                          Go 
                        </Button>
                        <Button 
                          onClick={(event) => {
                            event.stopPropagation();
                            handleEnrollment(course._id);
                          }} 
                          className="btn btn-danger"
                        >
                          Unenroll
                        </Button>
                      </>
                    ) : (
                      <Button 
                        onClick={(event) => {
                          event.stopPropagation();
                          handleEnrollment(course._id);
                        }} 
                        className="btn btn-success w-100"
                      >
                        Enroll
                      </Button>
                    )}
                    
                    <FacultyOnly>
                      <div className="ms-auto d-flex">
                        <Button 
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.stopPropagation();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2"
                        >
                          Edit
                        </Button>
                        <Button 
                          onClick={(event) => {
                            event.stopPropagation();
                            deleteCourse(course._id);
                          }} 
                          className="btn btn-danger"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </Button>
                      </div>
                    </FacultyOnly>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}