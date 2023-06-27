import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DataItem {
  user: string;
  time: number | string;
  heart_rate: number;
  check: boolean;
}

const Graph: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {



    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbyNZj6-w094hjblYzDMz4DlXM8g8Xrz8Hk7lRitKe4TdDGgFbdeuXN55bnhejGNo-4S/exec'
        );
        const result = await response.json() as { data: DataItem[] };
        const newData = result.data.filter(item => !item.check);
        setData((prevData) => prevData.concat(newData));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // 初回のデータ取得
    fetchData();

    // 1秒ごとにデータを更新
    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    // コンポーネントがアンマウントされた時にクリーンアップ
    return () => {
      clearInterval(interval);
    };
  }, []);

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '麻雀における心拍数の計測',
      },
    },
    scales: {
      y: {
        min: 65,
        max: 90,
      },
    },
  };

  const data1 = {
    labels: data.filter((item) => item.user === 'A').filter((item) => item.heart_rate > 10).slice(-120).map((item) => item.time),
    datasets: [
      {
        label: 'User A',
        data: data.filter((item) => item.user === 'A').slice(-120).map((item) => item.heart_rate),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const data2 = {
    labels: data.filter((item) => item.user === 'B').filter((item) => item.heart_rate > 10).slice(-120).map((item) => item.time),
    datasets: [
      {
        label: 'User B',
        data: data.filter((item) => item.user === 'B').slice(-120).map((item) => item.heart_rate),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const data3 = {
    labels: data.filter((item) => item.user === 'C').filter((item) => item.heart_rate > 10).slice(-120).map((item) => item.time),
    datasets: [
      {
        label: 'User C',
        data: data.filter((item) => item.user === 'C').slice(-120).map((item) => item.heart_rate),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const data4 = {
    labels: data.filter((item) => item.user === 'D').filter((item) => item.heart_rate > 10).slice(-120).map((item) => item.time),
    datasets: [
      {
        label: 'User D',
        data: data.filter((item) => item.user === 'D').slice(-120).map((item) => item.heart_rate),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  console.log(data);

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '20px' }}>
        <div>
          <Line options={options} data={data1} />
        </div>
        <div>
          <Line options={options} data={data2} />
        </div>
        <div>
          <Line options={options} data={data3} />
        </div>
        <div>
          <Line options={options} data={data4} />
        </div>
      </div>
    </>
  );
};

export default Graph;
