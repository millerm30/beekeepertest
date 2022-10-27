import React from 'react';

const AddButton = ({title}) => {
  return (
    <button
      type="submit"
      className="w-1/3 bg-blue-500 text-white rounded-md p-2 mt-4 md:w-1/4 lg:w-1/4"
    >
      {title}
    </button>
  );
}

export default AddButton