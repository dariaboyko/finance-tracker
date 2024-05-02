import React from 'react';
import './debt-list.scss';
import { Debt } from 'models';

interface DebtsListProps {
  debts: Debt[];
  showTitle: boolean;
}

const DebtsList: React.FC<DebtsListProps> = ({ debts: debts }) => {
  return (
    <div className="debts-list">
      <ul className="debts-list--list">
        {debts.map((debt, index) => (
          <li key={index}>
            <div>
              <div className="debts-list--list--name">{debt.creditorName}</div>
              <div className="debts-list--list--date">
                Status: {debt.status}
                <br></br>
                Created on: {debt.setDate}
                <br></br>
                Updated on: {debt.setDate}
              </div>
            </div>
            <div className="debts-list--list--amount">${debt.amount}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DebtsList;
