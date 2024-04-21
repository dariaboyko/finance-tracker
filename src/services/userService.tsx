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
