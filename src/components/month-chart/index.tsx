import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface IncomeExpense {
  month: string;
  income: number;
  expense: number;
}

interface Props {
  data: IncomeExpense[];
}

const IncomeExpenseChart: React.FC<Props> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current && data.length > 0) {
      const chart = echarts.init(chartRef.current);

      const months = data.map((item) => item.month);
      const incomes = data.map((item) => item.income);
      const expenses = data.map((item) => item.expense);

      const option: echarts.EChartsOption = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Incomes', 'Expenses']
        },
        xAxis: {
          type: 'category',
          data: months
        },
        yAxis: {
          type: 'value'
        },
        grid: {
          left: 60,
          right: 25,
          bottom: 35
        },
        series: [
          {
            name: 'Incomes',
            type: 'line',
            data: incomes,
            itemStyle: {
              color: '#389e0d'
            }
          },
          {
            name: 'Expenses',
            type: 'line',
            data: expenses,
            itemStyle: {
              color: '#cf1322'
            }
          }
        ]
      };

      chart.setOption(option);

      return () => {
        chart.dispose();
      };
    }
  }, [data]);

  return <div ref={chartRef} style={{ width: '100% !important', height: '270px' }} />;
};

export default IncomeExpenseChart;
