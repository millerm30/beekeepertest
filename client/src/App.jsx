import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import AddUser from './components/AddUser';
import Spinner from './components/Loading';
import TableData from './components/TableData';

const App = () => {
  const [ users, setUsers ] = useState([]);
  const [ newUser, setNewUser ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    axios
      .get("https://beekeepertest.herokuapp.com/users")
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newUser]);

  const addNewUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("https://beekeepertest.herokuapp.com/users", {
        first_name: firstName,
        last_name: lastName,
      })
      .then((res) => {
        setNewUser(newUser + 1);
        console.log(firstName, lastName);
        setFirstName("");
        setLastName("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteUser = (id) => {
    setIsLoading(true);
    axios
      .delete(`https://beekeepertest.herokuapp.com/users/${id}`)
      .then((res) => {
        setNewUser(newUser - 1);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-3/4 ml-auto mr-auto mt-4 md:w-1/2 lg:w-1/2">
      <Header />
      <AddUser
        addNewUser={addNewUser}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
      />
      {!isLoading ? (
        <>
          {!users.length <= 0 ? (
            <TableData users={users} deleteUser={deleteUser} />
          ) : (
            <h1 className="text-center text-2xl font-bold mt-4">
              No Users Found!
            </h1>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default App