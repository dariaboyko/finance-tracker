import React from 'react';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Card, Statistic } from 'antd';
import './total-balance-card.scss';

interface TotalBalanceProps {
  balance: number;
  percentageChange: number;
  isIncrease: boolean;
}

const TotalBalanceCard: React.FC<TotalBalanceProps> = ({
  balance,
  percentageChange,
  isIncrease
}) => {
  return (
    <Card bordered={false} className="card">
      <Statistic
        title="Total Balance"
        value={balance}
        precision={2}
        valueStyle={{ color: isIncrease ? '#3f8600' : '#cf1322' }}
        prefix={isIncrease ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        suffix={`(${percentageChange}%)`}
      />
    </Card>
  );
};

export default TotalBalanceCard;
