import { Col, Row } from 'react-bootstrap';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Side from './components/Side';
import MemoForm from './pages/memo/MemoForm';
import TodoListForm from './pages/TodoListForm';
import MemoDetail from './pages/memo/MemoDetail';
import MemoUpdate from './pages/memo/MemoUpdate';

function App() {
  return (
    <div>
      <Header />
      <Row>
        <Col
          xs={3}
          style={{
            paddingRight: '0px',
            borderRight: '2px solid gray',
            height: '100vh',
          }}
        >
          <Side />
        </Col>
        <Col>
          <Routes>
            <Route path="/" exact={true} element={<Home />} />
            <Route path="/editor" exact={true} element={<MemoForm />} />
            <Route
              path="/create/memo/:memoTitle"
              exact={true}
              element={<MemoForm />}
            />
            <Route
              path="/create/todoList/:todoListTitle"
              exact={true}
              element={<TodoListForm />}
            />
            <Route path="/memo/:id" exact={true} element={<MemoDetail />} />
            <Route
              path="/memo/modify/:id"
              exact={true}
              element={<MemoUpdate />}
            />
          </Routes>
        </Col>
      </Row>
    </div>
  );
}

export default App;
