import React from 'react';
import DeleteButton from './DeleteButton';

const TableData = ({users, deleteUser}) => {
  return (
    <table className="w-full mt-4">
      <thead className="border-b-2 border-blue-500">
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.user_id} className="text-center">
            <td>{user.user_id}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td className="flex justify-center">
              <DeleteButton
                deleteUser={deleteUser}
                user={user}
                title="Delete"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableData