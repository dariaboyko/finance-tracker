import { message, Modal, Form, InputNumber, DatePicker, Input, Button, Select } from 'antd';
import { useState } from 'react';
import PropTypes from 'prop-types';
import './add-debt-modal.scss';
import { addDebt } from 'services/debtsService';

interface AddDebtModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddDebtModal: React.FC<AddDebtModalProps> = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleAddDebt = async (values: any) => {
    setLoading(true);
    try {
      await addDebt(values.amount, values.creditorName);
      message.success('Debt was added successfully');
      onClose();
    } catch (error) {
      message.error('Failed to add debt. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Add Debt" open={visible} onCancel={onClose} footer={null} className="debt-modal">
      <Form layout="vertical" onFinish={handleAddDebt}>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: 'Please enter amount' }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="creditorName"
          label="Creditor Name"
          rules={[{ required: true, message: 'Please enter creditor name' }]}>
          <Input.TextArea rows={2} />
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

AddDebtModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AddDebtModal;
