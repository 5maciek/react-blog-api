import React, { Component } from 'react';
import Posts from './Posts';

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.timeout = 0;
    this.state = {
      users: null,
      currentUser: null,
      isOpenEditUserForm: false,
      inputNameValue: null,
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((response) =>
        this.setState({
          users: response,
        })
      )
      .catch((error) => console.log(error));
  }

  fetchUser(value) {
    const fetchValue = encodeURIComponent(value);
    fetch(`https://jsonplaceholder.typicode.com/users?name=${fetchValue}`)
      .then((response) => response.json())
      .then((response) =>
        this.setState({
          currentUser: response,
        })
      )
      .catch((error) => console.log(error));
  }

  fetchChangeUserName = (userId, userName) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: userName,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));

    this.setState({
      inputNameValue: '',
      isOpenEditUserForm: false,
    });
  };

  handleEditUser = () => {
    if (this.state.isOpenEditUserForm) {
      this.fetchChangeUserName(
        this.state.currentUser[0].id,
        this.state.inputNameValue
      );
    } else if (this.state.currentUser.length > 0) {
      this.setState({
        isOpenEditUserForm: true,
        inputNameValue: this.state.currentUser[0].name,
      });
    } else {
      alert("We haven't found this user...");
    }
  };

  handleEditUserInput = (event) => {
    this.setState({
      inputNameValue: event.target.value,
    });
  };

  handleCancelChanges = () => {
    this.setState({
      isOpenEditUserForm: false,
    });
  };

  handleSearch = (event) => {
    const eventValue = event.target.value;
    if (this.timeout) clearTimeout(this.timeout);
    // @ts-ignore
    this.timeout = setTimeout(() => {
      if (eventValue) {
        this.fetchUser(eventValue);
      }
    }, 500);
  };

  render() {
    const {
      users,
      currentUser,
      isOpenEditUserForm,
      inputNameValue,
    } = this.state;
    return (
      <>
        <div className="users">
          {isOpenEditUserForm ? (
            <form>
              <label htmlFor="users">
                New user name:
                <input
                  name="edutUserName"
                  type="text"
                  value={inputNameValue}
                  onChange={this.handleEditUserInput}
                />
              </label>
            </form>
          ) : null}
          {!isOpenEditUserForm ? (
            <label htmlFor="users">
              Select user:
              <input
                list="users"
                name="users"
                type="text"
                onChange={this.handleSearch}
              />
            </label>
          ) : null}
          <button onClick={this.handleEditUser}>
            {isOpenEditUserForm ? 'Change name' : 'Edit  user'}
          </button>
          {isOpenEditUserForm ? (
            <button onClick={this.handleCancelChanges}>Cancel</button>
          ) : null}
          <datalist id="users">
            {users
              ? users.map((user) => (
                  <option key={user.id} value={`${user.name}`}></option>
                ))
              : null}
          </datalist>
        </div>
        <Posts currentUser={currentUser} />
      </>
    );
  }
}
