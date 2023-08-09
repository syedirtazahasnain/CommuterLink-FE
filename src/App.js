
import './App.css';
import Home from './pages/frontend/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import RiderRegistration from './pages/frontend/Hompage-components/RiderRegistration';
import Verification from './pages/frontend/register-form/Verification';
import Dashboard from './pages/frontend/Hompage-components/Dashboard';
import CommuterProfile from './pages/frontend/Dashboard/CommuterProfile';
import { useSelector } from "react-redux";

function App() {
  const userToken = useSelector((s) => s.login.data.token);

  return (
    <>
      <Router>
      <Routes>
        <Route path='/'  element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path='/number-generate' element={<NumberGenerate/>}></Route>
        {userToken && (
            <>
              <Route path='/carousel' element={<CarouselSlider />} /> 
              <Route path='/howworks' element={<HowWorks/>}/>
              <Route path='/contribute' element={<Contribute/>}/>
              <Route path='/driver-registration' element={<Registration/>}/>
              <Route path='/registration' element={<RiderRegistration/>}/>
              <Route path='/faq' element={<Faq/>}/>
              <Route path='/shareride' element={<ShareRide/>}></Route>
              <Route path='/wouldyouliketo' element={<WouldYouLikeTo/>}></Route>
              {/* <Route path="/otp" element={<OtpPage />} /> */}
              <Route path='/nested' element={<Nestedform/>}></Route>
              {/* <Route path='/number-generate' element={<NumberGenerate/>}></Route> */}
              <Route path='/verification' element={<Verification/>}></Route>
              <Route path='/dashboard' element={<Dashboard/>}></Route>
              <Route path='/commuter-profile' element={<CommuterProfile/>}></Route>
            </>
          )}
          {!userToken && <Route path="*" element={<Navigate to="/" />} />}
      </Routes>
    </Router>
    </>
  );
}

export default App;
