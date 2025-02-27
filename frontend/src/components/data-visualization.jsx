"use client";

import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ChartTooltipContent from './ChartTooltipContent.jsx'; // Adjust the path as necessary
import PropTypes from 'prop-types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, ChartContainer } from "./Card";

export function DataVisualization({ data }) {
  const renderChart = () => {
    switch (data.chartType) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data.chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              {Object.keys(data.chartData[0])
                .filter((key) => key !== "name")
                .map((key, index) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={`hsl(var(--chart-${index + 1}))`}
                    strokeWidth={2}
                  />
                ))}
            </LineChart>
          </ResponsiveContainer>
        );
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data.chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              {Object.keys(data.chartData[0])
                .filter((key) => key !== "name")
                .map((key, index) => (
                  <Bar key={key} dataKey={key} fill={`hsl(var(--chart-${index + 1}))`} />
                ))}
            </BarChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data.chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="hsl(var(--chart-1))"
                label
              />
              <Tooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
    }
  };

  DataVisualization.propTypes = {
    data: PropTypes.shape({
      chartType: PropTypes.string.isRequired,
      chartData: PropTypes.arrayOf(PropTypes.object).isRequired,
      title: PropTypes.string,
      description: PropTypes.string,
    }).isRequired,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer>{renderChart()}</ChartContainer>
      </CardContent>
    </Card>
  );
}
