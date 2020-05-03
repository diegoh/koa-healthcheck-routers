import { URL } from 'url';
import axios, { AxiosResponse } from 'axios';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';

const call = async (url: URL): Promise<number> => {
  try {
    const { status }: AxiosResponse<number> = await axios.get(url.toString());
    return status;
  } catch (error) {
    return INTERNAL_SERVER_ERROR;
  }
};

const statusIsOk = (status: number): boolean => status === OK;
export const checkHealth = async (urls: URL[]): Promise<boolean> => {
  const checks = await Promise.all(urls.map(call));
  return checks.every(statusIsOk);
};
