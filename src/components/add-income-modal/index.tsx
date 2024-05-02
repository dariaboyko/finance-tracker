import { message, Modal, Form, InputNumber, DatePicker, Input, Button, Select } from 'antd';
import { useState } from 'react';
import PropTypes from 'prop-types';
import './add-income-modal.scss';
import { addIncome } from 'services/incomesService';

interface AddIncomeModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddIncomeModal: React.FC<AddIncomeModalProps> = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleAddIncome = async (values: any) => {
    setLoading(true);
    try {
      const selectedDate = new Date(values.setDate);
      const utcDate = new Date(
        Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
      );
      await addIncome(values.amount, utcDate.toISOString(), values.source);
      message.success('Income was added successfully');
      onClose();
    } catch (error) {
      message.error('Failed to add income. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add Income"
      open={visible}
      onCancel={onClose}
      footer={null}
      className="income-modal">
      <Form layout="vertical" onFinish={handleAddIncome}>
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
        <Form.Item name="source" label="Income source">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="button" onClick={onClose}>
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

AddIncomeModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AddIncomeModal;
