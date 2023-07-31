
import './App.css';
import Home from './pages/frontend/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/frontend/Hompage-components/Signup';
import Login from './pages/frontend/Hompage-components/Login';
import CarouselSlider from './pages/frontend/Hompage-components/Carousel';
import HowWorks from './pages/frontend/Hompage-components/HowWorks';
import Contribute from './pages/frontend/Contribute';
import Registration from './pages/frontend/Hompage-components/Registration ';
import Faq from './pages/frontend/Hompage-components/Faq';
import NestedForm from './pages/frontend/register-form/nestedform'
function App() {
  return (
    <>
      <Router>
      <Routes>
      <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/carousel' element={<CarouselSlider />} /> 
        <Route path='/howworks' element={<HowWorks/>}/>
        <Route path='/contribute' element={<Contribute/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/Faq' element={<Faq/>}/>
        <Route path='/Nested' element={<NestedForm/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
