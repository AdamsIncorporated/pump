import React from 'react';

const Lift = () => {
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

  return (
    <div>
      <h2>Common Exercises</h2>
      <div className="grid grid-cols-3 gap-8 text-white text-2xl underline font-semibold">
        {exercises.map((exercise, index) => (
          <button className='transition-all duration-300 ease-in-out transform hover:translate-y-1 hover:text-blue-500' key={index}>{exercise}</button>
        ))}
      </div>
    </div>
  );
};

export default Lift;
