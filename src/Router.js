import Home from "./pages/frontend/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/frontend/Signup/Signup";
import DriverRegistration from "./pages/frontend/register-form/DriverRegistration";
import ShareRide from "./pages/frontend/register-form/ShareRide";
import WouldYouLikeTo from "./pages/frontend/register-form/WouldYouLikeTo";
import OtpPage from "./pages/frontend/register-form/OtpPage";
import NumberGenerate from "./pages/frontend/register-form/NumberGenerate";
import RiderRegistration from "./pages/frontend/register-form/RiderRegistration";
import Verification from "./pages/frontend/register-form/Verification";
import CommuterProfile from "./pages/frontend/Dashboard/CommuterProfile";
import { useSelector } from "react-redux"; 
import Faq from "./pages/frontend/faq/Faq";
import Login from "./pages/frontend/login/Login";
import SeatCostVerification from "./pages/frontend/register-form/SeatCostVerification";
import BackendLayout from "./pages/backend/BackendLayout";
import CommuterProfile1 from "./pages/backend/dashboard/CommuterProfile1";
import CommuterDetails from "./pages/backend/dashboard/CommuterDetails";
import ReplyToConfirmDates1 from "./pages/backend/dashboard/ReplyToConfirmDates1";
import SendApprovalForPartner1 from "./pages/backend/dashboard/SendApprovalForPartner1";
import TermsCondition1 from "./pages/backend/dashboard/TermsCondition1";
import Verification1 from "./pages/backend/dashboard/Verification1";
import WhyProcessPayment1 from "./pages/backend/dashboard/WhyProcessPayment1";
import ShareToCare1 from "./pages/backend/dashboard/ShareToCare1";
import Office_School from "./pages/frontend/register-form/Office_School";
import FrontendLayout from "./pages/frontend/FrontendLayout";
import RequestApprovalByCarOwner from "./pages/backend/dashboard/RequestApprovalByCarOwner";
import Dashboard12 from "./pages/backend/dashboard/Dashboard12";
import Notifications from "./pages/backend/dashboard/Notifications";
import Rejection from "./pages/backend/dashboard/Rejection";
import AdvancePayment from "./pages/backend/dashboard/AdvancePayment";
import Contact from "./pages/frontend/Hompage-components/Contact";
import BeforeApprovalTerms from "./pages/backend/dashboard/BeforeAprrovalTerms";
import SchoolRegistration from "./pages/frontend/register-form/SchoolRegistration";
import PaymentRide from "./pages/backend/dashboard/PaymentRide";
import PaymentOptions from "./pages/backend/dashboard/PaymentOptions";
import FinalStep from "./pages/backend/dashboard/FinalStep";
import SendApprovalForMember from "./pages/backend/dashboard/SendApprovalForMember";
import Congratulations from "./pages/backend/dashboard/Congratulations";
import ContactUs from "./pages/backend/dashboard/ContactUs";
import EditProfile from "./pages/backend/profile/EditProfile";
import ViewProfile from "./pages/backend/profile/ViewProfile";
import DriverRequestAcceptence from "./pages/backend/dashboard/DriverRequestAcceptence";
import DriverWhyProcess from "./pages/backend/dashboard/DriverWhyProcess";
import DriverFinalStep from "./pages/backend/dashboard/DriverFinalStep";
import Resubmit from "./pages/frontend/register-form/Resubmit";


