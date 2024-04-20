import IncomeExpenseChart from 'components/month-chart';
import './analytics.scss';
import TransactionsList from 'components/transaction-list';
import ExpenseCalendar from 'components/expanse-calender';
import PieChart from 'components/pie-chart';
import TotalBalanceCard from 'components/total-balance-card';
import { useEffect, useState } from 'react';
import { Expense, Income, TransactionListItem } from 'models';
import NoResults from 'components/no-results';
import LoadingSpinner from 'components/loading-spinner';
import { getExpensesData } from 'services/expensesService';
import { getIncomesData } from 'services/incomesService';

const colors = ['#389e0d', '#cf1322'];
const MockIncomeExpenseData = [
  { month: 'Jan', income: 5000, expense: 4000 },
  { month: 'Feb', income: 5500, expense: 4200 },
  { month: 'Mar', income: 6000, expense: 4500 },
  { month: 'Apr', income: 5800, expense: 4100 },
  { month: 'May', income: 6200, expense: 4300 },
  { month: 'Jun', income: 6300, expense: 4400 },
  { month: 'Jul', income: 6500, expense: 4600 },
  { month: 'Aug', income: 6700, expense: 4800 },
  { month: 'Sep', income: 7000, expense: 4900 },
  { month: 'Oct', income: 7200, expense: 5100 },
  { month: 'Nov', income: 7500, expense: 5300 },
  { month: 'Dec', income: 7800, expense: 5500 }
];

const AnalyticsPage = () => {
  const [transactions, setTransactions] = useState<TransactionListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const today = new Date();
        const toDate = today.toISOString().split('T')[0];
        const fromDate = new Date(today);
        fromDate.setDate(today.getDate() - 29);
        const formattedFromDate = fromDate.toISOString().split('T')[0];

        const expensesResponse = await getExpensesData(formattedFromDate, toDate, 1, 30);
        const expenses: TransactionListItem[] = expensesResponse.items.map(
          (expense: Expense, index) => ({
            name: `Expense ${index + 1}`,
            date: expense.setDate.substring(0, 10),
            amount: expense.amount
          })
        );

        const incomesResponse = await getIncomesData(formattedFromDate, toDate, 1, 30);
        const incomes: TransactionListItem[] = incomesResponse.items.map(
          (income: Income, index) => ({
            name: `Income ${index + 1}`,
            date: income.setDate.substring(0, 10),
            amount: income.amount
          })
        );

        const allTransactions = [...expenses, ...incomes];

        allTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setTransactions(allTransactions);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <section className="analytics">
      <header className="analytics--title">Analytics</header>
      <div className="analytics--main">
        <div className="analytics--main--left">
          <div className="analytics--main--div" style={{ maxHeight: '300px' }}>
            {loading ? (
              <LoadingSpinner />
            ) : transactions.length > 0 ? (
              <IncomeExpenseChart data={MockIncomeExpenseData} />
            ) : (
              <IncomeExpenseChart data={MockIncomeExpenseData} />
            )}
          </div>
          <div className="analytics--main--div">
            {loading ? (
              <LoadingSpinner />
            ) : transactions.length > 0 ? (
              <TransactionsList transactions={transactions} showTitle={true} />
            ) : (
              <NoResults />
            )}
          </div>
        </div>
        <div className="analytics--main--right">
          <div className="analytics--main--div" style={{ maxHeight: '300px' }}>
            {loading ? (
              <LoadingSpinner />
            ) : transactions.length > 0 ? (
              <ExpenseCalendar
                expenses={transactions.filter((transaction) => transaction.amount < 0)}
                incomes={transactions.filter((transaction) => transaction.amount >= 0)}
              />
            ) : (
              <ExpenseCalendar
                expenses={transactions.filter((transaction) => transaction.amount < 0)}
                incomes={transactions.filter((transaction) => transaction.amount >= 0)}
              />
            )}
          </div>
          <div className="analytics--main--div">
            {loading ? (
              <LoadingSpinner />
            ) : transactions.length > 0 ? (
              <PieChart
                data={transactions.reduce(
                  (acc, transaction) => {
                    if (transaction.amount >= 0) {
                      acc[0].value += transaction.amount;
                    } else {
                      acc[1].value -= transaction.amount;
                    }
                    return acc;
                  },
                  [
                    { value: 0, name: 'Incomes' },
                    { value: 0, name: 'Expenses' }
                  ]
                )}
                colors={colors}
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <PieChart
                data={transactions.reduce(
                  (acc, transaction) => {
                    if (transaction.amount >= 0) {
                      acc[0].value += transaction.amount;
                    } else {
                      acc[1].value -= transaction.amount;
                    }
                    return acc;
                  },
                  [
                    { value: 0, name: 'Incomes' },
                    { value: 0, name: 'Expenses' }
                  ]
                )}
                colors={colors}
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </div>
          <div className="analytics--main--div" style={{ maxHeight: '110px' }}>
            <TotalBalanceCard
              balance={transactions.reduce((total, transaction) => total + transaction.amount, 0)}
              title="Total Balance"
              percentageChange={5}
              isIncrease={
                transactions.reduce((total, transaction) => total + transaction.amount, 0) >= 0
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsPage;
