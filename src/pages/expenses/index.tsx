import './expenses.scss';
import TransactionsList from 'components/transaction-list';
import TotalBalanceCard from 'components/total-balance-card';
import { useEffect, useState } from 'react';
import { Expense, TransactionListItem } from 'models';
import NoResults from 'components/no-results';
import LoadingSpinner from 'components/loading-spinner';
import mockService from 'services/mockService';
import { getExpensesData } from 'services/expensesService';
import ExpensesPieChart from 'components/expenses-pie';
import { Pagination } from 'antd';

const ExpensesPage = () => {
  const PAGE_SIZE = 15;
  const [transactions, setTransactions] = useState<TransactionListItem[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPaginationChange, setIsPaginationChange] = useState<boolean>(true);
  const [pagination, setPagination] = useState({ current: 1, pageSize: PAGE_SIZE, total: 0 });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const today = new Date();
        const toDate = today.toISOString().split('T')[0];
        const fromDate = new Date(today);
        fromDate.setDate(today.getDate() - 29);
        const formattedFromDate = fromDate.toISOString().split('T')[0];

        const expensesResponse = await getExpensesData(
          formattedFromDate,
          toDate,
          pagination.current,
          pagination.pageSize
        );

        setExpenses(expensesResponse.items);
        const expenses: TransactionListItem[] = expensesResponse.items.map(
          (expense: Expense, index) => ({
            name: `Expense ${index + 1}`,
            date: expense.setDate.substring(0, 10),
            amount: expense.amount * -1
          })
        );

        setTransactions(expenses);
        setPagination((prevPagination) => ({
          ...prevPagination,
          total: expensesResponse.totalCount
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
        const mockTransactions = mockService.generateMockExpensesForTransactions(
          pagination.pageSize
        );
        setTransactions(mockTransactions);
        setExpenses(mockService.generateMockExpenses(10));
        setPagination((prevPagination) => ({
          ...prevPagination,
          total: 200
        }));
      } finally {
        setLoading(false);
      }
    }

    if (isPaginationChange) {
      setIsPaginationChange(false);
      fetchData();
    }
  }, [pagination]);

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setPagination({ current: page, pageSize: pageSize || PAGE_SIZE, total: pagination.total });
    setIsPaginationChange(true);
  };

  return (
    <section className="expenses">
      <header className="expenses--title">Expenses</header>
      <div className="expenses--main">
        <div className="expenses--main--left">
          <div className="expenses--main--div">
            {loading ? (
              <LoadingSpinner />
            ) : transactions.length > 0 ? (
              <>
                <div style={{ height: '95%' }}>
                  <TransactionsList transactions={transactions} showTitle={false} />
                </div>
                <Pagination
                  current={pagination.current}
                  pageSize={pagination.pageSize}
                  onChange={handlePaginationChange}
                  total={pagination.total}
                />
              </>
            ) : (
              <NoResults />
            )}
          </div>
        </div>
        <div className="expenses--main--right">
          <div className="expenses--main--div">
            {loading ? (
              <LoadingSpinner />
            ) : transactions.length > 0 ? (
              <ExpensesPieChart expenses={expenses} />
            ) : (
              <NoResults />
            )}
          </div>
          <div className="expenses--main--div" style={{ maxHeight: '110px' }}>
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
