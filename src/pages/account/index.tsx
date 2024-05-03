import { useState, useEffect } from 'react';
import './account.scss';
import { Subscription } from 'models';
import { getSubscriptions, buyPremiumSubscription } from 'services/userService';
import mockService from 'services/mockService';
import SubscriptionsList from 'components/subscription-list';
import LoadingSpinner from 'components/loading-spinner';
import NoResults from 'components/no-results';
import { getUserId } from 'utils/tokenService';

const AccountPage = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const data = await getSubscriptions(getUserId(), 1, 10);
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

  const updateSubscription = async () => {
    setLoading(true);
    try {
      await buyPremiumSubscription();
      const data = await getSubscriptions(getUserId(), 1, 10);
      setSubscriptions(data.items);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const mock = mockService.generateMockSubscriptions(10);
      setSubscriptions(mock.items);
    }
  };

  return (
    <section className="account">
      <header className="account--title">Account</header>
      <div className="account--main">
        <div className="account--main--div">
          {loading ? (
            <LoadingSpinner />
          ) : subscriptions.length > 0 ? (
            <SubscriptionsList
              subscriptions={subscriptions}
              renewSubscription={updateSubscription}
            />
          ) : (
            <NoResults />
          )}
        </div>
      </div>
    </section>
  );
};

export default AccountPage;
