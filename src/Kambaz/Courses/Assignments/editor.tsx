import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, FormGroup, FormLabel, FormControl, FormSelect, Form, Row, Col } from "react-bootstrap";
import * as db from "../../Database";

export default function AssignmentEditor() {
    const { courseId, assignmentId } = useParams();
    const [assignment, setAssignment] = useState({
        title: "",
        description: "",
        points: 0,
        assignmentGroup: "ASSIGNMENTS",
        displayGrade: "PERCENTAGE",
        submissionType: "ONLINE",
        dueDate: "",
        availableDate: "",
        availableUntil: ""
    });

    useEffect(() => {
        let found = db.assignments.find(a => a._id === assignmentId);
        if (found) {
            let dueDate = new Date(found.dueDate).toISOString().split('T')[0];
            let availableDate = new Date(found.availableDate).toISOString().split('T')[0];
            let availableUntil = found.availableUntil ? 
                new Date(found.availableUntil).toISOString().split('T')[0] : "";

            setAssignment({
                title: found.title,
                description: found.description,
                points: found.points,
                assignmentGroup: found.assignmentGroup,
                displayGrade: found.displayGrade || "PERCENTAGE",
                submissionType: found.submissionType,
                dueDate,
                availableDate,
                availableUntil
            });
        }
    }, [assignmentId]);

    return (
        <Container id="wd-assignments-editor">
            <h2>{assignment.title}</h2>

            <FormGroup className="mb-3">
                <FormLabel><strong>Assignment Name</strong></FormLabel>
                <FormControl 
                    value={assignment.title}
                    onChange={e => setAssignment({...assignment, title: e.target.value})}
                />
            </FormGroup>

            <FormGroup className="mb-3">
                <FormLabel>Description</FormLabel>
                <FormControl 
                    as="textarea" 
                    rows={5} 
                    value={assignment.description}
                    onChange={e => setAssignment({...assignment, description: e.target.value})}
                />
            </FormGroup>

            <Row className="mb-3">
                <FormLabel column sm={3}>Points</FormLabel>
                <Col sm={9}>
                    <FormControl 
                        value={assignment.points}
                        onChange={e => setAssignment({...assignment, points: Number(e.target.value)})}
                    />
                </Col>
            </Row>

            <Row className="mb-3">
                <FormLabel column sm={3}>Assignment Group</FormLabel>
                <Col sm={9}>
                    <FormSelect 
                        value={assignment.assignmentGroup}
                        onChange={e => setAssignment({...assignment, assignmentGroup: e.target.value})}
                    >
                        <option value="ASSIGNMENTS">Assignments</option>
                        <option value="CREATEGROUP">[Create Group]</option>
                    </FormSelect>
                </Col>
            </Row>

            <Row className="mb-3">
                <FormLabel column sm={3}>Display Grade as</FormLabel>
                <Col sm={9}>
                    <FormSelect 
                        value={assignment.displayGrade}
                        onChange={e => setAssignment({...assignment, displayGrade: e.target.value})}
                    >
                        <option value="PERCENTAGE">Percentage</option>
                        <option value="POINTS">Points</option>
                    </FormSelect>
                </Col>
            </Row>

            <Row className="mb-3">
                <FormLabel column sm={3}>Submission Type</FormLabel>
                <Col sm={9}>
                    <FormSelect 
                        value={assignment.submissionType}
                        onChange={e => setAssignment({...assignment, submissionType: e.target.value})}
                    >
                        <option value="ONLINE">Online</option>
                        <option value="ONPAPER">On Paper</option>
                    </FormSelect>
                </Col>
            </Row>

            <FormGroup className="mb-3">
                <FormLabel>Online Entry Options</FormLabel>
                <Form.Check type="checkbox" label="Text Entry" />
                <Form.Check type="checkbox" label="Website URL" />
                <Form.Check type="checkbox" label="Media Recordings" />
                <Form.Check type="checkbox" label="Student Annotations" />
                <Form.Check type="checkbox" label="File Uploads" />
            </FormGroup>

            <Row className="mb-3">
                <FormLabel column sm={3}>Assign</FormLabel>
                <Col sm={9}>
                    <FormControl type="text" placeholder="Everyone" />
                </Col>
            </Row>

            <Row className="mb-3">
                <FormLabel column sm={3}>Due</FormLabel>
                <Col sm={9}>
                    <FormControl 
                        type="date" 
                        value={assignment.dueDate}
                        onChange={e => setAssignment({...assignment, dueDate: e.target.value})}
                    />
                </Col>
            </Row>

            <Row className="mb-3">
                <FormLabel column sm={3}>Available From</FormLabel>
                <Col sm={9}>
                    <FormControl 
                        type="date" 
                        value={assignment.availableDate}
                        onChange={e => setAssignment({...assignment, availableDate: e.target.value})}
                    />
                </Col>
            </Row>

            <Row className="mb-3">
                <FormLabel column sm={3}>Until</FormLabel>
                <Col sm={9}>
                    <FormControl 
                        type="date" 
                        value={assignment.availableUntil}
                        onChange={e => setAssignment({...assignment, availableUntil: e.target.value})}
                    />
                </Col>
            </Row>

            <div className="d-flex justify-content-between">
                <Link to={`/Kambaz/Courses/${courseId}/Assignments`} className="btn btn-secondary">
                    Cancel
                </Link>
                <Link to={`/Kambaz/Courses/${courseId}/Assignments`} className="btn btn-primary">
                    Save
                </Link>
            </div>
        </Container>
    );
}