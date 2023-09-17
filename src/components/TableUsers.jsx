import { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import _ from "lodash";
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { toast } from "react-toastify";
import { fetchUsersByPage } from "../services/UserService";
import Table from "react-bootstrap/Table";
import ModalCreate from "./ModalCreate";
import ModalUpdate from "./ModalUpdate";
import ModalDelete from "./ModalDelete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
  faMagnifyingGlass,
  faCirclePlus,
  faFileArrowDown,
  faFileArrowUp,
} from "@fortawesome/free-solid-svg-icons";

const TableUsers = () => {
  //Handle get all users
  const [dataAllUsers, setDataAllUsers] = useState([]);
  const [listAllUsers, setListAllUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getUsersByPage(1);
  }, []);

  const getUsersByPage = async (page) => {
    const res = await fetchUsersByPage(page);

    if (res && res.data) {
      setDataAllUsers(res.data);
      setListAllUsers(res.data);
      setTotalPages(res.total_pages);
    }
  };

  //Handle create new user
  const [showModalCreate, setShowModalCreate] = useState(false);
  const handleShowModalCreate = () => setShowModalCreate(true);

  //Handle update user
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [dataUserUpdate, setDataUserUpdate] = useState({});
  const handleShowModalUpdate = (user) => {
    setShowModalUpdate(true);
    setDataUserUpdate(user);
  };

  //Handle delete user
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});
  const handleShowModalDelete = (user) => {
    setShowModalDelete(true);
    setDataUserDelete(user);
  };

  //Handle close modal Create, Update, Delete user
  const handleCloseModal = () => {
    setShowModalCreate(false);
    setShowModalUpdate(false);
    setShowModalDelete(false);
  };

  //Handle sort user
  const [isSortAsc, setIsSortAsc] = useState(true);
  const [sortFeild, setSortFeild] = useState("id");
  const handleSort = (feild) => {
    setIsSortAsc(!isSortAsc);
    setSortFeild(feild);

    var allUsers = _.cloneDeep(listAllUsers);
    allUsers = _.orderBy(allUsers, [feild], [!isSortAsc ? "asc" : "desc"]);
    setListAllUsers([...allUsers]);
  };

  //Handle update table when create user
  const handleTableCreate = (newUser) => {
    setListAllUsers([newUser, ...listAllUsers]);
  };

  //Handle update table when update user
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

  //Handle update table when delete user
  const handleTableDelete = (id) => {
    setListAllUsers(listAllUsers.filter((user) => user.id !== id));
  };

  //Handle search user
  const [searchKey, setSearchKey] = useState("");
  const handleSearch = (input) => {
    setSearchKey(input);
    setListAllUsers(
      dataAllUsers.filter((user) => {
        return user.first_name.toLowerCase().includes(input.toLowerCase());
      })
    );
  };

  //Handle import user data
  const elementInputImport = useRef(null);
  const handleOpenImportUser = () => {
    elementInputImport.current.click();
  };
  const handleImportUser = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (file.type !== "text/csv") {
        toast.error("Please import CSV file");
        return;
      }

      Papa.parse(file, {
        header: true,
        complete: (results) => {
          console.log(results.data);
          setListAllUsers(
            results.data.map((user) => {
              console.log(user);
              if (user) {
                return user;
              } else {
                return;
              }
            })
          );
        },
      });
    }
  };

  //Handle click on React Pagination
  const handlePageClick = (event) => {
    getUsersByPage(event.selected + 1);
  };

  return (
    <>
      <div className="search d-flex justify-content-between align-items-center">
        <div className="search__input flex-1">
          <input
            type="text"
            name="search__input"
            id="search__input"
            className="form-control my-2"
            placeholder="Input put your name..."
            onChange={(event) => {
              setSearchKey(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch(searchKey);
              }
            }}
          />
        </div>
        <div className="search__icon" onClick={() => handleSearch(searchKey)}>
          <FontAwesomeIcon icon={faMagnifyingGlass} inverse />
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div
                className="th-sort d-flex justify-content-between w-100"
                onClick={() => {
                  handleSort("id");
                }}
              >
                ID
                <span>
                  {sortFeild === "id" ? (
                    isSortAsc ? (
                      <FontAwesomeIcon icon={faSortDown} />
                    ) : (
                      <FontAwesomeIcon icon={faSortUp} />
                    )
                  ) : (
                    <FontAwesomeIcon icon={faSort} />
                  )}
                </span>
              </div>
            </th>
            <th>
              <div
                className="th-sort d-flex justify-content-between w-100"
                onClick={() => {
                  handleSort("first_name");
                }}
              >
                First Name
                <span>
                  {sortFeild === "first_name" ? (
                    isSortAsc ? (
                      <FontAwesomeIcon icon={faSortDown} />
                    ) : (
                      <FontAwesomeIcon icon={faSortUp} />
                    )
                  ) : (
                    <FontAwesomeIcon icon={faSort} />
                  )}
                </span>
              </div>
            </th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listAllUsers.map((user, index) => {
            return (
              <tr key={index}>
                <td>
                  <div>{user.id}</div>
                </td>
                <td>
                  <div>{user.first_name}</div>
                </td>
                <td>
                  <div>{user.last_name}</div>
                </td>
                <td>
                  <div>{user.email}</div>
                </td>
                <td>
                  <Button
                    bsPrefix="btn action__update"
                    variant="primary"
                    onClick={() => handleShowModalUpdate(user)}
                  >
                    Update
                  </Button>
                  <Button
                    bsPrefix="btn action__delete"
                    variant="primary"
                    onClick={() => handleShowModalDelete(user)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between py-2">
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

        <div className="w-50 d-flex justify-content-end align-items-center">
          <Button
            bsPrefix="btn action__import"
            variant="primary"
            onClick={() => handleOpenImportUser()}
          >
            <FontAwesomeIcon icon={faFileArrowUp} />
            &nbsp;&nbsp;Import
          </Button>
          <label htmlFor="input__user" hidden></label>
          <input
            ref={elementInputImport}
            type="file"
            id="input__user"
            hidden
            onChange={handleImportUser}
          />

          <Button bsPrefix="btn action__export" variant="primary">
            <CSVLink data={listAllUsers} filename={"all-users.csv"}>
              <FontAwesomeIcon icon={faFileArrowDown} />
              &nbsp;&nbsp;Export
            </CSVLink>
          </Button>

          <Button
            bsPrefix="btn action__create"
            variant="primary"
            onClick={() => handleShowModalCreate()}
          >
            <FontAwesomeIcon icon={faCirclePlus} />
            &nbsp;&nbsp;Add User
          </Button>
        </div>
      </div>

      <ModalCreate
        show={showModalCreate}
        handleClose={handleCloseModal}
        handleUpdateTable={handleTableCreate}
      ></ModalCreate>

      <ModalUpdate
        show={showModalUpdate}
        handleClose={handleCloseModal}
        handleUpdateTable={handleTableUpdate}
        dataUserUpdate={dataUserUpdate}
      ></ModalUpdate>

      <ModalDelete
        show={showModalDelete}
        handleClose={handleCloseModal}
        handleUpdateTable={handleTableDelete}
        dataUserDelete={dataUserDelete}
      ></ModalDelete>
    </>
  );
};

export default TableUsers;
