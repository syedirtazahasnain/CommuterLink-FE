
import './App.css';
import Home from './pages/frontend/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/frontend/Signup/Signup';
import CarouselSlider from './pages/frontend/Hompage-components/Carousel';
import HowWorks from './pages/frontend/Hompage-components/HowWorks';
import Contribute from './pages/frontend/Hompage-components/Contribute';
import DriverRegistration from './pages/frontend/register-form/DriverRegistration';
import ShareRide from './pages/frontend/register-form/ShareRide';
import WouldYouLikeTo from './pages/frontend/register-form/WouldYouLikeTo';
import OtpPage from "./pages/frontend/register-form/OtpPage"
import Nestedform from "./pages/frontend/register-form/WouldYouLikeTo";
import NumberGenerate from "./pages/frontend/register-form/NumberGenerate";
import RiderRegistration from './pages/frontend/register-form/RiderRegistration';
import Verification from './pages/frontend/Dashboard/Verification';
import Dashboard from './pages/frontend/Dashboard/Dashboard';
import CommuterProfile from './pages/frontend/Dashboard/CommuterProfile';
import { useSelector } from "react-redux";
import Faq from './pages/frontend/faq/Faq';
import Login from './pages/frontend/login/Login';
import SeatCostVerification from './pages/frontend/register-form/SeatCostVerification';
import Dashboard12 from './pages/backend/dashboard/Dashboard12';
function App() {
  const userLogin = useSelector((s) => s.login.data.token);
  const userSignup = useSelector((s) => s.signup.data.token);
  const userOption0 = useSelector((s) => s.general.data.option0);
  const userOption1 = useSelector((s) => s.general.data.option1);

  console.log("Option 0", userOption0);
  console.log("Option 1", userOption1);

  return (
    <>
      <Router>
      <Routes>
        <Route path='/'  element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/faq' element={<Faq/>}/>
        <Route path='/new-dashboard' element={<Dashboard12 />}/>
        {/* <Route path='/number-generate' element={<NumberGenerate/>}></Route> */}
        {/* <Route path='/carousel' element={<CarouselSlider />} /> 
        <Route path='/howworks' element={<HowWorks/>}/>
        <Route path='/contribute' element={<Contribute/>}/> */}
        {/* <Route path='/faq' element={<Faq/>}/> */}

          {userOption0 && (
            <>
              <Route path='/rider-registration' element={<RiderRegistration/>}/>
            </>
          )}

          {userOption1 && (
            <>
              <Route path='/driver-registration' element={<DriverRegistration/>}/>
            </>
          )}
             
        {userSignup && (
            <>
              <Route path='/driver-registration' element={<DriverRegistration/>}/>
              <Route path='/rider-registration' element={<RiderRegistration/>}/>
              <Route path='/shareride' element={<ShareRide/>}></Route>
              <Route path='/wouldyouliketo' element={<WouldYouLikeTo/>}></Route>
              <Route path="/otp" element={<OtpPage />} />
              <Route path='/nested' element={<Nestedform/>}></Route>
              <Route path='/number-generate' element={<NumberGenerate/>}></Route>
              <Route path='/verification' element={<Verification/>}></Route>
            </>
          )}
        {userLogin && (
            <>
              <Route path='/carousel' element={<CarouselSlider />} /> 
              <Route path='/howworks' element={<HowWorks/>}/>
              <Route path='/contribute' element={<Contribute/>}/>
              <Route path='/driver-registration' element={<DriverRegistration/>}/>
              <Route path='/rider-registration' element={<RiderRegistration/>}/>
              <Route path='/shareride' element={<ShareRide/>}></Route>
              <Route path='/wouldyouliketo' element={<WouldYouLikeTo/>}></Route>
              <Route path="/otp" element={<OtpPage />} />
              <Route path='/nested' element={<Nestedform/>}></Route>
              {/* <Route path='/number-generate' element={<NumberGenerate/>}></Route> */}
              <Route path='/verification' element={<Verification/>}></Route>
              <Route path='/dashboard' element={<Dashboard/>}></Route>
              <Route path='/commuter-profile' element={<CommuterProfile/>}></Route>
              <Route path='/seatcostverification' element={<SeatCostVerification/>}></Route>
            </>
          )}
          {!userLogin && <Route path="*" element={<Navigate to="/" />} />}
          {!userSignup && <Route path="*" element={<Navigate to="/" />} />}
          {!userOption0 && !userOption1 && <Route path="*" element={<Navigate to="/" />} />}
      </Routes>
    </Router>
    </>
  );
}

export default App;
