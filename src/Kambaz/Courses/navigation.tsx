import { Link, useLocation, useParams } from "react-router-dom";

export default function CourseNavigation() {
  const { courseId } = useParams();
  const { pathname } = useLocation();

  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  const isActive = (link: string) => pathname.includes(link) && pathname.includes(courseId);

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link}
          to={`/Kambaz/Courses/${courseId}/${link}`}
          className={`list-group-item border-0 ${isActive(link) ? "active text-danger" : "text-dark"}`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}
