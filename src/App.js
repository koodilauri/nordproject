import React, { Component } from 'react';
// import { Field } from 'redux-form';

import logo from './logo.svg';
import './App.css';

function generateUserValues() {
  let users = []
  for (let i =0;i<20;i++){
    users.push({
      id: i,
      fullName: "a"+i,
      email: "a"+i+"@a.fi",
      phone: "00"+i
    })
  }
  return users;
}

class App extends Component {

  constructor(){
    super();
    this.state={
      newUser: {
        id: "",
        fullName: "heu",
        email:"",
        phone:""
      },
      users: generateUserValues()
    }
  }

  handleChange = (field, event) => {
    // if (field === 'fullName') {
      this.state.newUser[field] = event.target.value;
      this.setState({});
    // }
    console.log(this.state.newUser)
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  renderCreateUser(){
    const {newUser} = this.state;
    return(
      <form onSubmit={this.handleSubmit}>
        <div>
          <div>
            <input
              name="fullName"
              placeholder="Full name"
              value={newUser.fullName}
              onChange={this.handleChange.bind(this, 'fullName')}
            />
          </div>
          <div>
            <input
              name="email"
              placeholder="E-mail address"
              value={newUser.email}
              onChange={this.handleChange.bind(this, 'email')}
            />
          </div>          
          <div>
            <input
              name="phone"
              placeholder="Phone number"
              value={newUser.phone}
              onChange={this.handleChange.bind(this, 'phone')}
            />
          </div>
        </div>
        <button type="submit">Add new</button>
      </form>
    )
  }

  renderUserList() {
    // const users = this.state.users;
    const { users } = this.state;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>E-mail</td>
              <td>Phone</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            { users.map(user => 
           <tr>
            <td>{ user.name }</td>
            <td>{ user.email }</td>
            <td>{ user.phone }</td>
            <td>assdsf</td>            
          </tr>
        )}
          </tbody>
        </table>

      </div>
    )
  }

  render() {
    console.log(this.state.users)
    return (
      <div className="App">
        <h1>List of participants</h1>
        {this.renderCreateUser()}
        {this.renderUserList()}
      </div>
    );
  }
}

export default App;
