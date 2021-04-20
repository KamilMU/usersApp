import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router';
import Login from './Login.jsx';
import Users from './Users.jsx';
import styles from './App.module.css';

function App({ history }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [initialUsers, setInitialUsers] = useState([]);
  const [searchedValue, setSearchedValue] = useState('');

  useEffect(() => {
    async function fetchData() {

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Token " + localStorage.getItem("token"));

      let response = await fetch('http://agile-garden-50413.herokuapp.com/api/users', {
        method: 'GET',
        headers: myHeaders
      })
      let data = await response.json();

      setUsers(data);
      setInitialUsers(data);
    }

    fetchData();
  }, []);


  async function loginUser() {
    axios.post('https://agile-garden-50413.herokuapp.com/api/token/login/', {
      username: username,
      password: password
    })
      .then(async (response) => {
        localStorage.setItem("token", response.data.auth_token);
        history.push('/users');
      })
  }

  function sortUsersById(checked) {
    if (checked) {
      const sorted = [...users].sort((a, b) => (a.id > b.id ? -1 : 1));

      setUsers(sorted);
    } else {
      setUsers(initialUsers);
    }
  }

  function searchUsernameWithInput() {
    if (searchedValue.length > 1) {
      setUsers(users.filter(user => {
        return user.username.toLowerCase().includes(searchedValue.toLowerCase())
      }));
    } else {
      setUsers(initialUsers);
    }
    console.log(users);
  }

  return (
    <div className={styles.app}>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Login
              loginUser={loginUser}
              setUsername={setUsername}
              setPassword={setPassword}
              username={username}
              password={password}
            />)}
        />
        <Route
          exact
          path="/users"
          render={() => (
            <Users
              users={users}
              searchedValue={searchedValue}
              setSearchedValue={setSearchedValue}
              searchUsernameWithInput={searchUsernameWithInput}
              sortUsersById={sortUsersById}
            />
          )}
        />)
        <Route
          exact
          path="*"
          render={() => <div>Page doesnt exist</div>}
        />
      </Switch>
    </div>
  );
}

export default withRouter(App);