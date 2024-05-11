import { message, Modal, Form, Select, Button } from 'antd';
import { useState, useEffect } from 'react';
import { getExpensesCategoriesData, deleteExpenseCategory } from 'services/expensesService';
import { ExpenseCategory } from 'models';
import PropTypes from 'prop-types';
import './remove-category-modal.scss';

interface RemoveCategoryModalProps {
  visible: boolean;
  onClose: () => void;
}

const RemoveExpenseCategoryModal: React.FC<RemoveCategoryModalProps> = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);

  useEffect(() => {
    fetchCategories();
  }, [visible]);

  const fetchCategories = async () => {
    try {
      const response = await getExpensesCategoriesData(1, 100);
      setCategories(response.items);
    } catch (error) {
      message.error('Failed to fetch categories. Please try again later.');
    }
  };

  const handleRemoveCategory = async (values: any) => {
    setLoading(true);
    try {
      await deleteExpenseCategory(values.categoryId);
      message.success('Category was added deleted');
      onClose();
    } catch (error) {
      message.error('Failed to add category. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Remove category"
      open={visible}
      onCancel={onClose}
      footer={null}
      className="expense-modal">
      <Form layout="vertical" onFinish={handleRemoveCategory}>
        <Form.Item name="categoryId" label="Category">
          <Select placeholder="Select a category">
            {categories.map((category) => (
              <Select.Option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </Select.Option>
            ))}
          </Select>
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

RemoveExpenseCategoryModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default RemoveExpenseCategoryModal;
