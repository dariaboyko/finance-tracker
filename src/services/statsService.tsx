import { message } from 'antd';
import { BASE_API_URL } from 'apiConfig';
import axios, { AxiosResponse } from 'axios';
import { Transaction } from 'models';

export async function getStatisticData(fromDate: string, toDate: string): Promise<Transaction[]> {
  try {
    const response: AxiosResponse<Transaction[]> = await axios.get(
      `${BASE_API_URL}/api/v1/statistic`,
      {
        params: {
          fromDate: fromDate,
          toDate: toDate
        }
      }
    );
    return response.data;
  } catch (error) {
    message.error('Server error. Please try again in a couple of minutes.');
    throw error;
  }
}
