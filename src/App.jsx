import "./App.scss";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";

function App() {
  return (
    <div className="app-container">
      <Header></Header>

      <Container>
        <TableUsers></TableUsers>
      </Container>
    </div>
  );
}

export default App;
