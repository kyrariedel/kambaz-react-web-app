import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/2345/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/capstone.jpg" width={200} />
            <div>
              <h5> BIOL4701 </h5>
              <p className="wd-dashboard-course-title">
                Biology Capstone  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/3456/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/stats.jpg" width={200} />
            <div>
              <h5> MATH3081  </h5>
              <p className="wd-dashboard-course-title">
                Statistics and Probability  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/4567/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/algorithms.jpg" width={200} />
            <div>
              <h5> CS3000 </h5>
              <p className="wd-dashboard-course-title">
                Algorithms  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/5678/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/genome.jpg" width={200} />
            <div>
              <h5> BIOL5591 </h5>
              <p className="wd-dashboard-course-title">
                Genomics  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/6789/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/machine.jpg" width={200} />
            <div>
              <h5> EECE5642 </h5>
              <p className="wd-dashboard-course-title">
                Machine Learning  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/7890/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/datavis.jpg" width={200} />
            <div>
              <h5> EECE5644 </h5>
              <p className="wd-dashboard-course-title">
                Data Visualization  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
);}
