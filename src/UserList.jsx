import React from 'react';
import styles from './UserList.module.css';

function UserList({ users, sortUsersById }) {
  return (
    <table className={styles.userList}>
      <tbody>
        <tr>
          <th className={styles.idTittle}>
            Id
            <input
              type="checkbox"
              onClick={(e) => {
                sortUsersById(e.target.checked);
              }}
            />
          </th>
          <th>Username</th>
        </tr>
        {users
          .map(user => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export default UserList;
