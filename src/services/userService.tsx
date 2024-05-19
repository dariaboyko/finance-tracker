import { message } from 'antd';
import { AxiosResponse } from 'axios';
import { SubscriptionResponse } from 'models';
import axiosInstance from 'utils/axiousInstance';

export async function getSubscriptions(
  userId: string,
  page: number,
  pagesize: number
): Promise<SubscriptionResponse> {
  try {
    const response: AxiosResponse<SubscriptionResponse> = await axiosInstance.get(
      `/api/v1/subscription/history`,
      {
        params: {
          userId: userId,
          page: page,
          pagesize: pagesize
        }
      }
    );
    return response.data;
  } catch (error) {
    message.error('Server error. Please try again in a couple of minutes.');
    throw error;
  }
}

export async function buyPremiumSubscription(
  userId: string,
  setDate: string,
  guid: string
): Promise<void> {
  try {
    await axiosInstance.post(`/api/v1/subscription/` + guid, {
      status: `Completed`,
      amount: 100,
      userId: userId,
      setDate: setDate
    });
  } catch (error) {
    message.error('Server error. Please try again in a couple of minutes.');
    throw error;
  }
}
export function generateGuid(): string {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}
