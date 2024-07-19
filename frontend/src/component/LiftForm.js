import React, { useState } from 'react';

const NumberForm = ({activeSection}) => {
  const [value, setValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value < 0 || value > 1000) {
      alert('Please enter a number between 0 and 1000.');
    } else {
      alert(`Form submitted successfully! ${activeSection}`);
      // Perform form submission logic here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className='mb-10 animate-text bg-gradient-to-r from-teal-500 via-orange-600 to-orange-500 bg-clip-text text-transparent text-7xl font-black'>{activeSection}</h1>
      <div className="flex flex-row gap-5">
        <div className="relative">
          <input
            type="text"
            min="0"
            max="1000"
            id="pounds"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-white bg-inherit dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="pounds"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Pounds
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-sm text-sm w-full sm:w-auto px-3 py-1.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default NumberForm;
