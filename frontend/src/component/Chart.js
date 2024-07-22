import { LineChart } from '@mui/x-charts/LineChart';


export default function Chart({ data }) {
  const xaxis = data.map(item => item.pounds);
  const yaxis = data.map(item => {
    const date = new Date(item.create_date);

    return date.toLocaleDateString();
  });



  return (
    <div className='overflow-auto'>
      <LineChart
        xAxis={[{ data: xaxis }]}
        series={[
          {
            data: yaxis,
            area: true,
          },
        ]}
        width={500}
        height={300}
      />
    </div>
  )
};