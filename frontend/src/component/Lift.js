import React, { useState } from 'react';
import LiftForm from './LiftForm'

const Lift = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const exercises = [
    'Squats',
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

  const sortedExercises = activeIndex !== null
    ? [exercises[activeIndex], ...exercises.filter((_, index) => index !== activeIndex)]
    : exercises;

  return (
    <div>
      <div className="grid grid-cols-3 gap-8 text-white text-2xl underline font-semibold">
        {sortedExercises.map((exercise, index) => {
          const actualIndex = activeIndex !== null ? (index === 0 ? activeIndex : exercises.findIndex(e => e === exercise)) : index;
          return (
            <button
              key={actualIndex}
              className={`transition-opacity transition-transform duration-500 ease-in-out transform ${activeIndex !== null && activeIndex !== actualIndex ? 'opacity-0 pointer-events-none hidden' : 'opacity-100'
                } hover:translate-y-1 hover:text-orange-500 hover:underline hover:decoration-orange-500`}
              onClick={() => handleClick(actualIndex)}
            >
              {exercise}
            </button>
          );
        })}
        {activeIndex !== null && <LiftForm />}
      </div>
    </div>
  );
};

export default Lift;
