import { message } from 'antd';
import { AxiosResponse } from 'axios';
import { Debt, DebtsResponse } from 'models';
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

export async function addDebt(amount: number, creditorName: string): Promise<Debt> {
  try {
    const response: AxiosResponse<Debt> = await axiosInstance.post(`/api/v1/debts`, {
      amount: amount,
      creditorName: creditorName
    });
    return response.data;
  } catch (error) {
    message.error('Server error. Please try again in a couple of minutes.');
    throw error;
  }
}

export async function deleteDebt(id: string): Promise<void> {
  try {
    const response: AxiosResponse<void> = await axiosInstance.delete(`/api/v1/debts`, {
      params: {
        debtId: id
      }
    });
    return response.data;
  } catch (error) {
    message.error('Server error. Please try again in a couple of minutes.');
    throw error;
  }
}
