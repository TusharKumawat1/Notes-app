import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { Route,Routes } from 'react-router-dom';
import Notestate from './context/notes/Notestate';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import Footer from './components/Footer';

function App() {

  return (
    <Notestate>
    <div className="App">

      <Navbar/> 
      <Alert />
      <div className="container">
      
      <Routes>
        <Route  path='/' element={<Home/>}></Route>
        <Route path='*' element={<h1>Not Found</h1>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
      </div>
      <Footer/>
    </div>
    </Notestate> 
  );
}

export default App;
