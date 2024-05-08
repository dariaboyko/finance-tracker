import { message, Modal, Form, InputNumber, Button } from 'antd';
import { useState } from 'react';
import { addExpense } from 'services/expensesService';
import PropTypes from 'prop-types';
import './add-category-modal.scss';

interface AddCategoryModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddExpenseCategoryModal: React.FC<AddCategoryModalProps> = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleAddCategory = async (values: any) => {
    setLoading(true);
    try {
      const selectedDate = new Date(values.setDate);
      const utcDate = new Date(
        Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
      );
      await addExpense(values.categoryId, values.amount, utcDate.toISOString(), values.description);
      message.success('Category was added successfully');
      onClose();
    } catch (error) {
      message.error('Failed to add category. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add Category"
      open={visible}
      footer={null}
      onCancel={onClose}
      className="expense-modal">
      <Form layout="vertical" onFinish={handleAddCategory}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter amount' }]}>
          <InputNumber style={{ width: '100%' }} />
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

AddExpenseCategoryModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AddExpenseCategoryModal;
