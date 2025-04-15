/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

import axios from "axios";
import './App.css'

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 0,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  // Make async API calls to retrieve credits and debits from remote website
  async componentDidMount() {
    
    let linkToCredits = 'https://johnnylaicode.github.io/api/credits.json';
    let linkToDebits = 'https://johnnylaicode.github.io/api/debits.json';

    // CREDITS

    // Await for promise (completion) returned from API call
    try {  // Accept success response as array of JSON objects (credits)
      let response = await axios.get(linkToCredits);
      console.log(response);  // Print out response
      const creditList = response.data;  // Array of credits
      const creditAmount = creditList.reduce((total, credit) => total + credit.amount, 0);  // Calculate total credit amount
      this.setState({creditList, accountBalance: this.state.accountBalance + creditAmount});  // Update creditList and accountBalance states
      console.log(this.state.accountBalance);
    }
    catch (error) {
      console.error('Error fetching credits', error);  // Print out errors at console when there is an error response
      if (error.response) {
        // The request was made, and the server responded with error message and status code.
        console.log(error.response.data);  // Print out error message (e.g., Not Found)
        console.log(error.response.status);  // Print out error status code (e.g., 404)
      }
    }

    // DEBITS

    // Await for promise (completion) returned from API call
    try {  // Accept success response as array of JSON objects (credits)
      let response = await axios.get(linkToDebits);
      console.log(response);  // Print out response
      const debitList = response.data;  // Array of debits
      const debitAmount = debitList.reduce((total, debit) => total + debit.amount, 0);  // Calculate total debit amount
      this.setState({debitList, accountBalance: this.state.accountBalance - debitAmount});  // Update debitList and accountBalance states
      console.log(this.state.accountBalance);
    }
    catch (error) {
      console.error('Error fetching credits', error);  // Print out errors at console when there is an error response
      if (error.response) {
        // The request was made, and the server responded with error message and status code.
        console.log(error.response.data);  // Print out error message (e.g., Not Found)
        console.log(error.response.status);  // Print out error status code (e.g., 404)
      }
    }

  }

  addDebit = (newDebit) => {
    const { debitList, accountBalance } = this.state;
    const newDebitList = [...debitList, newDebit];
    const newBalance = accountBalance - newDebit.amount;
    this.setState({debitList: newDebitList, accountBalance: newBalance});
  };
  
  addCredit = (newCredit) => {
    const { creditList, accountBalance } = this.state;
    const newCreditList = [...creditList, newCredit];
    const newBalance = accountBalance + newCredit.amount;
    this.setState({creditList: newCreditList, accountBalance: newBalance});
  };

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} addCredit={this.addCredit} accountBalance={this.state.accountBalance} />) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} addDebit={this.addDebit} accountBalance={this.state.accountBalance} />) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/cs39548-assignment-03">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;
