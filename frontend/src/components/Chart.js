import { LineChart } from '@mui/x-charts/LineChart';


export default function Chart({ data }) {
  let tooltip = true;
  let yaxis = [];
  let xaxis = [];

  // Check if data is provided
  if (data) {
    yaxis = data.map(item => item.pounds);
    xaxis = data.map(item => {
      const date = new Date(item.create_date);
      return date;
    });
  } else {
    tooltip = false;
  }

  return (
    <div className='overflow-auto'>
      <LineChart
        sx={{
          //change left yAxis label styles
          "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
            strokeWidth: 0.8,
            fill: "#ffffff",
            transform: "translateX(-10px)"
          },
          // change bottom label styles
          "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
            strokeWidth: 0.5,
            fill: "#ffffff",
            transform: "translateY(10px)"
          },
          // bottomAxis Line Styles
          "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
            stroke: "#ffffff",
            strokeWidth: 1
          },
          // leftAxis Line Styles
          "& .MuiChartsAxis-left .MuiChartsAxis-line": {
            stroke: "#ffffff",
            strokeWidth: 1
          },
          // change tick marks color (add these styles)
          "& .MuiChartsAxis-left .MuiChartsAxis-tick": {
            stroke: "#ffffff",
            strokeWidth: 1
          },
          // change tick marks color (add these styles)
          "& .MuiChartsAxis-bottom .MuiChartsAxis-tick": {
            stroke: "#ffffff",
            strokeWidth: 1
          },
          // Style for "No data to display" message
          "& .MuiChartsNoData": {
            color: "#ffffff",
            fontSize: "16px",
            textAlign: "center",
            lineHeight: "300px",
          },
        }}
        xAxis={[{
          scaleType: 'time',
          data: xaxis
        }]}
        series={[
          {
            curve: 'step',
            data: yaxis,
            area: false,
            color: '#f97316'
          },
        ]}
        width={500}
        height={200}
        tooltip={tooltip}
      />
    </div>
  )
};