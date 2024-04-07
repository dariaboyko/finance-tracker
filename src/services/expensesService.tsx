import { message } from 'antd';
import { AxiosResponse } from 'axios';
import { ExpensesResponse } from 'models';
import axiosInstance from 'utils/axiousInstance';

export async function getExpensesData(
  fromDate: string,
  toDate: string,
  page: number,
  pageSize: number
): Promise<ExpensesResponse> {
  try {
    const response: AxiosResponse<ExpensesResponse> = await axiosInstance.get(`/api/v1/expenses`, {
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
