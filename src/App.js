import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function generateUserValues() {
  let users = []
  for (let i =0;i<20;i++){
    users.push({
      id: i,
      name: "a"+i,
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
      users: generateUserValues()
    }
  }

  renderCreateUser(){
    return(
      <form>
        <div>
          <div>
            <label>Name</label>
            <input/>
          </div>
          <div>
            <label>E-mail</label>
            <input/>
          </div>          
          <div>
            <label>Phone</label>
            <input/>
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
            </tr>
          </thead>
          <tbody>
            { users.map(user => 
           <tr>
            <td>{ user.name }</td>
            <td>{ user.email }</td>
            <td>{ user.phone }</td>            
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
