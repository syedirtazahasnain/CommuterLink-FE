import Home from "./pages/frontend/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LinkedInCallback } from 'react-linkedin-login-oauth2';
import Signup from "./pages/frontend/Signup/Signup";
import DriverRegistration from "./pages/frontend/register-form/DriverRegistration";
import ShareRide from "./pages/frontend/register-form/ShareRide";
import WouldYouLikeTo from "./pages/frontend/register-form/WouldYouLikeTo";
import OtpPage from "./pages/frontend/register-form/OtpPage";
import NumberGenerate from "./pages/frontend/register-form/NumberGenerate";
import RiderRegistration from "./pages/frontend/register-form/RiderRegistration";
import Verification from "./pages/frontend/register-form/Verification";
// import CommuterProfile from "./pages/frontend/Dashboard/CommuterProfile";
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
import Rejection from "./pages/frontend/register-form/Rejection";
import AdvancePayment from "./pages/backend/dashboard/AdvancePayment";
import Contact from "./pages/frontend/Hompage-components/Contact";
import BeforeApprovalTerms from "./pages/backend/dashboard/BeforeAprrovalTerms";
import SchoolRegistration from "./pages/frontend/register-form/SchoolRegistration";
import PaymentRide from "./pages/backend/dashboard/PaymentRide";
import PaymentOptions from "./pages/backend/dashboard/PaymentOptions";
import FinalStep from "./pages/backend/dashboard/FinalStep";
import SendApprovalForMember from "./pages/backend/dashboard/SendApprovalForMember";
import Congratulations from "./pages/backend/dashboard/Congratulations";
import WouldYouLikeToSchool from "./pages/frontend/register-form/WouldYouLikeToSchool";
import SchoolDriverRegistration from "./pages/frontend/register-form/SchoolDriverRegistration";
import ContactUs from "./pages/backend/dashboard/ContactUs";
import EditProfile from "./pages/backend/profile/EditProfile";
import ViewProfile from "./pages/backend/profile/ViewProfile";
import DriverRequestAcceptence from "./pages/backend/dashboard/DriverRequestAcceptence";
import DriverWhyProcess from "./pages/backend/dashboard/DriverWhyProcess";
import DriverFinalStep from "./pages/backend/dashboard/DriverFinalStep";
import Resubmit from "./pages/frontend/register-form/Resubmit";
import TravelBuddyProfile from "./pages/backend/dashboard/TravelBuddyProfile";
import TermsCondition from "./pages/backend/dashboard/TermsCondition";
import Rider from "./pages/backend/MatchingUpdate/Rider";
import Driver from "./pages/backend/MatchingUpdate/Driver";
import PartnerCancellation from "./pages/backend/dashboard/PartnerCancellation";
import AmShareRide from "./pages/frontend/register-form/AmShareRide";
import CarouselSlider from "./pages/frontend/Hompage-components/Carousel";
import HowWorks from "./pages/frontend/Hompage-components/HowWorks";
import Contribute from "./pages/frontend/Hompage-components/Contribute";
import RechargeWallet from "./pages/backend/dashboard/RechargeWallet";
import RequestCommuterProfile from "./pages/backend/dashboard/RequestCommuterProfile";
import Loading from "./pages/frontend/register-form/Loading";
import DataSecurity from "./pages/frontend/register-form/DataSecurity";
import VerifiedMember from "./pages/frontend/register-form/VerifiedMember";
import Terms_Services from "./pages/frontend/terms-services/Terms_Services";

