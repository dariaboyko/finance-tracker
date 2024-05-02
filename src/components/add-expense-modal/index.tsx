import { message, Modal, Form, InputNumber, DatePicker, Input, Button, Select } from 'antd';
import { ExpenseCategory } from 'models';
import { useEffect, useState } from 'react';
import { addExpense, getExpensesCategoriesData } from 'services/expensesService';
import mockService from 'services/mockService';
import PropTypes from 'prop-types';
import './add-expense-modal.scss';

interface AddExpenseModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getExpensesCategoriesData(1, 100);
      setCategories(response.items);
    } catch (error) {
      setCategories(mockService.generateMockExpenseCategories(10));
      message.error('Failed to fetch categories. Please try again later.');
    }
  };

  const handleAddExpense = async (values: any) => {
    setLoading(true);
    try {
      const selectedDate = new Date(values.setDate);
      const utcDate = new Date(
        Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
      );
      await addExpense(values.categoryId, values.amount, utcDate.toISOString(), values.description);
      message.success('Expense was added successfully');
      onClose();
    } catch (error) {
      message.error('Failed to add expense. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add Expense"
      open={visible}
      onCancel={onClose}
      footer={null}
      className="expense-modal">
      <Form layout="vertical" onFinish={handleAddExpense}>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: 'Please enter amount' }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="setDate"
          label="Date"
          rules={[{ required: true, message: 'Please select date' }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="categoryId" label="Category">
          <Select placeholder="Select a category">
            {categories.map((category) => (
              <Select.Option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="button" onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

AddExpenseModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AddExpenseModal;
