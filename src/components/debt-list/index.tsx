import React, { useState } from 'react';
import './debt-list.scss';
import { Debt } from 'models';
import { Button, Modal, Form, Input, InputNumber, Select } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

interface DebtsListProps {
  debts: Debt[];
  onDelete: (id: string) => void;
  onEdit: (id: string, amount: number, creditorName: string, status: string) => void;
}

const DebtsList: React.FC<DebtsListProps> = ({ debts, onDelete, onEdit }) => {
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null);
  const [form] = Form.useForm();
  const [statuses] = useState(['Active', 'Closed']);

  const handleEdit = (debt: Debt) => {
    setSelectedDebt(debt);
    form.setFieldsValue({
      amount: debt.amount,
      creditorName: debt.creditorName,
      status: debt.status
    });
    setEditModalVisible(true);
  };

  const handleDelete = (debtId: string) => {
    onDelete(debtId);
  };

  return (
    <div className="debts-list">
      <ul className="debts-list--list">
        {debts.map((debt, index) => (
          <li key={index}>
            <div className="debts-list--text">
              <div>
                <div className="debts-list--list--name">{debt.creditorName}</div>
                <div className="debts-list--list--date">
                  Status: {debt.status}
                  <br></br>
                  Created on: {debt.setDate}
                  <br></br>
                  Updated on: {debt.updatedDate}
                </div>
              </div>
              <div className="debts-list--list--amount">${debt.amount}</div>
            </div>
            <div className="debts-list--list--actions">
              <Button onClick={() => handleEdit(debt)} shape="circle">
                <EditOutlined />
              </Button>
              <Button onClick={() => handleDelete(debt.id)} shape="circle">
                <DeleteOutlined />
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        title="Edit Debt"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        className="debt-modal"
        footer={[
          <Button key="cancel" onClick={() => setEditModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              form.validateFields().then((values) => {
                if (selectedDebt) {
                  onEdit(selectedDebt.id, values.amount, values.creditorName, values.status);
                  setEditModalVisible(false);
                }
              });
            }}>
            Save
          </Button>
        ]}>
        <Form form={form} layout="vertical">
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: 'Please enter amount' }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Select placeholder="Select a status">
              {statuses.map((status) => (
                <Select.Option key={status} value={status}>
                  {status}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="creditorName"
            label="Creditor Name"
            rules={[{ required: true, message: 'Please enter creditor name' }]}>
            <Input.TextArea rows={1} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DebtsList;
