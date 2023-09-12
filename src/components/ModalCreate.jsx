import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { createUser } from "../services/UserService";

const ModalCreate = ({ show, handleClose, handleUpdateTable }) => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleUpdateUser = async () => {
    const res = await createUser(name, job);
    if (res && res.id) {
      //Success
      handleClose();
      setName("");
      setJob("");
      handleUpdateTable({ first_name: name, id: res.id });
      toast.success("Add User successfully !!!");
    } else {
      //Failure
      toast.success("Error... !!!");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modal Create User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formInputName">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name..."
              name="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              autoComplete="on"
              aria-autocomplete="name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formInputJob">
            <Form.Label>Your job:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your job..."
              name="job"
              value={job}
              onChange={(event) => {
                setJob(event.target.value);
              }}
              aria-autocomplete="job"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateUser} type="submit">
          Create User
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCreate;
