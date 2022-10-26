import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import "bootstrap/dist/css/bootstrap.min.css"
import Register from './components/Register';
import Login from './components/Login'
import List from './components/List';
import AddTodo from './components/AddTodo';
import Modify from './components/Modify';
function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/list' element={<List />} />
          <Route path='/Addtodo' element={<AddTodo />} />
          <Route path='/modify/:id' element={<Modify />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;