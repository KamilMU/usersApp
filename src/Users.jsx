import React from 'react';
import UserList from './UserList.jsx';
import styles from './Users.module.css';
import UserSearch from './UserSearch.jsx';

function Users({
  users,
  searchedValue,
  setSearchedValue,
  searchUsernameWithInput,
  sortUsersById
}) {
  return (
    <div className={styles.users}>
      <UserSearch
        searchedValue={searchedValue}
        setSearchedValue={setSearchedValue}
        searchUsernameWithInput={searchUsernameWithInput}
      />
      <UserList
        users={users}
        sortUsersById={sortUsersById}
      />
    </div>
  )
}

export default Users;
