import IncomeExpenseChart from 'components/month-chart';
import './dashboard.scss';
import TransactionsList from 'components/transaction-list';
import ExpenseCalendar from 'components/expanse-calender';
import PieChart from 'components/pie-chart';
import TotalBalanceCard from 'components/total-balance-card';
import { useEffect, useState } from 'react';
import { getStatisticData } from 'services/statsService';
import { TransactionListItem } from 'models';
import NoResults from 'components/no-results';
import LoadingSpinner from 'components/loading-spinner';

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

const expenses = [
  { date: '2024-03-01', amount: 100 },
  { date: '2024-03-05', amount: 150 },
  { date: '2024-03-10', amount: 200 }
];

const incomes = [
  { date: '2024-03-02', amount: 120 },
  { date: '2024-03-06', amount: 180 },
  { date: '2024-03-11', amount: 220 }
];

const data = [
  { value: 1048, name: 'Incomes' },
  { value: 735, name: 'Expenses' }
];

const colors = ['#389e0d', '#cf1322'];

const DashBoard = () => {
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

        const data = await getStatisticData(formattedFromDate, toDate);

        const transformedData = data.map((transaction, index) => ({
          name: `Transaction ${index + 1}`,
          date: transaction.setDate.substring(0, 10),
          amount: transaction.amount
        }));

        setTransactions(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
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
            {loading ? (
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
            <ExpenseCalendar expenses={expenses} incomes={incomes} />
          </div>
          <div className="dashboard--main--div">
            <PieChart data={data} colors={colors} style={{ width: '100%', height: '100%' }} />
          </div>
          <div className="dashboard--main--div" style={{ maxHeight: '110px' }}>
            <TotalBalanceCard
              balance={212}
              percentageChange={parseFloat('32.43')}
              isIncrease={32 >= 0}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashBoard;
