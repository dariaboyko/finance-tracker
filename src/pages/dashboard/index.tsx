import IncomeExpenseChart from 'components/month-chart';
import './dashboard.scss';
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

const DashBoard = () => {
  const [transactions, setTransactions] = useState<TransactionListItem[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      setTransactionsLoading(true);
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
        setTransactionsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <section className="dashboard">
      <header className="dashboard--title">Dashboard</header>
      <div className="dashboard--main">
        <div className="dashboard--main--left">
          <div className="dashboard--main--div" style={{ maxHeight: '300px' }}>
            <IncomeExpenseChart data={MockIncomeExpenseData} />
          </div>
          <div className="dashboard--main--div">
            {transactionsLoading ? (
              <LoadingSpinner />
            ) : transactions.length > 0 ? (
              <TransactionsList transactions={transactions} />
            ) : (
              <NoResults />
            )}
          </div>
        </div>
        <div className="dashboard--main--right">
          <div className="dashboard--main--div" style={{ maxHeight: '300px' }}>
            <ExpenseCalendar
              expenses={transactions.filter((transaction) => transaction.amount < 0)}
              incomes={transactions.filter((transaction) => transaction.amount >= 0)}
            />
          </div>
          <div className="dashboard--main--div">
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
          </div>
          <div className="dashboard--main--div" style={{ maxHeight: '110px' }}>
            <TotalBalanceCard
              balance={transactions.reduce((total, transaction) => total + transaction.amount, 0)}
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

export default DashBoard;
