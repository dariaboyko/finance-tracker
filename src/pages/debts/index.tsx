import './debts.scss';
import TotalBalanceCard from 'components/total-balance-card';
import { useEffect, useState } from 'react';
import { Debt } from 'models';
import NoResults from 'components/no-results';
import LoadingSpinner from 'components/loading-spinner';
import { Pagination } from 'antd';
import mockService from 'services/mockService';
import { getDebtsData } from 'services/debtsService';
import DebtsList from 'components/debt-list';

const DebtsPage = () => {
  const PAGE_SIZE = 15;
  const [debts, setDebts] = useState<Debt[]>([]);
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

        const debtsResponse = await getDebtsData(
          formattedFromDate,
          toDate,
          pagination.current,
          pagination.pageSize
        );

        setDebts(debtsResponse.items);
        setPagination((prevPagination) => ({
          ...prevPagination,
          total: debtsResponse.totalCount
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
        const mockTransactions = mockService.generateMockDebts(pagination.pageSize);
        setDebts(mockTransactions);
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
    <section className="debts">
      <header className="debts--title">Debts</header>
      <div className="debts--main">
        <div className="debts--main--left">
          <div className="debts--main--div">
            {loading ? (
              <LoadingSpinner />
            ) : debts.length > 0 ? (
              <>
                <div style={{ height: '95%' }}>
                  <DebtsList debts={debts} showTitle={false} />
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
        <div className="debts--main--right">
          <div className="debts--main--div" style={{ maxHeight: '110px' }}>
            <TotalBalanceCard
              title="Total Debts"
              balance={debts.reduce((total, d) => total + d.amount, 0)}
              isIncrease={false}
            />
          </div>
          <div className="debts--main--div"></div>
        </div>
      </div>
    </section>
  );
};

export default DebtsPage;
