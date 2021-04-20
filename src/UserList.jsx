import React from 'react';
import styles from './UserList.module.css';

export default function UserList({ users, sortUsersById }) {
  return (
    <table className={styles.userList}>
      <tbody>
        <tr>
          <th
            onClick={sortUsersById}
            className={styles.idTittle}>
            Id
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
