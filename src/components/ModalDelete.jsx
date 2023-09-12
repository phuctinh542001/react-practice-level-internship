import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { deleteUser } from "../services/UserService";

const ModalDelete = ({ show, handleClose, handleUpdateTable, dataUserDelete }) => {
  const handleUpdateUser = async () => {
    const res = await deleteUser(dataUserDelete.id);
    
    if (res && res.status === 204) {
      //Success
      handleClose();
      handleUpdateTable(dataUserDelete.id);
      toast.success("Delete User successfully !!!");
    } else {
      //Failure
      toast.success("Error... !!!");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modal Confirm Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Do you want to delete this User ???</p>
        <p>Email: <b>{dataUserDelete.email}</b></p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateUser} type="submit">
          Confirm Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDelete;
