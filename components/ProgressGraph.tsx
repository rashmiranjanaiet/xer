
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', skills: 2, score: 30 },
  { name: 'Feb', skills: 3, score: 45 },
  { name: 'Mar', skills: 5, score: 55 },
  { name: 'Apr', skills: 6, score: 68 },
  { name: 'May', skills: 8, score: 74 },
  { name: 'Jun', skills: 10, score: 82 },
];

const ProgressGraph: React.FC = () => {
    // In a real app, this would detect dark mode from context or props
    const isDarkMode = document.documentElement.classList.contains('dark');
    const lineAndTextColor = isDarkMode ? '#a7b5d1' : '#475569';
    const gridColor = isDarkMode ? '#334155' : '#e2e8f0';


  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="name" stroke={lineAndTextColor} />
          <YAxis yAxisId="left" stroke={lineAndTextColor} label={{ value: 'Readiness Score', angle: -90, position: 'insideLeft', fill: lineAndTextColor, dy: 40 }}/>
          <YAxis yAxisId="right" orientation="right" stroke={lineAndTextColor} label={{ value: 'Skills Acquired', angle: 90, position: 'insideRight', fill: lineAndTextColor, dy: -40 }} />
          <Tooltip 
            contentStyle={{ 
                backgroundColor: isDarkMode ? 'rgb(30 41 59 / 0.9)' : 'rgba(255, 255, 255, 0.9)', 
                borderColor: gridColor,
                borderRadius: '0.5rem',
            }} 
            labelStyle={{color: lineAndTextColor}}
            />
          <Legend wrapperStyle={{color: lineAndTextColor}} />
          <Line yAxisId="left" type="monotone" dataKey="score" name="Readiness Score" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
          <Line yAxisId="right" type="monotone" dataKey="skills" name="Skills Acquired" stroke="#84cc16" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressGraph;
