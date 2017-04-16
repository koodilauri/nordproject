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
      // holds the value for sorting the rows
      // values: undefined, "ascend", "descend"
      sorted: {
        fullName: undefined,
        email: undefined,
        phone: undefined
      },
      newUser: {
        id: "",
        fullName: "",
        email:"",
        phone:""
      },
      users: [
        {id:0,fullName:"Jack Nicholson",email:"nicholson@gmail.com",phone:55592674},
        {id:1,fullName:"Marlon Brando",email:"brando@gmail.com",phone:55512643},
        {id:2,fullName:"Robert De Niro",email:"deniro@gmail.com",phone:55504673},
        {id:3,fullName:"Al Pacino",email:"pacino@gmail.com",phone:55537370},
        {id:4,fullName:"Daniel Day-Lewis",email:"day.lewis@gmail.com",phone:55513441},
        {id:5,fullName:"Dustin Hoffman",email:"hoffman@gmail.com",phone:55511456},
        {id:6,fullName:"Tom Hanks",email:"hanks@gmail.com",phone:55597664},
        {id:7,fullName:"Anthony Hopkins",email:"hopkins@gmail.com",phone:55509776},
        {id:8,fullName:"Paul Newman",email:"newman@gmail.com",phone:55563455},
        {id:9,fullName:"Denzel Washington",email:"washington@gmail.com",phone:55525255},
        {id:10,fullName:"Spencer Tracy",email:"tracy@gmail.com",phone:55551515},
        {id:11,fullName:"Laurence Olivier",email:"olivier@gmail.com",phone:55511335},
        {id:12,fullName:"Jack Lemmon",email:"lemmon@gmail.com",phone:55509763},
        {id:13,fullName:"Michael Caine",email:"caine@gmail.com",phone:55546734},
        {id:14,fullName:"James Stewart",email:"stewart@gmail.com",phone:55535635},
        {id:15,fullName:"Robin Williams",email:"williams@gmail.com",phone:55509090},
        {id:16,fullName:"Robert Duvall",email:"duvall@gmail.com",phone:55507777},
        {id:17,fullName:"Sean Penn",email:"penn@gmail.com",phone:55500443},
        {id:18,fullName:"Morgan Freeman",email:"freeman@gmail.com",phone:55532571},
        {id:19,fullName:"Jeff Bridges",email:"bridges@gmail.com",phone:55508218}]
    }
  }

  handleChange = (field, event) => {
    // if (field === 'fullName') {
      this.state.newUser[field] = event.target.value;
      this.setState({});
    // }
    console.log(this.state)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.state.newUser.id = this.state.users.length
    this.setState({
      users: [...this.state.users, this.state.newUser],
      newUser: {
        id:"",
        fullName:"",
        email:"",
        phone:""
      }
    })
}

  sortTable = (field, event) => {
    if(!this.state.sorted[field] || this.state.sorted[field] === "descend"){
      this.setState({
        sorted: Object.assign({}, this.state.sorted, { [field]: "ascend" }),
        users: this.state.users.sort(function(a,b){
        if(a[field] < b[field]) return -1;
        if(a[field] > b[field]) return 1;
        return 0;
        })
      })
    }else{
      this.setState({
        sorted: Object.assign({}, this.state.sorted, { [field]: "descend" }),
        users: this.state.users.sort(function(a,b){
        if(a[field] > b[field]) return -1;
        if(a[field] < b[field]) return 1;
        return 0;
        })
      })
    }

  }


  deleteUser = (index, event) => {
    const newUsers = [];
    this.setState({
      users: this.state.users.filter(function(el){
        return el.id !== index;
      })
    })
  }

  editUser = (index, event) => {
    document.getElementById(index).childNodes[3].childNodes[0].style.display="block";    
    document.getElementById(index).childNodes[3].childNodes[1].style.display="none";
    
    const fullName = document.getElementById(index).childNodes[0];
    const email = document.getElementById(index).childNodes[1];
    const phone = document.getElementById(index).childNodes[2];
    
    const fullName_data = fullName.innerHTML;
    const email_data = email.innerHTML;
    const phone_data = phone.innerHTML;

    fullName.innerHTML = "<td><input type='text' value='"+fullName_data+"'></td>";
    email.innerHTML = "<td><input type='text' value='"+email_data+"'></td>";
    phone.innerHTML = "<td><input type='text' value='"+phone_data+"'></td>";
  }

  saveUser = (index, event) => {
    document.getElementById(index).childNodes[3].childNodes[0].style.display="none";
    document.getElementById(index).childNodes[3].childNodes[1].style.display="block";
    
    
    const fullName = document.getElementById(index).childNodes[0].firstChild.value;
    const email = document.getElementById(index).childNodes[1].firstChild.value;
    const phone = document.getElementById(index).childNodes[2].firstChild.value;

    const row1 = document.getElementById(index).childNodes[0];
    const row2 = document.getElementById(index).childNodes[1];
    const row3 = document.getElementById(index).childNodes[2];
    
    row1.innerHTML = "<td class='fullName'>"+fullName+"</td>";
    row2.innerHTML = "<td class='email'>"+email+"</td>";
    row3.innerHTML = "<td class='phone'>"+phone+"</td>";

    this.state.users[index].fullName = fullName;
    this.state.users[index].email = email;
    this.state.users[index].phone = phone;    
    this.setState({});
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
        <table id="participants">
          <thead>
            <tr>
              <td onClick={this.sortTable.bind(this, 'fullName')}>Name</td>
              <td onClick={this.sortTable.bind(this, 'email')}>E-mail</td>
              <td onClick={this.sortTable.bind(this, 'phone')}>Phone</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            { users.map((user, index) => 
           <tr id={user.id}>
            <td className="fullName">{ user.fullName }</td>
            <td className="email">{ user.email }</td>
            <td className="phone">{ user.phone }</td>
            <td><button onClick={this.saveUser.bind(this, user.id)}>save</button>
            <button onClick={this.editUser.bind(this, user.id)}>edit</button>
            <button onClick={this.deleteUser.bind(this, user.id)}>delete</button></td>            
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
