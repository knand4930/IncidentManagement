import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home';
import Update from './Update';
import Read from './Read';
import Create from './Create';
import 'bootstrap/dist/css/bootstrap.min.css'
import Register from './Register';
import Login from './Login';


function App() {
  return (
   <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login/" element={<Login />}></Route>
      <Route path="/register/" element={<Register />}></Route>
      <Route path="/create/" element={<Create />}></Route>
      <Route path="/read/:id/" element={<Read />}></Route>
      <Route path="/update/:id/" element={<Update />}></Route>
     </Routes>
     </BrowserRouter>
   </>
  );
}

export default App;
