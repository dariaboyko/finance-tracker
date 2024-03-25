import IncomeExpenseChart from 'components/month-chart';
import './dashboard.scss';
import TransactionsList from 'components/transaction-list';

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

const transactions = [
  { name: 'Transaction 1', date: '2024-03-25', amount: 100 },
  { name: 'Transaction 2', date: '2024-03-26', amount: -50 },
  { name: 'Transaction 3', date: '2024-03-27', amount: 75 },
  { name: 'Transaction 1', date: '2024-03-25', amount: 100 },
  { name: 'Transaction 2', date: '2024-03-26', amount: -50 },
  { name: 'Transaction 3', date: '2024-03-27', amount: 75 },
  { name: 'Transaction 1', date: '2024-03-25', amount: 100 },
  { name: 'Transaction 2', date: '2024-03-26', amount: -50 },
  { name: 'Transaction 3', date: '2024-03-27', amount: 75 },
  { name: 'Transaction 1', date: '2024-03-25', amount: 100 },
  { name: 'Transaction 2', date: '2024-03-26', amount: -50 },
  { name: 'Transaction 3', date: '2024-03-27', amount: 75 },
  { name: 'Transaction 1', date: '2024-03-25', amount: 100 },
  { name: 'Transaction 2', date: '2024-03-26', amount: -50 },
  { name: 'Transaction 3', date: '2024-03-27', amount: 75 }
];

const DashBoard = () => {
  return (
    <section className="dashboard">
      <header className="dashboard--title">Dashboard</header>
      <div className="dashboard--main">
        <div className="dashboard--main--left">
          <div className="dashboard--main--div" style={{ maxHeight: '300px' }}>
            <IncomeExpenseChart data={MockIncomeExpenseData} />
          </div>
          <div className="dashboard--main--div">
            <TransactionsList transactions={transactions} />
          </div>
        </div>
        <div className="dashboard--main--right"></div>
      </div>
    </section>
  );
};

export default DashBoard;
