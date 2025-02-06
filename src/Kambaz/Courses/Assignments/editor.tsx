import { Container, FormGroup, FormLabel, FormControl, FormSelect, Form, Row, Col, Button } from "react-bootstrap";

export default function AssignmentEditor() {
    return (
        <Container id="wd-assignments-editor">
            <h2>Assignment Editor</h2>

            <FormGroup className="mb-3" controlId="wd-name">
                <FormLabel><strong>Assignment Name</strong></FormLabel>
                <FormControl value="A1 - ENV + HTML" />
            </FormGroup>

            <FormGroup className="mb-3" controlId="wd-description">
                <FormLabel>Description</FormLabel>
                <FormControl as="textarea" rows={5} value="The assignment is available online Submit a link to the landing page of your Web Application running on Netlify..." />
            </FormGroup>

            <FormGroup as={Row} className="mb-3" controlId="wd-points">
                <FormLabel column sm={3}>Points</FormLabel>
                <Col sm={9}>
                    <FormControl value={100} />
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3" controlId="wd-group">
                <FormLabel column sm={3}>Assignment Group</FormLabel>
                <Col sm={9}>
                    <FormSelect>
                        <option value="ASSIGNMENTS">Assignments</option>
                        <option value="CREATEGROUP">[Create Group]</option>
                    </FormSelect>
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3" controlId="wd-display-grade-as">
                <FormLabel column sm={3}>Display Grade as</FormLabel>
                <Col sm={9}>
                    <FormSelect>
                        <option value="PERCENTAGE">Percentage</option>
                        <option value="POINTS">Points</option>
                    </FormSelect>
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3" controlId="wd-submission-type">
                <FormLabel column sm={3}>Submission Type</FormLabel>
                <Col sm={9}>
                    <FormSelect>
                        <option value="ONLINE">Online</option>
                        <option value="ONPAPER">On Paper</option>
                    </FormSelect>
                </Col>
            </FormGroup>

            <FormGroup className="mb-3">
                <FormLabel>Online Entry Options</FormLabel>
                <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" />
                <Form.Check type="checkbox" id="wd-website-url" label="Website URL" />
                <Form.Check type="checkbox" id="wd-media-recordings" label="Media Recordings" />
                <Form.Check type="checkbox" id="wd-student-annotation" label="Student Annotations" />
                <Form.Check type="checkbox" id="wd-file-upload" label="File Uploads" />
            </FormGroup>

            <FormGroup as={Row} className="mb-3" controlId="wd-assign-to">
                <FormLabel column sm={3}>Assign</FormLabel>
                <Col sm={9}>
                    <FormControl type="text" placeholder="Everyone" />
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3" controlId="wd-due-date">
                <FormLabel column sm={3}>Due</FormLabel>
                <Col sm={9}>
                    <FormControl type="date" value="2024-05-13" />
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3" controlId="wd-available-from">
                <FormLabel column sm={3}>Available From</FormLabel>
                <Col sm={9}>
                    <FormControl type="date" value="2024-05-06" />
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3" controlId="wd-available-until">
                <FormLabel column sm={3}>Until</FormLabel>
                <Col sm={9}>
                    <FormControl type="date" value="2024-05-20" />
                </Col>
            </FormGroup>

            <div className="d-flex justify-content-between">
                <Button variant="secondary" id="wd-cancel">Cancel</Button>
                <Button variant="primary" id="wd-save">Save</Button>
            </div>
        </Container>
    );
}

  