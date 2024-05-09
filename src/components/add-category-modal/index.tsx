import { message, Modal, Form, Input, Button } from 'antd';
import { useState } from 'react';
import { addExpenseCategory } from 'services/expensesService';
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
      await addExpenseCategory(values.name);
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
          rules={[{ required: true, message: 'Please enter name' }]}>
          <Input.TextArea rows={1} />
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
