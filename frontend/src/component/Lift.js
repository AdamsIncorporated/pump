import React, { useState } from 'react';
import LiftForm from './LiftForm';
import Table from './Table';

const Lift = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const exercises = [
    'Squat',
    'Deadlift',
    'Bench Press',
    'Dumbell Press',
    'Overhead Press',
    'Leg Press',
    'Leg Extension',
    'Plank',
    'T-bar Row',
  ];

  const handleClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const shouldHideButtons = activeIndex !== null;
  const activeSection = activeIndex !== null ? exercises[activeIndex] : null;

  return (
    <div className='m-5'>
      <div className="grid grid-cols-3 gap-8 text-white text-2xl underline font-semibold">
        {exercises.map((exercise, index) => {
          const buttonClassName = shouldHideButtons ? 'hidden' : 'opacity-100';

          return (
            <button
              key={index}
              className={`my-10 transition-opacity transition-transform duration-500 ease-in-out transform ${buttonClassName} hover:translate-y-1 hover:text-orange-500 hover:underline hover:decoration-orange-500`}
              onClick={() => handleClick(index)}
            >
              {exercise}
            </button>
          );
        })}
      </div>
      <div>
        {activeIndex !== null && (
          <>
            <LiftForm activeSection={activeSection} />
            <Table activeSection={activeSection} />
          </>
        )}
      </div>
    </div>
  );
};

export default Lift;