const Router = () => {
  const userLogin = useSelector((s) => s.login.data.token);
  const userSignup = useSelector((s) => s.signup.data.token);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontendLayout children={<Home />} />} />
        <Route path="/signup" element={<FrontendLayout children={<Signup />} />}/>
        <Route path="/login" element={<FrontendLayout children={<Login />} />}/>
        <Route path="/faq" element={<FrontendLayout children={<Faq />} />} />
        <Route path="/number-generate" element={<FrontendLayout children={<NumberGenerate />} />}></Route>
        <Route path="/resubmit" element={<FrontendLayout children={<Resubmit />} />} />

         {/* Testing Routes */}
        <Route path='/dashboard' element={<BackendLayout children={<Dashboard12 />} />} />
        <Route path='/commuterprofile1' element={<BackendLayout children={<CommuterProfile1 />} />} />
        <Route path='/replytoconfirmdates1' element={<BackendLayout children={<ReplyToConfirmDates1 />} />} />
        <Route path='/sendapprovalforpartner1' element={<BackendLayout children={<SendApprovalForPartner1 />} />} />
        <Route path='/sharetocare1' element={<BackendLayout children={<ShareToCare1 />} />} />
        <Route path='/termscondition1' element={<BackendLayout children={<TermsCondition1 />} />} />
        <Route path='/verification1' element={<BackendLayout children={<Verification1 />} />} />
        <Route path='/whyprocesspayment1' element={<BackendLayout children={<WhyProcessPayment1 />} />} />
        <Route path='/new-dashboard' element={<BackendLayout children={<CommuterDetails />} />} />
        <Route path="/requestcarowner" element={<BackendLayout children={<RequestApprovalByCarOwner />} />}/>
        <Route path="/rejection" element={<BackendLayout children={<Rejection />} />}/>
        <Route path="/otp" element={<FrontendLayout children={<OtpPage />} />} />
        
        <Route path="/advancepayment" element={<BackendLayout children={<AdvancePayment />} />}/>
        <Route path="/contact" element={<BackendLayout children={<Contact />} />}/>
        <Route path="/driver-registration" element={<FrontendLayout children={<DriverRegistration />} />}/>
        <Route path="/rider-registration" element={<FrontendLayout children={<RiderRegistration />} />}/>
        <Route path="/shareride" element={<FrontendLayout children={<ShareRide />} />}></Route>
        <Route path="/rider-registration" element={<FrontendLayout children={<RiderRegistration />} />}/>
        <Route path="/beforeapprovalterms" element={<BackendLayout children={<BeforeApprovalTerms />} />}></Route>
        <Route path="/office_school" element={<FrontendLayout children={<Office_School />} />}></Route>
        <Route path="/school-form" element={<FrontendLayout children={<SchoolRegistration />} />}></Route>
        <Route path="/paymentride" element={<BackendLayout children={<PaymentRide />} />}></Route>
        <Route path="/paymentoptions" element={<BackendLayout children={<PaymentOptions />} />}></Route>
        <Route path="/finalstep" element={<BackendLayout children={<FinalStep />} />}></Route>
        <Route path="/sendapprovalformember" element={<BackendLayout children={<SendApprovalForMember />} />}></Route>
        <Route path="/congratulations" element={<BackendLayout children={<Congratulations />} />}></Route>
        <Route path="/contactus" element={<BackendLayout children={<ContactUs />} />}></Route>
        <Route path="/editprofile" element={<BackendLayout children={<EditProfile />} />}></Route>
        <Route path="/viewprofile" element={<BackendLayout children={<ViewProfile />} />}></Route>
        <Route path="/driverwhyprocesspayment" element={<BackendLayout children={<DriverWhyProcess />} />}></Route>
        <Route path="/driverfinalstep" element={<BackendLayout children={<DriverFinalStep />} />}></Route>


        {userSignup && (
          <>
            <Route path="/driver-registration" element={<FrontendLayout children={<DriverRegistration />} />}/>
            <Route path="/rider-registration" element={<FrontendLayout children={<RiderRegistration />} />}/>
            <Route path="/shareride" element={<FrontendLayout children={<ShareRide />} />}></Route>
            <Route path="/nested" element={<FrontendLayout children={<WouldYouLikeTo />} />}></Route>
            <Route path="/number-generate" element={<FrontendLayout children={<NumberGenerate />} />}></Route>
            <Route path="/verification" element={<FrontendLayout children={<Verification />} />}></Route>
            <Route path="/office_school" element={<FrontendLayout children={<Office_School />} />}></Route>
            <Route path="/school-form" element={<FrontendLayout children={<SchoolRegistration />} />}></Route>
          </>
        )}
        {userLogin && (
            <>
              <Route path='/driver-registration' element={<FrontendLayout children={<DriverRegistration/>}/>}/>
              <Route path='/rider-registration' element={<FrontendLayout children={<RiderRegistration/>}/>}/>
              <Route path='/shareride' element={<FrontendLayout children={<ShareRide/>}/>}></Route>
              <Route path="/otp" element={<FrontendLayout children={<OtpPage />}/>} />
              <Route path='/nested' element={<FrontendLayout children={<WouldYouLikeTo/>}/>}></Route>
              <Route path='/number-generate' element={<FrontendLayout children={<NumberGenerate />}/>}></Route>
              <Route path='/verification' element={<FrontendLayout children={<Verification/>}/>}></Route>
              <Route path='/dashboard' element={<BackendLayout children={<Dashboard12 />} />}></Route>
              <Route path='/notification' element={<BackendLayout children={<Notifications />} />}></Route>
              <Route path='/commuter-profile' element={<BackendLayout children={<CommuterProfile1 />} />}></Route>
              <Route path='/seatcostverification' element={<FrontendLayout children={<SeatCostVerification/>}/>}></Route>
              <Route path='/requestcarowner' element={<BackendLayout children={<RequestApprovalByCarOwner />} />} />
              <Route path="/office_school" element={<FrontendLayout children={<Office_School />} />}></Route>
              <Route path="/school-form" element={<FrontendLayout children={<SchoolRegistration />} />}></Route>
              <Route path='/driver-acceptance' element={<BackendLayout children={<DriverRequestAcceptence />} />} />

            </>
          )}
          {!userLogin && <Route path="*" element={<Navigate to="/" />} />}
          {!userSignup && <Route path="*" element={<Navigate to="/" />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
