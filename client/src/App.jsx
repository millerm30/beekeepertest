import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TiDelete } from 'react-icons/ti';

const App = () => {
  const [ users, setUsers ] = useState([]);
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ newUser, setNewUser ] = useState(0);

  useEffect(() => {
    axios
      .get('http://localhost:3010/users')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.log(err);
      }
    );
  }, [newUser] );

  const addNewUser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3010/users", {
        first_name: firstName,
        last_name: lastName,
      })
      .then((res) => {
        setNewUser(newUser + 1);
        console.log(firstName, lastName);
      }
    );
    setFirstName("");
    setLastName("");
  };

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:3010/users/${id}`)
      .then((res) => {
        setNewUser(newUser - 1);
      }
    );
  };

  return (
    <div className="w-3/4 ml-auto mr-auto mt-4 md:w-1/2 lg:w-1/2">
      <h1 className="text-center text-2xl font-bold">User Database Testing</h1>
      <form
        onSubmit={addNewUser}
        className="flex flex-col bg-white p-6 rounded-lg border-2 shadow-md my-6"
      >
        <label htmlFor="first_name" className="text-xl font-bold mt-4">
          First Name:
        </label>
        <input
          type="text"
          name="first_name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border-2 border-gray-300 rounded-md p-2"
          required
          placeholder="Please enter your first name..."
        />
        <label htmlFor="last_name" className="text-xl font-bold mt-4">
          Last Name:
        </label>
        <input
          type="test"
          name="last_name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border-2 border-gray-300 rounded-md p-2"
          required
          placeholder="Please enter your last name..."
        />
        <button
          type="submit"
          className="w-1/3 bg-blue-500 text-white rounded-md p-2 mt-4 md:w-1/4 lg:w-1/4"
        >
          Add User
        </button>
      </form>
      {!users.length <= 0 ? (
      <table className="w-full mt-4">
        <thead className="border-b-2 border-blue-500">
          <tr>
            <th>
              ID
            </th>
            <th>
              First Name
            </th>
            <th>
              Last Name
            </th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.user_id}
              className="text-center"
            >
              <td>{user.user_id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td className='flex justify-center'>
                <TiDelete 
                  onClick={() => deleteUser(user.user_id)}
                  className="text-red-500 cursor-pointer hover:text-red-700 text-xl"
                >
                  Delete 
                </TiDelete>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      ) : (
        <h1 className="text-center text-2xl font-bold mt-4">No Users Found!</h1>
      )}
    </div>
  );
}

export default App