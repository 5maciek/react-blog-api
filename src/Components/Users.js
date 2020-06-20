import React, { Component } from 'react';

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.timeout = 0;
    this.state = {
      users: null,
      currentUser: null,
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
    const { users } = this.state;
    return (
      <div className="users">
        <label htmlFor="users">
          Select user:{' '}
          <input
            list="users"
            name="users"
            type="text"
            onChange={this.handleSearch}
          />
        </label>
        <datalist id="users">
          {users
            ? users.map((user) => (
                <option key={user.id} value={`${user.name}`}></option>
              ))
            : null}
        </datalist>
      </div>
    );
  }
}
