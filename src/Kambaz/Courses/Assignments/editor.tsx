import { Modal, Button, Form } from 'react-bootstrap';

export default function AssignmentEditor({ show, handleClose, dialogTitle, assignmentName, setAssignmentName, addAssignment,}: {  
    show: boolean; handleClose: () => void; dialogTitle: string; assignmentName: string; setAssignmentName: (title: string) => void; 
    addAssignment: () => void; }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{dialogTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Assignment Name</Form.Label>
            <Form.Control
              type="text"
              value={assignmentName}
              onChange={(e) => setAssignmentName(e.target.value)}
              placeholder="Enter assignment name"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={addAssignment}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};