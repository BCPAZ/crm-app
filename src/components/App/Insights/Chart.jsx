import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ComparisonBarChart = ({data}) => {
  const [chartKey, setChartKey] = useState(0);

  const {user} = useSelector(state => state.auth)

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label : user?.company?.name,
        backgroundColor: '#FFAB00',
        hoverBackgroundColor: '#FFBB20',
        data: Object.values(data),
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0
        },
      },
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        min : 0,
        max: 100,
        ticks : {
          stepSize : 20,
        }
      }
    }
  };

  useEffect(() => {
    return () => {
      setChartKey(chartKey + 1);
    };
  }, []);

  if (Object.keys(data).length === 0) return null; 

  return (
    <div className='w-full'>
      <Bar key={chartKey} data={chartData} options={options} />
    </div>
  );
};

export default ComparisonBarChart;
