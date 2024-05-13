import './expenses.scss';
import TransactionsList from 'components/transaction-list';
import TotalBalanceCard from 'components/total-balance-card';
import { useEffect, useState } from 'react';
import { Expense, ExpenseCategory, TransactionListItem } from 'models';
import NoResults from 'components/no-results';
import LoadingSpinner from 'components/loading-spinner';
import mockService from 'services/mockService';
import {
  deleteExpense,
  getExpensesCategoriesData,
  getExpensesData
} from 'services/expensesService';
import ExpensesPieChart from 'components/expenses-pie';
import { Button, Pagination, message } from 'antd';
import RemoveExpenseCategoryModal from 'components/remove-category-model';
import AddExpenseModal from 'components/add-expense-modal';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import AddExpenseCategoryModal from 'components/add-category-modal';

const ExpensesPage = () => {
  const PAGE_SIZE = 15;
  const [transactions, setTransactions] = useState<TransactionListItem[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPaginationChange, setIsPaginationChange] = useState<boolean>(true);
  const [pagination, setPagination] = useState({ current: 1, pageSize: PAGE_SIZE, total: 0 });
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isCatModalVisible, setIsCatModalVisible] = useState<boolean>(false);
  const [isRemoveModalVisible, setIsRemoveModalVisible] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 2);
        const toDate = tomorrow.toISOString().split('T')[0];
        const fromDate = new Date(today);
        fromDate.setDate(today.getDate() - 29);
        const formattedFromDate = fromDate.toISOString().split('T')[0];

        const expensesResponse = await getExpensesData(
          formattedFromDate,
          toDate,
          pagination.current,
          pagination.pageSize
        );

        const expensesCategoriesResponse = await getExpensesCategoriesData(1, 100);

        setExpenses(expensesResponse.items);
        setCategories(expensesCategoriesResponse.items);
        const expenses: TransactionListItem[] = expensesResponse.items.map(
          (expense: Expense, index) => ({
            name: expense.description,
            date: expense.setDate.substring(0, 10),
            amount: expense.amount * -1,
            id: expense.id
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
        setCategories(mockService.generateMockExpenseCategories(10));
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

  const handleAddExpense = () => {
    setIsModalVisible(true);
  };

  const handleAddCategory = () => {
    setIsCatModalVisible(true);
  };

  const handleRemoveCategory = () => {
    setIsRemoveModalVisible(true);
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      await deleteExpense(id);
      message.success('Expense was deleted successfully');
      handlePaginationChange(pagination.current);
    } catch (error) {
      message.error('Failed to delete expense. Please try again later.');
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    handlePaginationChange(pagination.current);
  };

  const handleCatModalClose = () => {
    setIsCatModalVisible(false);
    handlePaginationChange(pagination.current);
  };

  const handleRemoveModalClose = () => {
    setIsRemoveModalVisible(false);
    handlePaginationChange(pagination.current);
  };

  return (
    <section className="expenses">
      <header className="expenses--title">
        <span>Expenses</span>
        <div className="buttons">
          <Button type="dashed" onClick={handleRemoveCategory}>
            <MinusOutlined /> Remove Category
          </Button>
          <Button type="dashed" onClick={handleAddCategory}>
            <PlusOutlined /> Add Category
          </Button>
          <Button type="primary" onClick={handleAddExpense}>
            <PlusOutlined /> Add Expense
          </Button>
        </div>
      </header>
      <div className="expenses--main">
        <div className="expenses--main--left">
          <div className="expenses--main--div">
            {loading ? (
              <LoadingSpinner />
            ) : transactions.length > 0 ? (
              <>
                <div style={{ height: '95%' }}>
                  <TransactionsList
                    transactions={transactions}
                    showTitle={false}
                    addDeletion={true}
                    onTransactionDelete={(tran) => handleDeleteExpense(String(tran.id))}
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
        <div className="expenses--main--right">
          <div className="expenses--main--div">
            {loading ? (
              <LoadingSpinner />
            ) : transactions.length > 0 ? (
              <ExpensesPieChart expenses={expenses} categories={categories} />
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
      <AddExpenseModal visible={isModalVisible} onClose={handleModalClose} />
      <AddExpenseCategoryModal visible={isCatModalVisible} onClose={handleCatModalClose} />
      <RemoveExpenseCategoryModal visible={isRemoveModalVisible} onClose={handleRemoveModalClose} />
    </section>
  );
};

export default ExpensesPage;
