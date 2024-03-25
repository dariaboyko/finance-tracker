import React from 'react';
import './transaction-list.scss';

interface Transaction {
  name: string;
  date: string;
  amount: number;
}

interface TransactionsListProps {
  transactions: Transaction[];
}

const TransactionsList: React.FC<TransactionsListProps> = ({ transactions }) => {
  return (
    <div className="transactions">
      <div className="transactions--title">Transactions</div>
      <ul className="transactions--list">
        {transactions.map((transaction, index) => (
          <li key={index} className={transaction.amount >= 0 ? 'positive' : 'negative'}>
            <div>
              <div className="transactions--list--name">{transaction.name}</div>
              <div className="transactions--list--date">{transaction.date}</div>
            </div>
            <div className="transactions--list--amount">
              {transaction.amount > 0 ? `+${transaction.amount}` : transaction.amount}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsList;
