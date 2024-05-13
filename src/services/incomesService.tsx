import { message } from 'antd';
import { AxiosResponse } from 'axios';
import { Income, IncomesResponse } from 'models';
import axiosInstance from 'utils/axiousInstance';

export async function getIncomesData(
  fromDate: string,
  toDate: string,
  page: number,
  pageSize: number
): Promise<IncomesResponse> {
  try {
    const response: AxiosResponse<IncomesResponse> = await axiosInstance.get(`/api/v1/incomes`, {
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

export async function addIncome(amount: number, setDate: string, source: string): Promise<Income> {
  try {
    const response: AxiosResponse<Income> = await axiosInstance.post(`/api/v1/incomes`, {
      amount: amount,
      setDate: setDate,
      source: source
    });
    return response.data;
  } catch (error) {
    message.error('Server error. Please try again in a couple of minutes.');
    throw error;
  }
}

export async function deleteIncome(id: string): Promise<void> {
  try {
    const response: AxiosResponse<void> = await axiosInstance.delete(`/api/v1/incomes/${id}`, {});
    return response.data;
  } catch (error) {
    message.error('Server error. Please try again in a couple of minutes.');
    throw error;
  }
}
