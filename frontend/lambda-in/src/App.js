import React, { Component } from 'react';
import { Route, Switch, Link, Redirect, withRouter } from 'react-router-dom';
import './App.css';
import NavBar from './Components/Navbar/navbar';
import DevSignUp from './Components/DevSignUp/DevSignUp';
import DevLogin from './Components/DevLogIn/DevLogIn';
import LandingPage from './Components/Landing Page/landing-page';
import DevProfile from './Components/DevProfile/DevProfile';
import DevInfoEditz from './Components/DevInfoEditz/DevInfoEditz';
import Billing from './Components/Billing/billing';
import EmpSignUp from './Components/EmployerSignUp/EmployerSignUp';
import EmpList from './Components/EmployerList/EmpOPList';
import SearchGeolocation from './Components/InputGeolocation/SearchGeolocation';

import DevList from './Components/DevList/DevList';

class App extends Component {
<<<<<<< HEAD
  state = {
    isSignedIn: false,
    userInfo: {},
||||||| merged common ancestors
  state = {
    isSignedIn: false,
    userInfo: {
      
    }
=======
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      userInfo: {}, // To be populated after an HTTP request from other components.
      userType: '', // 'seeker' || 'employer'
    };
  }

  /**
   * Set APP's global state.
   *
   * @method setGlobalState
   * @param {object} properties - Properties to be set.
   * @return {void}
   *
   * @example Pass as a prop to component.
   * <Component setGS={this.setGlobalState} />
   */
  setGlobalState = properties => {
    this.setState(properties);
>>>>>>> 562c398410aa5dd6c658d4a28a0627906b0fcc5d
  };

  /**
   * Get APP's global state.
   *
   * @method getGlobalState
   * @param {void}
   * @return {object} App's global state.
   *
   * @example Pass as a prop to component.
   * <Component getGS={this.getGlobalState} />
   */
  getGlobalState = () => {
    const self = this;
    return self.state;
  };

  render() {
<<<<<<< HEAD
    return (
      <div className="TopContainer">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/dev-profiles" component={DevProfile} />
          <Route path="/billing" component={Billing} />
          <Route path="/dev-list" component={DevList} />
          <Route path="/emp-signup" component={EmpSignUp} />
          <Route path="/emp-list" component={EmpList} />
          <Route path="/dev-info-edit" component={DevInfoEditz} />
          {/* For testing purpose */}
          <Route path="/dev-signup" component={DevSignUp} />
          <Route path="/dev-login" component={DevLogin} />
          <Route path="/geolocation-test" component={SearchGeolocation} />
        </Switch>
      </div>
    );
  }
||||||| merged common ancestors
      return (
        <div className="TopContainer">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/dev-profiles" component={DevProfile} />
            <Route path="/billing" component={Billing} />
            <Route path="/dev-list" component={DevList} />
            <Route path="/emp-signup" component={EmpSignUp} />
            <Route path="/emp-list" component={EmpList} />
            <Route path="/dev-info-edit" component={DevInfoEditz} />
            {/* For testing purpose */}
            <Route path="/dev-signup" component={DevSignUp} />
            <Route path="/dev-login" component={DevLogin} />
          </Switch>
        </div>
      );
    }
  
=======
    return (
      <div>
        <NavBar />
        <div className="TopContainer">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/dev-profiles" component={DevProfile} />
            <Route path="/billing" component={Billing} />
            <Route path="/dev-list" component={DevList} />
            <Route path="/employer-signup" component={EmpSignUp} />
            <Route path="/employer-list" component={EmpList} />
            <Route path="/dev-info-edit" component={DevInfoEditz} />
            {/* For testing purpose */}
            <Route path="/dev-signup" component={DevSignUp} />
            <Route path="/dev-login" component={DevLogin} />
          </Switch>
        </div>
      </div>
    );
  }
>>>>>>> 562c398410aa5dd6c658d4a28a0627906b0fcc5d
}

export default App;
