import { message } from 'antd';
import { AxiosResponse } from 'axios';
import { Transaction } from 'models';
import axiosInstance from 'utils/axiousInstance';

export async function getStatisticData(fromDate: string, toDate: string): Promise<Transaction[]> {
  try {
    const response: AxiosResponse<Transaction[]> = await axiosInstance.get(`/api/v1/statistic`, {
      params: {
        fromDate: fromDate,
        toDate: toDate
      }
    });
    return response.data;
  } catch (error) {
    message.error('Server error. Please try again in a couple of minutes.');
    throw error;
  }
}

export async function getAccountStatement(fromDate: string, toDate: string): Promise<any> {
  try {
    const response: AxiosResponse<Blob> = await axiosInstance.get(
      `/api/v1/statistic/account-statement`,
      {
        params: {
          fromDate: fromDate,
          toDate: toDate
        },
        responseType: 'blob'
      }
    );
    return response;
  } catch (error) {
    message.error('Server error. Please try again in a couple of minutes.');
    throw error;
  }
}
