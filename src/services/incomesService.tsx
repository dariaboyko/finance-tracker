import { message } from 'antd';
import { BASE_API_URL } from 'apiConfig';
import axios, { AxiosResponse } from 'axios';
import { IncomesResponse } from 'models';

export async function getIncomesData(
  fromDate: string,
  toDate: string,
  page: number,
  pageSize: number
): Promise<IncomesResponse> {
  try {
    const response: AxiosResponse<IncomesResponse> = await axios.get(
      `${BASE_API_URL}/api/v1/incomes`,
      {
        params: {
          fromDate: fromDate,
          toDate: toDate,
          page: page,
          pageSize: pageSize
        }
      }
    );
    return response.data;
  } catch (error) {
    message.error('Server error. Please try again in a couple of minutes.');
    throw error;
  }
}
