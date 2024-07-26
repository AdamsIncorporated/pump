import React, { useState } from 'react';

const LiftForm = ({ activeSection }) => {
  const [value, setValue] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const numericValue = parseFloat(value);

    if (numericValue > 0 && numericValue < 1000) {
      try {
        const response = await fetch("/api/create", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            exercise: activeSection,
            pounds: numericValue
          }),
        });

        const result = await response.json();
        console.log(result);

        setValue('');

      } catch (error) {
        console.error("Error inserting data:", error);
      }
    } else {
      alert('Please enter a value between 0 and 1000.');
    }
  };

  const handleBackClick = () => {
    window.location.href = '/';
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col'>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          onClick={handleBackClick}
          className="mb-2 text-white size-4 transition-colors duration-300 ease-in-out transform hover:text-orange-500 cursor-pointer">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
        </svg>
        <h1
          className='mb-10 animate-text bg-gradient-to-r from-teal-500 via-orange-600 to-orange-500 bg-clip-text text-transparent text-7xl font-black'>
          {activeSection}
        </h1>
      </div>
      <div className="flex flex-row gap-5 align-items-bottom">
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
          className="w-8 h-8 text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-sm flex items-center justify-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
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

export default LiftForm;
