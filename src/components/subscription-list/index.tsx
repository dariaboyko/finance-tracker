import React from 'react';
import './subscription-list.scss';
import { Subscription } from 'models';
import { Button } from 'antd';

interface SubscriptionsListProps {
  subscriptions: Subscription[];
  renewSubscription: () => void;
}

const SubscriptionsList: React.FC<SubscriptionsListProps> = ({
  subscriptions,
  renewSubscription
}) => {
  return (
    <div className="subscriptions">
      <div className="subscriptions--title">
        <span>Subscriptions</span>
        <Button onClick={() => renewSubscription()}>Buy Premium</Button>
      </div>
      <ul className="subscriptions--list">
        {subscriptions.map((sub, index) => (
          <li key={index} className={sub.status === 1 ? 'positive' : 'negative'}>
            <div>
              <div className="subscriptions--list--name">Subscription {sub.id}</div>
              <div className="subscriptions--list--date">
                {sub.setDate.substring(0, 10)} - {sub.endDate.substring(0, 10)}
              </div>
            </div>
            <div className="subscriptions--list--amount">{sub.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionsList;
