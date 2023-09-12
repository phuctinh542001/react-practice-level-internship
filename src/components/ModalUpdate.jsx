import { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateUser } from "../services/UserService";

const ModalUpdate = ({
  show,
  handleClose,
  handleUpdateTable,
  dataUserUpdate,
}) => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  useEffect(() => {
    if (show) {
      setName(dataUserUpdate.first_name);
    }
  }, [dataUserUpdate]);

  const handleUpdateUser = async () => {
    const res = await updateUser(dataUserUpdate.id, name, job);
    if (res && res.updatedAt) {
      //Success
      handleClose();
      setName("");
      setJob("");
      handleUpdateTable({ first_name: name, id: dataUserUpdate.id });
      toast.success("Update User successfully !!!");
    } else {
      //Failure
      toast.success("Error... !!!");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modal Update User</Modal.Title>
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
          Update User
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUpdate;
