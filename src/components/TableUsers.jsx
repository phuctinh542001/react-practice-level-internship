import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { fetchUsersByPage } from "../services/UserService";
import Table from "react-bootstrap/Table";
import ModalCreate from "./ModalCreate";
import ModalUpdate from "./ModalUpdate";
import ModalDelete from "./ModalDelete";

const TableUsers = () => {
  const [listAllUsers, setListAllUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const [showModalCreate, setShowModalCreate] = useState(false);
  const handleShowModalCreate = () => setShowModalCreate(true);
  
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [dataUserUpdate, setDataUserUpdate] = useState({});
  const handleShowModalUpdate = (user) => {
    setShowModalUpdate(true);
    setDataUserUpdate(user);
  };
  
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});
  const handleShowModalDelete = (user) => {
    setShowModalDelete(true);
    setDataUserDelete(user);
  };
  

  const handleClose = () => {
    setShowModalCreate(false);
    setShowModalUpdate(false);
    setShowModalDelete(false);
  };

  useEffect(() => {
    getUsersByPage(1);
  }, []);

  const getUsersByPage = async (page) => {
    const res = await fetchUsersByPage(page);

    if (res && res.data) {
      setListAllUsers(res.data);
      setTotalPages(res.total_pages);
    }
  };

  const handleTableCreate = (newUser) => {
    setListAllUsers([newUser, ...listAllUsers]);
  };

  const handleTableUpdate = (newUser) => {
    setListAllUsers(
      listAllUsers.map((user) => {
        if (user.id === newUser.id) {
          return {
            ...user,
            first_name: newUser.first_name,
          };
        } else {
          return user;
        }
      })
    );
  };

  const handleTableDelete = (id) => {
    setListAllUsers(
      listAllUsers.filter(user => user.id !== id)
    )
  }

  const handlePageClick = (event) => {
    getUsersByPage(event.selected + 1);
  };

  return (
    <>
      <div className="action d-flex justify-content-end py-2">
        <Button
          bsPrefix="btn action__create"
          variant="primary"
          onClick={() => handleShowModalCreate()}
        >
          Add User
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listAllUsers.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <Button
                    bsPrefix="btn action__update mx-2"
                    variant="primary"
                    onClick={() => handleShowModalUpdate(user)}
                  >
                    Add Update
                  </Button>
                  <Button
                    bsPrefix="btn action__delete mx-2"
                    variant="primary"
                    onClick={() => handleShowModalDelete(user)}
                  >
                    Add Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <ReactPaginate
        breakLabel="..."
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={totalPages}
        previousLabel="<"
        nextLabel=">"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />

      <ModalCreate
        show={showModalCreate}
        handleClose={handleClose}
        handleUpdateTable={handleTableCreate}
      ></ModalCreate>

      <ModalUpdate
        show={showModalUpdate}
        handleClose={handleClose}
        handleUpdateTable={handleTableUpdate}
        dataUserUpdate={dataUserUpdate}
        ></ModalUpdate>
      
      <ModalDelete
        show={showModalDelete}
        handleClose={handleClose}
        handleUpdateTable={handleTableDelete}
        dataUserDelete={dataUserDelete}
      ></ModalDelete>
    </>
  );
};

export default TableUsers;
