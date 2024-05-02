import React from 'react';
import './transaction-list.scss';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

interface Transaction {
  name: string;
  date: string;
  amount: number;
  id?: number | string;
}

interface TransactionsListProps {
  transactions: Transaction[];
  showTitle: boolean;
  addDeletion?: boolean;
  onTransactionDelete?: (transaction: Transaction) => void;
}

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
  showTitle,
  addDeletion,
  onTransactionDelete
}) => {
  const handleDelete = (transaction: Transaction) => {
    if (onTransactionDelete) {
      onTransactionDelete(transaction);
    }
  };

  return (
    <div className="transactions">
      {showTitle && <div className="transactions--title">Transactions</div>}
      <ul className="transactions--list">
        {transactions.map((transaction, index) => (
          <li key={index} className={transaction.amount >= 0 ? 'positive' : 'negative'}>
            <div>
              <div className="transactions--list--name">{transaction.name}</div>
              <div className="transactions--list--date">{transaction.date}</div>
            </div>
            <div className="transactions--list--amount">
              {transaction.amount > 0 ? `+$${transaction.amount}` : `-$${-1 * transaction.amount}`}
              {addDeletion && (
                <Button onClick={() => handleDelete(transaction)} shape="circle">
                  <DeleteOutlined />
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

TransactionsList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
    }).isRequired
  ).isRequired,
  showTitle: PropTypes.bool.isRequired,
  addDeletion: PropTypes.bool,
  onTransactionDelete: PropTypes.func
};

export default TransactionsList;
