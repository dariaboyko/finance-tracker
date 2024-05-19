import { useState, useEffect, useRef } from 'react';
import './account.scss';
import { Subscription } from 'models';
import { getSubscriptions, buyPremiumSubscription } from 'services/userService';
import { refreshTokenFunc } from 'services/authService';
import mockService from 'services/mockService';
import SubscriptionsList from 'components/subscription-list';
import LoadingSpinner from 'components/loading-spinner';
import { getUserId, getUserRole } from 'utils/tokenService';
import { Button, Modal } from 'antd';

const AccountPage = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const paypalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isModalVisible && window.paypal && paypalRef.current) {
      paypalRef.current.innerHTML = '';
      window.paypal
        .Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: '0.01'
                  }
                }
              ]
            });
          },
          onApprove: (data: any, actions: any) => {
            return actions.order.capture().then((details: any) => {
              const transactionId = details.id;
              updateSubscription(transactionId);
              setIsModalVisible(false);
            });
          }
        })
        .render('#paypal-button-container');
    }
  }, [isModalVisible]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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

  const updateSubscription = async (transactionId: string) => {
    setLoading(true);

    try {
      const today = new Date();
      const formattedFromDate = today.toISOString().split('T')[0];

      await buyPremiumSubscription(getUserId(), formattedFromDate, transactionId);
      const data = await getSubscriptions(getUserId(), 1, 10);
      setSubscriptions(data.items);
      refreshTokenFunc();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const mock = mockService.generateMockSubscriptions(10);
      setSubscriptions(mock.items);
    }
  };

  return (
    <section className="account">
      <header className="account--title">
        <span>Account </span>{' '}
        {getUserRole() === `UserPremium` ? (
          ''
        ) : (
          <div>
            <Button onClick={showModal} type="primary">
              Buy Premium
            </Button>
          </div>
        )}
      </header>
      <div className="account--main">
        <div className="account--main--div">
          {loading ? <LoadingSpinner /> : <SubscriptionsList subscriptions={subscriptions} />}
        </div>
      </div>
      <Modal title="Buy Premium" open={isModalVisible} onCancel={handleCancel} footer={null}>
        <div
          id="paypal-button-container"
          ref={paypalRef}
          style={{
            padding: '20px 0 0 0',
            overflow: 'auto',
            maxHeight: 'calc(100vh - 260px)'
          }}></div>
      </Modal>
    </section>
  );
};

export default AccountPage;
