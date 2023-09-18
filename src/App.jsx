import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Home from "./components/Home";
import TableUsers from "./components/TableUsers";
import Login from "./components/Login";
import "./App.scss";

const App = () => {
  return (
    <>
      <div className="app-container">
        <Header></Header>

        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/manage-user" element={<TableUsers />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
