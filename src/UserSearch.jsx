import React from 'react';
import styles from './UserSearch.module.css';

function UserSearch({
  searchedValue,
  setSearchedValue,
  searchUsernameWithInput }) {
  return (
    <>
      <input
        placeholder="Search user..."
        className={styles.searchInput}
        value={searchedValue}
        onChange={e => {
          setSearchedValue(e.target.value);
          searchUsernameWithInput();
        }}
      />
    </>
  )
}

export default UserSearch;
