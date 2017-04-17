import React, { Component } from 'react';
import { Field } from 'redux-form';

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
      errorMessage: "",
      editingUserId: -1,
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
      editUser: {
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

  handleChange = (field, type, event) => {
    const newValue = event.target.value;
    const patt1 = /^([a-z']+(-| )?)+$/i;
    const patt2 = /[^a-zA-Z@.0-9]\s/;
    const patt3 = /[^0-9]/;
    if(field === "fullName" && patt1.test(newValue)){
      if (type === 'add') {
        this.state.newUser[field] = event.target.value;
        this.setState({});
      }
      if(type === 'edit') {
        this.state.editUser[field] = event.target.value;
        this.setState({});
      }
    } if(field === "email" && !patt2.test(newValue)){
      if (type === 'add') {
        this.state.newUser[field] = event.target.value;
        this.setState({});
      }
      if(type === 'edit') {
        this.state.editUser[field] = event.target.value;
        this.setState({});
      }
    } if(field === "phone" && !patt3.test(newValue)){
      if (type === 'add') {
        this.state.newUser[field] = event.target.value;
        this.setState({});
      }
      if(type === 'edit') {
        this.state.editUser[field] = event.target.value;
        this.setState({});
      }
    }  
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {newUser} = this.state;
    if(this.validateInput(newUser)){
      newUser.id = this.state.users.length;
      this.setState({
        users: [...this.state.users, newUser],
        newUser: {
          id:"",
          fullName:"",
          email:"",
          phone:""
        },
      })
    }
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

  editUser = (user, event) => {
    this.setState({
      editingUserId: user.id,
      editUser: Object.assign({}, user),
      errorMessage: ""
    })
  }

  saveUser = (user, event) => {
    if (this.validateInput(this.state.editUser)){
      this.state.editingUserId = -1;    
      const index = this.state.users.findIndex(function(el){
          return el.id === user.id;
        });
      this.state.users[index] = Object.assign({}, this.state.editUser);
      this.setState({})
  }
  }

  validateInput = (user) => {
        // const {newUser} = this.state;
    const patt1 = /^([a-z']+(-| )?)+$/i;
    const patt2 = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const patt3 = /[^0-9]/;
    if(!patt1.test(user.fullName)){
      this.state.errorMessage = "Invalid name"
      this.setState({})
      console.log(this.state)      
      return false
    } if (!patt2.test(user.email)){
      this.state.errorMessage = "Invalid email address"
      this.setState({})      
      console.log(this.state)
      return false
    } if (patt3.test(user.phone)){
      this.state.errorMessage = "Invalid phone number";
      this.setState({})
      console.log(this.state)
      return false
    } 
      this.state.errorMessage = "";
      this.setState({})
      return true
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
              onChange={this.handleChange.bind(this, 'fullName', 'add')}
            />
          </div>
          <div>
            <input
              name="email"
              placeholder="E-mail address"
              value={newUser.email}
              onChange={this.handleChange.bind(this, 'email', 'add')}
            />
          </div>          
          <div>
            <input
              name="phone"
              placeholder="Phone number"
              value={newUser.phone}
              onChange={this.handleChange.bind(this, 'phone', 'add')}
            />
          </div>
        </div>
        <button type="submit" className="nord-button">Add new</button>
      </form>
    )
  }

  renderUser(user){
    return (            
      <tr id={user.id}>
        <td className="fullName">{ user.fullName }</td>
        <td className="email">{ user.email }</td>
        <td className="phone">{ user.phone }</td>
        <td>
          <button onClick={this.editUser.bind(this, user)}>edit</button>
          <button onClick={this.deleteUser.bind(this, user.id)}>delete</button>
        </td>  
      </tr>
      
    )
  }

  renderEditUser(user){
    return (            
      <tr id={user.id}>
        <td className="fullName">
          <input 
          type='text' 
          value={ this.state.editUser.fullName } 
          onChange={this.handleChange.bind(this, 'fullName', 'edit')}/>
        </td>
        <td className="email">
          <input 
          type='text' 
          value={ this.state.editUser.email }
          onChange={this.handleChange.bind(this, 'email', 'edit')}/>
        </td>
        <td className="phone">
          <input 
          type='text' 
          value={ this.state.editUser.phone }
          onChange={this.handleChange.bind(this, 'phone', 'edit')}/>
        </td>
        <td>
          <button onClick={this.saveUser.bind(this, user)}>save</button>
          <button onClick={this.deleteUser.bind(this, user.id)}>delete</button></td>  
      </tr>
      
    )
  }

  renderUserList() {
    // const users = this.state.users;
    const { users, editingUserId } = this.state;
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
            { users.map( (user, index) => {
              if(editingUserId !== user.id){
                return this.renderUser(user)  
                }else{
                return this.renderEditUser(user)               
                }
              }
            
            )}
          </tbody>
        </table>

      </div>
    )
  }

  renderErrorMessage(){
    return(
      <div>
        <p>
          {this.state.errorMessage}
        </p>
      </div>
    )
  }

  render() {
    console.log(this.state.users)
    return (
      <div className="main-container">
        <h1>List of participants</h1>
        {this.renderErrorMessage()}
        {this.renderCreateUser()}
        {this.renderUserList()}
      </div>
    );
  }
}

export default App;
