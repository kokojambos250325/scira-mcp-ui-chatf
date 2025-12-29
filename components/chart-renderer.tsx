"use client";

import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

interface ChartData {
  type: 'line' | 'bar' | 'area';
  title?: string;
  data: Array<Record<string, string | number>>;
  xKey: string;
  yKeys: Array<{
    key: string;
    color: string;
    name: string;
  }>;
}

interface ChartRendererProps {
  chartData: ChartData;
}

export function ChartRenderer({ chartData }: ChartRendererProps) {
  const { type, title, data, xKey, yKeys } = chartData;

  const renderChart = () => {
    const commonProps = {
      width: '100%',
      height: 400,
      data,
      margin: { top: 10, right: 30, left: 0, bottom: 0 },
    };

    switch (type) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey={xKey} 
              className="text-xs text-muted-foreground"
              stroke="currentColor"
            />
            <YAxis 
              className="text-xs text-muted-foreground"
              stroke="currentColor"
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
              }}
            />
            <Legend />
            {yKeys.map(({ key, color, name }) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={color}
                name={name}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey={xKey} 
              className="text-xs text-muted-foreground"
              stroke="currentColor"
            />
            <YAxis 
              className="text-xs text-muted-foreground"
              stroke="currentColor"
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
              }}
            />
            <Legend />
            {yKeys.map(({ key, color, name }) => (
              <Bar key={key} dataKey={key} fill={color} name={name} />
            ))}
          </BarChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              {yKeys.map(({ key, color }) => (
                <linearGradient key={key} id={`color${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey={xKey} 
              className="text-xs text-muted-foreground"
              stroke="currentColor"
            />
            <YAxis 
              className="text-xs text-muted-foreground"
              stroke="currentColor"
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
              }}
            />
            <Legend />
            {yKeys.map(({ key, color, name }) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={color}
                fillOpacity={1}
                fill={`url(#color${key})`}
                name={name}
              />
            ))}
          </AreaChart>
        );

      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <div className="my-4 p-4 border border-border rounded-lg bg-card">
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={400}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}
