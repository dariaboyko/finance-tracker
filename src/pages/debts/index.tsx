import './debts.scss';
import TransactionsList from 'components/transaction-list';
import { useEffect, useState } from 'react';
import { Debt, TransactionListItem } from 'models';
import NoResults from 'components/no-results';
import LoadingSpinner from 'components/loading-spinner';
import { Button, Pagination, message } from 'antd';
import mockService from 'services/mockService';
import { PlusOutlined } from '@ant-design/icons';
import { deleteDebt, getDebtsData } from 'services/debtsService';
import AddDebtModal from 'components/add-debt-modal';

const DebtsPage = () => {
  const PAGE_SIZE = 15;
  const [transactions, setTransactions] = useState<TransactionListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState({ current: 1, pageSize: PAGE_SIZE, total: 0 });
  const [isPaginationChange, setIsPaginationChange] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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
        const debts: TransactionListItem[] = debtsResponse.items.map((debt: Debt) => ({
          name: `Debt from ${debt.creditorName} - ${debt.status}`,
          date: debt.setDate.substring(0, 10),
          amount: debt.amount,
          id: debt.id
        }));

        setTransactions(debts);
        setPagination((prevPagination) => ({
          ...prevPagination,
          total: debtsResponse.totalCount
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

  const handleAddDebt = () => {
    setIsModalVisible(true);
  };

  const handleDeleteDebt = (id: string) => {
    try {
      deleteDebt(id);
    } catch (error) {
      message.error('Failed to delete debt. Please try again later.');
    } finally {
      handlePaginationChange(pagination.current);
      message.success('Debt was deleted successfully');
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    handlePaginationChange(pagination.current);
  };

  return (
    <section className="debts">
      <header className="debts--title">
        Debts
        <Button type="primary" onClick={handleAddDebt}>
          <PlusOutlined /> Add Debt
        </Button>
      </header>
      <div className="debts--main">
        <div className="debts--main--div">
          {loading ? (
            <LoadingSpinner />
          ) : transactions.length > 0 ? (
            <>
              <div style={{ height: '95%' }}>
                <TransactionsList
                  transactions={transactions}
                  showTitle={false}
                  addDeletion={true}
                  onTransactionDelete={(tran) => handleDeleteDebt(String(tran.id))}
                />
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
      <AddDebtModal visible={isModalVisible} onClose={handleModalClose} />
    </section>
  );
};

export default DebtsPage;
