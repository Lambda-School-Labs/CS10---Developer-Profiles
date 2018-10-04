import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../DevLogIn/DevLogin.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

export default class DevLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userType: '',
      seekerResponse: '',
      employerResponse: '',
    };
  }

  /**
   * Set global state with user data.
   *
   * @param {object} httpResponse - Axios http response.
   * @param {string} userType - Type of user
   */
  handleAxios(httpResponse, userType) {
    console.log(httpResponse, userType);
    localStorage.setItem('token', httpResponse.data.jwt);
    // RESET local state
    this.setState({
      username: '',
      password: '',
    });
    /**
     * SET GLOBAL STATE
     */
    this.props.setGS({
      userInfo: { ...httpResponse.data.user }, // Set user data.
      isSignedIn: true,
      userType,
      login: false,
    });
  }

  /**
   * Decide whcih type of user to login.
   *
   * @description Decide to which DB model a user belong.
   * If the user has an account in both model enable a feature
   * that allow the user to chose which model to use to login.
   *
   * @param {event} event - Even object
   */
  /* eslint-disable */
  handleLogin = async event => {
    event.preventDefault();

    const loginData = {
      email: this.state.email,
      password: this.state.password,
    };

    /**
     * Validate credential in both endpoints ('seeker' and 'employers')
     */
    let seekersResponse, employersResponse;

    try {
      seekersResponse = await axios.post('/api/login/seekers', loginData);
    } catch (err) {
      seekersResponse = { ...err.response };
    }

    try {
      employersResponse = await axios.post('/api/login/employers', loginData);
    } catch (err) {
      employersResponse = { ...err.response };
    }
    /**
     * If both users are in the DB set set global's 'login' state to 'conflic'
     * then save both http response in the local-state
     *
     * 'login' === 'conflict' will display a UI feature to resolve the conflict.
     */
    if (seekersResponse.status === 200 && employersResponse.status === 200) {
      console.log('CONFLICT');
      this.setState({
        userType: 'conflic',
        seekerResponse: seekersResponse,
        employerResponse: employersResponse,
      });
      this.props.setGS({ login: 'conflic' });
      return;
    }

    /**
     * If success loginin as a 'seeker', process response and 'return'
     */
    if (seekersResponse.status === 200) {
      console.log('seeker');
      this.handleAxios(seekersResponse, 'seeker');
      return;
    }

    /**
     * If success loginin as an 'employer', process response and 'return'
     */
    if (employersResponse.status === 200) {
      this.handleAxios(employersResponse, 'employer');
      return;
    }

    /**
     * If any Error reset password field
     */
    this.setState({ password: '' });
    alert('Error with your credential'); // TODO: Improve UX

    console.log({ 'HTTP login seekersResponse status': seekersResponse.status });
    console.log({ 'HTTP login employersResponse status': employersResponse.status });
  };
  /* eslint-enable */

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  /**
   * Set APP's global state according to user choise
   *
   * @param {string} userType - The type of profile to login.
   * @return {void}
   */
  resolveUserConflic = userType => {
    console.log();
    if (userType === 'seeker') {
      this.handleAxios(this.state.seekerResponse, userType);
    } else {
      this.handleAxios(this.state.employerResponse, userType);
    }

    // Reset local-state
    this.setState({
      email: '',
      password: '',
      userType: '',
      seekerResponse: '',
      employerResponse: '',
    });
  };

  render() {
    const { userType } = this.setState;

    const buttonConflic =
      this.props.getGS('login') !== 'conflic' ? (
        <Button variant="contained" color="primary" onClick={this.handleLogin}>
          Submit
        </Button>
      ) : (
        <div>
          <Typography variant="caption" gutterBottom align="center">
            Continue as:
          </Typography>
          <div className="resolve-conflict">
            <Chip
              onClick={this.resolveUserConflic.bind(this, 'seeker')}
              label="Developer"
              color="primary"
              variant="outlined"
            />
            <Chip
              onClick={this.resolveUserConflic.bind(this, 'employer')}
              label="Employer"
              color="primary"
              variant="outlined"
            />
          </div>
        </div>
      );

    return (
      <div data-aos="zoom-in-down" className="loginContainer">
        <div className="formConatiner">
          <Paper onChange={this.handleChange} className="paper">
            <div className="form2">
              <div>
                <Typography variant="display1" gutterBottom align="center">
                  Lambda Network
                </Typography>

                <Typography variant="headline" gutterBottom align="center">
                  Login
                </Typography>
              </div>
              <TextField id="email" label="Email" value={this.state.email} margin="normal" />

              <TextField
                id="password"
                type="password"
                label="password"
                value={this.state.password}
                margin="normal"
              />

              <br />
              {buttonConflic}
            </div>

            <div className="login">
              <Link to="/dev-signup">
                <Typography variant="caption" gutterBottom align="center">
                  Not Registered? Signup here!
                </Typography>
              </Link>
              <br />
              <Typography variant="caption" gutterBottom align="center">
                forgot password?
              </Typography>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}
