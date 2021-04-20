import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router';
import Login from './Login.jsx';
import Users from './Users.jsx';
import styles from './App.module.css';

function App({ history }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  // useEffect(() => {
  //   login()
  // }, [login])

  // function login() {
  //   setIsLoggedIn(true);
  // }

  async function loginUser() {

    axios.post('https://agile-garden-50413.herokuapp.com/api/token/login/', {
      username: username,
      password: password
    }
    )
      .then(async (response) => {
        localStorage.setItem("token", response.data.auth_token);
        history.push('/users')
        console.log(response, 'response');
        console.log(isLoggedIn, 'logged in!');
      })
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
          render={() => <Users />}
        />)
        <Route exact path="*" render={() => <div>Page doesnt exist</div>} />
      </Switch>
    </div>
  );
}

export default withRouter(App);