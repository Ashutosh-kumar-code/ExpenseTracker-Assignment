import './App.css';
// import Graph from './components/Graph';
// import Form from './components/Form';
// import List from "./components/List";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Nav from './components/Nav';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {
  return (
  <div className="App">
    <BrowserRouter>
    <Nav/>
    <Routes>
      <Route path='/' element={<Home/>} />

      <Route path='/signup' element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
    </Routes>
    </BrowserRouter>
    
    {/* <Home/> */}
    

  </div>
  );
}


export default App;