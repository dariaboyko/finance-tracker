import { useState, useEffect } from 'react';
import './account.scss';
import { Subscription } from 'models';
import { getSubscriptions } from 'services/userService';
import mockService from 'services/mockService';

const AccountPage = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const data = await getSubscriptions('userId', 1, 10);
        setSubscriptions(data.items);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        const mock = mockService.generateMockSubscriptions(10);
        setSubscriptions(mock.items);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <div className="account-page">
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="subscription-list">
          <h2>Subscriptions</h2>
          <ul>
            {subscriptions.map((subscription) => (
              <li key={subscription.id}>
                <p>ID: {subscription.id}</p>
                <p>Transaction ID: {subscription.transactionId}</p>
                <p>Status: {subscription.status}</p>
                <p>Start Date: {subscription.setDate.toString()}</p>
                <p>End Date: {subscription.endDate.toString()}</p>
                <p>User ID: {subscription.userId}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