const Router = () => {
  const userLogin = useSelector((s) => s.login.data.token);
  const userSignup = useSelector((s) => s.signup.data.token);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontendLayout children={<Home />} />} />
        <Route path="/terms_services" element={<FrontendLayout children={<Terms_Services />} />} />
       
       
        <Route exact path="/linkedin" component={LinkedInCallback} />
        {/* <Route path="contact" element={<FrontendLayout children={<Contact/>} />} /> */}
        {/* <Route path="concept" element={<FrontendLayout children={<CarouselSlider/>} />} />
        <Route path="howitworks" element={<FrontendLayout children={<HowWorks/>} />} />
        <Route path="contribute" element={<FrontendLayout children={<Contribute/>} />} /> */}
        <Route path="/signup" element={<FrontendLayout children={<Signup />} />} />
        <Route path="/login" element={<FrontendLayout children={<Login />} />} />
        <Route path="/faq" element={<FrontendLayout children={<Faq />} />} />
        <Route path="/number-generate" element={<FrontendLayout children={<NumberGenerate />} />}></Route>
        <Route path="/resubmit" element={<FrontendLayout children={<Resubmit />} />} />
        <Route path="/rider" element={<BackendLayout children={<Rider />} />}></Route>
        <Route path="/driver" element={<BackendLayout children={<Driver />} />}></Route>
        <Route path="/loading" element={<FrontendLayout children={<Loading />} />} />
        <Route path="/datasecurity" element={<FrontendLayout children={<DataSecurity />} />} />
        <Route path="/verifiedmember" element={<FrontendLayout children={<VerifiedMember />} />} />

        {/* Testing Routes */}
        <Route path='/dashboard' element={<BackendLayout children={<Dashboard12 />} />} />
        <Route path='/commuterprofile1' element={<BackendLayout children={<CommuterProfile1 />} />} />
        <Route path='/replytoconfirmdates1' element={<BackendLayout children={<ReplyToConfirmDates1 />} />} />
        <Route path='/sendapprovalforpartner1' element={<BackendLayout children={<SendApprovalForPartner1 />} />} />
        <Route path='/sharetocare1' element={<BackendLayout children={<ShareToCare1 />} />} />
        {/* <Route path='/verification1' element={<BackendLayout children={<Verification1 />} />} /> */}
        <Route path='/whyprocesspayment1' element={<BackendLayout children={<WhyProcessPayment1 />} />} />
        <Route path='/new-dashboard' element={<BackendLayout children={<CommuterDetails />} />} />
        <Route path="/requestcarowner" element={<BackendLayout children={<RequestApprovalByCarOwner />} />} />
        <Route path="/rejection" element={<FrontendLayout children={<Rejection />} />} />
        <Route path="/otp" element={<FrontendLayout children={<OtpPage />} />} />
        <Route path="/loading" element={<BackendLayout children={<Loading />} />} />
        {/* <Route path="/contact" element={<BackendLayout children={<Contact />} />} /> */}
        <Route path="/rechargewallet" element={<BackendLayout children={<RechargeWallet />} />} />
        <Route path="/contact" element={<BackendLayout children={<Contact />} />} />
        <Route path="/driver-registration" element={<FrontendLayout children={<DriverRegistration />} />} />
        <Route path="/rider-registration" element={<FrontendLayout children={<RiderRegistration />} />} />
        <Route path="/requestcarowner" element={<BackendLayout children={<RequestApprovalByCarOwner />} />} />
        <Route path="/rejection" element={<FrontendLayout children={<Rejection />} />} />
        <Route path="/otp" element={<FrontendLayout children={<OtpPage />} />} />
        <Route path="/advancepayment" element={<BackendLayout children={<AdvancePayment />} />} />
        <Route path="/contact" element={<BackendLayout children={<Contact />} />} />
        <Route path="/driver-registration" element={<FrontendLayout children={<DriverRegistration />} />} />
        <Route path="/rider-registration" element={<FrontendLayout children={<RiderRegistration />} />} />
        <Route path="/shareride" element={<FrontendLayout children={<ShareRide />} />}></Route>
        <Route path="/amshareride" element={<FrontendLayout children={<AmShareRide />} />}></Route>
        <Route path="/rider-registration" element={<FrontendLayout children={<RiderRegistration />} />} />
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
        <Route path="/school-driver-form" element={<FrontendLayout children={<SchoolDriverRegistration />} />}></Route>
        <Route path="/verification" element={<FrontendLayout children={<Verification />} />}></Route>
        <Route path="/partner-cancellation" element={<BackendLayout children={<PartnerCancellation />} />}></Route>

        {userSignup && (
          <>
            <Route path="/driver-registration" element={<FrontendLayout children={<DriverRegistration />} />} />
            <Route path="/rider-registration" element={<FrontendLayout children={<RiderRegistration />} />} />
            <Route path="/shareride" element={<FrontendLayout children={<ShareRide />} />}></Route>
            <Route path="/nested" element={<FrontendLayout children={<WouldYouLikeTo />} />}></Route>
            <Route path="/nested-school" element={<FrontendLayout children={<WouldYouLikeToSchool />} />}></Route>
            <Route path="/number-generate" element={<FrontendLayout children={<NumberGenerate />} />}></Route>
            <Route path="/verification" element={<FrontendLayout children={<Verification />} />}></Route>
            <Route path="/office_school" element={<FrontendLayout children={<Office_School />} />}></Route>
            <Route path="/school-form" element={<FrontendLayout children={<SchoolRegistration />} />}></Route>
            <Route path="/school-driver-form" element={<FrontendLayout children={<SchoolDriverRegistration />} />}></Route>
          </>
        )}
        {userLogin && (
          <>
            <Route path='/driver-registration' element={<FrontendLayout children={<DriverRegistration />} />} />
            <Route path='/rider-registration' element={<FrontendLayout children={<RiderRegistration />} />} />
            <Route path='/shareride' element={<FrontendLayout children={<ShareRide />} />}></Route>
            <Route path="/otp" element={<FrontendLayout children={<OtpPage />} />} />
            <Route path='/nested' element={<FrontendLayout children={<WouldYouLikeTo />} />}></Route>
            <Route path="/nested-school" element={<FrontendLayout children={<WouldYouLikeToSchool />} />}></Route>
            <Route path='/number-generate' element={<FrontendLayout children={<NumberGenerate />} />}></Route>
            <Route path='/verification' element={<FrontendLayout children={<Verification />} />}></Route>
            <Route path='/dashboard' element={<BackendLayout children={<Dashboard12 />} />}></Route>
            <Route path='/notification' element={<BackendLayout children={<Notifications />} />}></Route>
            <Route path='/commuter-profile' element={<BackendLayout children={<CommuterProfile1 />} />}></Route>
            <Route path='/request-commuter-profile' element={<BackendLayout children={<RequestCommuterProfile />} />}></Route>
            <Route path='/seatcostverification' element={<FrontendLayout children={<SeatCostVerification />} />}></Route>
            <Route path='/requestcarowner' element={<BackendLayout children={<RequestApprovalByCarOwner />} />} />
            <Route path="/office_school" element={<FrontendLayout children={<Office_School />} />}></Route>
            <Route path="/school-form" element={<FrontendLayout children={<SchoolRegistration />} />}></Route>
            <Route path="/school-driver-form" element={<FrontendLayout children={<SchoolDriverRegistration />} />}></Route>
            <Route path="/travel-buddy" element={<BackendLayout children={<TravelBuddyProfile />} />}></Route>
            <Route path="/driver-acceptance" element={<BackendLayout children={<DriverRequestAcceptence />} />}></Route>
            <Route path="/driverwhyprocesspayment" element={<BackendLayout children={<DriverWhyProcess />} />}></Route>
            <Route path="/driverfinalstep" element={<BackendLayout children={<DriverFinalStep />} />}></Route>
            <Route path='/termscondition1' element={<BackendLayout children={<TermsCondition1 />} />} />
            <Route path='/termscondition' element={<BackendLayout children={<TermsCondition />} />} />
            <Route path="/advancepayment" element={<BackendLayout children={<AdvancePayment />} />} />
            <Route path="/rechargewallet" element={<BackendLayout children={<RechargeWallet />} />} />
          </>
        )}
        {!userLogin && <Route path="*" element={<Navigate to="/" />} />}
        {!userSignup && <Route path="*" element={<Navigate to="/" />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
