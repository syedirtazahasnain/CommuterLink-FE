
import './App.css';
import Home from './pages/frontend/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/frontend/Signup/Signup';
import Login from './pages/frontend/Hompage-components/Login';
import CarouselSlider from './pages/frontend/Hompage-components/Carousel';
import HowWorks from './pages/frontend/Hompage-components/HowWorks';
import Contribute from './pages/frontend/Contribute';
import Registration from './pages/frontend/Hompage-components/Registration';
import Faq from './pages/frontend/Hompage-components/Faq';
import ShareRide from './pages/frontend/register-form/ShareRide';
import WouldYouLikeTo from './pages/frontend/register-form/WouldYouLikeTo';
import OtpPage from "./pages/frontend/register-form/OtpPage"
import Nestedform from "./pages/frontend/register-form/WouldYouLikeTo";
import NumberGenerate from "./pages/frontend/register-form/NumberGenerate";
import Driver from './pages/frontend/register-form/Driver';
function App() {
  return (
    <>
      <Router>
      <Routes>
      <Route path='/'  element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/carousel' element={<CarouselSlider />} /> 
        <Route path='/howworks' element={<HowWorks/>}/>
        <Route path='/contribute' element={<Contribute/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/registration/driving-form' element={<Driver/>}/>
        <Route path='/Faq' element={<Faq/>}/>
        <Route path='/ShareRide' element={<ShareRide/>}></Route>
        <Route path='/WouldYouLikeTo' element={<WouldYouLikeTo/>}></Route>
        <Route path="/otp" element={<OtpPage />} />
        <Route path='/Nested' element={<Nestedform/>}></Route>
        <Route path='/NumberGenerate' element={<NumberGenerate/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
