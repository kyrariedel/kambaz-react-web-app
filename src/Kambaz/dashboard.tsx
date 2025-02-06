import { Link } from "react-router-dom";
import {Row, Col, Card, Button} from "react-bootstrap";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
        <Card>
          <Link to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link text-decoration-none text-dark">
            <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
            <Card.Body>
              <Card.Title className="wd-dashboard-course-title">CS1234 React JS</Card.Title>
              <Card.Text  className="wd-dashboard-course-description">Full Stack software developer</Card.Text>
              <Button variant="primary">Go</Button>
            </Card.Body>
          </Link>
          </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
          <Link to="/Kambaz/Courses/2345/Home"
            className="wd-dashboard-course-link text-decoration-none text-dark">
            <Card.Img variant="top" src="/images/capstone.jpg" width="100%" height={160}/>
            <Card.Body>
              <Card.Title className="wd-dashboard-course-title">BIOL4701</Card.Title>
              <Card.Text  className="wd-dashboard-course-description">Biology Capstone</Card.Text>
              <Button variant="primary">Go</Button>
            </Card.Body>
          </Link>
          </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
          <Link to="/Kambaz/Courses/3456/Home"
            className="wd-dashboard-course-link text-decoration-none text-dark">
            <Card.Img variant="top" src="/images/stats.jpg" width="100%" height={160}/>
            <Card.Body>
              <Card.Title className="wd-dashboard-course-title">MATH3081</Card.Title>
              <Card.Text  className="wd-dashboard-course-description">Statistics and Probability</Card.Text>
              <Button variant="primary">Go</Button>
            </Card.Body>
          </Link>
          </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
          <Link to="/Kambaz/Courses/4567/Home"
            className="wd-dashboard-course-link text-decoration-none text-dark">
            <Card.Img variant="top" src="/images/algorithms.jpg" width="100%" height={160}/>
            <Card.Body>
              <Card.Title className="wd-dashboard-course-title">CS3000</Card.Title>
              <Card.Text  className="wd-dashboard-course-description">Data Structures and Algorithms</Card.Text>
              <Button variant="primary">Go</Button>
            </Card.Body>
          </Link>
          </Card>
          </Col>
          
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
          <Link to="/Kambaz/Courses/5678/Home"
            className="wd-dashboard-course-link text-decoration-none text-dark">
            <Card.Img variant="top" src="/images/genome.jpg" width="100%" height={160}/>
            <Card.Body>
              <Card.Title className="wd-dashboard-course-title">BIOL5591</Card.Title>
              <Card.Text  className="wd-dashboard-course-description">Advanced Genomics</Card.Text>
              <Button variant="primary">Go</Button>
            </Card.Body>
          </Link>
          </Card>
          </Col>
          
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
          <Link to="/Kambaz/Courses/6789/Home"
            className="wd-dashboard-course-link text-decoration-none text-dark">
            <Card.Img variant="top" src="/images/machine.jpg" width="100%" height={160}/>
            <Card.Body>
              <Card.Title className="wd-dashboard-course-title">EECE5642</Card.Title>
              <Card.Text  className="wd-dashboard-course-description"> Machine Learning</Card.Text>
              <Button variant="primary">Go</Button>
            </Card.Body>
          </Link>
          </Card>
          </Col>
          
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
          <Link to="/Kambaz/Courses/7890/Home"
            className="wd-dashboard-course-link text-decoration-none text-dark">
            <Card.Img variant="top" src="/images/datavis.jpg" width="100%" height={160}/>
            <Card.Body>
              <Card.Title className="wd-dashboard-course-title">EECE5644</Card.Title>
              <Card.Text  className="wd-dashboard-course-description">Data Visualization </Card.Text>
              <Button variant="primary">Go</Button>
            </Card.Body>
          </Link>
          </Card>
          </Col>
          
        </Row>
        {/* <div className="wd-dashboard-course">
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
        </div> */}
      </div>
    </div>
);}
