import './expenses.scss';
import TransactionsList from 'components/transaction-list';
import TotalBalanceCard from 'components/total-balance-card';
import { useEffect, useState } from 'react';
import { Expense, Income, TransactionListItem } from 'models';
import NoResults from 'components/no-results';
import LoadingSpinner from 'components/loading-spinner';
import mockService from 'services/mockService';
import { getExpensesData } from 'services/expensesService';
import ExpensesPieChart from 'components/expenses-pie';

const ExpensesPage = () => {
  const [transactions, setTransactions] = useState<TransactionListItem[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
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
            amount: expense.amount * -1
          })
        );

        setTransactions(expenses);
      } catch (error) {
        console.error('Error fetching data:', error);
        const mockTransactions = mockService.generateMockExpensesForTransactions(10);
        setTransactions(mockTransactions);
        setExpenses(mockService.generateMockExpenses(10));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <section className="analytics">
      <header className="analytics--title">Expenses</header>
      <div className="analytics--main">
        <div className="analytics--main--left">
          <div className="analytics--main--div">
            {loading ? (
              <LoadingSpinner />
            ) : transactions.length > 0 ? (
              <TransactionsList transactions={transactions} showTitle={false} />
            ) : (
              <NoResults />
            )}
          </div>
        </div>
        <div className="analytics--main--right">
          <div className="analytics--main--div">
            <ExpensesPieChart expenses={expenses} />
          </div>
          <div className="analytics--main--div" style={{ maxHeight: '110px' }}>
            <TotalBalanceCard
              title="Total Expenses"
              balance={transactions.reduce((total, transaction) => total + transaction.amount, 0)}
              isIncrease={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpensesPage;
