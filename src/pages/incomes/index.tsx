import './incomes.scss';
import TransactionsList from 'components/transaction-list';
import TotalBalanceCard from 'components/total-balance-card';
import { useEffect, useState } from 'react';
import { Income, TransactionListItem } from 'models';
import NoResults from 'components/no-results';
import LoadingSpinner from 'components/loading-spinner';
import { Pagination } from 'antd';
import { getIncomesData } from 'services/incomesService';
import mockService from 'services/mockService';

const IncomesPage = () => {
  const PAGE_SIZE = 15;
  const [transactions, setTransactions] = useState<TransactionListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState({ current: 1, pageSize: PAGE_SIZE, total: 0 });
  const [isPaginationChange, setIsPaginationChange] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const today = new Date();
        const toDate = today.toISOString().split('T')[0];
        const fromDate = new Date(today);
        fromDate.setDate(today.getDate() - 29);
        const formattedFromDate = fromDate.toISOString().split('T')[0];

        const incomesResponse = await getIncomesData(
          formattedFromDate,
          toDate,
          pagination.current,
          pagination.pageSize
        );
        const incomes: TransactionListItem[] = incomesResponse.items.map(
          (income: Income, index) => ({
            name: `Income ${index + 1}`,
            date: income.setDate.substring(0, 10),
            amount: income.amount
          })
        );

        setTransactions(incomes);
        setPagination((prevPagination) => ({
          ...prevPagination,
          total: incomesResponse.totalCount
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
        const mockTransactions = mockService.generateMockIncomes(pagination.pageSize);
        setTransactions(mockTransactions);
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
    <section className="incomes">
      <header className="incomes--title">Incomes</header>
      <div className="incomes--main">
        <div className="incomes--main--left">
          <div className="incomes--main--div">
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
        <div className="incomes--main--right">
          <div className="incomes--main--div" style={{ maxHeight: '110px' }}>
            <TotalBalanceCard
              title="Total Income"
              balance={transactions.reduce((total, transaction) => total + transaction.amount, 0)}
              isIncrease={true}
            />
          </div>
          <div className="incomes--main--div"></div>
        </div>
      </div>
    </section>
  );
};

export default IncomesPage;
