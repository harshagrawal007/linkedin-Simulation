import React, { Component } from "react";
import { Route } from "react-router-dom";
import ApplicantProfile from "./ApplicantProfile/ApplicantProfile";
import Charts1 from "./Charts1";
import Charts2 from "./Charts2";

import PostJob from "./PostJob/postJob";
//import OwnerLogin from './OwnerLogin/OwnerLogin';
import { Provider } from "react-redux";
import store from "../store/store";
import LandingPage from "./LandingPage/LandingPage";
// import MyNetwork from "./MyNetwork/MyNetwork";
import DeleteAccount from "./DeleteAccount/DeleteAccount";
import Messaging from "./Messaging/Messaging";
import LoginPage from "./LoginPage/LoginPage";
import SignUp from "./SignUp/SignUp";
// import People from "./People/People";
import MessageThread from "./MessageThread/MessageThread";
import JobSearch from "./JobSearch/JobSearch";
import SavedJobs from "./JobSearch/SavedJobs";
import UserSearch from "./UserSearch/UserSearch";
import ViewConnectionRequest from "./Connection/ViewConnectionRequest";
import ViewConnections from "./Connection/ViewConnections";
import JobPostings from "./JobPostings/JobPostings";
import ViewApplications from "./Applications/ViewApplications";
import StaticApplicantProfile from "./ApplicantProfile/StaticApplicantProfile";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import RecruiterDashboard from "./RecruiterDashboard/recruiterDashboard";
import ApplicantDashboard from "./ApplicantDashboard/ApplicantDashboard";
import application from "./Application/application";

import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser } from "../actions/signUp";

// import RecruiterDashboard from './RecruiterDashboard/recruiterDashboard';

if (localStorage.userToken) {
  setAuthToken(localStorage.userToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.userToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  console.log(decoded);
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //   // Logout user
    //   //store.dispatch(logoutUser());
    //   // Clear current Profile
    //   //store.dispatch(clearCurrentProfile());aksldnalsknakdnalksdnaklsdnsld
    //   // Redirect to login
    localStorage.removeItem("userToken");
    window.location.href = "/home";
  }
}

class Main extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <div>
            <Route path="/deleteaccount" component={DeleteAccount} />
            <Route path="/messaging" component={Messaging} />
            <Route path="/messaging/thread" component={MessageThread} />
            <Route exact path="/charts" exact component={Charts2} />
            <Route exact path="/profile" component={ApplicantProfile} />
            <Route
              path="/StaticApplicantProfile"
              component={StaticApplicantProfile}
            />

            <Route exact path="/postJob" component={PostJob} />
            <Route exact path="/landingpage" component={LandingPage} />
            <Route exact path="/home" component={LoginPage} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/jobsearch" component={JobSearch} />
            <Route exact path="/savedJobs" component={SavedJobs} />
            <Route exact path="/userSearch" component={UserSearch} />
            <Route
              exact
              path="/viewConnectionRequest"
              component={ViewConnectionRequest}
            />
            <Route exact path="/viewConnections" component={ViewConnections} />
            <Route path="/admindashboard" component={AdminDashboard} />
            {/* <Route path="/recruiterdashboard" component={RecruiterDashboard} /> */}
            <Route path="/applicantdashboard" component={ApplicantDashboard} />
            <Route path="/application" component={application} />
            <Route
              exact
              path="/recruiterDashboard"
              component={RecruiterDashboard}
            />

            <Route exact path="/jobPostings" component={JobPostings} />
            <Route
              exact
              path="/applications/:jobid"
              component={ViewApplications}
            />

            {/* <Route exact path="/" component={Home}/> */}
            {/* <Route path="/ownerLogin" component={NavComp} />
                        <Route path="/ownerLogin" component={OwnerLogin} />
                        <Route path="/travellerLogin" component={NavComp} />
                        <Route path="/travellerLogin" component={TravellerLogin} />
                        <Route path="/ownerRegistration" component={NavComp} />
                        <Route path="/ownerRegistration" component={OwnerRegistration} />
                        <Route path="/travellerRegistration" component={NavComp} />
                        <Route path="/travellerRegistration" component={TravellerRegistration} />

                        <Route path="/profile" component={NavComp} />
                        <Route exact path="/profile" component={Profile} />
                        <Route path="/propertyListing" component={NavComp} />
                        <Route exact path="/propertyListing" component={PropertyListing} />
                        <Route path="/searchResults" component={NavComp} />
                        <Route exact path="/searchResults" component={SearchResults} />
                        <Route path="/propertyDetails/:id" component={NavComp} />
                        <Route exact path="/propertyDetails/:id" component={PropertyDetail} />
                        <Route path="/loadUserBookings" component={NavComp} />
                        <Route exact path="/loadUserBookings" component={UserDashboard} />
                        <Route path="/loadOwnerProperties"component={NavComp} />
                        <Route exact path="/loadOwnerProperties" component={OwnerDashboard} /> */}
          </div>
        </Provider>
      </div>
    );
  }
}
//Export The Main Component
export default Main;
