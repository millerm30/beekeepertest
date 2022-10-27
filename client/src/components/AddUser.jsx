import React from 'react'

const AddUser = ({addNewUser, firstName, setFirstName, lastName, setLastName}) => {

  return (
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
  );
}

export default AddUser