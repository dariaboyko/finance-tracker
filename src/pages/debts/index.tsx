import './debts.scss';
import { useEffect, useState } from 'react';
import { Debt } from 'models';
import NoResults from 'components/no-results';
import LoadingSpinner from 'components/loading-spinner';
import { Button, Pagination, message } from 'antd';
import mockService from 'services/mockService';
import { PlusOutlined } from '@ant-design/icons';
import { deleteDebt, editDebt, getDebtsData } from 'services/debtsService';
import AddDebtModal from 'components/add-debt-modal';
import DebtsList from 'components/debt-list';

const DebtsPage = () => {
  const PAGE_SIZE = 15;
  const [debts, setDebts] = useState<Debt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState({ current: 1, pageSize: PAGE_SIZE, total: 0 });
  const [isPaginationChange, setIsPaginationChange] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleEditDebt = async (
    id: string,
    amount: number,
    creditorName: string,
    status: string
  ) => {
    try {
      await editDebt(id, amount, creditorName, status);
      message.success('Debt was edited successfully');
      handlePaginationChange(pagination.current);
    } catch (error) {
      message.error('Failed to edit debt. Please try again later.');
    }
  };

  const handleDeleteDebt = async (id: string) => {
    try {
      await deleteDebt(id);
      message.success('Debt was deleted successfully');
      handlePaginationChange(pagination.current);
    } catch (error) {
      message.error('Failed to delete debt. Please try again later.');
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const toDate = tomorrow.toISOString().split('T')[0];
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

  const handleAddDebt = () => {
    setIsModalVisible(true);
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
          ) : debts.length > 0 ? (
            <>
              <div style={{ height: '95%' }}>
                <DebtsList debts={debts} onDelete={handleDeleteDebt} onEdit={handleEditDebt} />
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
