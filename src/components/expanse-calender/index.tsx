import React from 'react';
import { Calendar } from 'antd';
import dayjs from 'dayjs';
import './expanse-calender.scss';
import locale from 'antd/es/date-picker/locale/en_GB';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/en-gb';

interface Expense {
  date: string;
  amount: number;
}

interface Income {
  date: string;
  amount: number;
}

interface Props {
  expenses: Expense[];
  incomes: Income[];
}

const ExpenseCalendar: React.FC<Props> = ({ expenses, incomes }) => {
  const expensesDict: Record<string, number> = {};
  expenses.forEach((expense) => {
    expensesDict[expense.date] = expense.amount;
  });

  const incomesDict: Record<string, number> = {};
  incomes.forEach((income) => {
    incomesDict[income.date] = income.amount;
  });

  const dateCellRender = (date: dayjs.Dayjs) => {
    const dateString = date.format('YYYY-MM-DD');
    const expense = expensesDict[dateString] || 0;
    const income = incomesDict[dateString] || 0;
    let color = '';
    if (expense > income) {
      color = '#cf1322';
    } else if (income > expense) {
      color = '#389e0d';
    }
    return <div>{color && <div style={{ height: 2, backgroundColor: color }}></div>}</div>;
  };
  dayjs.extend(updateLocale);
  dayjs.updateLocale('en-gb', {
    weekStart: 1
  });

  return (
    <Calendar cellRender={dateCellRender} fullscreen={false} className="calender" locale={locale} />
  );
};

export default ExpenseCalendar;
