import React, { PureComponent } from 'react'
import './chart.css';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
      name: '09/2021',
      "monthly revenue": 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: '10/2021',
      "monthly revenue": 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: '11/2021',
      "monthly revenue": 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: '12/2021',
      "monthly revenue": 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: '01/2022',
      "monthly revenue": 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: '02/2022',
      "monthly revenue": 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: '03/2022',
      "monthly revenue": 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

function Chart() {
  return (
    <div className='chart'>
        <h3 className='chartTitle'>Revenue Analytics</h3>
        <ResponsiveContainer width='100%' aspect={4/1}>
            <LineChart data={data}>
                <XAxis dataKey="name" stroke='#5550bd'/>
                <Line type="monotone" dataKey="monthly revenue" stroke="#5550bd" />
                <Tooltip/>
                <CartesianGrid stroke='#e0dfef' strokeDasharray="5 5"/>
            </LineChart>
        </ResponsiveContainer>

    </div>
  )
}

export default Chart
