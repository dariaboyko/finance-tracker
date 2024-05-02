import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Expense, ExpenseCategory } from 'models';

interface PieProps {
  expenses: Expense[];
  categories: ExpenseCategory[];
}

const ExpensesPieChart: React.FC<PieProps> = ({ expenses, categories }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current && expenses.length > 0) {
      const chart = echarts.init(chartRef.current);

      const categoryMap = new Map<string, number>();
      expenses.forEach((expense) => {
        const { categoryId, amount } = expense;
        if (categoryMap.has(categoryId)) {
          categoryMap.set(categoryId, categoryMap.get(categoryId)! + amount);
        } else {
          categoryMap.set(categoryId, amount);
        }
      });

      const sortedCategories = Array.from(categoryMap.entries()).sort((a, b) => b[1] - a[1]);

      const categoryData = sortedCategories.map(([categoryId, amount], index) => ({
        name: getCategoryName(categoryId),
        value: amount,
        itemStyle: {
          color: echarts.color.lift(echarts.color.random(), index * 0.1)
        }
      }));

      const legendData = categoryData.map((item) => item.name);

      const options: echarts.EChartsOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          bottom: 40,
          left: 20,
          data: legendData,
          formatter: (name) => {
            return (
              name +
              '                                                                                                                          '
            );
          }
        },
        series: [
          {
            name: 'Expenses',
            type: 'pie',
            radius: '55%',
            center: ['50%', '25%'],
            label: {
              show: false
            },
            data: categoryData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      chart.setOption(options);

      return () => {
        chart.dispose();
      };
    }
  }, [expenses]);

  const getCategoryName = (categoryId: string): string => {
    const category = categories.find((cat) => cat.categoryId === categoryId);
    return category ? category.categoryName : categoryId;
  };

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default ExpensesPieChart;
