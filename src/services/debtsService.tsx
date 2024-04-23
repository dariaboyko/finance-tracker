import { message } from 'antd';
import { AxiosResponse } from 'axios';
import { DebtsResponse } from 'models';
import axiosInstance from 'utils/axiousInstance';

export async function getDebtsData(
  fromDate: string,
  toDate: string,
  page: number,
  pageSize: number
): Promise<DebtsResponse> {
  try {
    const response: AxiosResponse<DebtsResponse> = await axiosInstance.get(`/api/v1/debts`, {
      params: {
        fromDate: fromDate,
        toDate: toDate,
        page: page,
        pageSize: pageSize
      }
    });
    return response.data;
  } catch (error) {
    message.error('Server error. Please try again in a couple of minutes.');
    throw error;
  }
}
