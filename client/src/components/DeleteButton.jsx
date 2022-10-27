import React from 'react';
import { TiDelete } from "react-icons/ti";

const DeleteButton = ({deleteUser, user}) => {
  return (
    <TiDelete
      type='submit'
      onClick={() => deleteUser(user.user_id)}
      className="text-red-500 cursor-pointer hover:text-red-700 text-xl"
    >
    </TiDelete>
  );
}

export default DeleteButton