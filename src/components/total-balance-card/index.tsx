import React from 'react';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Card, Statistic } from 'antd';
import './total-balance-card.scss';

interface TotalBalanceProps {
  balance: number;
  percentageChange?: number;
  isIncrease: boolean;
  title: string;
}

const TotalBalanceCard: React.FC<TotalBalanceProps> = ({
  balance,
  percentageChange,
  title,
  isIncrease
}) => {
  return (
    <Card bordered={false} className="card">
      <Statistic
        title={title}
        value={balance}
        precision={2}
        valueStyle={{ color: isIncrease ? '#3f8600' : '#cf1322' }}
        prefix={isIncrease ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        suffix={percentageChange ? `(${percentageChange}%)` : ''}
      />
    </Card>
  );
};

export default TotalBalanceCard;
