import './incomes.scss';
import TransactionsList from 'components/transaction-list';
import PieChart from 'components/pie-chart';
import TotalBalanceCard from 'components/total-balance-card';
import { useEffect, useState } from 'react';
import { Income, TransactionListItem } from 'models';
import NoResults from 'components/no-results';
import LoadingSpinner from 'components/loading-spinner';
import { getIncomesData } from 'services/incomesService';
import mockService from 'services/mockService';

const colors = ['#389e0d'];

const IncomesPage = () => {
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

        const incomesResponse = await getIncomesData(formattedFromDate, toDate, 1, 30);
        const incomes: TransactionListItem[] = incomesResponse.items.map(
          (income: Income, index) => ({
            name: `Income ${index + 1}`,
            date: income.setDate.substring(0, 10),
            amount: income.amount
          })
        );

        setTransactions(incomes);
      } catch (error) {
        console.error('Error fetching data:', error);
        const mockTransactions = mockService.generateMockIncomes(10);
        setTransactions(mockTransactions);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <section className="analytics">
      <header className="analytics--title">Incomes</header>
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
          <div className="analytics--main--div" style={{ maxHeight: '110px' }}>
            <TotalBalanceCard
              title="Total Income"
              balance={transactions.reduce((total, transaction) => total + transaction.amount, 0)}
              isIncrease={true}
            />
          </div>
          <div className="analytics--main--div"></div>
        </div>
      </div>
    </section>
  );
};

export default IncomesPage;
