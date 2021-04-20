import React, { useState, useEffect } from 'react'
import UserList from './UserList.jsx';
import styles from './Users.module.css';

export default function Users() {
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

      console.log(data);
      setUsers(data);
      setInitialUsers(data);
    }

    fetchData();
  }, []);

  function sortUsersById() {
    setUsers(users.sort((a, b) => a.id - b.id))
    // console.log(users, 'users')
    // console.log(users.sort((previousID, currentID) => previousID - currentID), 'sorted')
  }

  function searchUsernameWithInput() {
    console.log(searchedValue)
    if (searchedValue.length > 1) {
      setUsers(users.filter(user => user.username.toLowerCase().includes(searchedValue.toLowerCase())
      ))
    } else {
      setUsers(initialUsers)
    }
    console.log(users)
  }

  return (
    <div className={styles.users}>
      <input
        placeholder="Search user..."
        value={searchedValue}
        onChange={e => { setSearchedValue(e.target.value); searchUsernameWithInput() }}
      />
      <UserList
        users={users}
        sortUsersById={sortUsersById}
      />
    </div>
  )
}
