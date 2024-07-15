import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

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
      <div className="grid grid-cols-3 gap-8 text-white text-2xl underline font-semibold">
        {exercises.map((exercise, index) => (
          <button className='transition-all duration-300 ease-in-out transform hover:translate-y-1 hover:text-orange-500 hover:underline hover:decoration-orange-500' key={index}>{exercise}</button>
        ))}
      </div>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
            area: true,
          },
        ]}
        width={500}
        height={300}
      />
    </div>
  );
};

export default Lift;
